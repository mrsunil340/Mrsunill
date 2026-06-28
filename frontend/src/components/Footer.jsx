import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold">
              Job <span className="text-[#F83002]">Portal</span>
            </h2>

            <p className="text-gray-600 mt-3 text-sm leading-6">
              Find your dream job and connect with top companies through our
              modern job portal platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/" className="hover:text-[#F83002] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="hover:text-[#F83002] transition">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link to="/profile" className="hover:text-[#F83002] transition">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Me */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="https://www.linkedin.com/in/sunil-kumar-51a142263/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F83002] transition"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/mrsunil340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F83002] transition"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="mailto:sunilaryan5386@gmail.com"
                  className="hover:text-[#F83002] transition"
                >
                  sunilaryan5386@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 mt-8 pt-5 text-center">
          <p className="text-sm text-gray-500">
          © 2026 Sunil Kumar | Job Portal | Built with React, Node.js, Express.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;