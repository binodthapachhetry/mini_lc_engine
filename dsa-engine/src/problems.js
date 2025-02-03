const problems = [                                                                                                                                        
    {                                                                                                                                                       
      title: "Two Sum",                                                                                                                                     
      difficulty: "Easy",                                                                                                                                   
      description: `                                                                                                                                        
        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>,                                                                 
        return indices of the two numbers such that they add up to <code>target</code>.</p>                                                                 
        <p><strong>Example 1:</strong></p>                                                                                                                  
        <pre>Input: nums = [2,7,11,15], target = 9<br>Output: [0,1]</pre>                                                                                   
      `,                                                                                                                                                    
      boilerplate: `function solution(input) {                                                                                                              
    const [nums, target] = input;                                                                                                                           
    // Your code here                                                                                                                                       
  }`,                                                                                                                                                       
      testCases: [                                                                                                                                          
        { input: [[2,7,11,15], 9], expected: [0,1] },                                                                                                       
        { input: [[3,2,4], 6], expected: [1,2] },                                                                                                           
        { input: [[3,3], 6], expected: [0,1] }                                                                                                              
      ]                                                                                                                                                     
    },                                                                                                                                                      
    // Add more problems here                                                                                                                               
  ]                                                                                                                                                         
                                                                                                                                                            
  export default problems   