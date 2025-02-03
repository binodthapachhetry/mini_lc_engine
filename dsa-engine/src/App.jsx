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

       // Convert array input to TreeNode structure for BST problems
       const createTreeNode = (arr) => {
         if (arr.length === 0) return null
         const root = new TreeNode(arr[0])
         const queue = [root]
         let i = 1
         
         while (queue.length > 0 && i < arr.length) {
           const node = queue.shift()
           
           if (arr[i] !== null) {
             node.left = new TreeNode(arr[i])
             queue.push(node.left)
           }
           i++
           
           if (i < arr.length && arr[i] !== null) {
             node.right = new TreeNode(arr[i])
             queue.push(node.right)
           }
           i++
         }
         return root
       }

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

         validateBST: (code) => `
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

${code
  .replace(/class TreeNode:/g, '')
  .replace(/def __init__\(self, val=0, left=None, right=None\):/g, '')
  .replace(/        self\./g, '  this.')
  .replace(/def solution\(root\):/, 'function solution(root) {')
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
                   
