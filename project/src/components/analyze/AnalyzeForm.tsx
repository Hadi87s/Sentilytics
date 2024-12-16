import React from "react";
import { Search } from "lucide-react";

interface AnalyzeFormProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  handleAnalyze: () => void;
  error: string | null;
}

export function AnalyzeForm({
  url,
  setUrl,
  loading,
  handleAnalyze,
  error,
}: AnalyzeFormProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Amazon product URL"
          className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-teal-500 focus:border-teal-500 min-h-[44px] transition-colors duration-300"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px] sm:w-auto w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
