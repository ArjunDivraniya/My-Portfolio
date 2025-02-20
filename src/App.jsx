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
import "./index.css"; 

function App() {
  return (
    <>
      <Pre />
      
      <Bg />
      <Routes>
        <Route path="/" element={
          <>
          <Header />
            <Hero />
            <Portfolio />
            <Skills />
            <Tools />
            <Photography />
            <Footer />
          </>
        } />
        <Route path="/about" element={<><Header /><AboutMe /></>} />
        <Route path="/contact" element={<><Header /><ContactMe /></>} />
        <Route path="*" element={<Navigate to="/" />} /> {/* ✅ Redirects unknown routes */}
      </Routes>
    </>
  );
}

export default App;
