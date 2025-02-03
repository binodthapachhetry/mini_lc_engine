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
      <pre>Input: [5,1,4,null,null,3,6]<br>Output: false<br>Explanation: The root node's value is 5 but its right child's value is 4.</pre>
    `,
    boilerplate: `function solution(input) {
  // input is an array representing the BST in level-order traversal
  // null represents empty nodes
  // Return true if it's a valid BST, false otherwise
  
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  function arrayToBST(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      
      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]);
        queue.push(node.left);
      }
      i++;
      
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]);
        queue.push(node.right);
      }
      i++;
    }
    
    return root;
  }
  
  const root = arrayToBST(input);
  
  // Implement your validation logic here
}`,
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
