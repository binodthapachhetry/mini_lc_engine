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
from js import resolve
input_data = json.loads('${JSON.stringify(input)}')

try:
    result = solution(*input_data) if ${problemType === 'twoSum'} else solution(input_data)
    resolve(result)
except Exception as e:
    resolve({'error': str(e), 'type': type(e).__name__})
`;

    const result = await pyodide.runPythonAsync(fullScript);
    
    // Handle Python boolean conversion
    let jsResult = result?.toJs ? result.toJs() : result;
    
    // Convert Python None to JS null
    if (jsResult === undefined) jsResult = null;
    
    self.postMessage({ status: 'success', result: jsResult });
  } catch (error) {
    self.postMessage({ 
      status: 'error', 
      error: error.message.replace(/PythonError: Traceback \(most recent call last\):[\s\S]*?Error: /, '') 
    });
  }
};
