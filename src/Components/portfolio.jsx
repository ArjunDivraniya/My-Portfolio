import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaYoutube, FaCrown, FaTrophy, FaReact, FaNodeJs, FaCode } from "react-icons/fa";
import { SiMongodb, SiPython, SiPostgresql, SiRedis, SiNextdotjs, SiFigma, SiOdoo } from "react-icons/si";
import { isMobile, getHoverProps, getMobileInViewProps, conditionalAnimation } from "../utils/mobileOptimization";

gsap.registerPlugin(ScrollTrigger);

// ===================== PROJECT DATA =====================
const projectData = {
  flagship: [
    {
      id: 1,
      title: "Trip Splitter",
      video: "https://www.youtube.com/embed/LcuhP_FaquY",
      tech: [{ icon: FaReact, label: "React" }, { icon: FaNodeJs, label: "Node" }, { icon: SiMongodb, label: "MongoDB" }],
      links: { github: "https://github.com/ArjunDivraniya/Trip-Splitter-Next", demo: "https://trip-splitter-ashy.vercel.app/", video: "https://www.youtube.com/embed/LcuhP_FaquY" },
      about: "Smart expense splitting with live settlements for group travel. Automates group bills and currency-aware math.",
      phases: ["Research", "Architecture", "API + DB", "Realtime UI", "QA & Launch"],
    },
    {
      id: 2,
      title: "AI Mirror Chat Bot",
      video: "https://www.youtube.com/embed/LcuhP_FaquY",
      tech: [{ icon: FaReact, label: "React" }, { icon: SiPython, label: "Python" }, { icon: SiMongodb, label: "MongoDB" }],
      links: { github: "https://github.com/ArjunDivraniya/Ai-Mirror-chat-bot", demo: "https://ai-mirror-chat-bot-js5c.vercel.app/", video: "https://www.youtube.com/embed/LcuhP_FaquY" },
      about: "Conversational AI with context memory and sentiment awareness. Multi-turn chat with GPT APIs.",
      phases: ["Problem Scope", "Prompt & Flows", "API Layer", "UI/UX", "Ship"],
    },
    {
      id: 3,
      title: "Photographer Booking System",
      video: "https://www.youtube.com/embed/esvS8qtjuo0",
      tech: [{ icon: FaReact, label: "React" }, { icon: FaNodeJs, label: "Node" }, { icon: SiMongodb, label: "MongoDB" }],
      links: { github: "https://github.com/ArjunDivraniya/shutter_sphere", demo: "#", video: "#" },
      about: "Photographer marketplace with scheduling, chat, and payments. Discovery and booking platform.",
      phases: ["User Journeys", "DB Schema", "Chat + Booking", "Payments", "UAT"],
    },
  ],
  hackathons: [
    { id: 101, title: "HRMS", subtitle: "IIT GN Offline", video: "https://www.youtube.com/embed/mFVR0ihWdTo", badge: "🏆 Top 1% Select", tech: ["Odoo", "PostgreSQL", "Python"], about: "Enterprise HR system with multi-level workflows and policy enforcement.", links: { github: "https://github.com/mayank-dudhatra/ODOOxIITGxHRMS", demo: "#", video: "https://www.youtube.com/embed/mFVR0ihWdTo" } },
    { id: 102, title: "Expense Management", subtitle: "IIT GN Online", video: "https://www.youtube.com/embed/RrZAaDPay9g", tech: ["Odoo", "Python", "Reports"], about: "Multi-level approvals and policy guardrails for expense tracking.", links: { github: "https://github.com/ArjunDivraniya/ODOOxIITG-Virtual-Round-", demo: "https://expense-managment-eight.vercel.app/", video: "https://www.youtube.com/embed/RrZAaDPay9g" } },
    { id: 103, title: "StockMaster", subtitle: "SPIT", video: "https://www.youtube.com/embed/dRXl1a0PcGA", tech: ["Odoo", "Inventory", "Analytics"], about: "Smart warehouse with reorder signals and stock optimization.", links: { github: "https://github.com/ArjunDivraniya/Odoo-X-SPIT", demo: "https://odoo-management-system-ad.vercel.app/login", video: "https://www.youtube.com/embed/dRXl1a0PcGA" } },
    { id: 104, title: "Project Collab", subtitle: "NMIT", video: "https://www.youtube.com/embed/lj_SfjZODq0", tech: ["React", "Node", "Kanban"], about: "Team project platform with sprint management and collaboration.", links: { github: "https://github.com/ArjunDivraniya/ODOOxNMIT", demo: "#", video: "https://www.youtube.com/embed/lj_SfjZODq0" } },
    { id: 105, title: "Dayflow", subtitle: "GCET", video: "https://www.youtube.com/embed/43DaRK0WBLg", tech: ["Odoo", "Auth", "Analytics"], about: "HR suite for attendance, leave, and employee engagement.", links: { github: "https://github.com/mayank-dudhatra/ODOOxGCET", demo: "#", video: "https://www.youtube.com/embed/43DaRK0WBLg" } },
  ],
  backend: [
    { id: 201, title: "Mutual Fund Explorer", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", tech: ["Next.js", "Charts", "D3"], about: "Financial analytics with interactive charts and fund comparison.", flows: ["Data Pipeline", "API Layer", "Visualization", "Real-time Updates"], links: { github: "https://github.com/ArjunDivraniya/mutual-fund-explorer", demo: "https://mutual-fund-explorer-five.vercel.app/" } },
    { id: 202, title: "Backend Visualizer", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", tech: ["Node", "Redis", "JWT"], about: "Animated system architecture showing auth, rate limiting, and queues.", flows: ["Authentication", "Rate Limiter", "Message Queue", "Database"], links: { github: "https://github.com/ArjunDivraniya/Library-Creations", demo: "#" } },
  ],
  oss: [
    { id: 301, title: "GitHub Issue Solver", tech: ["React", "Testing", "GitHub API"], about: "Active open-source contributor shipping fixes to community repos.", links: { github: "https://github.com/codinggita/job_portal/issues/9#issue-2906428324", demo: "#" } },
    { id: 302, title: "Tic-Tac-Toe Game", tech: ["React", "Hooks", "State"], about: "My open source project created for the community. I actively maintain it, solve issues, add new features, and welcome contributions. Built for clean code learning and community collaboration.", links: { github: "https://github.com/ArjunDivraniya/tic-tac-game", demo: "https://tic-tac-game-blush.vercel.app/" } },
  ],
  lab: [
    { id: 401, title: "YouTube Search", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", links: { github: "https://github.com/ArjunDivraniya/YouTube-Inspired-API-Task-List", demo: "#" } },
    { id: 402, title: "Spotify Clone", thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400", links: { github: "https://github.com/ArjunDivraniya/Spotify_", demo: "#" } },
    { id: 403, title: "RedBus Clone", thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400", links: { github: "https://github.com/ArjunDivraniya/RedBus", demo: "#" } },
    { id: 404, title: "Netflix Clone", thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400", links: { github: "https://github.com/ArjunDivraniya/Netflix-Clone", demo: "#" } },
    { id: 405, title: "MealDB Explorer", thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", links: { github: "https://github.com/ArjunDivraniya/Component-react", demo: "#" } },
    { id: 406, title: "Cocktail Finder", thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400", links: { github: "https://github.com/ArjunDivraniya/Component-react", demo: "#" } },
  ],
  uiux: [
    { id: 501, title: "CodingGuta Website", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769684647/v42imcd0pyxyar7qbpar.png?w=400", links: { figma: "https://www.figma.com/design/9JVEOazbDfoTztz4zNEIkv/Personal?node-id=2-450&t=6dDeHXniAMMWZy1E-1" } },
      { id: 502, title: "Photographer Booking UI", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769685057/bbprhd4nfxbaxluinh0f.png?w=400", links: { figma: "https://www.figma.com/design/rGMySFjXI7AcEytfM11DgC/Full-Stack-Project?node-id=0-1&t=AcZ2ScHJCTZe4Dbi-1" } },
    { id: 503, title: "Photography Portfolio UI", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769685056/sbjaamneni6dqrrs2o9t.png?w=400", links: { figma: "https://www.figma.com/design/caL2xnuuFymXGs4p3GUs1T/MY-WEBSITE?node-id=0-1&t=v5cYSzBfBgyBrdSk-1" } },
    { id: 504, title: "AI Mirror Designing", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769684628/ee75649c-9731-47ee-92ef-586756ea4c5f.png?w=400", links: { figma: "https://www.figma.com/design/piATVvho8lgpKSg2guw9HO/ai-mirror-project?node-id=0-1&t=yVwTPt5DSHw00aFi-1" } },
  ],
};

const categories = ["All", "Flagship", "Hackathons", "Backend", "Open Source", "Learning Lab", "UI/UX"];

// ===================== FILTER NAVIGATION WITH GSAP BLOB =====================
const FilterNav = memo(({ active, onChange }) => {
  const blobRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    if (!blobRef.current || !containerRef.current) return;

    const activeButton = itemRefs.current[active];
    if (!activeButton) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    gsap.to(blobRef.current, {
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <motion.div
      className="sticky top-20 z-40 flex justify-center py-4 sm:py-6 bg-gradient-to-b from-black via-black/95 to-black/80 border-b border-yellow-500/20 backdrop-blur-xl px-4 sm:px-6 max-w-full"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        ref={containerRef}
        className="relative flex flex-wrap justify-center gap-2 px-3 sm:px-6 py-2 rounded-2xl sm:rounded-full bg-black/60 border border-yellow-500/20 backdrop-blur max-w-full"
      >
        {/* GSAP Animated Blob */}
        <div
          ref={blobRef}
          className="absolute top-0 h-full bg-gradient-to-r from-yellow-500/20 via-yellow-500/10 to-transparent rounded-full blur-xl pointer-events-none"
          style={{ left: 0, width: 0 }}
        />

        {/* Filter Buttons */}
        {categories.map((cat) => (
          <button
            key={cat}
            ref={(el) => (itemRefs.current[cat] = el)}
            onClick={() => onChange(cat)}
            className={`relative px-3 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap z-10 ${
              active === cat
                ? "text-black bg-yellow-500 shadow-lg shadow-yellow-500/50"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
});

// ===================== FLAGSHIP CAROUSEL =====================
const FlagshipCarousel = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectData.flagship.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const project = projectData.flagship[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch w-full max-w-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.7 }}
      >
        {/* Left: Video Background */}
        <motion.div
          className="relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-yellow-500/40 bg-black group"
          whileHover={{ scale: 1.02 }}
        >
          <iframe
            ref={(el) => (videoRefs.current[currentIndex] = el)}
            src={`${project.video}?autoplay=1&mute=1&loop=1&controls=0`}
            className="absolute inset-0 w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            title={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* Floating Tech Icons - Top Left */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-col gap-2 sm:gap-3">
            {project.tech.map((t, i) => (
              <motion.div
                key={i}
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-black/70 border border-yellow-500/40 backdrop-blur"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                title={t.label}
              >
                <t.icon size={20} className="text-yellow-400 sm:text-2xl" />
              </motion.div>
            ))}
          </div>

          {/* CGPA Badge - Top Right */}
          <motion.div
            className="absolute top-3 sm:top-6 right-3 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-xs sm:text-sm shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            9.74 CGPA
          </motion.div>

          {/* Top 1% Badge - Bottom Left */}
          <motion.div
            className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-purple-600/90 border border-purple-400/50 text-white text-xs font-bold backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ⭐ Top 1% Student
          </motion.div>
        </motion.div>

        {/* Right: Project Details */}
        <motion.div
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black/80 via-purple-900/20 to-black border border-yellow-500/30 backdrop-blur flex flex-col justify-between w-full max-w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <motion.div
              className="inline-block mb-4 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/50 text-yellow-300 text-xs font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Flagship Project
            </motion.div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{project.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 break-words [overflow-wrap:anywhere]">{project.about}</p>

            {/* Tech Stack */}
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    className="px-2 sm:px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold whitespace-nowrap"
                    whileHover={{ scale: 1.08 }}
                  >
                    {t.label}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Development Phases */}
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Build Timeline</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.phases.map((phase, i) => (
                  <motion.span
                    key={i}
                    className="px-2 sm:px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    {phase}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap mt-6">
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-yellow-500 text-black font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-yellow-500/50 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt size={16} /> Live Demo
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold flex items-center gap-2 hover:bg-white/20 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={16} /> Source Code
              </motion.a>
            )}
            {project.links.video && (
              <motion.a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-300 font-bold flex items-center gap-2 hover:bg-red-500/30 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaYoutube size={16} /> Video Tour
              </motion.a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {projectData.flagship.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all ${
              idx === currentIndex ? "w-8 h-3 bg-yellow-400" : "w-3 h-3 bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
});

// ===================== HACKATHON CARD COMPONENT =====================
const HackathonCard = memo(({ project, isActive }) => {
  return (
    <motion.div
      className="absolute inset-0 w-full max-w-full"
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1, rotateY: 0 }
          : { opacity: 0, scale: 0.8, rotateY: 90 }
      }
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ perspective: "1000px" }}
    >
      {/* Card Container */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-yellow-500/60 bg-gradient-to-br from-black/95 via-purple-950/40 to-black backdrop-blur"
        animate={
          isActive
            ? { boxShadow: "0 0 60px rgba(234, 179, 8, 0.4), 0 0 120px rgba(168, 139, 250, 0.2)" }
            : { boxShadow: "0 0 20px rgba(168, 139, 250, 0.1)" }
        }
        transition={{ duration: 0.6 }}
      >
        {/* Video Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Left Video - 60% width on desktop */}
          <div className="md:col-span-3 relative bg-black overflow-hidden">
            <iframe
              src={`${project.video}?autoplay=${isActive ? 1 : 0}&mute=1&controls=1`}
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              title={project.title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />

            {/* Badge */}
            {project.badge && (
              <motion.div
                className="absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-sm shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {project.badge}
              </motion.div>
            )}
          </div>

          {/* Right Content - 40% width on desktop */}
          <div className="md:col-span-2 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-black/80 to-purple-950/20 overflow-y-auto overflow-x-hidden w-full max-w-full">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="text-yellow-400 font-bold text-sm sm:text-base md:text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                {project.subtitle}
              </p>

              {/* Description */}
              <motion.p
                className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 break-words [overflow-wrap:anywhere]"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {project.about}
              </motion.p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-yellow-300 text-xs sm:text-sm font-bold mb-3 uppercase tracking-wider">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-2 sm:px-3 py-1 rounded-full bg-yellow-500/30 border border-yellow-400/60 text-yellow-200 text-xs font-semibold whitespace-nowrap"
                    initial={{ scale: 0 }}
                    animate={isActive ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3 flex-wrap mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {project.links.github && project.links.github !== "#" && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/30 border border-yellow-400/60 text-yellow-300 font-bold text-xs md:text-sm hover:bg-yellow-500/50"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={16} /> Code
                </motion.a>
              )}
              {project.links.demo && project.links.demo !== "#" && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/30 border border-purple-400/60 text-purple-300 font-bold text-xs md:text-sm hover:bg-purple-500/50"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt size={16} /> Demo
                </motion.a>
              )}
              {project.links.video && project.links.video !== "#" && (
                <motion.a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/30 border border-red-400/60 text-red-300 font-bold text-xs md:text-sm hover:bg-red-500/50"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaYoutube size={16} /> Video
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ===================== HACKATHON VERTICAL CINEMA =====================
const HackathonVerticalCinema = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const startAutoRotate = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projectData.hackathons.length);
      }, 8000);
    };

    startAutoRotate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Carousel Container */}
      <div className="relative w-full max-w-full h-[28rem] sm:h-96 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-black">
        {projectData.hackathons.map((project, index) => (
          <HackathonCard
            key={project.id}
            project={project}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <motion.div
        className="flex justify-center items-center gap-3 sm:gap-4 max-w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Left Arrow */}
        <motion.button
          onClick={() => handleDotClick((currentIndex - 1 + projectData.hackathons.length) % projectData.hackathons.length)}
          className="p-2 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-400 text-xs sm:text-sm hover:bg-yellow-500/40"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity }}>
            ←
          </motion.div>
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {projectData.hackathons.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? "w-3 h-3 bg-yellow-400"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
              animate={{
                scale: idx === currentIndex ? 1.2 : 1,
                boxShadow:
                  idx === currentIndex ? "0 0 15px rgba(234, 179, 8, 0.6)" : "none",
              }}
              transition={{ duration: 0.3 }}
              title={`${projectData.hackathons[idx].title}`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => handleDotClick((currentIndex + 1) % projectData.hackathons.length)}
          className="p-2 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-400 text-xs sm:text-sm hover:bg-yellow-500/40"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ x: [2, -2, 2] }} transition={{ duration: 1.5, repeat: Infinity }}>
            →
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Counter */}
      <motion.div
        className="text-center text-gray-400 text-sm"
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {currentIndex + 1} / {projectData.hackathons.length}
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-yellow-500/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-black text-yellow-400">{projectData.hackathons.length}</div>
          <p className="text-gray-300 text-xs mt-2">Hackathons</p>
        </motion.div>
        <motion.div
          className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-black text-purple-400">🏆</div>
          <p className="text-gray-300 text-xs mt-2">Top 1%</p>
        </motion.div>
        <motion.div
          className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-black text-yellow-400">5+</div>
          <p className="text-gray-300 text-xs mt-2">Tech Stacks</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

// ===================== BACKEND CARDS WITH LOGIC FLOW =====================
const BackendCard = memo(({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const flowRef = useRef(null);

  useEffect(() => {
    if (isHovered && flowRef.current) {
      gsap.fromTo(
        flowRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.6 }
      );
    }
  }, [isHovered]);

  return (
    <motion.div
      className="relative p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-black/80 via-purple-900/20 to-black border border-yellow-500/30 overflow-hidden group cursor-pointer w-full max-w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-40 object-cover rounded-xl mb-4 brightness-75 group-hover:brightness-100 transition-all"
      />

      <h3 className="text-xl font-black text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{project.about}</p>

      {/* Logic Flow Reveal */}
      {isHovered && (
        <motion.div
          ref={flowRef}
          className="mb-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {project.flows?.map((flow, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-xs text-yellow-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              {flow}
              {i < (project.flows?.length || 0) - 1 && <span className="ml-auto text-yellow-500">→</span>}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {project.links.github && (
          <motion.a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold hover:bg-yellow-500/30 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub size={14} className="inline mr-1" /> Code
          </motion.a>
        )}
        {project.links.demo && (
          <motion.a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaExternalLinkAlt size={14} className="inline mr-1" /> Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );
});

// ===================== OPEN SOURCE CARD WITH TERMINAL EFFECT =====================
const OSSCard = memo(({ project }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (isRevealed && terminalRef.current) {
      const lines = terminalRef.current.querySelectorAll(".terminal-line");
      gsap.fromTo(
        lines,
        { opacity: 0, width: 0 },
        { opacity: 1, width: "100%", stagger: 0.1, duration: 0.5 }
      );
    }
  }, [isRevealed]);

  return (
    <motion.div
      className="relative p-4 sm:p-6 rounded-2xl bg-black border border-yellow-500/30 group cursor-pointer w-full max-w-full"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Terminal Effect */}
      <div className="mb-4 font-mono text-sm">
        <div className="text-green-500 mb-2">{project.id === 302 ? "$ tic-tac-toe-features" : "$ open-source-fixes"}</div>
        {isRevealed && (
          <div ref={terminalRef} className="space-y-1 text-green-400 text-xs">
            {project.id === 302 ? [
              "> Clean code patterns & best practices",
              "> Interactive React hooks & state management",
              "> Production-ready deployment",
              "> Active maintenance & issue solving",
              "> Welcome community contributions",
            ] : [
              "> Analyzing issues...",
              "> Reproducing bug...",
              "> Implementing fix...",
              "> Running tests...",
              "> Success! ✓",
            ].map((line, i) => (
              <div key={i} className="terminal-line overflow-hidden">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-black text-white mb-2 leading-tight break-words">{project.title}</h3>
      <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3">{project.about}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t, i) => (
          <span key={i} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {project.links.github && (
          <motion.a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-green-500/20 border border-green-400/40 text-green-300 text-xs font-bold hover:bg-green-500/30 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub size={14} className="inline mr-1" /> Repo
          </motion.a>
        )}
        {project.links.demo && (
          <motion.a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaExternalLinkAlt size={14} className="inline mr-1" /> View
          </motion.a>
        )}
      </div>
    </motion.div>
  );
});

// ===================== LEARNING LAB RIBBON SCROLL =====================
const LearningLabRibbon = memo(() => {
  const ribbonRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!ribbonRef.current) return;

    // Kill any existing animation
    if (timelineRef.current) timelineRef.current.kill();

    // Create timeline for infinite scroll
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(ribbonRef.current, {
      x: -2000,
      duration: 40,
      ease: "none",
      onComplete: () => {
        gsap.set(ribbonRef.current, { x: 0 });
      },
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timelineRef.current) timelineRef.current.pause();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (timelineRef.current) timelineRef.current.play();
  };

  return (
    <div className="relative w-full overflow-hidden py-12 bg-black">
      <motion.div
        ref={ribbonRef}
        className="flex gap-8 w-max"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Duplicate items for seamless loop */}
        {[...projectData.lab, ...projectData.lab, ...projectData.lab].map((project, idx) => (
          <motion.div
            key={idx}
            className="relative flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden border border-yellow-500/30 group cursor-pointer"
            whileHover={{ scale: 1.08, borderColor: "rgba(234, 179, 8, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Background */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Title & Info */}
            <div className="absolute inset-0 flex flex-col items-end justify-end p-6">
              <h4 className="text-white font-black text-base sm:text-lg text-right leading-tight break-words">{project.title}</h4>
              <motion.div
                className="mt-3 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-300 text-xs font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                View Project
              </motion.div>
            </div>

            {/* Link Icon - Top Right */}
            <motion.a
              href={project.links?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 border border-yellow-400/40 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.15 }}
            >
              <FaGithub size={18} />
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

// ===================== UI/UX FLOATING 3D CARDS =====================
const UIUXCard = memo(({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: x * 10,
      rotationX: -y * 10,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-full h-80 rounded-2xl overflow-hidden border border-yellow-500/30 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
        <h4 className="text-white font-black text-lg sm:text-xl mb-3 leading-tight">{project.title}</h4>
        {project.links.figma && (
          <motion.a
            href={project.links.figma}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm w-fit flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SiFigma size={16} /> View Design
          </motion.a>
        )}
      </div>
    </motion.div>
  );
});

// ===================== MAIN PORTFOLIO COMPONENT =====================
export const Portfolio = memo(() => {
  const [activeFilter, setActiveFilter] = useState("All");

  const renderSection = () => {
    const sections = [];

    if (activeFilter === "All") {
      // Show all sections in sequence
      sections.push(
        <motion.div key="flagship" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <FaCrown className="text-yellow-500 text-lg sm:text-2xl\" /> Full Stack Projects
            </h2>
            <FlagshipCarousel />
          </div>
        </motion.div>
      );

      sections.push(
        <motion.div key="hackathons" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3\">
              <FaTrophy className="text-yellow-500 text-lg sm:text-2xl\" /> Hackathon Projects
            </h2>
            <HackathonVerticalCinema />
          </div>
        </motion.div>
      );

      sections.push(
        <motion.div key="backend" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">Backend Systems</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {projectData.backend.map((project) => (
                <BackendCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </motion.div>
      );

      sections.push(
        <motion.div key="oss" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">Open Source Contributions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {projectData.oss.map((project) => (
                <OSSCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </motion.div>
      );

      sections.push(
        <motion.div key="lab" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">Learning Lab - Continuous Ribbon</h2>
            <LearningLabRibbon />
          </div>
        </motion.div>
      );

      sections.push(
        <motion.div key="uiux" className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">UI/UX Designs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {projectData.uiux.map((project) => (
                <UIUXCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </motion.div>
      );

      return sections;
    }

    // Individual filter selections
    if (activeFilter === "Flagship") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">Flagship Projects</h2>
          <FlagshipCarousel />
        </motion.div>
      );
    }

    if (activeFilter === "Hackathons") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">Hackathon Vertical Cinema</h2>
          <HackathonVerticalCinema />
        </motion.div>
      );
    }

    if (activeFilter === "Backend") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">Backend Systems</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectData.backend.map((project) => (
              <BackendCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeFilter === "Open Source") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">Open Source Contributions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectData.oss.map((project) => (
              <OSSCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeFilter === "Learning Lab") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">Learning Lab - Continuous Ribbon</h2>
          <LearningLabRibbon />
        </motion.div>
      );
    }

    if (activeFilter === "UI/UX") {
      return (
        <motion.div className="space-y-8">
          <h2 className="text-4xl font-black text-white mb-8">UI/UX Designs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.uiux.map((project) => (
              <UIUXCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      );
    }
  };

  return (
    <section id="projects" className="min-h-screen bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-x-hidden">
      <div className="max-w-full sm:max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow-500 uppercase font-bold tracking-widest mb-2 sm:mb-3 text-xs sm:text-sm">Featured & Interactive</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 sm:mb-4 leading-tight px-2">
            Immersive <span className="text-yellow-500">Project</span> Showcase
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            High-performance project gallery optimized for all devices
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <FilterNav active={activeFilter} onChange={setActiveFilter} />

        {/* Content */}
        <motion.div
          className="mt-12 sm:mt-16 space-y-12 sm:space-y-16 md:space-y-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {renderSection()}
        </motion.div>
      </div>
    </section>
  );
});

FilterNav.displayName = "FilterNav";
FlagshipCarousel.displayName = "FlagshipCarousel";
HackathonVerticalCinema.displayName = "HackathonVerticalCinema";
BackendCard.displayName = "BackendCard";
OSSCard.displayName = "OSSCard";
LearningLabRibbon.displayName = "LearningLabRibbon";
UIUXCard.displayName = "UIUXCard";
Portfolio.displayName = "Portfolio";

export default Portfolio;
