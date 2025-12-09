// File: src/Components/EducationRoadmap.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const educationData = [
  {
    year: "2021 - 2022",
    title: "10th Standard",
    institute: "Alpha Vidhya Sankul, Junagadh",
    description: "Completed SSC with a strong foundation in Science & Mathematics.",
    score: "92%",
    location: "Junagadh, Gujarat",
    icon: FaSchool
  },
  {
    year: "2023 - 2024",
    title: "12th Standard (PCM)",
    institute: "Alpha Vidhya Sankul, Junagadh",
    description: "Completed HSC with focus on Physics, Chemistry & Maths.",
    score: "89%",
    location: "Junagadh, Gujarat",
    icon: FaSchool
  },
  {
    year: "2024 - Present",
    title: "B.Tech in Computer Science & Engineering",
    institute: "Rai University, Ahmedabad",
    description: "Pursuing specialization in Full Stack Development & UI.",
    score: "Currently Studying",
    location: "Ahmedabad, Gujarat",
    icon: FaGraduationCap
  }
];

// Helper component for each point on the timeline
const TimelineNode = ({ data, index }) => {
  const { icon: Icon, year, title, institute, description, score, location } = data;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 }); // Trigger animation when 50% visible

  // Animate content box based on its position (left or right)
  const itemVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <motion.div
      className={`relative flex items-start w-full mb-16 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
    >
      {/* Connector (Dot) - Pops into view */}
      <motion.div 
        className={`absolute top-0 w-8 h-8 rounded-full z-10 flex items-center justify-center 
                   ${index % 2 === 0 ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} 
                   bg-yellow-400 border-4 border-black`}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1.2 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Icon className="text-black text-lg" />
      </motion.div>

      {/* Content Box */}
      <motion.div
        ref={ref}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`bg-gray-800 p-6 rounded-lg shadow-2xl w-full lg:w-5/12 border-l-4 border-yellow-500`}
      >
        <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-1">{year}</h3>
        <h4 className="text-base sm:text-lg font-semibold text-white">{title}</h4>
        <p className="text-gray-300 italic">{institute}</p>
        <p className="text-gray-400 text-sm mt-2">{description}</p>
        <p className="text-gray-400 text-xs mt-1">Score: {score}</p>
        <p className="text-gray-400 text-xs mt-1 flex items-center">
            <FaMapMarkerAlt className='mr-1 text-xs' /> {location}
        </p>
      </motion.div>
    </motion.div>
  );
};


const EducationRoadmap = () => {
  const ref = useRef(null);
  // Track scroll progress within the EducationRoadmap section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"] // Animation starts when section top is at center, ends when section bottom is at page bottom
  });

  // Scale the yellow line based on scroll progress (0 to 1)
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education-roadmap" className="py-20 px-4 sm:px-8 bg-black text-white flex flex-col items-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Education Journey Roadmap 🗺️
      </motion.h2>

      <div ref={ref} className="container mx-auto max-w-4xl relative">
        {/* The Grey Backdrop Line (The full path) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 origin-top z-0 -translate-x-1/2"></div>
        
        {/* The Animated Line (The Roadmap) */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 origin-top z-0 -translate-x-1/2"
        ></motion.div>
        
        {/* Timeline Nodes */}
        <div className="flex flex-col items-center w-full">
            {educationData.map((edu, index) => (
                <TimelineNode key={index} data={edu} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EducationRoadmap;
