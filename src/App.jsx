// File: src/App.jsx (UPDATED)

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./Components/portfolio";
import Header from "./Components/header";
import Hero from "./Components/hero";
import Skills from "./Components/skills";
import Photography from "./Components/photography";
import Footer from "./Components/footer";
import Tools from "./Components/tool";
import Bg from "./Components/bg";
import Pre from "./Components/preloader";
import AboutMe from "./Components/aboutme";
import ContactMe from "./Components/contact";
import Ebg from "./Components/editingbg"
// IMPORT NEW SECTIONS
import CompetitiveCoding from "./Components/CompetitiveCoding";
import Hackathons from "./Components/Hackathons";
import Certifications from "./Components/Certifications";
import "./index.css"; 

function App() {
  return (
    <>
      <Pre />
      
     
      <Routes>
        <Route path="/" element={
          <>
           <Bg />
          <Header />
            <Hero />
            {/* NEW SECTIONS ADDED HERE */}
            <CompetitiveCoding /> 
            <Hackathons /> 
            <Certifications /> 
            {/* EXISTING SECTIONS */}
            <Portfolio />
            <Skills />
            <Tools />
            
            <Footer />
          </>
        } />
        <Route path="/about" element={<> <Bg /><Header /><AboutMe /></>} />
        <Route path="/photography" element={<><Ebg/><Header /><Photography /></>} />
        <Route path="/contact" element={<> <Bg /><Header /><ContactMe /></>} />
        <Route path="*" element={<Navigate to="/" />} /> {/* ✅ Redirects unknown routes */}
      </Routes>
    </>
  );
}

export default App;