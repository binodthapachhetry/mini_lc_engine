import { useState } from 'react';
import './App.css';
import ProblemInterface from './ProblemInterface';
import { problems } from './problems';

function App() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [solution, setSolution] = useState(null);

  const handleSubmit = (code) => {
    setSolution(code);
    // Here you could also save the solution, show a success message, etc.
  };

  return (
    <div className="app-container">
      <div className="problem-sidebar">
        {problems.map(problem => (
          <div
            key={problem.id}
            className={`problem-item ${selectedProblem.id === problem.id ? 'active' : ''}`}
            onClick={() => setSelectedProblem(problem)}
          >
            {problem.title}
          </div>
        ))}
      </div>
      
      <ProblemInterface 
        problem={selectedProblem}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
