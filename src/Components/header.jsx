// File: src/Components/header.jsx

import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "../index.css";

const Header = () => {
  const [showResume, setShowResume] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) => 
    `hover:text-yellow-400 transition-colors duration-300 ${isActive ? "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1" : ""}`;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed w-full bg-gradient-to-r from-gray-900 to-black shadow-lg py-4 z-50 border-b border-gray-800"
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png"
              alt="Logo"
              className="h-12 w-12 hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white text-base font-medium">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            
            {/* Scroll Links */}
            <button onClick={() => handleScroll("skills")} className="hover:text-yellow-400 transition-colors duration-300">Skills</button>
            <button onClick={() => handleScroll("projects")} className="hover:text-yellow-400 transition-colors duration-300">Projects</button>
            
            {/* New Routes */}
            <NavLink to="/education" className={navLinkClass}>Education</NavLink>
            <NavLink to="/experience" className={navLinkClass}>Experience</NavLink>
            <NavLink to="/achievements" className={navLinkClass}>Achievements</NavLink>
            
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-yellow-400 text-3xl cursor-pointer hover:rotate-90 transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="motion-div absolute top-20 right-4 w-64 bg-gray-900 border border-gray-700 text-white p-6 rounded-2xl shadow-2xl z-50 flex flex-col space-y-4"
            >
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
              <button onClick={() => handleScroll("skills")} className="text-left">Skills</button>
              <button onClick={() => handleScroll("projects")} className="text-left">Projects</button>
              
              {/* Mobile Links for New Routes */}
              <NavLink to="/education" onClick={() => setIsMenuOpen(false)} className="text-purple-400 font-semibold">Education 📚</NavLink>
              <NavLink to="/experience" onClick={() => setIsMenuOpen(false)} className="text-yellow-400 font-semibold">Experience 💼</NavLink>
              <NavLink to="/achievements" onClick={() => setIsMenuOpen(false)} className="text-yellow-400 font-semibold">Achievements 🏆</NavLink>
              
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>

              <button
                onClick={() => {
                  setShowResume(true);
                  setIsMenuOpen(false);
                }}
                className="resume-btn mt-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                See Resume
              </button>
            </motion.div>
          )}

          {/* Resume Button (Desktop) */}
          <button
            onClick={() => setShowResume(true)}
            className="hidden md:block bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-xl shadow-md font-bold transition-all duration-300 hover:scale-105"
          >
            See Resume
          </button>
        </div>
      </motion.header>

      {/* Resume Modal */}
      {showResume && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center p-6 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowResume(false)}
        >
          <div className="bg-gray-900 p-2 rounded-xl shadow-2xl max-w-4xl w-full h-[85vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-700 mb-2">
                <h3 className="text-white text-xl font-bold">My Resume</h3>
                <div className="flex gap-3">
                  <a
                    href="https://drive.google.com/file/d/1AKFq7YrGTmmMuJyg-rJdAW_SNmkA8dD-/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in Drive
                  </a>
                  <button
                    className="text-gray-400 hover:text-red-500 text-3xl transition-colors"
                    onClick={() => setShowResume(false)}
                  >
                    &times;
                  </button>
                </div>
            </div>
            <iframe
              src="https://drive.google.com/file/d/1AKFq7YrGTmmMuJyg-rJdAW_SNmkA8dD-/preview" 
              className="w-full h-full rounded-md bg-white"
              title="Arjun Divraniya Resume"
              allow="autoplay"
            ></iframe>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;