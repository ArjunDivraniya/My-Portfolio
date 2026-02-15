import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFigma, FaCode, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiMongodb, SiPostman, SiExpress, SiReact, SiTailwindcss, SiVercel, SiNextdotjs } from "react-icons/si";

const tools = [
  {
    name: "VS Code",
    icon: FaCode,
    color: "#007ACC",
    category: "Development",
    description: "Industry-standard code editor with extensive extensions for web development."
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "#F05032",
    category: "Version Control",
    description: "Distributed version control system for tracking changes and collaboration."
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "#181717",
    category: "Repository",
    description: "Cloud-based repository hosting with CI/CD integration and issue tracking."
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
    category: "Database",
    description: "NoSQL document database for flexible, scalable data storage."
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "#404D59",
    category: "Backend",
    description: "Lightweight Node.js framework for building RESTful APIs."
  },
  {
    name: "Node.js",
    icon: SiReact,
    color: "#8CC84B",
    category: "Runtime",
    description: "JavaScript runtime for server-side execution and backend development."
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    category: "Frontend",
    description: "React library for building interactive component-based user interfaces."
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    category: "Framework",
    description: "React framework with SSR, ISR, and automatic optimization capabilities."
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "Styling",
    description: "Utility-first CSS framework for rapid, responsive UI development."
  },
  {
    name: "Figma",
    icon: FaFigma,
    color: "#F24E1E",
    category: "Design",
    description: "Collaborative design platform for UI/UX wireframes and prototypes."
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "#FF6C37",
    category: "Testing",
    description: "API development and testing platform with request management."
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#000000",
    category: "Deployment",
    description: "Edge-optimized deployment platform with serverless functions."
  }
];

// ===================== TOOL CARD COMPONENT =====================
const ToolCard = ({ tool, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const Icon = tool.icon;

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const showDetails = isHovered || isClicked;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Main Card */}
      <motion.div
        className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-black/70 to-purple-950/30 backdrop-blur-lg cursor-pointer relative overflow-hidden group h-28 sm:h-32 md:h-36 lg:h-40"
        animate={{
          borderColor: showDetails ? "rgba(234, 179, 8, 0.8)" : "rgba(168, 139, 250, 0.5)",
          boxShadow: showDetails
            ? "0 0 30px rgba(234, 179, 8, 0.3), inset 0 0 30px rgba(234, 179, 8, 0.05)"
            : "0 0 15px rgba(168, 139, 250, 0.15)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-br from-yellow-500/15 via-purple-500/15 to-transparent"
          animate={{ opacity: showDetails ? 0.5 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category Badge */}
        <motion.div
          className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 text-[9px] sm:text-xs font-bold opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showDetails ? 1 : 0, scale: showDetails ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {tool.category}
        </motion.div>

        {/* Icon */}
        <motion.div
          animate={{
            scale: showDetails ? 1.3 : 1,
            rotateZ: showDetails ? 5 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 mb-1.5 sm:mb-2 md:mb-3"
        >
          <Icon
            style={{ color: tool.color }}
            className="filter drop-shadow-lg text-[28px] sm:text-[36px] md:text-[48px]"
          />
        </motion.div>

        {/* Tool Name */}
        <motion.h4
          className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white text-center relative z-10 leading-tight"
          animate={{
            scale: showDetails ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {tool.name}
        </motion.h4>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          animate={{
            boxShadow: showDetails
              ? `0 0 30px ${tool.color}40, inset 0 0 20px ${tool.color}10`
              : "0 0 0px transparent",
            opacity: showDetails ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Description Tooltip - Now shows on tap for mobile */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute -bottom-20 sm:-bottom-24 left-1/2 transform -translate-x-1/2 w-48 sm:w-56 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-black/95 via-purple-950/80 to-black/95 border border-yellow-500/60 backdrop-blur-xl shadow-2xl z-50"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Arrow Pointer */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-black/95 to-purple-950/80 border-l border-t border-yellow-500/60 rotate-45" />

            {/* Description */}
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed text-center">
              {tool.description}
            </p>

            {/* Bottom Accent */}
            <motion.div
              className="h-0.5 w-8 mx-auto mt-2 sm:mt-3 bg-gradient-to-r from-yellow-500 to-purple-400 rounded-full"
              animate={{ width: [8, 32, 8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================== MAIN TOOLS SECTION =====================
const ToolsIUse = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 text-center text-white w-full bg-black relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <motion.div
          className="mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">
            Tools <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">I Use</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Carefully curated development stack for building high-performance, scalable applications
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pb-12 sm:pb-16 md:pb-20">
          {tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-1 sm:space-y-2">
            <h4 className="text-2xl sm:text-3xl font-black text-yellow-400">{tools.length}+</h4>
            <p className="text-gray-300 text-sm sm:text-base">Production Tools</p>
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <h4 className="text-2xl sm:text-3xl font-black text-yellow-400">Full Stack</h4>
            <p className="text-gray-300 text-sm sm:text-base">Frontend to Backend Mastery</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsIUse;
