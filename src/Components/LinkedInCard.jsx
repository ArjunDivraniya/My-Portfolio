import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, Users, Award, TrendingUp } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const LinkedInCard = ({ profileUrl = "https://www.linkedin.com/in/arjun-divraniya-/" }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // LinkedIn profile data - you can customize this with your actual data
  const linkedInData = {
    name: "Arjun Divraniya",
    headline: "Full Stack Developer | MERN Stack | React.js | Node.js",
    connections: "500+",
    profileUrl: profileUrl,
    skills: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "JavaScript",
      "Full Stack Development"
    ],
    experience: [
      {
        title: "Full Stack Developer",
        company: "Freelance",
        duration: "2024 - Present",
        icon: "💼"
      },
      {
        title: "MERN Stack Developer",
        company: "Various Projects",
        duration: "2023 - 2024",
        icon: "🚀"
      }
    ],
    highlights: [
      { label: "Connections", value: "500+", icon: Users },
      { label: "Projects", value: "20+", icon: Briefcase },
      { label: "Skills", value: "15+", icon: Award },
    ]
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 25px 50px rgba(10, 102, 194, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={itemVariants}
      whileHover="hover"
      className="w-full"
    >
      <motion.div
        variants={cardHoverVariants}
        className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
        </div>

        {/* Header with LinkedIn Logo */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-600 p-3 rounded-lg"
            >
              <FaLinkedin className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">{linkedInData.name}</h3>
              <p className="text-gray-400 text-sm">LinkedIn Profile</p>
            </div>
          </div>
          <motion.a
            href={linkedInData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Headline */}
        <div className="relative z-10 mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            {linkedInData.headline}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
          {linkedInData.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg p-3 text-center"
            >
              <highlight.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{highlight.value}</p>
              <p className="text-xs text-gray-400">{highlight.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="relative z-10 mb-6">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            Experience
          </h4>
          <div className="space-y-3">
            {linkedInData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-gray-700/30"
              >
                <span className="text-2xl">{exp.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{exp.title}</p>
                  <p className="text-gray-400 text-xs">{exp.company}</p>
                  <p className="text-gray-500 text-xs mt-1">{exp.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="relative z-10">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-400" />
            Top Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {linkedInData.skills.slice(0, 6).map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-500/50 rounded-full text-blue-300 text-xs font-medium hover:border-blue-400 transition-all"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* View Profile Button */}
        <motion.a
          href={linkedInData.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition-all text-sm shadow-lg hover:shadow-blue-500/50"
        >
          <FaLinkedin className="w-4 h-4" />
          Connect on LinkedIn
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default LinkedInCard;
