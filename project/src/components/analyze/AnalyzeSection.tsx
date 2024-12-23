import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { removeStopwords } from "stopword";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ChartDataLabels, ArcElement);

interface Review {
  sentiment: string;
  text: string;
}

interface SentimentCounts {
  Happy: number;
  Neutral: number;
  Unhappy: number;
}

interface Results {
  reviews: Review[];
  sentiment_counts: SentimentCounts;
  product_name: string; // Add product name to Results interface
}

export const AnalyzeSection: React.FC = () => {
  const [productUrl, setProductUrl] = useState<string>("");
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results);
      generateWordFrequency(location.state.results.reviews);
    }
  }, [location.state]);

  const handleScrape = async () => {
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_url: productUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const data: Results = await response.json();
      setResults(data);
      generateWordFrequency(data.reviews);
    } catch {
      setError("Failed to connect to the backend");
    }
    setLoading(false);
  };

  const generateWordFrequency = (reviews: Review[]) => {
    const wordCount: Record<string, number> = {};
    const sentimentPhrases = [
      "good product",
      "bad product",
      "great",
      "amazing",
      "very good",
      "very bad",
      "not good",
      "not bad",
    ];
    const customStopwords = [
      "and", "or", "but", "because", "so", "yet", "for", "on", "in", "with", "at",
      "from", "into", "during", "until", "against", "among", "throughout",
      "despite", "towards", "upon", "of", "to", "a", "the", "an", "is", "are",
      "was", "were", "be", "been", "being", "have", "has", "had", "having", "do",
      "does", "did", "doing", "will", "would", "shall", "should", "can", "could",
      "may", "might", "must", "this", "that", "these", "those",
    ];

    reviews.forEach((review) => {
      const words = removeStopwords(
        review.text.toLowerCase().split(/\W+/),
        customStopwords
      );

      words.forEach((word, index) => {
        const phrase = index < words.length - 1 ? `${word} ${words[index + 1]}` : null;

        if (sentimentPhrases.includes(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }

        if (phrase && sentimentPhrases.includes(phrase)) {
          wordCount[phrase] = (wordCount[phrase] || 0) + 1;
        }
      });
    });

    const sortedWordCount = Object.fromEntries(
      Object.entries(wordCount).sort(([, a], [, b]) => b - a)
    );

    setWordFrequency(sortedWordCount);
  };

  const barData = {
    labels: Object.keys(wordFrequency),
    datasets: [
      {
        label: "Word Frequency",
        data: Object.values(wordFrequency),
        backgroundColor: "#4caf50",
      },
    ],
  };

  const overallSentiment =
    results &&
    (
      (results.sentiment_counts.Happy /
        (results.sentiment_counts.Happy +
          results.sentiment_counts.Neutral +
          results.sentiment_counts.Unhappy)) *
      100
    ).toFixed(2);

  return (
    <section
      id="analyze"
      className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-8"
    >
      <div className="w-full max-w-6xl px-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Analyze Amazon Reviews
          </h2>

          {/* Updated Product Name Display */}
          {results && (
            <p className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
              {results.product_name !== "Unknown Product" ? results.product_name : "Product Name Not Available"}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter Amazon Product URL"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleScrape}
              disabled={loading}
              className="px-6 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {loading ? "Loading..." : "Analyze"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-center mb-4">
              {error}
            </p>
          )}

          {results && (
            <>
              {/* Stat Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-500 text-white rounded-md shadow-md p-4 w-full max-w-[280px] mx-auto text-center">
                  <h3 className="text-lg font-semibold">Total Reviews Analyzed</h3>
                  <p className="text-3xl font-bold mt-2">{results.reviews.length}</p>
                </div>

                <div className="bg-green-500 text-white rounded-md shadow-md p-4 w-full max-w-[280px] mx-auto text-center">
                  <h3 className="text-lg font-semibold">Overall Sentiment</h3>
                  <p className="text-3xl font-bold mt-2">{overallSentiment}% Positive</p>
                </div>
              </div>

              {/* Existing Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                  <div className="w-3/4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Sentiment Distribution
                    </h3>
                    <Pie
                      data={{
                        labels: ["Happy", "Neutral", "Unhappy"],
                        datasets: [
                          {
                            label: "Sentiment Distribution",
                            data: [
                              results.sentiment_counts.Happy,
                              results.sentiment_counts.Neutral,
                              results.sentiment_counts.Unhappy,
                            ],
                            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: true,
                        responsive: true,
                        plugins: {
                          datalabels: {
                            color: "white",
                            font: {
                              size: 14,
                            },
                            formatter: (value, context) => {
                              const dataArray = context.dataset.data as number[];
                              const total = dataArray.reduce(
                                (acc, curr) => acc + curr,
                                0
                              );
                              const percentage = ((value / total) * 100).toFixed(
                                1
                              );
                              return `${percentage}%`;
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center h-full">
                  <div className="w-3/4 h-[350px]">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Word Frequency
                    </h3>
                    <Bar
                      data={barData}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                          datalabels: {
                            color: "gray",
                            anchor: "end",
                            align: "top",
                            font: {
                              size: 14,
                            },
                            formatter: (value) => value,
                          },
                        },
                      }}
                      height={350}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {results && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/reviews", { state: { results } })}
                className="px-6 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700"
              >
                View Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
