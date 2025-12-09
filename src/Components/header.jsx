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

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed w-full bg-gradient-to-r from-gray-900 to-black shadow-lg py-4 z-50"
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png"
              alt="Logo"
              className="h-12 w-12 "
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-9 text-white">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <button onClick={() => handleScroll("skills")}>Skills</button>
            <button onClick={() => handleScroll("projects")}>Projects</button>
            <NavLink to="/certificates">Certificates</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden text-yellow-400 text-3xl cursor-pointer"
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
    className="motion-div absolute top-16 right-0 w-2/3 bg-gray-800 text-white p-6 rounded-lg shadow-lg"
  >
    <ul className="flex flex-col space-y-4">
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
      <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
      <button onClick={() => handleScroll("skills")}>Skills</button>
      <button onClick={() => handleScroll("projects")}>Projects</button>
      <NavLink to="/certificates" onClick={() => setIsMenuOpen(false)}>Certificates</NavLink>
      <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>

      {/* Show Resume Button for Mobile Menu */}
      <button
        onClick={() => {
          setShowResume(true);
          setIsMenuOpen(false); // Close menu when clicked
        }}
        className="resume-btn w-full text-center mt-4"
      >
        See Resume
      </button>
    </ul>
  </motion.div>
)}

          {/* Resume Button */}
          <button
            onClick={() => setShowResume(true)}
            className="hidden md:block bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-xl shadow-md font-bold transition-all duration-300"
          >
            See Resume
          </button>
        </div>
      </motion.header>

      {/* Resume Modal */}
      {showResume && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center p-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowResume(false)}
            >
              ✖
            </button>
            <iframe
              src="https://res.cloudinary.com/dncosrakg/image/upload/v1739992920/nyepvgtg2xmlcddxhkzb.jpg"
              className="w-full h-[80vh] rounded-md"
              title="Arjun Divraniya Resume"
            ></iframe>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;