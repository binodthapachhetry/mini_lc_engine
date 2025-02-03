import { useState } from 'react'                                                                                                                          
 import ProblemInterface from './ProblemInterface'                                                                                                         
 import problems from './problems'                                                                                                                         
 import './App.css'                                                                                                                                        
                                                                                                                                                           
 function App() {                                                                                                                                          
   const [currentProblem, setCurrentProblem] = useState(0)                                                                                                 
                                                                                                                                                           
   // Sample test runner - expand with actual problem validation                                                                                           
   const handleCodeSubmit = async (code) => {
     try {
       const testCases = problems[currentProblem].testCases
       const results = []
       
       // Create Web Worker
       const worker = new Worker(new URL('./workers/code-executor.js', import.meta.url))


       // Python to JS conversion utilities
       const pythonToJS = {
         twoSum: (code) => `
function solution(input) {
  const [nums, target] = input;
  ${code
    .replace(/def solution\(nums, target\):/, '')
    .replace(/    /g, '  ')
    .replace(/#.*/g, '')}
}`,

         validPalindrome: (code) => `
${code
  .replace(/def solution\(s\):/, 'function solution(s) {')
  .replace(/    /g, '  ')
  .replace(/#.*/g, '')}
}`
       }

       for (const testCase of testCases) {
         const result = await new Promise((resolve) => {
           worker.onmessage = (e) => {
             if (e.data.status === 'error') {
               resolve({
                 status: 'error',
                 message: e.data.error
               });
             } else {
               const output = e.data.result;
               const passed = JSON.stringify(output) === JSON.stringify(testCase.expected);
               resolve({
                 status: passed ? 'passed' : 'failed',
                 message: passed ? null : `Expected: ${JSON.stringify(testCase.expected)}, Got: ${JSON.stringify(output)}`
               });
             }
           };

           worker.postMessage({
             code,
             input: testCase.input,
             problemType: problems[currentProblem].type // Pass the problem type
           });
         });

         results.push(result);
       }

       // Terminate worker after tests complete
       worker.terminate();
       
       return results
     } catch (error) {
       throw new Error('Error executing solution: ' + error.message)
     }
   }                                                                                                                                                       
                                                                                                                                                           
   return (                                                                                                                                                
     <div className="app-container">                                                                                                                       
       <div className="problem-sidebar">                                                                                                                   
         <h2>Problems</h2>                                                                                                                                 
         {problems.map((problem, i) => (                                                                                                                   
           <div                                                                                                                                            
             key={i}                                                                                                                                       
             className={`problem-item ${i === currentProblem ? 'active' : ''}`}                                                                            
             onClick={() => setCurrentProblem(i)}                                                                                                          
           >                                                                                                                                               
             {i + 1}. {problem.title}                                                                                                                      
           </div>                                                                                                                                          
         ))}                                                                                                                                               
       </div>                                                                                                                                              
                                                                                                                                                           
       <ProblemInterface                                                                                                                                   
         problem={problems[currentProblem]}                                                                                                                
         onCodeSubmit={handleCodeSubmit}                                                                                                                   
       />                                                                                                                                                  
     </div>                                                                                                                                                
   )                                                                                                                                                       
 }                                                                                                                                                         
                                                                                                                                                           
 export default App                                                                                                                                        
                   
