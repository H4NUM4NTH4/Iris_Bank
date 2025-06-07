// NavBar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ArrowLeftRight, FileText } from "lucide-react";
import "./Navbar.css";

function NavBar({ onTransferMoney, onViewStatements, onMobileMenuToggle }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Failed to sign out:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    }
  };

  return (
    <nav className="w-full bg-black flex items-center justify-between px-4 py-3 shadow z-50 md:px-8">
      {/* Left: Logo and Home */}
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-white text-base md:text-lg"
        >
          <span className="rounded-full bg-white/10 p-1">
            <svg width="20" height="20" fill="none" className="md:w-6 md:h-6">
              <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2" className="md:cx-12 md:cy-12 md:r-10" />
              <circle cx="10" cy="10" r="3" stroke="#fff" strokeWidth="2" className="md:cx-12 md:cy-12 md:r-4" />
            </svg>
          </span>
          irisBank
        </Link>
        <div className="hidden md:flex items-center gap-4 md:ml-4 md:gap-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-white text-sm"
                : "text-gray-400 hover:text-white transition text-sm"
            }
          >
            Home
          </NavLink>
          {/* Add other main navigation links here if needed */}
        </div>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
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

      {/* Right: Actions - Hidden on Mobile, visible on Medium screens and up */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onTransferMoney}
          className="rounded-full px-3 py-1.5 text-sm bg-white text-black font-medium hover:bg-gray-100 transition"
        >
          Transfer Money
        </button>
        <button
          onClick={onViewStatements}
          className="rounded-full px-3 py-1.5 text-sm bg-white text-black font-medium hover:bg-gray-100 transition"
        >
          View Statements
        </button>
        <Link
          to="/profile"
          className="rounded-full px-3 py-1.5 text-sm bg-white text-black font-medium hover:bg-gray-100 transition"
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className="rounded-full px-3 py-1.5 text-sm bg-white text-black font-medium hover:bg-gray-100 transition"
        >
          Settings
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="rounded-full px-3 py-1.5 text-sm bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm flex flex-col items-center py-4 space-y-3 shadow-lg">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-white text-base py-2"
                : "text-gray-400 hover:text-white transition text-base py-2"
            }
            onClick={toggleMobileMenu}
          >
            Home
          </NavLink>
          <button
            onClick={() => { onTransferMoney(); toggleMobileMenu(); }}
            className="w-11/12 rounded-full px-4 py-2 text-base bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            Transfer Money
          </button>
          <button
            onClick={() => { onViewStatements(); toggleMobileMenu(); }}
            className="w-11/12 rounded-full px-4 py-2 text-base bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            View Statements
          </button>
          <Link
            to="/profile"
            className="w-11/12 text-center rounded-full px-4 py-2 text-base bg-white text-black font-medium hover:bg-gray-100 transition"
            onClick={toggleMobileMenu}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="w-11/12 text-center rounded-full px-4 py-2 text-base bg-white text-black font-medium hover:bg-gray-100 transition"
            onClick={toggleMobileMenu}
          >
            Settings
          </Link>
          {isAuthenticated && (
            <button
              onClick={() => { handleSignOut(); toggleMobileMenu(); }}
              className="w-11/12 rounded-full px-4 py-2 text-base bg-white text-black font-medium hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
