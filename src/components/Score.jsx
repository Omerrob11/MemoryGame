import { useState } from "react";

function Score({ currentScore, bestScore }) {
  return (
    <div className="score-container">
      <h2>Current Score: {currentScore}</h2>
      <h2>Best Score: {bestScore}</h2>
    </div>
  );
}

export default Score;
