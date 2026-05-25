import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaYoutube, FaCrown, FaTrophy, FaReact, FaNodeJs, FaCode, FaRocket, FaLayerGroup, FaAward, FaCloud } from "react-icons/fa";
import { SiMongodb, SiPython, SiPostgresql, SiRedis, SiNextdotjs, SiFigma, SiOdoo, SiGooglechrome, SiVite, SiSocketdotio, SiDocker } from "react-icons/si";
import { isMobile, getHoverProps, getMobileInViewProps, conditionalAnimation } from "../utils/mobileOptimization";
import DeepDetailModal from "./DeepDetailModal";
import portfolioLoopVideo from "../assets/public/Signature 2.o.mp4";
import stockMasterThumb from "../assets/Thumb/StockMaster.png";
import expenseManagerThumb from "../assets/Thumb/ExpenseManager.png";
import dayFlowThumb from "../assets/Thumb/DayFlow.png";
import synergySphereThumb from "../assets/Thumb/SynergySphere.png";
import workzenThumb from "../assets/Thumb/Workzen.png";

gsap.registerPlugin(ScrollTrigger);

const projectThumbAssets = [
  stockMasterThumb,
  expenseManagerThumb,
  dayFlowThumb,
  synergySphereThumb,
  workzenThumb,
];

const getProjectThumb = (index) => projectThumbAssets[index % projectThumbAssets.length];

const getProjectThumbSet = (index, count = 3) =>
  Array.from({ length: count }, (_, offset) => getProjectThumb(index + offset));

// ===================== PROJECT DATA =====================


// (single helper defined above) consistent fanned out thumbnail mockups are handled by `getProjectThumbSet(index, count)`

export const projectData = {
  // ===================== 4 FLAGSHIP PROJECTS (From Resume) =====================
  flagship: [
    {
      id: 1,
      title: "AzureAI Code Suggest",
      subtitle: "VS Code Extension Engine",
      video: "https://www.youtube.com/watch?v=LcuhP_FaquY", 
      embedLink: "https://www.youtube.com/embed/LcuhP_FaquY",
      badge: "🏆 1st Rank Winner",
      images: getProjectThumbSet(1),
      tech: [
        { icon: FaCode, label: "TypeScript" },
        { icon: FaCloud, label: "Azure OpenAI" },
        { icon: SiMongodb, label: "Cosmos DB" }
      ],
      links: {
        github: "https://github.com/ArjunDivraniya/Azure-AI-Extension",
        demo: "https://ai-mirror-chat-bot-js5c.vercel.app/",
        video: "https://www.youtube.com/watch?v=LcuhP_FaquY",
        embedLink: "https://www.youtube.com/embed/LcuhP_FaquY",
        docs: "#",
      },
      status: "Winner",
      about: "A high-performance VS Code extension using RAG to provide secure, cloud-native AI code remediations.",
      problem: "Developers face friction fetching cloud-native snippets, often resulting in 'hallucinated' Azure configurations that fail in production.",
      solution: "Engineered a Retrieval-Augmented Generation (RAG) pipeline for sub-300ms snippets and an automated feedback loop via Cosmos DB for model fine-tuning.",
      workflow: ["Event Interception", "RAG Context Fetch", "AI Processing", "300ms Debounce", "UI Remediation Injection"],
      features: ["Sub-300ms AI generation", "Automated feedback loop", "Azure error remediation", "Secure cloud integration"],
      phases: ["Architecture", "RAG Implementation", "Prompt Engineering", "Testing"],
    },
    {
      id: 2,
      title: "SmartSplit",
      subtitle: "Full-Stack Fintech Platform",
      video: "https://www.youtube.com/watch?v=LcuhP_FaquY",
      embedLink: "https://www.youtube.com/embed/LcuhP_FaquY",
      images: getProjectThumbSet(2),
      tech: [
        { icon: FaReact, label: "React Native" },
        { icon: SiNextdotjs, label: "Next.js" },
        { icon: FaNodeJs, label: "Node.js" },
        { icon: SiDocker, label: "Docker" }
      ],
      links: {
        github: "https://github.com/ArjunDivraniya/Trip-Splitter-Next",
        demo: "https://trip-splitter-ashy.vercel.app/",
        video: "https://www.youtube.com/watch?v=LcuhP_FaquY",
        embedLink: "https://www.youtube.com/embed/LcuhP_FaquY",
      },
      status: "Live",
      about: "Cross-platform debt settlement ecosystem with a unified backend and real-time MongoDB analytics.",
      problem: "Fragmented mobile/web platforms cause data desync and manual math errors during group debt settlement.",
      solution: "Architected a single-source-of-truth system using MongoDB Aggregations and Dockerized microservices for environment consistency.",
      workflow: ["Expense Entry", "Aggregation Pipeline", "Socket.io Broadcast", "Instant Settlement"],
      features: ["Real-time debt simplification", "Offline-ready dashboard", "Multi-platform sync", "Budget alert engine"],
      phases: ["Schema Design", "Aggregation Logic", "Mobile Sync", "Containerization"],
    },
    {
      id: 3,
      title: "Photographer Booking",
      subtitle: "MERN Marketplace",
      video: "https://www.youtube.com/watch?v=esvS8qtjuo0",
      embedLink: "https://www.youtube.com/embed/esvS8qtjuo0",
      images: getProjectThumbSet(3),
      tech: [
        { icon: FaReact, label: "React" },
        { icon: FaNodeJs, label: "Node.js" },
        { icon: SiMongodb, label: "MongoDB" },
        { icon: SiSocketdotio, label: "Socket.io" }
      ],
      links: {
        github: "https://github.com/ArjunDivraniya/shutter_sphere",
        demo: "#",
        video: "https://www.youtube.com/watch?v=esvS8qtjuo0",
        embedLink: "https://www.youtube.com/embed/esvS8qtjuo0",
      },
      status: "Live",
      about: "Dual-sided marketplace with RBAC security and real-time chat for professional photography workflows.",
      problem: "Booking services are often fragmented, lacking centralized communication and secure status transitions.",
      solution: "Engineered a full booking lifecycle with automated status transitions and real-time chat via Socket.io.",
      workflow: ["Search Discovery", "Secure Booking", "Real-time Chat", "Status Transition"],
      features: ["Dual-sided RBAC", "Real-time Chat", "Persistent Notifications", "Advanced filtering"],
      phases: ["User Journeys", "RBAC Logic", "Socket Integration", "Discovery UI"],
    },
    {
      id: 4,
      title: "LeetCode Tracker",
      subtitle: "Chrome Extension Engine",
      video: "#",
      embedLink: "#",
      images: getProjectThumbSet(4),
      tech: [
        { icon: FaCode, label: "TypeScript" },
        { icon: SiVite, label: "Vite" },
        { icon: SiGooglechrome, label: "Chrome API" }
      ],
      links: {
        github: "https://github.com/ArjunDivraniya/LeetCode-Tracker",
        demo: "#",
      },
      status: "Live",
      about: "Automated solve detection and tracking engine using Content Scripts and a differential sync algorithm.",
      problem: "Manual logging is inconsistent; DOM-based scrapers break easily when host UI classes update.",
      solution: "Architected a local-first model with a differential sync algorithm for 100% accurate daily deduplication.",
      workflow: ["Script Trigger", "Solve Detection", "Differential Sync", "Local Persistence"],
      features: ["Automated recording", "Deduplication logic", "Streak tracking", "Interactive dashboard"],
      phases: ["GQL Reverse Engineering", "Extension Logic", "Sync Algorithm", "UI Injection"],
    }
  ],

  // ===================== 6 SPECIFIC HACKATHON PROJECTS =====================
  hackathons: [
    {
      id: 101,
      title: "Expense Management",
      subtitle: "Odoo X IITGN (Online)",
      video: "https://www.youtube.com/watch?v=RrZAaDPay9g",
      embedLink: "https://www.youtube.com/embed/RrZAaDPay9g",
      badge: "🎖️ Finalist Selection",
      images: getProjectThumbSet(0),
      tech: ["Odoo", "Python", "OCR Logic"],
      about: "Smart expense platform with automated OCR-driven bill parsing and financial rule verification.",
      problem: "Manual entries for travel and hackathon expense sheets are slow, error-prone, and lack verification tracking.",
      solution: "Built an OCR-based tracking flow into Odoo to automate submission extraction and validate policies instantly.",
      workflow: ["Receipt Upload", "OCR Text Mining", "Policy Cross-Check", "Approval Route"],
      features: ["OCR-based receipt parsing", "Duplicate validation checks", "Finance dashboard reporting"],
      highlights: ["Selected for final round at IIT Gandhinagar", "Rule-driven workflow validation"],
      links: { github: "https://github.com/ArjunDivraniya/ODOOxIITG-Virtual-Round-", demo: "https://expense-managment-eight.vercel.app/", video: "https://www.youtube.com/watch?v=RrZAaDPay9g", embedLink: "https://www.youtube.com/embed/RrZAaDPay9g" }
    },
    {
      id: 102,
      title: "HRMS Enterprise",
      subtitle: "Odoo X IITGN (Offline)",
      video: "https://www.youtube.com/watch?v=mFVR0ihWdTo",
      embedLink: "https://www.youtube.com/embed/mFVR0ihWdTo",
      badge: "🏆 Offline Round Selection",
      images: getProjectThumbSet(1),
      tech: ["Odoo", "PostgreSQL", "Python"],
      about: "Enterprise-grade Human Resource Management System built for complex onboarding and company policies.",
      problem: "Paper-reliant corporate onboarding processes cause audit trail gaps and bottleneck multi-tier leave tracking.",
      solution: "Engineered secure authorization levels, custom access paths, and background processing for payroll-ready data sync.",
      workflow: ["Employee Creation", "Role Authorization Allocation", "Policy Engine Processing", "Payroll Reconciliation"],
      features: ["Role-based employee routing", "Audit-trailed approval pipelines", "Policy-aware data structure"],
      highlights: ["Achieved elite offline selection round at IITGN", "Enterprise schema enforcement"],
      links: { github: "https://github.com/mayank-dudhatra/ODOOxIITGxHRMS", demo: "#", video: "https://www.youtube.com/watch?v=mFVR0ihWdTo", embedLink: "https://www.youtube.com/embed/mFVR0ihWdTo" }
    },
    {
      id: 103,
      title: "StockMaster Ops",
      subtitle: "Odoo X SPIT",
      video: "https://www.youtube.com/watch?v=dRXl1a0PcGA",
      embedLink: "https://www.youtube.com/embed/dRXl1a0PcGA",
      badge: "🔥 Inventory Intelligence",
      images: getProjectThumbSet(2),
      tech: ["Odoo", "Inventory Analytics", "Python"],
      about: "High-concurrency logic platform designed for multi-warehouse stock adjustments and low-threshold automated reordering.",
      problem: "Asynchronous inventory writes to databases from separate warehouse nodes crash during live demand scaling.",
      solution: "Built custom multi-warehouse logic fields to process real-time updates sequentially inside localized memory objects.",
      workflow: ["Inventory Reorder Trigger", "Multi-Warehouse Check", "Sequence Delta Commits", "Stock Sync Update"],
      features: ["Multi-warehouse sync nodes", "Real-time automated adjustments", "Early alert data markers"],
      highlights: ["Optimized inventory execution pipelines", "Designed for extreme low-latency tracking"],
      links: { github: "https://github.com/ArjunDivraniya/Odoo-X-SPIT", demo: "https://odoo-management-system-ad.vercel.app/login", video: "https://www.youtube.com/watch?v=dRXl1a0PcGA", embedLink: "https://www.youtube.com/embed/dRXl1a0PcGA" }
    },
    {
      id: 104,
      title: "Project Collab",
      subtitle: "Odoo X NMIT",
      video: "https://www.youtube.com/watch?v=lj_SfjZODq0",
      embedLink: "https://www.youtube.com/embed/lj_SfjZODq0",
      badge: "👥 Agile Workspace",
      images: getProjectThumbSet(3),
      tech: ["React", "Node.js", "Kanban Engine"],
      about: "An interactive, transparent team collaboration space hosting multi-user sprint boards and task allocations.",
      problem: "Fragmented tools spread project updates across chat logs and code repos, blinding teams to deployment backlogs.",
      solution: "Forged a unified web board linking sprint velocity directly to dynamic Kanban rows for instant workflow clarity.",
      workflow: ["Sprint Backlog Creation", "Task Multi-Assignment", "State Machine Transition", "Velocity Plotting"],
      features: ["State-controlled Kanban Board", "Task assignment tracking", "Real-time timeline rendering"],
      highlights: ["High user experience score during evaluation", "Modular code separation structure"],
      links: { github: "https://github.com/ArjunDivraniya/ODOOxNMIT", demo: "#", video: "https://www.youtube.com/watch?v=lj_SfjZODq0", embedLink: "https://www.youtube.com/embed/lj_SfjZODq0" }
    },
    {
      id: 105,
      title: "Bus Safety Alert",
      subtitle: "Craftathon (Gandhinagar University)",
      video: "#",
      embedLink: "#",
      badge: "🛡️ Secure Transport Ecosystem",
      images: getProjectThumbSet(4),
      tech: ["React.js", "State Machinery", "Synchronized Alerts"],
      about: "Public transit monitoring application validating live credentials to dispatch safety alerts across endpoints.",
      problem: "Public transportation tracking systems lack real-time validation layers to trigger alerts upon unauthorized driver deviations.",
      solution: "Engineered a web-to-mobile data socket infrastructure executing live credential validation and matching it against real-time trip arrays.",
      workflow: ["Credential Check-In", "Route Match Execution", "Validation Interception", "Global Alert Broadcast"],
      features: ["Real-time synchronization triggers", "Immediate client alert broadcast", "Cross-platform event infrastructure"],
      highlights: ["Lauded for highly practical real-world emergency architecture", "Zero external database latency during trials"],
      links: { github: "https://github.com/ArjunDivraniya/Bus-Safety-Alert", demo: "#", video: "#" }
    },
    {
      id: 106,
      title: "Dayflow",
      subtitle: "Odoo X GCET",
      video: "https://www.youtube.com/watch?v=43DaRK0WBLg",
      embedLink: "https://www.youtube.com/embed/43DaRK0WBLg",
      badge: "⚡ Operations Dashboard",
      images: getProjectThumbSet(0),
      tech: ["Odoo", "Authentication Hooks", "Analytics Engine"],
      about: "Workforce operational portal managing real-time attendance matrix allocation and internal engagement data graphs.",
      problem: "Manual attendance audits lock corporate resources and leave operational decision makers without daily visibility metrics.",
      solution: "Developed secure auth parameters mapping data updates directly into a streamlined client canvas view.",
      workflow: ["User Check-In Log", "Identity Token Verification", "Metrics Update Compilation", "Visualization Display"],
      features: ["Automated leave calculation fields", "Role-secured administrative access", "Dynamic engagement data rows"],
      highlights: ["Features complex internal relational schemas", "100% test coverage passed"],
      links: { github: "https://github.com/mayank-dudhatra/ODOOxGCET", demo: "#", video: "https://www.youtube.com/watch?v=43DaRK0WBLg", embedLink: "https://www.youtube.com/embed/43DaRK0WBLg" }
    }
  ],
  backend: [
    { id: 201, title: "Mutual Fund Explorer", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", tech: ["Next.js", "Charts", "D3"], about: "Financial analytics with interactive charts and fund comparison.", flows: ["Data Pipeline", "API Layer", "Visualization", "Real-time Updates"], links: { github: "https://github.com/ArjunDivraniya/mutual-fund-explorer", demo: "https://mutual-fund-explorer-five.vercel.app/" } },
    { id: 202, title: "Backend Visualizer", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", tech: ["Node", "Redis", "JWT"], about: "Animated system architecture showing auth, rate limiting, and queues.", flows: ["Authentication", "Rate Limiter", "Message Queue", "Database"], links: { github: "https://github.com/ArjunDivraniya/Library-Creations", demo: "#" } },
  ],
  oss: [
    { id: 301, title: "GitHub Issue Solver", thumbnail: synergySphereThumb, tech: ["React", "Testing", "GitHub API"], about: "Active open-source contributor shipping fixes to community repos.", links: { github: "https://github.com/codinggita/job_portal/issues/9#issue-2906428324", demo: "#" } },
    { id: 302, title: "Tic-Tac-Toe Game", thumbnail: workzenThumb, tech: ["React", "Hooks", "State"], about: "My open source project created for the community. I actively maintain it, solve issues, add new features, and welcome contributions. Built for clean code learning and community collaboration.", links: { github: "https://github.com/ArjunDivraniya/tic-tac-game", demo: "https://tic-tac-game-blush.vercel.app/" } },
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
    { id: 501, title: "CodingGita Website", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769684647/v42imcd0pyxyar7qbpar.png?w=400", links: { figma: "https://www.figma.com/design/9JVEOazbDfoTztz4zNEIkv/Personal?node-id=2-450&t=6dDeHXniAMMWZy1E-1" } },
      { id: 502, title: "Photographer Booking UI", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769685057/bbprhd4nfxbaxluinh0f.png?w=400", links: { figma: "https://www.figma.com/design/rGMySFjXI7AcEytfM11DgC/Full-Stack-Project?node-id=0-1&t=AcZ2ScHJCTZe4Dbi-1" } },
    { id: 503, title: "Photography Portfolio UI", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769685056/sbjaamneni6dqrrs2o9t.png?w=400", links: { figma: "https://www.figma.com/design/caL2xnuuFymXGs4p3GUs1T/MY-WEBSITE?node-id=0-1&t=v5cYSzBfBgyBrdSk-1" } },
    { id: 504, title: "AI Mirror Designing", thumbnail: "https://res.cloudinary.com/deucrairj/image/upload/v1769684628/ee75649c-9731-47ee-92ef-586756ea4c5f.png?w=400", links: { figma: "https://www.figma.com/design/piATVvho8lgpKSg2guw9HO/ai-mirror-project?node-id=0-1&t=yVwTPt5DSHw00aFi-1" } },
  ],
};

const categories = ["All", "Flagship", "Hackathons", "Backend", "Open Source", "Learning Lab", "UI/UX"];

const getYouTubeVideoId = (url) => {
  const match = url?.match(/embed\/([^?&]+)/);
  return match ? match[1] : "";
};

const toPrivacyEmbedUrl = (url) => {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
};

const getYouTubeThumbnail = (url) => {
  const id = getYouTubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

const hackathonTechMeta = {
  React: { icon: FaReact, iconClass: "text-cyan-300" },
  Node: { icon: FaNodeJs, iconClass: "text-green-300" },
  Python: { icon: SiPython, iconClass: "text-blue-300" },
  PostgreSQL: { icon: SiPostgresql, iconClass: "text-sky-300" },
  Odoo: { icon: SiOdoo, iconClass: "text-indigo-300" },
  Reports: { icon: FaCode, iconClass: "text-amber-300" },
  Inventory: { icon: FaCode, iconClass: "text-orange-300" },
  Analytics: { icon: FaCode, iconClass: "text-violet-300" },
  Kanban: { icon: FaCode, iconClass: "text-lime-300" },
  Auth: { icon: FaCode, iconClass: "text-rose-300" },
};

const getHackathonTechMeta = (tech) => {
  const meta = hackathonTechMeta[tech];
  if (meta) return { ...meta, label: tech };

  return { icon: FaCode, iconClass: "text-yellow-200", label: tech };
};

const getTechDisplay = (tech) => {
  if (typeof tech === "string") {
    const meta = hackathonTechMeta[tech];
    return {
      icon: meta?.icon || FaCode,
      iconClass: meta?.iconClass || "text-yellow-200",
      label: tech,
    };
  }

  return {
    icon: tech?.icon || FaCode,
    iconClass: tech?.iconClass || "text-yellow-200",
    label: tech?.label || "Tech",
  };
};

const isCoarsePointerDevice = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
};

// ===================== FILTER NAVIGATION WITH GSAP BLOB =====================
const FilterNav = memo(({ active, onChange }) => {
  return (
    <motion.div
      className="sticky top-20 z-40 flex justify-center py-4 sm:py-6 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl px-4 sm:px-6 max-w-full"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full sm:w-auto">
        <div
          className="relative flex md:flex-wrap md:justify-center gap-2 px-1 sm:px-2 py-1.5 rounded-none bg-transparent max-w-full w-full sm:w-auto overflow-x-auto md:overflow-visible whitespace-nowrap snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Filter Buttons */}
                {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
                    className={`relative snap-start shrink-0 min-h-[44px] min-w-[98px] sm:min-w-0 px-4 sm:px-5 py-2.5 border-pencil-button overflow-hidden font-bold text-xs sm:text-sm transition-all whitespace-nowrap z-10 ${active === cat
                        ? "text-black bg-gradient-to-r from-yellow-400 to-amber-500 border-yellow-300 shadow-[0_6px_20px_rgba(250,204,21,0.45)]"
                        : "text-gray-300 bg-white/[0.03] hover:text-white hover:bg-white/10"
                      }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subtle swipe affordance for mobile */}
        <div className="md:hidden pointer-events-none absolute inset-y-2 left-0 w-6 bg-gradient-to-r from-sky-500/35 to-transparent" />
        <div className="md:hidden pointer-events-none absolute inset-y-2 right-0 w-7 bg-gradient-to-l from-sky-500/45 to-transparent" />
      </div>
    </motion.div>
  );
});

// ===================== FLAGSHIP CAROUSEL =====================
const FlagshipCarousel = memo(({ onOpenModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const mediaRef = useRef(null);

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectData.flagship.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Auto-change images within project
  useEffect(() => {
    const project = projectData.flagship[currentIndex];
    if (!project.images?.length) return;

    const imgInterval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(imgInterval);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [currentIndex]);

  const project = projectData.flagship[currentIndex];

  const handleOpenCaseStudy = () => {
    onOpenModal(project, mediaRef.current?.getBoundingClientRect());
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.7 }}
      >
        {/* Cinema Frame Card: 60% Media / 40% Details */}
        <motion.div
          className="border-pencil-amber grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0 border-pencil overflow-hidden bg-black"
          whileHover={{ boxShadow: "0 0 40px rgba(234,179,8,0.3)" }}
          transition={{ duration: 0.4 }}
        >
          {/* LEFT: 60% MEDIA SECTION */}
          <motion.div
            ref={mediaRef}
            className="relative w-full aspect-video bg-black overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            onClick={handleOpenCaseStudy}
          >
            {/* Browser Frame Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 h-10 bg-gradient-to-b from-black/80 to-transparent flex items-center px-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.div className="w-2.5 h-2.5 rounded-full bg-yellow-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2.5 h-2.5 rounded-full bg-green-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
              </div>
            </div>

            {/* Image Gallery */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentIndex}-${currentImgIndex}`}
                src={project.images ? project.images[currentImgIndex] : getYouTubeThumbnail(project.video)}
                alt={`${project.title} preview`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

            {/* Tech Badges - Top Right (Glassmorphism) */}
            <motion.div
              className="absolute top-14 right-4 left-4 flex flex-wrap justify-end gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {project.tech.map((t, i) => (
                <motion.div
                  key={i}
                  className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-2"
                  whileHover={{ scale: 1.08 }}
                  title={t.label}
                >
                  <t.icon size={14} className="text-yellow-400" />
                  <span className="text-xs font-semibold text-white hidden sm:inline">{t.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Status Badge - Top Left */}
            <motion.div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold shadow-lg z-20">
              {project.status}
            </motion.div>

            {/* Hover Indicator */}
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
              <motion.div
                className="px-6 py-3 rounded-full bg-yellow-500 text-black font-bold flex items-center gap-2 shadow-2xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaRocket /> View Details
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: 40% DETAILS SECTION */}
          <motion.div
            className="relative p-6 lg:p-8 flex flex-col justify-between border-pencil overflow-hidden bg-[#0a0a0a] backdrop-blur-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Type Badge */}
              <motion.div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-500/15 border border-yellow-400/40 px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Flagship</span>
              </motion.div>

              {/* Title & Status */}
              <div className="space-y-1">
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">{project.title}</h3>
                <p className="text-xs lg:text-sm text-gray-400 font-medium">{project.status}</p>
              </div>

              {/* Description */}
              <p className="text-xs lg:text-sm leading-relaxed text-gray-300 line-clamp-3">
                {project.about}
              </p>

              {/* Tech Stack */}
              {project.tech?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => {
                      const techDisplay = getTechDisplay(tech);
                      const TechIcon = techDisplay.icon;

                      return (
                        <div
                          key={i}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5"
                        >
                          <TechIcon size={13} className={techDisplay.iconClass} />
                          <span className="text-[11px] font-semibold text-gray-200">{techDisplay.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Deliverables */}
              {project.features && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Key Deliverables</p>
                  <div className="space-y-1">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2 text-xs text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                      >
                        <span className="mt-1 h-0.5 w-0.5 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar Footer */}
            <motion.div
              className="relative z-10 flex flex-row flex-wrap items-center gap-2 pt-4 mt-4 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Primary: Live Demo */}
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[110px] flex-1 px-4 py-2.5 rounded-lg bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/50"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaExternalLinkAlt size={12} /> Live Demo
                </motion.a>
              )}

              {/* Secondary: GitHub */}
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[110px] flex-1 px-4 py-2 rounded-lg border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaGithub size={12} /> GitHub
                </motion.a>
              )}

              {/* Tertiary: Video Tour */}
              {project.links.video && (
                <motion.a
                  href={project.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[110px] flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/40 text-red-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-500/30"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaYoutube size={12} /> Video
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Carousel Indicators */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {projectData.flagship.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{ minWidth: 0, minHeight: 0 }}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 h-2.5 bg-yellow-400 shadow-lg shadow-yellow-500/50"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* Counter */}
        <motion.p
          className="text-center text-gray-400 text-sm mt-4"
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentIndex + 1} / {projectData.flagship.length}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
});

// ===================== HACKATHON CARD COMPONENT =====================
// ===================== HACKATHON VERTICAL CINEMA =====================
const HackathonVerticalCinema = memo(({ onOpenModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-rotate every 12 seconds
  useEffect(() => {
    const startAutoRotate = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projectData.hackathons.length);
      }, 12000);
    };

    startAutoRotate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  // Auto-change images within current project
  useEffect(() => {
    const project = projectData.hackathons[currentIndex];
    if (!project.images?.length) return;

    const imgInterval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(imgInterval);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const project = projectData.hackathons[currentIndex];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Cinema Frame Card: 60% Media / 40% Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-black"
            whileHover={{ boxShadow: "0 0 40px rgba(234,179,8,0.3)" }}
            transition={{ duration: 0.4 }}
          >
            {/* LEFT: 60% MEDIA SECTION */}
            <motion.div
              className="relative w-full aspect-video bg-black overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              onClick={() => onOpenModal(project)}
            >
              {/* Browser Frame Top Bar */}
              <div className="absolute top-0 left-0 right-0 z-30 h-10 bg-gradient-to-b from-black/80 to-transparent flex items-center px-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="w-2.5 h-2.5 rounded-full bg-yellow-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-2.5 h-2.5 rounded-full bg-green-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
                </div>
              </div>

              {/* Image Gallery */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentIndex}-${currentImgIndex}`}
                  src={project.images ? project.images[currentImgIndex] : getYouTubeThumbnail(project.video)}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

              {/* Tech Badges - Top Right */}
              <motion.div
                className="absolute top-14 right-4 left-4 flex flex-wrap justify-end gap-2 sm:gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {project.tech.map((tech, i) => {
                  const TechIcon = hackathonTechMeta[tech]?.icon || FaCode;
                  return (
                    <motion.div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-2"
                      whileHover={{ scale: 1.08 }}
                      title={tech}
                    >
                      <TechIcon size={14} className="text-yellow-400" />
                      <span className="text-xs font-semibold text-white hidden sm:inline">{tech}</span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Badge - Top Left */}
              {project.badge && (
                <motion.div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold shadow-lg z-20">
                  {project.badge}
                </motion.div>
              )}

              {/* Hover Indicator */}
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <motion.div
                  className="px-6 py-3 rounded-full bg-yellow-500 text-black font-bold flex items-center gap-2 shadow-2xl"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaRocket /> View Details
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT: 40% DETAILS SECTION */}
            <motion.div
              className="relative p-6 lg:p-8 flex flex-col justify-between bg-[#0a0a0a] backdrop-blur-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Type Badge */}
                <motion.div className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-500/15 border border-yellow-400/40 px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Hackathon</span>
                </motion.div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">{project.title}</h3>
                  {project.subtitle && (
                    <p className="text-xs lg:text-sm text-yellow-400 font-semibold">{project.subtitle}</p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs lg:text-sm leading-relaxed text-gray-300 line-clamp-3">
                  {project.about}
                </p>

                {/* Tech Stack */}
                {project.tech?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => {
                        const techDisplay = getTechDisplay(tech);
                        const TechIcon = techDisplay.icon;

                        return (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5"
                          >
                            <TechIcon size={13} className={techDisplay.iconClass} />
                            <span className="text-[11px] font-semibold text-gray-200">{techDisplay.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Key Highlights */}
                {project.highlights && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Key Deliverables</p>
                    <div className="space-y-1">
                      {project.highlights.slice(0, 3).map((highlight, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                        >
                          <span className="mt-1 h-0.5 w-0.5 rounded-full bg-yellow-400 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar Footer */}
              <motion.div
                className="relative z-10 flex flex-row flex-wrap items-center gap-2 pt-4 mt-4 border-t border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {/* Primary: Live Demo */}
                {project.links?.demo && project.links.demo !== "#" && (
                  <motion.a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[110px] flex-1 px-4 py-2.5 rounded-lg bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/50"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </motion.a>
                )}

                {/* Secondary: GitHub */}
                {project.links?.github && project.links.github !== "#" && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[110px] flex-1 px-4 py-2 rounded-lg border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub size={12} /> GitHub
                  </motion.a>
                )}

                {/* Tertiary: Video Tour */}
                {project.links?.video && project.links.video !== "#" && (
                  <motion.a
                    href={project.links.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[110px] flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/40 text-red-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-500/30"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaYoutube size={12} /> Video
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <motion.div
        className="flex justify-center items-center gap-4 max-w-full flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Left Arrow */}
        <motion.button
          onClick={() => handleDotClick((currentIndex - 1 + projectData.hackathons.length) % projectData.hackathons.length)}
          style={{ minWidth: 0, minHeight: 0 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-400 hover:bg-yellow-500/40 transition-colors"
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
              style={{ minWidth: 0, minHeight: 0 }}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? "w-3 h-3 bg-yellow-400 shadow-lg shadow-yellow-500/60"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              animate={{
                scale: idx === currentIndex ? 1.2 : 1,
                boxShadow: idx === currentIndex ? "0 0 15px rgba(234, 179, 8, 0.6)" : "none",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => handleDotClick((currentIndex + 1) % projectData.hackathons.length)}
          style={{ minWidth: 0, minHeight: 0 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-400 hover:bg-yellow-500/40 transition-colors"
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
        className="text-center text-gray-400 text-sm font-medium"
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {currentIndex + 1} / {projectData.hackathons.length}
      </motion.div>

      {/* Stats Bar removed per request */}
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
      className="border-pencil relative p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-black/80 via-purple-900/20 to-black group cursor-pointer w-full max-w-full"
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
        className="w-full h-40 object-cover mb-4 brightness-75 group-hover:brightness-100 transition-all"
        loading="lazy"
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
            className="border-pencil-button overflow-hidden px-2.5 sm:px-3 py-2 bg-yellow-500/20 text-yellow-300 text-xs font-bold hover:bg-yellow-500/30 whitespace-nowrap"
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
      className="border-pencil relative p-4 sm:p-6 overflow-hidden bg-black group cursor-pointer w-full max-w-full"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-40 object-cover mb-4 brightness-75 group-hover:brightness-100 transition-all"
        loading="lazy"
      />

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
            className="border-pencil-button overflow-hidden px-2.5 sm:px-3 py-2 bg-green-500/20 text-green-300 text-xs font-bold hover:bg-green-500/30 whitespace-nowrap"
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
  const mobile = isMobile();

  useEffect(() => {
    if (mobile) return undefined;

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
  }, [mobile]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timelineRef.current) timelineRef.current.pause();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (timelineRef.current) timelineRef.current.play();
  };

  return (
    <div className="relative w-full overflow-x-auto py-8 bg-black md:overflow-hidden md:py-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        ref={ribbonRef}
        className="flex gap-4 md:gap-8 w-max px-4 md:px-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Duplicate items for seamless loop */}
        {[...projectData.lab, ...projectData.lab, ...projectData.lab].map((project, idx) => (
          <motion.div
            key={idx}
            className="border-pencil relative flex-shrink-0 w-64 h-44 overflow-hidden group cursor-pointer sm:w-72 sm:h-48 md:w-80 md:h-56"
            whileHover={mobile ? undefined : { scale: 1.08, borderColor: "rgba(234, 179, 8, 0.8)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Background */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Title & Info */}
            <div className="absolute inset-0 flex flex-col items-end justify-end p-6">
              <h4 className="text-white font-black text-sm sm:text-lg text-right leading-tight break-words">{project.title}</h4>
              <motion.div
                className="mt-3 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-[10px] sm:text-xs font-bold text-yellow-300"
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
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 border border-yellow-400/40 text-yellow-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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
      className="border-pencil relative w-full max-w-full h-80 overflow-hidden group cursor-pointer"
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
        className="responsive-media h-full group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
        <h4 className="text-white font-black text-lg sm:text-xl mb-3 leading-tight">{project.title}</h4>
        {project.links.figma && (
          <motion.a
            href={project.links.figma}
            target="_blank"
            rel="noopener noreferrer"
            className="border-pencil-button overflow-hidden px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs sm:text-sm w-fit flex items-center gap-2"
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
// ===================== MAIN PORTFOLIO COMPONENT =====================
const Portfolio = memo(() => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);

  const openProjectModal = useCallback((project, rect) => {
    setSelectedProject(project);
    setModalOrigin(rect);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const renderModalContent = (project) => {
    if (!project) return null;

    if (project.problem || project.solution || project.workflow) {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6 xl:gap-8">
          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_80px_-35px_rgba(0,0,0,0.9)]">
              <img
                src={project.images?.[0] || project.thumbnail || getYouTubeThumbnail(project.video)}
                alt={project.title}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-400 font-bold mb-3">Problem</p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{project.problem || project.about}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-400 font-bold mb-3">Solution</p>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{project.solution || project.about}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-400 font-bold mb-3">Workflow</p>
              <div className="flex flex-wrap gap-2">
                {(project.workflow || project.phases || []).map((step, index) => (
                  <span key={index} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-200">
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                <FaCode /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech, index) => {
                  const TechIcon = tech.icon;
                  return (
                    <div key={index} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-white/85">
                      <TechIcon className="text-white/70" size={14} />
                      <span>{tech.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                <FaRocket /> Key Features
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {project.features?.map((feature, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-200">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-video rounded-2xl overflow-hidden border border-yellow-500/30 bg-black shadow-2xl">
            <iframe
              src={`${toPrivacyEmbedUrl(project.video)}?autoplay=1&mute=0&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
              <FaCode /> Technology Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.tech?.map((t, idx) => {
                const TechIcon = typeof t === 'string' ? FaCode : t.icon;
                const label = typeof t === 'string' ? t : t.label;
                return (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
                    <TechIcon className="text-yellow-500/70" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h4 className="text-purple-400 font-black uppercase tracking-widest text-xs">Project Vision</h4>
            <p className="text-gray-300 text-lg leading-relaxed">{project.about}</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-yellow-500 font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <FaRocket /> Key Features
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {(project.features || ["Advanced Logic", "Scalable UI", "Performance Optimized"]).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  <span className="text-slate-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (activeFilter === "All") {
      return (
        <div className="space-y-20">
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <FaCrown className="text-yellow-500" /> Full Stack Projects
            </h2>
            <FlagshipCarousel onOpenModal={openProjectModal} />
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <FaTrophy className="text-yellow-500" /> Hackathon Journey
            </h2>
            <HackathonVerticalCinema onOpenModal={openProjectModal} />
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <FaLayerGroup className="text-yellow-500" /> Backend Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectData.backend.map((project) => (
                <BackendCard key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <FaGithub className="text-yellow-500" /> Open Source
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectData.oss.map((project) => (
                <OSSCard key={project.id} project={project} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <FaReact className="text-yellow-500" /> Learning Lab
            </h2>
            <LearningLabRibbon />
          </section>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8 flex items-center gap-3">
              <SiFigma className="text-yellow-500" /> UI/UX
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectData.uiux.map((project) => (
                <UIUXCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeFilter === "Flagship") return <FlagshipCarousel onOpenModal={openProjectModal} />;
    if (activeFilter === "Hackathons") return <HackathonVerticalCinema onOpenModal={openProjectModal} />;
    if (activeFilter === "Backend") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.backend.map((project) => (
            <BackendCard key={project.id} project={project} />
          ))}
        </div>
      );
    }
    if (activeFilter === "Open Source") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.oss.map((project) => (
            <OSSCard key={project.id} project={project} />
          ))}
        </div>
      );
    }
    if (activeFilter === "Learning Lab") return <LearningLabRibbon />;
    if (activeFilter === "UI/UX") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.uiux.map((project) => (
            <UIUXCard key={project.id} project={project} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="min-h-screen bg-black pt-28 pb-24 overflow-x-hidden">
      <div className="section-container max-w-7xl mx-auto px-6">
        <motion.div className="mb-16 text-center">
          <p className="text-yellow-500 uppercase font-bold tracking-widest mb-3 text-sm">Creative Engineering Hub</p>
          <h1 className="fluid-title font-black text-white mb-4">
            The <span className="text-yellow-500">Master</span> Gallery
          </h1>
        </motion.div>

        <FilterNav active={activeFilter} onChange={setActiveFilter} />

        <motion.div className="mt-16">{renderSection()}</motion.div>

        <DeepDetailModal
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
          originRect={modalOrigin}
          project={selectedProject}
          title={selectedProject?.title}
          subtitle={selectedProject?.subtitle || "Advanced Technical Project"}
          actions={[
            { label: "GitHub Repo", href: selectedProject?.links?.github || "#", variant: "ghost" },
            { label: "Live Production Link", href: selectedProject?.links?.demo || "#", variant: "primary" },
            { label: "Technical Documentation", href: selectedProject?.links?.docs || selectedProject?.links?.github || "#", variant: "ghost" },
            { label: "Architecture Diagram", href: selectedProject?.links?.architecture || selectedProject?.links?.docs || selectedProject?.links?.github || "#", variant: "ghost" }
          ]}
        />
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
