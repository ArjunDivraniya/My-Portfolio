// File: src/Components/aboutme.jsx - Professional & Creative Journey

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaCamera, 
  FaCode, 
  FaAtom,
  FaCalculator,
  FaGraduationCap, 
  FaGithub, 
  FaLightbulb, 
  FaPalette,
  FaLinkedin,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

// Journey data following the roadmap pattern
const journeyData = [
  {
    period: "2022 & Before",
    title: "Creative Spark",
    tagline: "Wildlife Lens • Editing • Logo Design",
    phase: "Creative Foundation",
    description: "Completed 10th grade and immersed myself in wildlife photography, cinematic video editing, and logo design. A deep passion for exploring the wild shaped my creative instincts.",
    keyPoints: [
      "Completed 10th grade with a creative focus",
      "Wildlife photography across natural terrains",
      "Video editing and visual storytelling",
      "Logo design and branding fundamentals"
    ],
    skills: ["Wildlife Photography", "Video Editing", "Logo Design", "Adobe Photoshop", "Canva", "Storytelling"],
    icon: FaCamera,
    color: "from-yellow-500 to-orange-500",
    side: "left"
  },
  {
    period: "2024",
    title: "Logical Shift",
    tagline: "Math • Puzzles • CS Choice",
    phase: "Logical Transition",
    description: "Completed 12th grade and developed a deep obsession with Mathematics and logical puzzles. This was the turning point that led me to choose Computer Science.",
    keyPoints: [
      "Completed 12th grade",
      "Intense focus on Mathematics and logic",
      "Built a puzzle-driven problem-solving mindset",
      "Chose Computer Science as my career path"
    ],
    skills: ["Mathematics", "Logical Puzzles", "Problem Solving", "Algorithmic Thinking"],
    icon: FaCalculator,
    color: "from-purple-500 to-pink-500",
    side: "right"
  },
  {
    period: "2024-2025",
    title: "The Foundation",
    tagline: "B.Tech Start • CS Architecture",
    phase: "Engineering Foundations",
    description: "Started B.Tech and mastered the CS fundamentals, then progressed into advanced architecture and system thinking — the real start of my engineering journey.",
    keyPoints: [
      "Started B.Tech in Computer Science",
      "Mastered core CS fundamentals",
      "Moved into advanced CS architecture",
      "Laid the engineering foundation"
    ],
    skills: ["DSA", "OOP", "DBMS", "Computer Networks", "System Design Basics"],
    icon: FaCode,
    color: "from-yellow-500 to-orange-500",
    side: "left"
  },
  {
    period: "2026 & Present",
    title: "The Architect",
    tagline: "Deep-Tech • Full-Stack Scale",
    phase: "Systems & Scalability",
    description: "Currently in 2nd Year, 2nd Semester, exploring deep-tech, full-stack scalability, and real-world systems with an elite 9.74 CGPA.",
    keyPoints: [
      "2nd Year, 2nd Semester",
      "Exploring deep-tech and system design",
      "Building full-stack scalable systems",
      "Elite academic performance (9.74 CGPA)"
    ],
    skills: ["Full-Stack", "Scalability", "Cloud", "Microservices", "System Design"],
    icon: FaAtom,
    color: "from-yellow-400 to-purple-500",
    side: "right",
    cgpa: "9.74"
  }
];

// Quick Stats data
const quickStats = [
  {
    id: "cgpa-badge",
    icon: FaGraduationCap,
    title: "Academic Excellence",
    value: "9.74",
    label: "CGPA",
    color: "from-yellow-500 to-orange-500",
    description: "B.Tech CSE at Rai University"
  },
  {
    icon: FaGithub,
    title: "Coding Activity",
    value: "500+",
    label: "Commits (2025)",
    color: "from-purple-500 to-pink-500",
    description: "68+ Active Repositories"
  },
  {
    icon: FaCamera,
    title: "Creative Experience",
    value: "4+",
    label: "Years",
    color: "from-blue-500 to-cyan-500",
    description: "Editing & Photography"
  },
  {
    icon: SiLeetcode,
    title: "Problem Solving",
    value: "200+",
    label: "Problems",
    color: "from-green-500 to-teal-500",
    description: "Top 10% LeetCode (721K+)"
  }
];

const socialLinks = [
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/divraniya-arjun", color: "text-blue-500" },
  { icon: FaGithub, link: "https://github.com/ArjunDivraniya", color: "text-gray-300" },
  { icon: FaInstagram, link: "https://www.instagram.com/arjun__divraniya__/", color: "text-pink-500" },
  { icon: FaTwitter, link: "https://x.com/DivraniyaArjun", color: "text-blue-400" }
];

// Quick Stats Card Component
const StatCard = ({ data, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      id={data.id}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${data.color} shadow-2xl border border-gray-700 overflow-hidden`}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 0 40px rgba(234, 179, 8, 0.4)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10">
        <data.icon className="text-5xl text-yellow-400 mb-4" />
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
          {data.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-1">
          <motion.span
            className="text-4xl font-extrabold text-white"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: delay + 0.3, type: "spring" }}
          >
            {data.value}
          </motion.span>
          <span className="text-xl text-purple-300 font-semibold">{data.label}</span>
        </div>
        <p className="text-xs text-gray-400">{data.description}</p>
      </div>
    </motion.div>
  );
};

// Technology Badge Component
const TechBadge = ({ tech }) => {
  return (
    <motion.span
      className="inline-block px-3 py-1 mx-1 mb-2 text-sm font-semibold rounded-full 
                 bg-gradient-to-r from-purple-600 to-purple-800 text-yellow-300 
                 border border-purple-500 cursor-pointer"
      whileHover={{
        scale: 1.15,
        backgroundColor: "#c770f0",
        color: "#ffffff",
        boxShadow: "0 0 20px #c770f0",
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {tech}
    </motion.span>
  );
};

// Timeline Line Component
const TimelineLine = ({ scaleY }) => {
  return (
    <svg className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 z-0" 
         style={{ height: '100%' }} preserveAspectRatio="none">
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#6b7280" strokeWidth="2" opacity="0.3" />
      <motion.line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#eab308"
        strokeWidth="3"
        style={{ scaleY, originY: 0 }}
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

// Milestone Node Component
const MilestoneNode = ({ index, data, total }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = data.side === "left";
  const top = total > 1 ? (index / (total - 1)) * 100 : 0;

  return (
    <motion.div
      ref={ref}
      className={`absolute ${isLeft ? 'left-1/2' : 'left-1/2'} transform -translate-x-1/2`}
      style={{ top: `${top}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${data.color} 
                   border-4 border-black shadow-2xl flex items-center justify-center z-10`}
        animate={inView ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: inView ? Infinity : 0 }}
        whileHover={{ scale: 1.3, rotate: 360 }}
      >
        <data.icon className="text-2xl text-white" />
      </motion.div>
    </motion.div>
  );
};

// Journey Phase Card Component
const JourneyPhaseCard = ({ data, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = data.side === "left";

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100, scale: 0.8, rotateY: isLeft ? -35 : 35 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, delay: index * 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -20 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative flex w-full mb-16 md:mb-32 justify-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={`w-full lg:w-5/12 p-6 rounded-xl backdrop-blur-md 
                   bg-black/40 border border-yellow-500/30 shadow-2xl 
                   hover:border-yellow-400 hover:shadow-yellow-500/20 
                   transition-all duration-300`}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{
          borderColor: "#facc15",
          boxShadow: "0 0 30px rgba(234, 179, 8, 0.35)"
        }}
      >
        <motion.div
          className={`inline-block mb-3 px-4 py-1 rounded-full 
                   bg-gradient-to-r ${data.color} 
                   text-black font-bold text-sm border border-yellow-300`}
          whileHover={{ scale: 1.05 }}
        >
          {data.period}
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-yellow-400 mb-1"
          variants={itemVariants}
        >
          {data.title}
        </motion.h3>

        <motion.p
          className="text-purple-300 text-sm font-semibold mb-3 italic"
          variants={itemVariants}
        >
          {data.tagline}
        </motion.p>

        <motion.p
          className="text-gray-400 text-xs mb-4 uppercase tracking-wider"
          variants={itemVariants}
        >
          📚 {data.phase}
        </motion.p>

        <motion.p
          className="text-gray-300 text-sm mb-4 leading-relaxed"
          variants={itemVariants}
        >
          {data.description}
        </motion.p>

        <motion.ul
          className="space-y-2 mb-5 text-gray-300"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {data.keyPoints.map((point, idx) => (
            <motion.li
              key={idx}
              className="flex items-start text-sm"
              variants={itemVariants}
            >
              <span className="text-yellow-400 mr-3 font-bold">→</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>

        {data.cgpa && (
          <motion.a
            href="#cgpa-badge"
            className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {data.cgpa} CGPA
          </motion.a>
        )}

        <motion.div
          className="pt-4 border-t border-yellow-500/20"
          variants={itemVariants}
        >
          <p className="text-yellow-300 font-semibold text-xs mb-3 uppercase">
            🔧 Skills & Technologies:
          </p>
          <div className="flex flex-wrap">
            {data.skills.map((skill, idx) => (
              <TechBadge key={idx} tech={skill} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main AboutMe Component
const AboutMe = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-8 overflow-hidden min-h-screen"
      style={{ background: "var(--section-background-color)" }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 text-white"
          >
            About <span className="text-yellow-400">Me</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            I'm Arjun Divraniya, a B.Tech CSE student at Rai University with a 9.74 CGPA. 
            I bridge the gap between <strong className="text-purple-400">Technical Logic</strong> and 
            <strong className="text-pink-400"> Visual Art</strong> — building full-stack applications 
            while capturing life through my lens.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {socialLinks.map(({ icon: Icon, link, color }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-4xl ${color}`}
                whileHover={{ scale: 1.3, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <StatCard key={index} data={stat} delay={index * 0.15} />
            ))}
          </div>
        </div>

        {/* Timeline Section - The Main Journey */}
        <div ref={ref} className="relative max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-yellow-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My Journey (2022 → 2026)
          </motion.h2>

          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0 hidden md:block">
            <TimelineLine scaleY={scaleY} />
          </div>

          {/* Milestone Nodes */}
          <div className="hidden md:block">
            {journeyData.map((data, index) => (
              <MilestoneNode key={index} index={index} data={data} total={journeyData.length} />
            ))}
          </div>

          {/* Journey Phase Cards */}
          <div className="relative z-5">
            {journeyData.map((data, index) => (
              <JourneyPhaseCard key={index} data={data} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom Section with Dual Persona */}
        <motion.div
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-purple-400">
            What Makes Me Unique
          </h3>
          <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-full">
            <motion.div
              className="w-full md:w-1/2 p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)" }}
            >
              <FaCode className="text-4xl text-yellow-400 mb-3" />
              <h4 className="text-xl font-bold text-yellow-400 mb-2">Technical Logic</h4>
              <p className="text-gray-300 text-sm">
                MERN Stack • 68+ Repos • 500+ Commits • Real-time Systems • Socket.io
              </p>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 p-6 rounded-xl bg-gradient-to-br from-pink-900/40 to-black border border-pink-500"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)" }}
            >
              <FaPalette className="text-4xl text-yellow-400 mb-3" />
              <h4 className="text-xl font-bold text-yellow-400 mb-2">Visual Art</h4>
              <p className="text-gray-300 text-sm">
                Photography • UI/UX Design • 4+ Years • Figma • Content Creation
              </p>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/contact#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-purple-600 text-white font-bold rounded-lg text-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(234, 179, 8, 0.6)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;