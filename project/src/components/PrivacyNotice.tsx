import React from "react";

export function PrivacyNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Privacy Notice
          </h1>

          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              Your privacy is important to us. This privacy notice explains how
              we collect, use, and protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, such as
              your name, email address, and any other information you choose to
              provide.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, to communicate with you, and to protect our
              users and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              Information Sharing
            </h2>
            <p>
              We do not share your personal information with third parties
              except as described in this privacy notice or with your consent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              Changes to This Privacy Notice
            </h2>
            <p>
              We may update this privacy notice from time to time. We will
              notify you of any changes by posting the new privacy notice on
              this page.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6">
              Contact Us
            </h2>
            <p>
              If you have any questions about this privacy notice, please
              contact us at{" "}
              <a
                href="mailto:gradproject3am@gmail.com"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
              >
                gradproject3am@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
