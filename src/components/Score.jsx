import { useState } from "react";

function Score() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <div className="score-container">
      <h1>Score stuff</h1>
    </div>
  );
}
