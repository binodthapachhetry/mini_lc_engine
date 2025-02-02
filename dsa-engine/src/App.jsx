import './App.css'
import BSTVisualizer from './components/BSTVisualizer'

function App() {
  return (
    <div className="app-container">
      <h1>DSA Visualizer - Binary Search Tree</h1>
      
      <div className="problem-description">
        <h2>Binary Search Tree Implementation</h2>
        <p>
          Implement a Binary Search Tree with the following requirements:
        </p>
        <ul>
          <li>Insert values maintaining BST properties</li>
          <li>No duplicate values allowed</li>
          <li>Visualize the tree structure</li>
        </ul>
        <div className="test-cases">
          <h3>Example:</h3>
          <p>Input: [5, 3, 7, 2, 4, 6, 8]</p>
          <p>Expected: A valid BST with all values inserted</p>
        </div>
      </div>

      <BSTVisualizer />
    </div>
  )
}

export default App
