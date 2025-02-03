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
    // Clear previous state
    pyodide.runPython('globals().clear()');
    
    // Define solution function and execute in one context
    const fullScript = `
${code}

import json
input_data = json.loads('${JSON.stringify(input)}')

try:
    result = solution(*input_data) if ${problemType === 'twoSum'} else solution(input_data)
except Exception as e:
    result = {'error': str(e), 'type': type(e).__name__}
    `;

    await pyodide.runPythonAsync(fullScript);
    const result = pyodide.globals.get('result');
    
    // Handle Python errors
    if ('error' in result) {
      throw new Error(`Python Error (${result.type}): ${result.error}`);
    }
    
    self.postMessage({ result: result?.toJs() });
  } catch (error) {
    self.postMessage({ 
      status: 'error', 
      error: error.message.replace(/PythonError: Traceback \(most recent call last\):[\s\S]*?Error: /, '') 
    });
  }
};
