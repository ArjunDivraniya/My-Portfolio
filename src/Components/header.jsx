// File: src/Components/header.jsx

import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "../index.css";

const Header = () => {
  const [showResume, setShowResume] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSectionWithOffset = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navbar = document.querySelector('header');
    const navbarHeight = navbar?.offsetHeight || 88;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetTop = targetTop - navbarHeight - 8;

    window.scrollTo({
      top: Math.max(offsetTop, 0),
      behavior: 'smooth',
    });
  };

  const handleScroll = (section) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        scrollToSectionWithOffset(section);
      }, 500);
    } else {
      scrollToSectionWithOffset(section);
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
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
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

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex flex-col items-center justify-center p-8 md:hidden"
              >
                {/* Header inside overlay */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
                  <img
                    src="https://res.cloudinary.com/dncosrakg/image/upload/v1739989872/uag9e6plq4hm1v1ajl4p.png"
                    alt="Logo"
                    className="h-12 w-12"
                    onClick={() => { setIsMenuOpen(false); navigate('/'); }}
                  />
                  <button 
                    className="text-yellow-400 text-4xl hover:rotate-90 transition-transform duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                <nav className="flex flex-col items-center space-y-1 w-full max-w-sm mt-12">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' },
                    { name: 'Skills', id: 'skills' },
                    { name: 'Projects', id: 'projects' },
                    { name: 'Education 📚', path: '/education', color: 'text-purple-400' },
                    { name: 'Experience 💼', path: '/experience', color: 'text-yellow-400' },
                    { name: 'Achievements 🏆', path: '/achievements', color: 'text-yellow-400' },
                    { name: 'Contact', path: '/contact' }
                  ].map((item, index) => (
                    <div key={index} className="w-full">
                      {item.path ? (
                        <NavLink 
                          to={item.path} 
                          onClick={() => setIsMenuOpen(false)} 
                          className={`block py-3.5 text-lg sm:text-xl text-center border-b border-gray-800/50 hover:text-yellow-400 transition-colors ${item.color || 'text-white'}`}
                        >
                          {item.name}
                        </NavLink>
                      ) : (
                        <button 
                          onClick={() => handleScroll(item.id)} 
                          className="w-full py-3.5 text-lg sm:text-xl text-center border-b border-gray-800/50 hover:text-yellow-400 transition-colors text-white"
                        >
                          {item.name}
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setShowResume(true);
                      setIsMenuOpen(false);
                    }}
                    className="resume-btn mt-8 bg-yellow-500 text-black w-full py-4 rounded-2xl font-bold text-xl shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    See Resume
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

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