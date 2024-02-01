// src/components/ScoreDisplay.tsx
import React from "react";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const finalScore = score.toFixed(2);

  return (
    <div className="flex flex-col">
      <p className="font-bold: w-full md:text-base">Match Score:</p>
      <div className="w-2/3 text-4xl md:text-6xl">
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
