const problems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    type: "twoSum",
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
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    description: `
      <p>Given a binary tree, determine if it is a valid binary search tree (BST).</p>
      <p>A valid BST is defined as follows:</p>
      <ul>
        <li>The left subtree of a node contains only nodes with keys less than the node's key.</li>
        <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
        <li>Both the left and right subtrees must also be binary search trees.</li>
      </ul>
      <p><strong>Example 1:</strong></p>
      <pre>Input: [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The root node's value is 5 but its right child's value is 4.</pre>
    `,
    boilerplate: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def solution(root):
    # Your code here`,
    testCases: [
      { 
        input: [5,1,4,null,null,3,6],
        expected: false
      },
      {
        input: [2,1,3],
        expected: true
      },
      {
        input: [5,4,6,null,null,3,7],
        expected: false
      }
    ]
  }
]

export default problems
