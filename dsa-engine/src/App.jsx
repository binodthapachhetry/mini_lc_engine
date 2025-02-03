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
                                                                                                                                                           
       for (const [i, testCase] of testCases.entries()) {                                                                                                  
         try {                                                                                                                                             
           const userFn = new Function('input', `${code}\nreturn solution(input)`)                                                                         
           const output = userFn(testCase.input)                                                                                                           
           const passed = JSON.stringify(output) === JSON.stringify(testCase.expected)                                                                     
                                                                                                                                                           
           results.push({                                                                                                                                  
             status: passed ? 'passed' : 'failed',                                                                                                         
             message: passed ? null : `Expected: ${testCase.expected}, Got: ${output}`                                                                     
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
                   
