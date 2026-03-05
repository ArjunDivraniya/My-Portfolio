import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPython, FaJava, FaBootstrap, FaFigma, FaShieldAlt, FaAws, FaLinux, FaDocker, FaServer, FaCloud } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiExpress, SiMongodb, SiMysql, SiAdobephotoshop, SiAdobexd, SiCplusplus, SiCanva, SiPostman, SiFirebase, SiSocketdotio, SiRedux, SiVercel, SiKubernetes, SiJenkins, SiGooglecloud, SiApache, SiNginx, SiGit } from "react-icons/si";
import { isMobile, getHoverProps, getMobileInViewProps } from "../utils/mobileOptimization";

const skills = [
  {
    category: "Frontend Development",
    skills: [
      { 
        name: "Next.js", 
        icon: SiNextdotjs, 
        color: "#000000",
        description: "Architecting SEO-optimized, high-performance SSR and ISR applications."
      },
      { 
        name: "React.js", 
        icon: FaReact, 
        color: "#61DAFB",
        description: "Building scalable, component-based UIs with complex state logic."
      },
      { 
        name: "TypeScript", 
        icon: SiTypescript, 
        color: "#3178C6",
        description: "Implementing type-safety and robust interfaces for large-scale engineering."
      },
      { 
        name: "Tailwind CSS", 
        icon: SiTailwindcss, 
        color: "#06B6D4",
        description: "Crafting high-speed, utility-first responsive designs with custom themes."
      },
      { 
        name: "Redux", 
        icon: SiRedux, 
        color: "#764ABC",
        description: "Managing global application state with predictable data flow and slices."
      },
      { 
        name: "JavaScript", 
        icon: FaJs, 
        color: "#F7DF1E",
        description: "Core language expertise for dynamic, interactive web experiences."
      },
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { 
        name: "Node.js", 
        icon: FaNodeJs, 
        color: "#8CC84B",
        description: "Developing high-concurrency RESTful APIs and real-time backend systems."
      },
      { 
        name: "Express.js", 
        icon: SiExpress, 
        color: "#404D59",
        description: "Building robust, middleware-driven REST APIs with proper error handling."
      },
      { 
        name: "MongoDB", 
        icon: SiMongodb, 
        color: "#47A248",
        description: "Designing flexible, document-based schemas for complex data relationships."
      },
      { 
        name: "Auth (JWT/OAuth)", 
        icon: FaShieldAlt, 
        color: "#FF6B6B",
        description: "Implementing secure, role-based access control and token-based sessions."
      },
      { 
        name: "Firebase", 
        icon: SiFirebase, 
        color: "#FFCA28",
        description: "Leveraging cloud infrastructure for real-time database and authentication."
      },
      { 
        name: "Socket.io", 
        icon: SiSocketdotio, 
        color: "#010101",
        description: "Creating real-time bidirectional communication for interactive features."
      }
    ]
  },
  {
    category: "AI & Advanced",
    skills: [
      { 
        name: "Google Gemini AI", 
        icon: SiFirebase, 
        color: "#8E75B6",
        description: "Integrating generative AI models to build intelligent, responsive features."
      },
      { 
        name: "Python", 
        icon: FaPython, 
        color: "#3776AB",
        description: "Building data processing, ML scripts, and automation tools."
      },
      { 
        name: "C++", 
        icon: SiCplusplus, 
        color: "#00599C",
        description: "Systems programming for high-performance computing and algorithms."
      },
    ]
  },
  {
    category: "Dev Tools & Platforms",
    skills: [
      { 
        name: "Git", 
        icon: FaGitAlt, 
        color: "#F05032",
        description: "Version control expertise with proper branching and collaboration workflows."
      },
      { 
        name: "GitHub", 
        icon: FaGithub, 
        color: "#181717",
        description: "Repository management, CI/CD integration, and open-source contributions."
      },
      { 
        name: "Vercel", 
        icon: SiVercel, 
        color: "#000000",
        description: "Deploying and optimizing Next.js applications with edge functions."
      },
      { 
        name: "Postman", 
        icon: SiPostman, 
        color: "#FF6C37",
        description: "API testing, documentation, and collaboration for backend development."
      }
    ]
  },
  {
    category: "UI/UX Design",
    skills: [
      { 
        name: "Figma", 
        icon: FaFigma, 
        color: "#F24E1E",
        description: "Designing responsive user interfaces and interactive prototypes."
      },
      { 
        name: "Adobe Photoshop", 
        icon: SiAdobephotoshop, 
        color: "#31A8FF",
        description: "Advanced image editing and visual asset creation for web projects."
      },
      { 
        name: "Canva", 
        icon: SiCanva, 
        color: "#00C4CC",
        description: "Rapid design creation for social media, presentations, and marketing materials."
      },
      { 
        name: "Adobe XD", 
        icon: SiAdobexd, 
        color: "#FF61F6",
        description: "Wire-framing, prototyping, and user experience design workflows."
      },
    ]
  },
  {
    category: "Backend & Cloud Technologies",
    skills: [
      { 
        name: "AWS (EC2, S3, Lambda)", 
        icon: FaAws, 
        color: "#FF9900",
        description: "Building scalable cloud applications with AWS services for compute, storage, and serverless functions."
      },
      { 
        name: "Docker", 
        icon: FaDocker, 
        color: "#2496ED",
        description: "Containerizing applications for consistent deployment across environments."
      },
      { 
        name: "Java Core", 
        icon: FaJava, 
        color: "#007396",
        description: "Object-oriented programming, data structures, design patterns, and memory management."
      },
      { 
        name: "Microservices Architecture", 
        icon: FaNodeJs, 
        color: "#68A063",
        description: "Designing scalable distributed systems with service discovery and API gateway patterns."
      },
    ]
  }
];

const categories = ["All", "Frontend", "Backend", "AI & Advanced", "Dev Tools", "UI/UX", "Backend & Cloud"];

// ===================== SKILL CARD WITH HOVER DETAILS =====================
const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const showDetails = isHovered || isClicked;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Main Card */}
      <motion.div
        className="flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 bg-gradient-to-br from-black/80 to-purple-950/20 backdrop-blur cursor-pointer relative overflow-hidden min-h-[120px] sm:min-h-[140px]"
        animate={{
          borderColor: showDetails ? "rgba(234, 179, 8, 0.8)" : "rgba(168, 139, 250, 0.6)",
          boxShadow: showDetails
            ? "0 0 30px rgba(234, 179, 8, 0.3), inset 0 0 30px rgba(234, 179, 8, 0.1)"
            : "0 0 15px rgba(168, 139, 250, 0.2)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-transparent"
          animate={{ opacity: showDetails ? 0.5 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon Container */}
        <motion.div
          animate={{
            scale: showDetails ? 0.8 : 1,
            y: showDetails ? -20 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          <skill.icon
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 transition-all duration-300"
            style={{ color: skill.color }}
          />
        </motion.div>

        {/* Skill Name */}
        <motion.span
          className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white relative z-10 text-center leading-tight"
          animate={{
            scale: showDetails ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.span>
      </motion.div>

      {/* Hover Detail Card - Slides Up - Now shows on tap for mobile */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 sm:w-72 md:w-80 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-black/95 via-purple-950/80 to-black/95 border-2 border-yellow-500/60 backdrop-blur-xl shadow-2xl z-20"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: -120, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Icon in Detail Card */}
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <motion.div
                className="p-2 sm:p-3 rounded-lg bg-yellow-500/20 border border-yellow-400/50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <skill.icon className="text-2xl sm:text-3xl" style={{ color: skill.color }} />
              </motion.div>
            </div>

            {/* Skill Name in Card */}
            <h4 className="text-yellow-400 font-black text-center mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
              {skill.name}
            </h4>

            {/* Description */}
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed text-center mb-2 sm:mb-3">
              {skill.description}
            </p>

            {/* Bottom Accent */}
            <motion.div
              className="h-1 w-12 mx-auto bg-gradient-to-r from-yellow-500 to-purple-400 rounded-full"
              animate={{ width: [8, 48, 8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================== MAIN SKILLS SECTION =====================
const Skills = () => {
  return (
    <section id="skills" className="pt-28 sm:pt-32 pb-12 sm:pb-16 md:pb-20 text-center text-white w-full bg-black relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none" />

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
            Professional <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">Skillset</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Hover over any skill to discover my hands-on expertise and real-world applications
          </p>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-yellow-400/50 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-yellow-400 font-black text-xs sm:text-sm md:text-base">⭐ 9.74 CGPA</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-purple-300 font-bold text-xs sm:text-sm md:text-base">Top 1% Performer</span>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Title */}
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-yellow-400 uppercase tracking-wider"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.2 + 0.1 }}
                viewport={{ once: true }}
              >
                {category.category}
              </motion.h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skillIndex}
                    skill={skill}
                    index={categoryIndex * 6 + skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-sm sm:text-base md:text-lg px-4">
            These skills power my ability to architect end-to-end solutions that blend <span className="text-yellow-400 font-bold">performance</span>, <span className="text-purple-400 font-bold">scalability</span>, and <span className="text-yellow-400 font-bold">user experience</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
