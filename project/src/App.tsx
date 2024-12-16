import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { AnalyzeSection } from "./components/analyze/AnalyzeSection";
import { ContactSection } from "./components/contact/ContactSection";
import { Footer } from "./components/Footer";
import { ChatBot } from "./components/chat/ChatBot";
import ReviewsPage from "./components/analyze/ReviewsPage";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={ 
                <>
                  <Hero />
                  <About />
                  <AnalyzeSection />
                  <ContactSection />
                  <Footer />
                </>
              }
            />
            {/* New Route for the Reviews Page */}
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/analyze" element={<AnalyzeSection />} />
          </Routes>
        </Suspense>
        {/* Chatbot Accessible Throughout the App */}
        <ChatBot />
      </div>
    </Router>
  );
}
