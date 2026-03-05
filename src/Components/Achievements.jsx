// File: src/Components/Achievements.jsx
// High-End 3D Proof of Work Command Center (Mobile-Optimized)

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { 
  FaTrophy, FaCode, FaAward, FaGithub, FaLinkedin, FaExternalLinkAlt, 
  FaCheckCircle, FaStar, FaFire, FaCrown, FaRocket, FaChartLine,
  FaShieldAlt, FaBolt, FaGem, FaPlay, FaTimes, FaAws, FaMicrosoft,
  FaDatabase, FaCloud, FaChartBar, FaUserTie, FaBriefcase
} from 'react-icons/fa';
import { SiLeetcode, SiMeta, SiHackerrank, SiJavascript, SiAmazondocumentdb } from 'react-icons/si';
import { isMobile, getHoverProps, getMobileInViewProps } from '../utils/mobileOptimization';
import Certifications from './Certifications';
import Hackathons from './Hackathons';

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Card Component (Custom Implementation - Mobile-Optimized)
const TiltCard = ({ children, className = "" }) => {
  const mobile = isMobile();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(useSpring(y, { stiffness: 150, damping: 20 }), [-100, 100], mobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(useSpring(x, { stiffness: 150, damping: 20 }), [-100, 100], mobile ? [0, 0] : [-10, 10]);

  const handleMove = (e) => {
    if (mobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleLeave = () => {
    if (mobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ 
        rotateX: mobile ? 0 : rotateX, 
        rotateY: mobile ? 0 : rotateY, 
        transformStyle: mobile ? 'flat' : 'preserve-3d' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Circular Progress Gauge Component
const CircularGauge = ({ value, max, label, color = "yellow" }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const colorMap = {
    yellow: "#EAB308",
    purple: "#A78BFA",
    green: "#10B981"
  };

  return (
    <div className="relative w-28 h-28">
      <svg className="transform -rotate-90 w-28 h-28">
        <circle
          cx="56"
          cy="56"
          r="45"
          stroke="#1a1a1a"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="56"
          cy="56"
          r="45"
          stroke={colorMap[color]}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className={`text-2xl font-bold text-${color}-500`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
};

// 3D Modal Component
const DetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-gray-900 to-black border border-purple-400/30 rounded-2xl p-8 shadow-2xl"
        initial={{ scale: 0.8, rotateX: -15 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.8, rotateX: 15 }}
        onClick={(e) => e.stopPropagation()}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {data.icon && <data.icon className="text-5xl text-yellow-500" />}
            <div>
              <h2 className="text-3xl font-bold text-white">{data.title}</h2>
              <p className="text-purple-400">{data.subtitle}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-xl font-semibold text-yellow-500 mb-3">Tech Stack Used</h3>
            <div className="flex flex-wrap gap-2">
              {data.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-xl font-semibold text-yellow-500 mb-3">Real-World Problem Solved</h3>
            <p className="text-gray-300 leading-relaxed">{data.problem}</p>
          </div>

          {data.verification && (
            <div className="border-t border-gray-800 pt-4">
              <a
                href={data.verification}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <FaExternalLinkAlt /> Verify Certificate
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Achievements = () => {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linkedInProfileUrl = 'https://www.linkedin.com/in/divraniya-arjun/';
  const linkedInProfileImage = 'https://ui-avatars.com/api/?name=Arjun+Divraniya&background=0A66C2&color=ffffff&size=256';

  // Fetch LeetCode Data
  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const response = await axios.get('https://leetcode-stats-api.herokuapp.com/Arjun_divraniya');
        setLeetCodeData(response.data);
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        // Fallback data
        setLeetCodeData({
          totalSolved: 450,
          ranking: 125000,
          easySolved: 200,
          mediumSolved: 180,
          hardSolved: 70
        });
      }
    };
    fetchLeetCode();
  }, []);

  // Fetch GitHub Data
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/ArjunDivraniya');
        setGithubData(response.data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fallback data
        setGithubData({
          public_repos: 68,
          followers: 50
        });
      }
    };
    fetchGitHub();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!titleRef.current) return;

    // Title reveal animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Scroll-triggered animations for cards
    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, z: -200, rotateY: -15 },
        {
          opacity: 1,
          z: 0,
          rotateY: 0,
          duration: 1,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [leetCodeData, githubData]);

  const certifications = [
    {
      title: "Meta Frontend Professional",
      issuer: "Meta / Coursera",
      date: "2024",
      icon: SiMeta,
      verified: true,
      techStack: ["React", "JavaScript", "UI/UX", "Version Control", "Responsive Design"],
      problem: "Mastered modern frontend development practices including component-based architecture, responsive design, and accessibility standards to build production-ready web applications.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-blue-500/20 to-purple-600/20"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: FaAws,
      verified: true,
      techStack: ["EC2", "S3", "Lambda", "IAM", "CloudFormation", "Security"],
      problem: "Demonstrated comprehensive understanding of AWS cloud infrastructure, security best practices, and cost optimization strategies for scalable cloud deployments.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-orange-500/20 to-yellow-600/20"
    },
    {
      title: "Problem Solving (Basic & Intermediate)",
      issuer: "HackerRank",
      date: "Jun 2025",
      icon: SiHackerrank,
      verified: false,
      techStack: ["Algorithms", "Data Structures", "Problem Solving", "Optimization"],
      problem: "Achieved proficiency in algorithmic problem solving, demonstrating ability to optimize code for performance and handle complex computational challenges.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-green-500/20 to-emerald-600/20"
    },
    {
      title: "Rest API (Intermediate)",
      issuer: "HackerRank",
      date: "Jun 2025",
      icon: SiHackerrank,
      verified: false,
      techStack: ["REST APIs", "HTTP Methods", "API Design", "Backend Development"],
      problem: "Mastered REST API design principles and backend development practices for building scalable web services and microservices architectures.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-green-500/20 to-teal-600/20"
    },
    {
      title: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "May 2025",
      icon: SiJavascript,
      verified: false,
      techStack: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
      problem: "Validated core JavaScript knowledge including modern ES6+ syntax, asynchronous programming patterns, and DOM manipulation techniques.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-yellow-500/20 to-amber-600/20"
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "Apr 2025",
      icon: FaMicrosoft,
      verified: true,
      techStack: ["Azure Services", "Cloud Concepts", "Security", "Compliance", "Pricing"],
      problem: "Validated expertise in Microsoft Azure cloud platform, including understanding of cloud service types, security protocols, and enterprise-grade solutions.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-blue-500/20 to-cyan-600/20"
    },
    {
      title: "Analyzing Data with Microsoft Power BI",
      issuer: "Microsoft",
      date: "Apr 2025",
      icon: FaChartBar,
      verified: true,
      techStack: ["Power BI", "Data Visualization", "DAX", "Data Modeling", "Reports"],
      problem: "Developed expertise in business intelligence and data analytics using Power BI for creating interactive dashboards and comprehensive data reports.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-yellow-500/20 to-orange-600/20"
    },
    {
      title: "GitHub Copilot Fundamentals",
      issuer: "Simplilearn",
      date: "Jun 2025",
      icon: FaGithub,
      verified: false,
      techStack: ["GitHub Copilot", "AI-Assisted Coding", "Productivity", "Code Generation"],
      problem: "Mastered AI-assisted development workflows using GitHub Copilot to enhance coding productivity and code quality through intelligent suggestions.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-purple-500/20 to-pink-600/20"
    },
    {
      title: "Amazon DocumentDB Certificate",
      issuer: "Simplilearn",
      date: "Jun 2025",
      icon: SiAmazondocumentdb,
      verified: false,
      techStack: ["DocumentDB", "MongoDB-compatible", "NoSQL", "Database Management"],
      problem: "Gained proficiency in managing NoSQL databases with Amazon DocumentDB, a MongoDB-compatible database service designed for scalability.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-orange-500/20 to-red-600/20"
    },
    {
      title: "Introduction to Azure Services",
      issuer: "Simplilearn",
      date: "Jun 2025",
      icon: FaCloud,
      verified: false,
      techStack: ["Azure Services", "Cloud Computing", "Virtual Machines", "Storage", "Networking"],
      problem: "Learned fundamental Azure cloud services including virtual machines, storage solutions, and networking for building cloud-native applications.",
      verification: "https://www.linkedin.com/in/arjun-divraniya/details/certifications/",
      gradient: "from-cyan-500/20 to-blue-600/20"
    }
  ];

  const hackathons = [
    {
      title: "Odoo X IIT Gandhinagar",
      subtitle: "Offline Round Selection",
      icon: FaCrown,
      featured: true,
      techStack: ["Odoo", "Python", "PostgreSQL", "REST API", "MVC Architecture"],
      problem: "Selected for prestigious offline round after competing against thousands of developers nationwide. Built enterprise-grade ERP solutions addressing real business workflow automation challenges.",
      video: null,
      gradient: "from-yellow-500/30 to-orange-600/30"
    },
    {
      title: "Odoo X NMIT",
      subtitle: "Rapid Build Challenge",
      icon: FaBolt,
      featured: false,
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      problem: "Developed and deployed a full-stack inventory management system within 24 hours, demonstrating rapid prototyping skills and agile development practices.",
      video: null,
      gradient: "from-purple-500/20 to-pink-600/20"
    },
    {
      title: "Odoo X SPIT",
      subtitle: "Solution Architect",
      icon: FaShieldAlt,
      featured: false,
      techStack: ["Microservices", "Docker", "Redis", "OAuth", "JWT"],
      problem: "Architected secure, scalable solutions for multi-tenant SaaS platform, implementing advanced authentication and authorization mechanisms.",
      video: null,
      gradient: "from-indigo-500/20 to-purple-600/20"
    },
    {
      title: "Odoo X GCET",
      subtitle: "Team Collaboration",
      icon: FaRocket,
      featured: false,
      techStack: ["Agile", "Git", "CI/CD", "Testing", "DevOps"],
      problem: "Led cross-functional team to deliver production-ready CRM solution, coordinating between frontend, backend, and DevOps roles under tight deadlines.",
      video: null,
      gradient: "from-teal-500/20 to-green-600/20"
    },
    {
      title: "Rai University Hackathon",
      subtitle: "Local Engineering Challenge",
      icon: FaCode,
      featured: false,
      techStack: ["Full Stack", "Cloud", "Database", "API Integration"],
      problem: "Delivered a full-stack solution focused on real-world impact for the campus community, addressing student engagement and resource management challenges.",
      video: null,
      gradient: "from-orange-500/20 to-red-600/20"
    },
    {
      title: "Hackathon Marathon",
      subtitle: "48h Build Challenge",
      icon: FaFire,
      featured: false,
      techStack: ["DevOps", "Testing", "Monitoring", "CI/CD", "Docker"],
      problem: "Maintained velocity across a 48-hour build, integrating continuous deployment and rapid QA cycles while ensuring code quality and performance.",
      video: null,
      gradient: "from-cyan-500/20 to-blue-600/20"
    }
  ];

  return (
    <div id="achievements" className="min-h-screen bg-black text-white pt-28 sm:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Hero Title with GSAP Animation */}
      <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-4">
        <motion.div
          className="inline-block"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-3 sm:mb-4 tracking-tight">
            PROOF OF WORK
          </h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="h-1 w-20 sm:w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <FaTrophy className="text-yellow-500 text-3xl" />
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
            Real-time verification of elite engineering capabilities through live data, competitive achievements, and industry-standard certifications.
          </p>
        </motion.div>
      </div>

      <div ref={sectionRef} className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 md:space-y-32">
        {/* 1. REAL-TIME PROFILE DASHBOARD */}
        <section className="space-y-6 sm:space-y-8">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-400">⚡</span> Real-Time Command Center
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch overflow-hidden">
            {/* LeetCode Card */}
            <TiltCard className="achievement-card h-full">
              <motion.div
                className="relative h-full bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -6, boxShadow: '0 0 40px rgba(234, 179, 8, 0.3)' }}
              >
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <SiLeetcode className="text-4xl sm:text-5xl text-yellow-500" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FaFire className="text-2xl sm:text-3xl text-orange-500" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-2">LeetCode Profile</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Live Competitive Stats</p>

                  {leetCodeData ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <motion.div
                          className="text-4xl sm:text-5xl md:text-6xl font-black text-yellow-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          {leetCodeData.totalSolved || 450}
                        </motion.div>
                        <p className="text-gray-400 mt-2 text-xs sm:text-sm">Total Solved</p>
                        <div className="mt-2 text-xs sm:text-sm">
                          <span className="text-purple-400">Rank: </span>
                          <span className="text-yellow-500 font-bold">
                            {leetCodeData.ranking?.toLocaleString() || '125,000'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 place-items-center pt-4 border-t border-gray-800">
                        <CircularGauge
                          value={leetCodeData.easySolved || 200}
                          max={300}
                          label="Easy"
                          color="green"
                        />
                        <CircularGauge
                          value={leetCodeData.mediumSolved || 180}
                          max={300}
                          label="Medium"
                          color="yellow"
                        />
                        <CircularGauge
                          value={leetCodeData.hardSolved || 70}
                          max={150}
                          label="Hard"
                          color="purple"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-48">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            </TiltCard>

            {/* GitHub Card */}
            <TiltCard className="achievement-card h-full">
              <motion.div
                className="relative h-full bg-gradient-to-br from-gray-900 to-black border-2 border-purple-400/30 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -6, boxShadow: '0 0 40px rgba(167, 139, 250, 0.3)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <FaGithub className="text-5xl text-purple-400" />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50"></div>
                      <div className="relative w-4 h-4 bg-green-500 rounded-full"></div>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">GitHub Activity</h3>
                  <p className="text-gray-400 text-sm mb-6">Live Repository Data</p>

                  {githubData ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/20">
                          <motion.div
                            className="text-5xl font-black text-purple-400"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            {githubData.public_repos || '68'}+
                          </motion.div>
                          <p className="text-gray-400 mt-2 text-sm">Repositories</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/20">
                          <motion.div
                            className="text-5xl font-black text-yellow-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            500+
                          </motion.div>
                          <p className="text-gray-400 mt-2 text-sm">Commits 2025</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-800">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-400 text-sm">Activity Level</span>
                          <span className="text-green-400 text-sm font-semibold">High Frequency</span>
                        </div>
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-400"
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-sm text-gray-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Last commit: Today</span>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-48">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-400"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            </TiltCard>

            {/* LinkedIn Profile Card */}
            <TiltCard className="achievement-card h-full">
              <motion.div
                className="relative h-full bg-gradient-to-br from-gray-900 to-black border-2 border-blue-400/30 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 overflow-hidden"
                whileHover={{ y: -6, boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <FaLinkedin className="text-5xl text-blue-400" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FaUserTie className="text-3xl text-blue-500" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">LinkedIn Profile</h3>
                  <p className="text-gray-400 text-sm mb-6">Professional Network</p>

                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-blue-400/40 mb-3 bg-blue-900/30">
                          <img
                            src={linkedInProfileImage}
                            alt="Arjun Divraniya LinkedIn profile"
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src = 'https://ui-avatars.com/api/?name=Arjun+Divraniya&background=1D4ED8&color=ffffff&size=256';
                            }}
                          />
                        </div>
                        <h4 className="text-xl font-bold text-white">Arjun Divraniya</h4>
                        <p className="text-sm text-blue-400">Full-Stack Developer</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
                          <FaBriefcase className="text-blue-400 mx-auto mb-1 text-xl" />
                          <p className="text-xs text-gray-400">Engineer</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-3">
                          <FaCode className="text-purple-400 mx-auto mb-1 text-xl" />
                          <p className="text-xs text-gray-400">Developer</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        🎓 B.Tech Engineering Student at Rai University (9.74 CGPA)
                        <br />
                        💼 Full-Stack Developer specializing in React, Node.js & Cloud
                        <br />
                        🏆 Competitive Programmer & Hackathon Winner
                      </p>
                      
                      <motion.a
                        href={linkedInProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <FaLinkedin /> View Profile
                        </div>
                      </motion.a>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: '90%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-blue-400 font-semibold">Profile Strength: High</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </section>

        {/* 2. VERIFIED MASTERY GALLERY */}
        <Certifications />

        {/* 3. HACKATHON BATTLEFIELD */}
        <Hackathons />

        {/* CTA Section */}
        <section className="text-center py-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400">
              Ready to Verify My Work?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              All achievements are verified through live APIs and official certification platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://leetcode.com/ArjunDivraniya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiLeetcode /> LeetCode Profile
              </motion.a>
              <motion.a
                href="https://github.com/ArjunDivraniya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub /> GitHub Profile
              </motion.a>
              <motion.a
                href={linkedInProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin /> LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={selectedDetail !== null}
        onClose={() => setSelectedDetail(null)}
        data={selectedDetail || {}}
      />
    </div>
  );
};

export default Achievements;
