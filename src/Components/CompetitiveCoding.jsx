// File: src/Components/CompetitiveCoding.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTrophy, FaStar } from 'react-icons/fa';
import { GoGraph } from "react-icons/go";
import { useInView } from 'react-intersection-observer';

const codingData = [
  { platform: 'LeetCode', problems: 300, easy: 100, medium: 150, hard: 50, icon: FaCode, color: 'text-orange-500' },
  { platform: 'HackerRank', achievements: '5-Star C++ & Python', icon: FaTrophy, color: 'text-green-500' },
  { platform: 'GitHub', problems: '500+ Commits (2025)', icon: GoGraph, color: 'text-purple-500' },
];

const StatCard = ({ data, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay } },
  };

  const formatStat = (platform, problems) => {
    if (platform === 'LeetCode') {
      return (
        <div className="space-y-1">
          <p className="text-xl font-bold">Total: {problems}</p>
          <p className="text-sm text-green-400">Easy: {data.easy}</p>
          <p className="text-sm text-yellow-400">Medium: {data.medium}</p>
          <p className="text-sm text-red-400">Hard: {data.hard}</p>
        </div>
      );
    }
    return <p className="text-xl font-bold">{problems}</p>;
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-yellow-500 flex flex-col items-center text-center space-y-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-yellow-500/30"
    >
      <data.icon className={`text-5xl ${data.color}`} />
      <h3 className="text-2xl font-semibold text-white">{data.platform}</h3>
      <div className="text-gray-300">
        {formatStat(data.platform, data.problems || data.achievements)}
      </div>
    </motion.div>
  );
};

const CompetitiveCoding = () => {
  return (
    <section id="coding" className="min-h-screen py-20 px-4 sm:px-8 bg-black text-white flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Problem Solving & Competitive Edge 🧠
      </motion.h2>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        {codingData.map((data, index) => (
          <StatCard key={index} data={data} delay={index * 0.2} />
        ))}
      </div>

      <motion.p
        className="mt-16 text-center text-lg max-w-3xl text-gray-400"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        I believe that strong problem-solving skills are the foundation of great software engineering. My dedication to coding challenges ensures I approach every project with an algorithmic mindset.
      </motion.p>
    </section>
  );
};

export default CompetitiveCoding;