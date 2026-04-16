// File: src/App.jsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/header";
import Bg from "./Components/bg";
import { motion, AnimatePresence } from "framer-motion";
import Pre from "./Components/preloader";
import VideoLoader from "./Components/VideoLoader";
import AboutMe from "./Components/aboutme";
import ContactMe from "./Components/contact";
import Footer from "./Components/footer";
// New Imports
import HomePage from "./Components/HomePage";
import Achievements from "./Components/Achievements"; 
import EducationRoadmap from "./Components/EducationRoadmap";
import LeetCodeProfile from "./Components/LeetCodeProfile";
import Experience from "./Components/Experience";
import ScrollToTop from "./Components/ScrollToTop";
import "./index.css"; 
// Google Analytics
import { usePageTracking, useScrollDepthTracking, useLinkTracking } from "./hooks/useAnalytics";

function App() {
  const [loading, setLoading] = React.useState(true);

  // Enable page tracking, scroll depth tracking, and link tracking
  usePageTracking();
  useScrollDepthTracking();
  useLinkTracking();

  React.useEffect(() => {
    // Matches the duration in VideoLoader.jsx (approx 3s) + fade out
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading ? (
          <VideoLoader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              {/* Home Page (Single Page Scroll Layout with Section Tracking) */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated Pages */}
              <Route path="/about" element={<> <Bg /><Header /><AboutMe /></>} />
              
              {/* NEW ROUTE: Achievements Page */}
              <Route path="/achievements" element={<> <Bg /><Header /><Achievements /><Footer /></>} />
              
              {/* NEW ROUTE: Education Journey */}
              <Route path="/education" element={<> <Bg /><Header /><EducationRoadmap /><Footer /></>} />
              
              {/* NEW ROUTE: Experience & Freelancing */}
              <Route path="/experience" element={<> <Bg /><Header /><Experience /><Footer /></>} />
              
              {/* NEW ROUTE: LeetCode Profile */}
              <Route path="/leetcode" element={<> <Bg /><Header /><LeetCodeProfile username="Arjun_divraniya" /><Footer /></>} />
              
              <Route path="/contact" element={<> <Bg /><Header /><ContactMe /></>} />
              
              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;