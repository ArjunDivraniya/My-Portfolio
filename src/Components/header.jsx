import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaTools, FaProjectDiagram, FaCamera, FaEnvelope, FaBars } from "react-icons/fa";
import { Link } from "react-scroll";
import "../index.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (section) => {
    setShowMenu(false); // Hide menu when clicking a section
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
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
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png"
              alt="Logo"
              className="h-12 w-12 rounded-full"
            />
          </div>

          <div className="lg:hidden">
            <FaBars
              className="text-yellow-400 text-3xl cursor-pointer transition-transform transform hover:rotate-90"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>

          <nav className={`absolute top-16 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md p-6 rounded-lg transition-all duration-300 lg:relative lg:top-0 lg:bg-transparent lg:p-0 lg:block ${showMenu ? "block" : "hidden"}`}>
            <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-9 text-white">
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <NavLink to="/" className="flex items-center text-white hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                  <FaHome className="mr-2" /> Home
                </NavLink>
              </li>
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <NavLink to="/about" className="flex items-center text-white hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                  <FaUser className="mr-2" /> About
                </NavLink>
              </li>
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <button
                  onClick={() => handleScroll("skills")}
                  className="flex items-center text-white hover:text-yellow-400"
                >
                  <FaTools className="mr-2" /> Skills
                </button>
              </li>
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <button
                  onClick={() => handleScroll("projects")}
                  className="flex items-center text-white hover:text-yellow-400"
                >
                  <FaProjectDiagram className="mr-2" /> Projects
                </button>
              </li>
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <NavLink to="/photography" className="flex items-center text-white hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                  <FaCamera className="mr-2" /> Photography & Editing
                </NavLink>
              </li>
              <li className="py-2 border-b border-gray-700 lg:border-0">
                <NavLink to="/contact" className="flex items-center text-white hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                  <FaEnvelope className="mr-2" /> Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setShowResume(true)}
            className="hidden lg:block bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition duration-300"
          >
            See Resume
          </button>
        </div>
      </motion.header>

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
