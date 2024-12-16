import React from "react";
import type { SentimentResult } from "../../types";

interface SentimentCountProps {
  results: SentimentResult;
}

export function SentimentCount({ results }: SentimentCountProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {["positive", "neutral", "negative"].map((sentiment) => (
        <div
          key={sentiment}
          className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center shadow transition-colors duration-300"
        >
          <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
            {sentiment}
          </h3>
          <p className="text-2xl font-bold text-teal-500">
            {results[sentiment as keyof typeof results]}
          </p>
        </div>
      ))}
    </div>
  );
}
