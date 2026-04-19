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
import SEO from "./Components/SEO";
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
              {/* Home Page (Single Page Scroll Layout) */}
              <Route path="/" element={
                <>
                  <SEO title="Home" description="Explore Arjun Divraniya's portfolio - Full Stack Developer & Competitive Programmer." />
                  <HomePage />
                </>
              } />

              {/* Dedicated Pages */}
              <Route path="/about" element={
                <>
                  <SEO title="About Me" description="Learn more about Arjun Divraniya's background, skills, and passion for coding." />
                  <Bg /><Header /><AboutMe />
                </>
              } />
              
              {/* Achievements Page */}
              <Route path="/achievements" element={
                <>
                  <SEO title="Achievements" description="Showcasing the technical achievements and milestones of Arjun Divraniya." />
                  <Bg /><Header /><Achievements /><Footer />
                </>
              } />
              
              {/* Education Journey */}
              <Route path="/education" element={
                <>
                  <SEO title="Education" description="The academic journey and coding certifications of Arjun Divraniya." />
                  <Bg /><Header /><EducationRoadmap /><Footer />
                </>
              } />
              
              {/* Experience & Projects */}
              <Route path="/experience" element={
                <>
                  <SEO title="Experience" description="A professional overview of Arjun Divraniya's work experience and projects." />
                  <Bg /><Header /><Experience /><Footer />
                </>
              } />
              
              {/* LeetCode Profile */}
              <Route path="/leetcode" element={
                <>
                  <SEO title="LeetCode Stats" description="Competitive programming profile and statistics of Arjun Divraniya." />
                  <Bg /><Header /><LeetCodeProfile username="Arjun_divraniya" /><Footer />
                </>
              } />
              
              <Route path="/contact" element={
                <>
                  <SEO title="Contact" description="Get in touch with Arjun Divraniya for professional inquiries or collaborations." />
                  <Bg /><Header /><ContactMe />
                </>
              } />
              
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