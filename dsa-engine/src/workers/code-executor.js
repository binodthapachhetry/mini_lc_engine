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
    // Clear previous Python state
    pyodide.runPython('del solution; del input_data;');
    
    // Convert input to Python objects
    await pyodide.runPythonAsync(`
      import json
      input_data = json.loads('${JSON.stringify(input)}')
    `);
    
    // Handle different problem types
    let result;
    if (problemType === 'twoSum') {
      await pyodide.runPythonAsync(code);
      result = await pyodide.runPythonAsync(`
        solution(*input_data)
      `);
    } else { // validPalindrome
      await pyodide.runPythonAsync(code);
      result = await pyodide.runPythonAsync(`
        solution(input_data)
      `);
    }
    
    // Convert Python results to JS
    self.postMessage({ result: result?.toJs() });
  } catch (error) {
    self.postMessage({ 
      status: 'error', 
      error: error.message.replace(/PythonError: Traceback \(most recent call last\):[\s\S]*?Error: /, '') 
    });
  }
};
