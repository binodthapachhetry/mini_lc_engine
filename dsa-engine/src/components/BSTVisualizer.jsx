import { useState } from 'react'

class BSTNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new BSTNode(value)
    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root
    while (true) {
      if (value === current.value) return // No duplicates
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          break
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          break
        }
        current = current.right
      }
    }
  }

  getLevelOrder() {
    const result = []
    if (!this.root) return result

    const queue = [this.root]
    while (queue.length > 0) {
      const levelSize = queue.length
      const currentLevel = []
      
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift()
        currentLevel.push(node?.value ?? null)
        if (node?.left) queue.push(node.left)
        if (node?.right) queue.push(node.right)
      }
      result.push(currentLevel)
    }
    return result
  }
}

function BSTVisualizer() {
  const [tree] = useState(new BST())
  const [nodes, setNodes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleInsert = () => {
    const value = parseInt(inputValue)
    if (isNaN(value)) {
      setError('Please enter a valid number')
      return
    }

    try {
      tree.insert(value)
      setNodes(tree.getLevelOrder())
      setInputValue('')
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="visualization-section">
      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={handleInsert}>Insert Value</button>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="visualization-container">
        {nodes.map((level, levelIndex) => (
          <div key={levelIndex} className="tree-level">
            {level.map((value, index) => (
              <div key={`${levelIndex}-${index}`} className="node">
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BSTVisualizer
