// Initialize Pyodide
let pyodide = null;

async function initPyodide() {
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');
  pyodide = await loadPyodide();
}

// Handle messages from main thread
self.onmessage = async function(e) {
  const { code, input, problemType } = e.data;
  
  if (!pyodide) {
    await initPyodide();
  }

  try {
    // Set timeout for execution
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Execution timed out')), 5000);
    });

    const executionPromise = (async () => {
      // Create Python globals
      await pyodide.runPythonAsync(`
        import json
        input_data = json.loads('${JSON.stringify(input)}')
      `);

      // Run user code
      await pyodide.runPythonAsync(code);

      // Add problem type handling
      const result = await pyodide.runPythonAsync(`
        solution(*input_data)
      `);

      return result.toJs();
    })();

    const result = await Promise.race([executionPromise, timeoutPromise]);
    self.postMessage({ status: 'success', result });
  } catch (error) {
    self.postMessage({ 
      status: 'error', 
      error: error.message 
    });
  }
};
