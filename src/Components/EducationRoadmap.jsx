// File: src/Components/EducationRoadmap.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaMapMarkerAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// Technology keywords that will be highlighted on hover
const techKeywords = {
  "Sem 1": ["HTML", "CSS", "Git", "GitHub", "JavaScript", "C", "C++", "Figma"],
  "Sem 2": ["Node.js", "Express", "MongoDB", "GitHub", "Collaboration", "Vercel", "Netlify", "Deployment"],
  "Sem 3": ["JWT", "Auth", "Payment Gateways", "State Management", "Next.js", "MySQL"],
  "Sem 4": ["Cloud", "DevOps", "Advanced Java", "Docker", "Kubernetes"],
};

// Enhanced education data with learning phases
const educationData = [
  {
    semester: "Sem 1",
    title: "The Foundation",
    tagline: "HTML/CSS → JavaScript Logic & Version Control",
    phase: "Foundation Phase",
    keyPoints: [
      "Started with HTML & CSS fundamentals",
      "Transitioned to JavaScript logic and interactivity",
      "Learned Git & GitHub for version control",
      "Began C/C++ programming for core algorithms",
      "Explored Figma for UI/UX design basics"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "C", "C++", "Figma"],
    focus: "Building Strong Fundamentals",
    duration: "Semester 1",
    side: "left" // left for odd, right for even
  },
  {
    semester: "Sem 2",
    title: "MERN Shift",
    tagline: "Full-Stack Development & Deployment",
    phase: "MERN Development Phase",
    keyPoints: [
      "Built full-stack applications with MERN stack",
      "Mastered Node.js and Express.js backend",
      "Learned MongoDB for database management",
      "Collaborated via GitHub with version control",
      "Deployed projects to Vercel & Netlify",
      "Understood the complete project lifecycle"
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "GitHub", "Vercel", "Netlify"],
    focus: "Full-Stack Mastery",
    duration: "Semester 2",
    side: "right"
  },
  {
    semester: "Sem 3",
    title: "Deep Dive & Advanced Logic",
    tagline: "Authentication, Payments & Advanced Frameworks",
    phase: "Advanced Development Phase",
    keyPoints: [
      "Implemented JWT for secure authentication",
      "Integrated Payment Gateways (Stripe, Razorpay)",
      "Managed complex State Management patterns",
      "Learned Next.js for optimized React apps",
      "Worked with MySQL for relational databases",
      "Built production-ready secure applications"
    ],
    technologies: ["JWT", "Authentication", "Next.js", "React", "MySQL", "State Management", "Payment APIs"],
    focus: "Advanced Security & Scalability",
    duration: "Semester 3",
    side: "left"
  },
  {
    semester: "Sem 4",
    title: "Current Focus",
    tagline: "Cloud, DevOps & Enterprise Solutions",
    phase: "Enterprise & DevOps Phase",
    keyPoints: [
      "Exploring Cloud platforms and architecture",
      "Learning DevOps practices and tools",
      "Advanced Java programming concepts",
      "Containerization with Docker",
      "CI/CD pipeline implementation",
      "Staying ahead of industry trends"
    ],
    technologies: ["Cloud", "DevOps", "Docker", "Kubernetes", "Java", "CI/CD"],
    focus: "Enterprise & Cloud Solutions",
    duration: "Semester 4",
    side: "right"
  }
];

// Reusable Technology Badge Component with Hover Effects
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

// SVG Timeline Line Component
const TimelineLine = ({ scaleY }) => {
  return (
    <svg className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 z-0" 
         style={{ height: '100%' }} preserveAspectRatio="none">
      {/* Background static line */}
      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#6b7280" strokeWidth="2" opacity="0.3" />
      
      {/* Animated glowing line */}
      <motion.line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#c770f0"
        strokeWidth="3"
        style={{ scaleY, originY: 0 }}
        filter="url(#glow)"
      />
      
      {/* Glow filter definition */}
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
const MilestoneNode = ({ index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="absolute left-1/2 w-5 h-5 -translate-x-1/2 z-10"
      style={{ top: `calc(${index * 25}% + 50px)` }}
    >
      {/* Outer glow effect */}
      <motion.div
        className="w-full h-full rounded-full bg-purple-500 blur-md"
        animate={inView ? {
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.3, 0.8],
        } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Inner node */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 
                   border-2 border-yellow-400 shadow-lg shadow-purple-500"
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// Learning Phase Card Component
const LearningPhaseCard = ({ data, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = data.side === "left";

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -80 : 80,
      y: 30
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
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
      className={`relative flex w-full mb-32 ${isLeft ? 'justify-start' : 'justify-end'}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Card Container */}
      <motion.div
        className={`w-full lg:w-5/12 p-6 rounded-xl backdrop-blur-md 
                   bg-black/40 border border-purple-500/50 shadow-2xl 
                   hover:border-purple-400 hover:shadow-purple-500/20 
                   transition-all duration-300`}
        whileHover={{
          borderColor: "#c770f0",
          boxShadow: "0 0 30px rgba(199, 112, 240, 0.3)"
        }}
      >
        {/* Semester Badge */}
        <motion.div
          className="inline-block mb-3 px-4 py-1 rounded-full 
                   bg-gradient-to-r from-purple-600 to-purple-800 
                   text-yellow-300 font-bold text-sm border border-purple-400"
          whileHover={{ scale: 1.05 }}
        >
          {data.semester}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-2xl font-bold text-yellow-400 mb-1"
          variants={itemVariants}
        >
          {data.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="text-purple-300 text-sm font-semibold mb-3 italic"
          variants={itemVariants}
        >
          {data.tagline}
        </motion.p>

        {/* Phase */}
        <motion.p
          className="text-gray-400 text-xs mb-4 uppercase tracking-wider"
          variants={itemVariants}
        >
          📚 {data.phase}
        </motion.p>

        {/* Key Points */}
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
              <span className="text-purple-400 mr-3 font-bold">→</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Technologies */}
        <motion.div
          className="pt-4 border-t border-purple-500/30"
          variants={itemVariants}
        >
          <p className="text-purple-200 font-semibold text-xs mb-3 uppercase">
            🔧 Technologies & Skills:
          </p>
          <div className="flex flex-wrap">
            {data.technologies.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>
        </motion.div>

        {/* Focus Area Highlight */}
        <motion.div
          className="mt-5 p-3 rounded-lg bg-purple-600/20 border-l-4 border-yellow-400"
          variants={itemVariants}
        >
          <p className="text-yellow-400 font-semibold text-sm">✨ {data.focus}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
const EducationRoadmap = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="education-journey"
      ref={ref}
      className="relative py-24 px-4 sm:px-8 overflow-hidden"
      style={{
        background: "var(--section-background-color)"
      }}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold mb-4"
            style={{ color: "#c770f0" }}
          >
            My Learning Journey
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            From foundational concepts to enterprise solutions. Watch my evolution through each semester.
          </motion.p>
          
          {/* University Info Card */}
          <motion.div
            className="mt-8 max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-black border-2 border-yellow-500 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 0 40px rgba(234, 179, 8, 0.5)" }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <FaGraduationCap className="text-yellow-400 text-4xl" />
              <h3 className="text-2xl font-bold text-white">Rai University</h3>
            </div>
            <p className="text-purple-300 text-lg font-semibold mb-2">
              B.Tech in Computer Science and Engineering
            </p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-yellow-400" />
              <p className="text-gray-400">2024 - Present</p>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-yellow-400 font-bold text-xl">CGPA: 9.74</p>
              <p className="text-gray-300 text-sm mt-1">
                Specialization: Full Stack Development & Real-time Systems
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0">
            <TimelineLine scaleY={scaleY} />
          </div>

          {/* Milestone Nodes */}
          {educationData.map((_, index) => (
            <MilestoneNode key={index} index={index} />
          ))}

          {/* Learning Phase Cards */}
          <div className="relative z-5">
            {educationData.map((data, index) => (
              <LearningPhaseCard key={index} data={data} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg">
            Each phase shaped my skills and brought me closer to mastering full-stack development.
          </p>
          <motion.p
            className="mt-4 text-purple-400 font-semibold"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⬇️ Scroll to explore my journey
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationRoadmap;
