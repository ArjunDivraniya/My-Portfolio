// Homepage with section tracking for Google Analytics
import React from 'react';
import { useSectionTracking } from '../hooks/useAnalytics';
import Bg from './bg';
import Header from './header';
import Hero from './hero';
import Portfolio from './portfolio';
import Skills from './skills';
import Tools from './tool';
import CreativePassions from './CreativePassions';
import Footer from './footer';

// Wrapper component for each section with tracking
const TrackedSection = ({ sectionName, children, id }) => {
  const sectionRef = useSectionTracking(sectionName, 0.3);
  
  return (
    <section ref={sectionRef} id={id} className="responsive-section">
      {children}
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <Bg />
      <Header />
      
      <TrackedSection sectionName="Hero Section" id="home">
        <Hero />
      </TrackedSection>
      
      <TrackedSection sectionName="Portfolio Section" id="portfolio">
        <Portfolio />
      </TrackedSection>
      
      <TrackedSection sectionName="Skills Section" id="skills">
        <Skills />
      </TrackedSection>
      
      <TrackedSection sectionName="Tools Section" id="tools">
        <Tools />
      </TrackedSection>
      
      <TrackedSection sectionName="Creative Passions Section" id="creative">
        <CreativePassions />
      </TrackedSection>
      
      <Footer />
    </>
  );
};

export default HomePage;
