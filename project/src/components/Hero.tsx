import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToSection } from "../utils/scroll";

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-teal-50 to-gray-100 dark:from-gray-900 dark:to-teal-900">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Sentilytics
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12"
        >
          Turning Reviews into Insights, One Sentiment at a Time!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("analyze")}
            className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-gray-600 dark:text-gray-300" />
      </motion.button>
    </div>
  );
}
