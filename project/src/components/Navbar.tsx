import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Updated Logo */}
          <button
            onClick={() => navigate("/")} // Navigate to the homepage
            className="flex items-center space-x-3"
          >
            <span
              id="logo"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Sentilytics
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("analyze")}
              className="text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Analyze
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Contact
            </button>

            <button
              id="themeToggle"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {isDark ? (
                <Sun className="w-5 h-5 darkMode" />
              ) : (
                <Moon className="w-5 h-5 lightMode" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-50">
          <div className="flex flex-col h-full">
            <div className="px-4 py-4 space-y-4 backdrop-blur-sm bg-black/60">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-lg text-gray-200 hover:text-teal-500 transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("analyze")}
                className="block w-full text-left text-lg text-gray-200 hover:text-teal-500 transition-colors duration-300"
              >
                Analyze
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-lg text-gray-200 hover:text-teal-500 transition-colors duration-300"
              >
                Contact
              </button>
            </div>
            <div className="mt-auto p-4 border-t border-gray-700 backdrop-blur-sm bg-black/60">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-gray-200 hover:text-teal-500 transition-colors duration-300"
              >
                {isDark ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}