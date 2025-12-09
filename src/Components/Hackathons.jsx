// File: src/Components/Hackathons.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaAward } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const hackathonData = [
  {
    name: "Smart India Hackathon 2024 (Internal)",
    award: "First Place Winner 🏆",
    project: "AI-Powered Attendance System",
    role: "Full Stack Lead: Built the Next.js frontend and integrated face recognition APIs.",
    duration: "36 Hours",
    tech: ["Next.js", "Express", "OpenCV"],
    link: "#" // Replace with actual project link
  },
  {
    name: "ODOOxSPIT Hackathon",
    award: "Top 10 Finalist",
    project: "Decentralized Voting Platform",
    role: "Blockchain Developer: Implemented smart contracts and managed deployment on Polygon.",
    duration: "24 Hours",
    tech: ["Solidity", "React", "Truffle"],
    link: "#" // Replace with actual project link
  },
  {
    name: "College Codefest 2023",
    award: "Most Innovative Solution",
    project: "Gamified Learning Platform",
    role: "UI/UX Designer & Frontend: Designed user flow and implemented interactive components with Framer Motion.",
    duration: "18 Hours",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#" // Replace with actual project link
  }
];

const HackathonCard = ({ data, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: delay } },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-gray-800 p-6 rounded-xl shadow-xl border-b-4 border-yellow-500 transition-all duration-300 hover:shadow-yellow-500/50 flex flex-col h-full"
    >
      <h3 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center">
        <FaAward className="mr-3" /> {data.name}
      </h3>
      <p className="text-lg font-semibold text-white mb-3">{data.award}</p>
      
      <div className="mt-3 text-gray-300 space-y-2 flex-grow">
        <p><strong>Project:</strong> {data.project}</p>
        <p><strong>My Role:</strong> {data.role}</p>
        <p><strong>Duration:</strong> {data.duration}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.tech.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-yellow-900/50 text-yellow-300 text-xs font-medium rounded-full">
            {t}
          </span>
        ))}
      </div>

      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 self-start text-yellow-400 font-semibold hover:text-white transition-colors duration-300 flex items-center"
      >
        View Project <FaCode className="ml-2" />
      </a>
    </motion.div>
  );
};

const Hackathons = () => {
  return (
    <section id="hackathons" className="min-h-screen py-20 px-4 sm:px-8 bg-black text-white flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Hackathons & High-Pressure Wins ⚡
      </motion.h2>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        {hackathonData.map((data, index) => (
          <HackathonCard key={index} data={data} delay={index * 0.2} />
        ))}
      </div>

      <motion.p
        className="mt-16 text-center text-lg max-w-3xl text-gray-400"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        These events prove my ability to collaborate, innovate, and deliver high-quality solutions rapidly, turning ideas into functional products under tight deadlines.
      </motion.p>
    </section>
  );
};

export default Hackathons;
