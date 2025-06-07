import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import irisBackground from "./assets/iris-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semi-bold
import "@fontsource/poppins/700.css"; // Bold

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col relative bg-black font-poppins"
      style={{
        backgroundImage: `url(${irisBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Centered Navbar with adjusted spacing */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 z-10 font-poppins">
        {/* Logo Section - Centered */}
        <div className="flex items-center gap-2">
          <span className="text-white text-lg sm:text-xl flex items-center gap-2 font-medium">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 sm:w-5 sm:h-5"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            irisBank
          </span>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links - Hidden on Mobile, visible on Medium screens and up */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition text-sm font-normal"
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Service
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition text-sm font-normal"
          >
            Contact us
          </Link>
        </div>

        {/* Auth Buttons - Updated with navigation */}
        <div className="hidden md:flex items-center bg-white rounded-full">
          <Button
            variant="ghost"
            className="text-black hover:text-gray-700 px-4 py-2 text-sm rounded-l-full font-medium"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
          <div className="w-px h-5 bg-gray-200" />
          <Button
            variant="ghost"
            className="text-black hover:text-gray-700 px-4 py-2 text-sm rounded-r-full"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm absolute top-0 left-0 w-full z-20 flex flex-col items-center py-8">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-gray-400 hover:text-white transition text-base py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Service
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-200 transition text-base font-normal py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact us
          </Link>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 w-48"
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              Sign in
            </Button>
            <Button
              variant="outline"
              className="bg-black border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-black w-48"
              onClick={() => {
                navigate("/signup");
                setIsMobileMenuOpen(false);
              }}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-300 tracking-widest mb-2 font-medium">
            FOR THE NEXT CENTURY
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            The Future of <br className="sm:hidden"/> Secure Transactions
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-8">
            Experience seamless, secure, and innovative financial solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-100">
              Get yours now
            </Button>
            <Button
              variant="outline"
              className="bg-black border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-black"
              onClick={() => navigate("/how-it-works")}
            >
              How it works
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-2 w-full text-center text-gray-400 text-xs sm:text-sm z-10 px-4">
        © 2025 irisBank. All rights reserved.
      </footer>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black opacity-70 pointer-events-none z-0"></div>
    </div>
  );
}
