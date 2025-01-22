import React from "react";

export function ReviewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here you can view all the analyzed reviews and their sentiment scores.
        </p>
        {/* Add your review list or table here */}
      </div>
    </div>
  );
}
