import React from "react";
import { Download } from "lucide-react";
import type { SentimentResult } from "../../types";
import { SentimentCount } from "./SentimentCount";
import { ReviewsTable } from "./ReviewsTable";

interface AnalyzeResultsProps {
  results: SentimentResult;
  handleDownload: () => void;
}

export function AnalyzeResults({
  results,
  handleDownload,
}: AnalyzeResultsProps) {
  console.log("AnalyzeResults component rendered"); // Add this line
  console.log("Results in AnalyzeResults:", results); // Keep this line

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <SentimentCount results={results} />
      <ReviewsTable reviews={results.reviews} />

      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Results
        </button>
      </div>
    </div>
  );
}
