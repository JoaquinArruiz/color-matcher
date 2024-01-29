// src/components/ScoreDisplay.tsx
import React from "react";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const finalScore = score.toFixed(2);

  return (
    <div className="p-3">
      <p className="text-xl">Match Score:</p>
      <div className="text-5xl">
        {score >= 7 ? (
          <span className="text-green-500">{finalScore}</span>
        ) : score >= 4.5 ? (
          <span className="text-yellow-500">{finalScore}</span>
        ) : (
          <span className="text-red-500">{finalScore}</span>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;
