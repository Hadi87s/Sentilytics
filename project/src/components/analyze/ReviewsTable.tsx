import React from "react";
import type { SentimentResult } from "../../types";

interface ReviewsTableProps {
  reviews: SentimentResult["reviews"];
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Review
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Sentiment
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {reviews.map((review, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-300">
                {review.text}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${
                    review.sentiment === "positive"
                      ? "bg-green-100 text-green-800"
                      : review.sentiment === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {review.sentiment}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
