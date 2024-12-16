import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi"; // Eye icon
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa"; // Sentiment icons
import { FaArrowUp } from "react-icons/fa"; // Arrow Up Icon

interface Review {
  sentiment: string;
  text: string;
}

const ReviewsPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          No results found. Please analyze a product first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const results = state.results;

  const [visibleReviews, setVisibleReviews] = useState<number>(6);
  const [popupText, setPopupText] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [initialView, setInitialView] = useState<boolean>(true);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  const sentimentBackground = (sentiment: string): string => {
    switch (sentiment) {
      case "Happy":
        return "bg-green-600";
      case "Neutral":
        return "bg-orange-400";
      case "Unhappy":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const sentimentIcon = (sentiment: string): JSX.Element => {
    switch (sentiment) {
      case "Happy":
        return <FaSmile />;
      case "Neutral":
        return <FaMeh />;
      case "Unhappy":
        return <FaFrown />;
      default:
        return <FaMeh />;
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 9);
    setInitialView(false);
    setIsShowAll(false);
  };

  const loadAllReviews = () => {
    setVisibleReviews(results.reviews.length);
    setIsShowAll(true);
    setInitialView(false); // Ensure Show Less button appears after pressing Show All
  };

  const showLessReviews = () => {
    setVisibleReviews(6);
    setInitialView(true);
    setIsShowAll(false);
  };

  const openPopup = (text: string) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/analyze", { state: { results } })}
        className="fixed top-20 left-5 px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 z-50"
      >
        Back
      </button>

      <div className="max-w-5xl mx-auto px-4">
        {/* Reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
          {results.reviews
            .slice(0, visibleReviews)
            .map((review: Review, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-md shadow text-white ${sentimentBackground(
                  review.sentiment
                )}`}
              >
                <p className="text-sm font-bold flex items-center gap-2">
                  {sentimentIcon(review.sentiment)} {review.sentiment}
                </p>
                <p className="text-sm text-white/90 line-clamp-3">
                  {review.text}
                </p>
                <button
                  onClick={() => openPopup(review.text)}
                  className="mt-2 flex items-center gap-1 text-teal-100 hover:underline text-sm"
                >
                  <FiEye /> View Full Text
                </button>
              </div>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {!isShowAll && visibleReviews < results.reviews.length && (
            <button
              onClick={loadMoreReviews}
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Show More
            </button>
          )}
          {!isShowAll && (
            <button
              onClick={loadAllReviews}
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Show All
            </button>
          )}
          {!initialView && (
            <button
              onClick={showLessReviews}
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 left-10 p-4 bg-teal-600 text-white rounded-full shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 z-50"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[600px] overflow-y-auto border border-teal-500"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-4">
              Full Review
            </h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 mb-6">
              {popupText}
            </p>
            <button
              onClick={closePopup}
              className="block mx-auto px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;