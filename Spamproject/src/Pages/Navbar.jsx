import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const linkBaseStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    transition: "all 0.3s ease",
  };

  const linkHoverStyle = {
    backgroundColor: "#374151",
    color: "#ffffff",
    transform: "scale(1.05)",
  };

  const logoutStyle = {
    color: "#ef4444",
    fontWeight: 600,
  };

  const StyledLink = ({ to, children }) => (
    <Link
      to={to}
      style={linkBaseStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkBaseStyle)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center font-bold text-xl">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-7 h-7 mr-2"
              aria-hidden="true"
            >
              <path
                d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z"
                fill="#2563eb"
              />
              <path
                d="M9.5 11.5l1.8 1.8 3.2-3.2"
                stroke="#1e3a8a"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Phistrap
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <StyledLink to="/home">Home</StyledLink>
            <StyledLink to="/education">Education</StyledLink>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
            <StyledLink to="/report">Report</StyledLink>
            <button
              onClick={() => navigate("/")}
              style={{ ...linkBaseStyle, ...logoutStyle, background: "none" }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  ...linkHoverStyle,
                  color: "#ef4444",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  ...linkBaseStyle,
                  ...logoutStyle,
                })
              }
            >
              Logout
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 py-3 space-y-2">
          <Link to="/home" className="block text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/education" className="block text-gray-300 hover:text-white">
            Education
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-white"
          >
            Dashboard
          </Link>
          <Link to="/report" className="block text-gray-300 hover:text-white">
            Report
          </Link>
          <button
            onClick={() => navigate("/")}
            className="block text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
