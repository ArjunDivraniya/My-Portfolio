// File: src/Components/header.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTerminal, FaTimes } from 'react-icons/fa';
import logoImage from '../assets/Profile/Arjun.webp';
import '../index.css';

const navItems = [
  {
    name: 'Home',
    href: '#home',
    ariaLabel: 'Arjun Divraniya Home Dashboard',
    sectionId: 'home',
    route: '/',
  },
  {
    name: 'Project',
    href: '#project',
    ariaLabel: 'Arjun Divraniya Software Engineering Projects',
    sectionId: 'project',
    route: '/',
  },
  {
    name: 'About',
    href: '#about',
    ariaLabel: 'About Arjun Divraniya Full Stack Developer',
    sectionId: 'about',
    route: '/about',
  },
  {
    name: 'Achivment',
    href: '#achivment',
    ariaLabel: 'Arjun Divraniya Hackathon Winners and Achievements',
    sectionId: 'achivment',
    route: '/achievements',
  },
  {
    name: 'Contect',
    href: '#contect',
    ariaLabel: 'Contact Arjun Divraniya for Engineering Roles',
    sectionId: 'contect',
    route: '/contact',
  },
];

const SketchBorder = ({ className = '', strokeWidth = 1.2 }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1000 180"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
  >
    <defs>
      <filter id="sketch-rough-border">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" />
      </filter>
    </defs>
    <rect
      x="4"
      y="4"
      width="992"
      height="172"
      rx="26"
      ry="18"
      fill="none"
      
      strokeWidth={strokeWidth}
      strokeDasharray="14 6 3 7 2 8"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#sketch-rough-border)"
    />
    <rect
      x="7"
      y="7"
      width="986"
      height="166"
      rx="23"
      ry="16"
      fill="none"
      
      strokeWidth="0.9"
      strokeDasharray="8 10 4 12"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#sketch-rough-border)"
    />
  </svg>
);

const Header = () => {
  const [showResume, setShowResume] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const scrollToRouteSection = (item) => {
    const targetRoute = item.route || '/';
    const targetSection = item.sectionId;

    if (targetSection && document.getElementById(targetSection) && location.pathname === targetRoute) {
      scrollToSectionWithOffset(targetSection);
      return;
    }

    navigate(targetRoute, { replace: targetRoute === '/' && location.pathname !== '/' });

    if (targetSection) {
      setTimeout(() => {
        scrollToSectionWithOffset(targetSection);
      }, 350);
    }
  };

  const handleNavClick = (event, item) => {
    event.preventDefault();
    setIsMenuOpen(false);
    scrollToRouteSection(item);
  };

  const navLinkClass = 'relative inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold tracking-wide text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/80';

  const resumeButtonClasses = 'rounded-[20px_12px_18px_15px/15px_22px_12px_20px] bg-yellow-400 px-5 py-2.5 font-bold text-black transition duration-300 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/80';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4"
      >
        <motion.nav
          className="relative mx-auto w-full max-w-[96vw] overflow-hidden rounded-[24px_14px_22px_16px/18px_26px_14px_22px] border border-white/10 bg-transparent px-4 py-3.5 shadow-[0_22px_60px_-36px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-6 md:max-w-7xl"
          style={{ boxShadow: '0 22px 60px -36px rgba(0,0,0,0.5)' }}
        >
          <SketchBorder className="opacity-100" />

          <nav aria-label="Primary" className="hidden items-center md:grid md:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] md:gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex w-fit items-center gap-3 justify-self-start rounded-full px-1 py-1 text-white transition hover:text-yellow-300"
              aria-label="Go to home"
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(250,204,21,0.08)]">
                <img src={logoImage} alt="Arjun Divraniya logo" className="h-full w-full object-cover" />
              </span>
              <span className="font-['Syne'] text-xl font-black tracking-[0.18em] text-white sm:text-2xl">
                ARJUN.
              </span>
            </button>

            <div className="justify-self-center">
              <ul className="relative flex items-center gap-1 rounded-full border border-white/5 bg-transparent px-2 py-2">
                {navItems.map((item, index) => (
                  <li key={item.name} className="relative">
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      onClick={(event) => handleNavClick(event, item)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={navLinkClass}
                    >
                      <span className="relative z-10">{item.name}</span>

                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.span
                            layoutId="navHover"
                            className="absolute inset-0 rounded-full bg-white/[0.08] backdrop-blur-md"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="justify-self-end">
              <div className="relative inline-block">
                <SketchBorder className="opacity-100" />
                <button
                  type="button"
                  onClick={() => setShowResume(true)}
                  className={`${resumeButtonClasses} relative z-10 border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_28px_-18px_rgba(250,204,21,0.35)]`}
                >
                  Resume
                </button>
              </div>
            </div>
          </nav>

          <nav aria-label="Primary mobile" className="flex items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 rounded-full px-1 py-1 text-white transition hover:text-yellow-300"
              aria-label="Go to home"
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(250,204,21,0.08)]">
                <img src={logoImage} alt="Arjun Divraniya logo" className="h-full w-full object-cover" />
              </span>
              <span className="font-['Syne'] text-xl font-black tracking-[0.18em] text-white sm:text-2xl">
                ARJUN.
              </span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 hover:text-yellow-300"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>

              <div className="relative inline-block">
                <SketchBorder className="opacity-100" />
                <button
                  type="button"
                  onClick={() => setShowResume(true)}
                  className={`${resumeButtonClasses} relative z-10 px-4 py-2 text-sm border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_28px_-18px_rgba(250,204,21,0.35)]`}
                >
                  Resume
                </button>
              </div>
            </div>
          </nav>
        </motion.nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mx-auto mt-3 w-full rounded-[20px_12px_18px_15px/15px_22px_12px_20px] border border-white/10 bg-black/85 p-4 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-label={item.ariaLabel}
                    onClick={(event) => handleNavClick(event, item)}
                    className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <span>{item.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {showResume && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowResume(false)}
        >
          <div className="relative flex h-[85vh] w-full max-w-4xl flex-col rounded-2xl bg-gray-900 p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between border-b border-gray-700 p-4">
              <h3 className="text-xl font-bold text-white">My Resume</h3>
              <div className="flex gap-3">
                <a
                  href="https://drive.google.com/file/d/1AKFq7YrGTmmMuJyg-rJdAW_SNmkA8dD-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Drive
                </a>
                <button
                  type="button"
                  className="text-3xl text-gray-400 transition-colors hover:text-red-500"
                  onClick={() => setShowResume(false)}
                >
                  &times;
                </button>
              </div>
            </div>
            <iframe
              src="https://drive.google.com/file/d/1AKFq7YrGTmmMuJyg-rJdAW_SNmkA8dD-/preview"
              className="h-full w-full rounded-md bg-white"
              title="Arjun Divraniya Resume"
              allow="autoplay"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
