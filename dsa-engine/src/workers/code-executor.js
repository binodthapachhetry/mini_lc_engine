importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodide;

async function initializePyodide() {
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
  });
}

self.onmessage = async (e) => {
  const { code, input, problemType } = e.data;
  
  if (!pyodide) await initializePyodide();
  
  try {
    pyodide.runPython('globals().clear()');
    
    const fullScript = `
${code}

import json
input_data = json.loads('${JSON.stringify(input)}')

try:
    if ${problemType === 'twoSum'}:
        result = solution(*input_data)
    else:
        result = solution(input_data)
except Exception as e:
    result = {'py_error': str(e), 'type': type(e).__name__}
`;

    await pyodide.runPythonAsync(fullScript);
    const result = pyodide.globals.get('result');

    // Handle Python errors
    if (typeof result === 'object' && 'py_error' in result) {
      throw new Error(`Python ${result.type}: ${result.py_error}`);
    }

    // Convert Python types to JS
    let jsResult = result?.toJs?.() ?? result;
    
    // Handle boolean conversion
    if (typeof jsResult === 'boolean') {
      jsResult = Boolean(jsResult);
    }
    
    self.postMessage({ status: 'success', result: jsResult });
  } catch (error) {
    self.postMessage({ 
      status: 'error',
      error: error.message.replace(/PythonError: Traceback \(most recent call last\):[\s\S]*?Error: /, '')
    });
  }
};
