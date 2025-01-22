import React, { useState } from "react";

// Import Remix Icons for stars
import { RiStarFill, RiStarLine } from "react-icons/ri";

// Dummy data for reviews (loaded from local storage if available)
const initialReviews = JSON.parse(localStorage.getItem("reviews") || "[]") || [
  {
    name: "John Doe",
    rating: 4.5,
    comment: "Great service and fast delivery!",
  },
  {
    name: "Jane Smith",
    rating: 5,
    comment: "Amazing experience, highly recommend!",
  },
  { name: "Alice Johnson", rating: 3, comment: "Good, but could be better." },
  { name: "Bob Brown", rating: 4, comment: "Very satisfied with the product." },
  {
    name: "Charlie Davis",
    rating: 2.5,
    comment: "Average experience, needs improvement.",
  },
  { name: "Eve Wilson", rating: 5, comment: "Absolutely fantastic!" },
];

// Function to render star ratings
const renderStars = (
  rating: number,
  interactive = false,
  onHover?: (rating: number) => void,
  onClick?: (rating: number) => void
) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="cursor-pointer"
          onMouseEnter={() => interactive && onHover?.(star)}
          onMouseLeave={() => interactive && onHover?.(0)}
          onClick={() => interactive && onClick?.(star)}
        >
          {rating >= star ? (
            <RiStarFill className="w-6 h-6 text-yellow-400" />
          ) : (
            <RiStarLine className="w-6 h-6 text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export function ReviewPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      name: formData.name,
      rating: formData.rating,
      comment: formData.message,
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setIsPopupOpen(false);
    setFormData({ name: "", email: "", message: "", rating: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Here you can view all the analyzed reviews and their sentiment scores.
        </p>

        {/* Share Your Experience Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          >
            Share Your Experience
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(
            (
              review: {
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                rating: number;
                comment:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {review.name}
                </h2>
                <div className="mb-4">{renderStars(review.rating)}</div>
                <p className="text-gray-600 dark:text-gray-400">
                  {review.comment}
                </p>
              </div>
            )
          )}
        </div>

        {/* Popup for Sharing Experience */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Share Your Experience
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  {renderStars(
                    hoverRating || formData.rating,
                    true,
                    (rating) => setHoverRating(rating),
                    (rating) => setFormData((prev) => ({ ...prev, rating }))
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
