const problems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    type: "twoSum",
    inputType: "spread",
    argsCount: 2,
    description: `
      <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, 
      return indices of the two numbers such that they add up to <code>target</code>.</p>
      <p><strong>Example 1:</strong></p>
      <pre>Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]</pre>
    `,
    boilerplate: `def solution(nums, target):
    # Your code here`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] }
    ]
  },
  {
    title: "Valid Palindrome",
    difficulty: "Easy",
    type: "validPalindrome",
    inputType: "single",
    argsCount: 1,
    description: `
      <p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.</p>
      <p><strong>Example 1:</strong></p>
      <pre>Input: "A man, a plan, a canal: Panama"\nOutput: true</pre>
      <p><strong>Example 2:</strong></p>
      <pre>Input: "race a car"\nOutput: false</pre>
    `,
    boilerplate: `def solution(s):
    # Your code here`,
    testCases: [
      { input: "A man, a plan, a canal: Panama", expected: true },
      { input: "race a car", expected: false },
      { input: " ", expected: true },
      { input: "0P", expected: false }
    ]
  }
]

export default problems
