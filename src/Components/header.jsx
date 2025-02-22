import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import "../index.css";

const Header = () => {
  const [showResume, setShowResume] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle smooth scroll
  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true }); // Redirect to home first
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 500); // Delay for React Router navigation
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed w-full bg-black shadow-md py-4 z-50"
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png" 
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
          </div>

          {/* Center - Navigation */}
          <nav>
            <ul className="flex space-x-9 text-white">
              <li>
                <NavLink to="/" className="text-white hover:text-yellow-400">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-white hover:text-yellow-400">About</NavLink>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("skills")}
                  className="text-white hover:text-yellow-400"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("projects")}
                  className="text-white hover:text-yellow-400"
                >
                  Projects
                </button>
              </li>
              <li>
              <NavLink to="/photogtaphy" className="text-white hover:text-yellow-400">Photograohy & Editing</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-white hover:text-yellow-400">Contact</NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Side - Resume Button */}
          <button
            onClick={() => setShowResume(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition duration-300"
          >
            See Resume
          </button>
        </div>
      </motion.header>

      {/* Resume Modal */}
      {showResume && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center p-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              onClick={() => setShowResume(false)}
            >
              ✖
            </button>
            <iframe
              src="/resume.pdf"
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
