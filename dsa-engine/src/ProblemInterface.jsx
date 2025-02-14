import { useState, useEffect } from 'react'                                                                                                                          
import Editor from '@monaco-editor/react'                                                                                                                 
                                                                                                                                                           
const ProblemInterface = ({ problem, onCodeSubmit }) => {                                                                                                
  const [code, setCode] = useState(problem.boilerplate)                                                                                                  
  const [testResults, setTestResults] = useState([])                                                                                                     
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setCode(problem.boilerplate)
    setTestResults([])
  }, [problem.boilerplate])                                                                                               
                                                                                                                                                         
  const handleSubmit = async () => {                                                                                                                     
    setIsSubmitting(true)                                                                                                                                
    setTestResults([])                                                                                                                                   
    try {                                                                                                                                                
      const results = await onCodeSubmit(code)                                                                                                           
      setTestResults(results)                                                                                                                            
    } catch (error) {                                                                                                                                    
      setTestResults([{ status: 'error', message: error.message }])                                                                                      
    } finally {                                                                                                                                          
      setIsSubmitting(false)                                                                                                                             
    }                                                                                                                                                    
  }                                                                                                                                                     
                                                                                                                                                           
   return (                                                                                                                                                
     <div className="problem-interface">                                                                                                                   
       <div className="problem-description">                                                                                                               
         <h2>{problem.title}</h2>                                                                                                                          
         <div dangerouslySetInnerHTML={{ __html: problem.description }} />                                                                                 
       </div>                                                                                                                                              
                                                                                                                                                           
       <div className="code-editor">                                                                                                                       
         <Editor                                                                                                                                           
           height="400px"                                                                                                                                  
           defaultLanguage="python"                                                                                                                    
           value={code}                                                                                                                                    
           onChange={value => setCode(value)}                                                                                                              
           options={{ minimap: { enabled: false } }}                                                                                                       
         />                                                                                                                                                
         <button 
           className="submit-button" 
           onClick={handleSubmit}
           disabled={isSubmitting}
         >                                                                                         
           {isSubmitting ? 'Running Tests...' : 'Submit Solution'}                                                                                                
         </button>                                                                                                                                         
       </div>                                                                                                                                              
                                                                                                                                                           
       <div className="test-results">                                                                                                                      
         <h3>Test Results</h3>                                                                                                                             
         {testResults.map((result, i) => (                                                                                                                 
           <div key={i} className={`test-case ${result.status}`}>                                                                                          
             {result.status === 'passed' ? '✓' : '✗'} Test Case {i + 1}                                                                                    
             {result.message && <div className="message">{result.message}</div>}                                                                           
           </div>                                                                                                                                          
         ))}                                                                                                                                               
       </div>                                                                                                                                              
     </div>                                                                                                                                                
   )                                                                                                                                                       
 }                                                                                                                                                         
                                                                                                                                                           
 export default ProblemInterface 
