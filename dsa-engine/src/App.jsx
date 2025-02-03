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
       
       // Simple Python-like execution (note: this is JavaScript parsing Python syntax)
       for (const [i, testCase] of testCases.entries()) {
         try {
           const pyCode = `
${code}

// Convert Python-style code to JS
${currentProblem === 0 ? `
function solution(nums, target) {
${code
  .replace(/def solution\(nums, target\):/, '')
  .replace(/    /g, '  ')
  .replace(/#.*/g, '')}
}` : `
${code
  .replace(/class TreeNode:/g, 'class TreeNode {')
  .replace(/def __init__\(self, val=0, left=None, right=None\):/g, 'constructor(val=0, left=null, right=null) {')
  .replace(/        self./g, '    this.')
  .replace(/def solution\(root\):/g, 'function solution(root) {')
  .replace(/    /g, '  ')
  .replace(/#.*/g, '')}
}`)}
`
           const userFn = new Function('input', `${pyCode}; return solution(...input)`)
           const output = userFn(testCase.input)
           
           // Handle Python-style boolean capitalization
           const expected = typeof testCase.expected === 'boolean' 
             ? testCase.expected
             : testCase.expected

           const passed = JSON.stringify(output) === JSON.stringify(expected)
           
           results.push({
             status: passed ? 'passed' : 'failed',
             message: passed ? null : `Expected: ${expected}, Got: ${JSON.stringify(output)}`
           })
         } catch (err) {
           results.push({ status: 'error', message: err.message })
         }
       }
       
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
                   
