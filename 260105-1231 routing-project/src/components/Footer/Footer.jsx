import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-y">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                className="mr-3 h-16"
                alt="Singularity Logo"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Community
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/SamanPandey-in"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://leetcode.com/samanpandey"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    LeetCode
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:underline">
              Singularity
            </Link>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {/* X (Twitter) */}
            <a
              href="https://x.com/WarBornePheonix"
              target="_blank"
              rel="noreferrer"
              title="X (Twitter)"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M18.244 2H21.7l-7.54 8.62L23 22h-6.96l-5.45-7.1L4.47 22H1l8.06-9.21L1 2h7.12l4.92 6.45L18.244 2Z" />
              </svg>
              <span className="sr-only">X</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/SamanPandey-in"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 0 1 1.84 1.24 2.55 2.55 0 0 0 3.49 1 2.55 2.55 0 0 1 .76-1.6c-2.67-.31-5.47-1.34-5.47-5.97a4.67 4.67 0 0 1 1.24-3.24 4.34 4.34 0 0 1 .12-3.2s1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23a4.34 4.34 0 0 1 .12 3.2 4.66 4.66 0 0 1 1.24 3.24c0 4.64-2.8 5.65-5.48 5.96a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/samanpandey"
              target="_blank"
              rel="noreferrer"
              title="LeetCode"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M13.48 2.46a1.5 1.5 0 0 1 2.12 0l1.94 1.94a1.5 1.5 0 0 1 0 2.12l-6.72 6.72a4 4 0 0 0 5.66 5.66l2.7-2.7a1.5 1.5 0 1 1 2.12 2.12l-2.7 2.7a7 7 0 1 1-9.9-9.9l6.72-6.72a1.5 1.5 0 0 1 0-2.12Z" />
              </svg>
              <span className="sr-only">LeetCode</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/saman-pandey"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.47V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.54v6.2ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
