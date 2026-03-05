import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub, FaDatabase, FaLock, FaImage, FaMobile, FaDesktop } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// ===================== SYSTEM FLOW ANIMATION =====================
const SystemFlowAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timeline = gsap.timeline({ repeat: -1 });
    
    // Animate arrows flowing from Admin -> Database -> Frontend
    timeline
      .to('.flow-admin', { opacity: 1, duration: 0.5 }, 0)
      .to('.flow-arrow-1', { strokeDashoffset: 0, duration: 0.8 }, 0.3)
      .to('.flow-db', { opacity: 1, duration: 0.5 }, 0.8)
      .to('.flow-arrow-2', { strokeDashoffset: 0, duration: 0.8 }, 1.1)
      .to('.flow-frontend', { opacity: 1, duration: 0.5 }, 1.6)
      .to('.flow-admin', { opacity: 0.6, duration: 0.3 }, 2.5)
      .to('.flow-db', { opacity: 0.6, duration: 0.3 }, 2.5)
      .to('.flow-frontend', { opacity: 0.6, duration: 0.3 }, 2.5);

    return () => timeline.kill();
  }, []);

  return (
    <div ref={containerRef} className="flex justify-around items-center w-full h-40 bg-gradient-to-r from-black via-purple-900/10 to-black rounded-xl border border-yellow-500/20 p-6 my-6">
      <div className="text-center">
        <div className="flow-admin opacity-60 text-4xl mb-2">⚙️</div>
        <p className="text-xs text-yellow-400 font-bold">Admin Panel</p>
        <p className="text-xs text-gray-400">CMS Engine</p>
      </div>

      <svg width="120" height="60" className="relative">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#eab308" />
          </marker>
        </defs>
        <line x1="0" y1="30" x2="100" y2="30" stroke="#eab308" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="flow-arrow-1" markerEnd="url(#arrowhead)" />
      </svg>

      <div className="text-center">
        <div className="flow-db opacity-60 text-4xl mb-2">🗄️</div>
        <p className="text-xs text-yellow-400 font-bold">Database</p>
        <p className="text-xs text-gray-400">Real-Time Sync</p>
      </div>

      <svg width="120" height="60" className="relative">
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#eab308" />
          </marker>
        </defs>
        <line x1="0" y1="30" x2="100" y2="30" stroke="#eab308" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="flow-arrow-2" markerEnd="url(#arrowhead2)" />
      </svg>

      <div className="text-center">
        <div className="flow-frontend opacity-60 text-4xl mb-2">📱</div>
        <p className="text-xs text-yellow-400 font-bold">Public Frontend</p>
        <p className="text-xs text-gray-400">Read-Only</p>
      </div>
    </div>
  );
};

// ===================== DEVICE TOGGLE 3D ANIMATION =====================
const DeviceToggle3D = ({ isHovering }) => {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  useEffect(() => {
    if (isHovering) {
      gsap.to(mobileRef.current, { rotationY: 360, duration: 2, ease: 'power2.inOut' });
      gsap.to(desktopRef.current, { rotationY: -360, duration: 2, ease: 'power2.inOut' });
    }
  }, [isHovering]);

  return (
    <div className="flex justify-center gap-8 my-6">
      <div ref={mobileRef} style={{ perspective: '1000px' }} className="flex flex-col items-center">
        <div className="w-16 h-32 bg-gradient-to-b from-gray-800 to-black border-4 border-yellow-500/50 rounded-2xl flex items-center justify-center mb-2">
          <FaMobile className="text-yellow-500 text-2xl" />
        </div>
        <p className="text-xs text-yellow-400 font-bold">Mobile</p>
        <p className="text-xs text-gray-400">Optimized Crop</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        <span className="text-yellow-400 text-xl font-bold">↔</span>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>

      <div ref={desktopRef} style={{ perspective: '1000px' }} className="flex flex-col items-center">
        <div className="w-32 h-20 bg-gradient-to-b from-gray-800 to-black border-4 border-yellow-500/50 rounded-lg flex items-center justify-center mb-2">
          <FaDesktop className="text-yellow-500 text-2xl" />
        </div>
        <p className="text-xs text-yellow-400 font-bold">Desktop</p>
        <p className="text-xs text-gray-400">Different Resolution</p>
      </div>
    </div>
  );
};

// Tech Orbit Component
const TechOrbit = ({ techs }) => {
  const orbitsRef = useRef(null);

  useEffect(() => {
    const orbit = orbitsRef.current;
    if (!orbit) return;

    gsap.to(orbit, {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div
      ref={orbitsRef}
      className="relative w-32 h-32 flex items-center justify-center"
    >
      {techs.map((tech, idx) => {
        const angle = (idx / techs.length) * Math.PI * 2;
        const radius = 60;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={idx}
            className="absolute w-12 h-12 flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/30 hover:border-yellow-500 transition-colors text-lg">
              {tech.icon}
            </div>
          </div>
        );
      })}
      <div className="absolute inset-0 rounded-full border border-yellow-500/20"></div>
    </div>
  );
};

// ===================== TECHNICAL CASE STUDY MODAL =====================
const TechnicalCaseStudyModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('architecture');

  const sections = {
    architecture: {
      title: 'Decoupled Architecture',
      icon: '🏗️',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h4 className="text-yellow-400 font-bold mb-2">Frontend (Read-Only)</h4>
            <p className="text-sm text-gray-300">Strictly read-only React application fetching real-time data. Zero write operations on public frontend ensures security and consistency.</p>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-purple-300 font-bold mb-2">Admin Panel (Write Operations)</h4>
            <p className="text-sm text-gray-300">Private CMS with JWT authentication. Admins manage all content, media, and SEO metadata with real-time database sync.</p>
          </div>
        </div>
      )
    },
    cms: {
      title: 'Custom Admin Engine',
      icon: '⚙️',
      content: (
        <div className="space-y-4">
          <div className="bg-black border border-yellow-500/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <FaLock className="text-yellow-500 mt-1" />
              <div>
                <p className="text-yellow-400 font-bold text-sm">Secure Authentication</p>
                <p className="text-gray-400 text-xs">JWT-based access control with role management</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaDatabase className="text-yellow-500 mt-1" />
              <div>
                <p className="text-yellow-400 font-bold text-sm">Content Management</p>
                <p className="text-gray-400 text-xs">CRUD operations for sections, projects, media assets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaImage className="text-yellow-500 mt-1" />
              <div>
                <p className="text-yellow-400 font-bold text-sm">SEO Management</p>
                <p className="text-gray-400 text-xs">Meta tags, descriptions, image alt text control</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    images: {
      title: 'Adaptive Image Pipeline',
      icon: '🖼️',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">Engineered a sophisticated image management system with:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-300"><span className="text-yellow-400 font-bold">Viewport Optimization:</span> Set specific crops & resolutions for Desktop vs Mobile</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-300"><span className="text-yellow-400 font-bold">Precision Sizing:</span> Pixel-perfect dimension controls for exact UI matching</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-300"><span className="text-yellow-400 font-bold">Cloudinary Integration:</span> Automatic optimization, format conversion, CDN delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-300"><span className="text-yellow-400 font-bold">No Distortion:</span> Smart resizing without aspect ratio compromise</p>
            </div>
          </div>
        </div>
      )
    },
    tech: {
      title: 'Tech Stack',
      icon: '🔧',
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'MongoDB', icon: SiMongodb },
            { name: 'Express.js', icon: SiExpress },
            { name: 'React', icon: SiReact },
            { name: 'Node.js', icon: SiNodedotjs },
            { name: 'Tailwind CSS', icon: SiTailwindcss },
            { name: 'JWT Auth', icon: FaLock },
          ].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div key={idx} className="flex items-center gap-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded">
                <Icon className="text-yellow-500" />
                <span className="text-sm text-gray-300">{tech.name}</span>
              </div>
            );
          })}
        </div>
      )
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black border border-yellow-500/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gradient-to-r from-black via-purple-900/20 to-black border-b border-yellow-500/20 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-black text-yellow-500">Technical Case Study</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-yellow-500 text-2xl">✕</button>
        </div>

        <div className="p-6">
          {/* Section Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`p-3 rounded-lg font-bold text-sm transition-all ${
                  activeSection === key
                    ? 'bg-yellow-500 text-black'
                    : 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                }`}
              >
                <div className="text-lg mb-1">{section.icon}</div>
                {section.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">{sections[activeSection].title}</h3>
            {sections[activeSection].content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Experience Card Component
const ExperienceCard = ({ experience, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      card,
      { rotationY: 20, opacity: 0.5 },
      {
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full max-w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-black via-purple-900/10 to-black border border-yellow-500/30 rounded-2xl hover:border-yellow-500/60 transition-all duration-300 overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-yellow-500 via-purple-500 to-black blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {experience.title}
                </h3>
                <p className="text-yellow-400 font-bold mb-1">{experience.role}</p>
                <p className="text-gray-400 text-sm">{experience.duration}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base [overflow-wrap:anywhere]">{experience.description}</p>

            <div className="space-y-5 mb-6">
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 sm:p-5">
                <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-2">Challenge</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere]">{experience.challenge}</p>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5">
                <h4 className="text-purple-300 font-bold text-sm uppercase tracking-wider mb-2">Solution</h4>
                <ul className="space-y-2">
                  {experience.solution.map((point) => (
                    <li key={point} className="text-gray-300 text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere]">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 sm:p-5">
                <h4 className="text-green-300 font-bold text-sm uppercase tracking-wider mb-2">Outcome</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed [overflow-wrap:anywhere]">{experience.outcome}</p>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 font-bold text-sm mb-2">Decoupled Architecture</p>
                <p className="text-xs text-gray-400">Read-only frontend, secured admin panel with JWT</p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 font-bold text-sm mb-2">Custom Admin Engine</p>
                <p className="text-xs text-gray-400">MERN-based CMS with real-time database sync</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 font-bold text-sm mb-2">Adaptive Images</p>
                <p className="text-xs text-gray-400">Viewport-optimized crops & precision sizing</p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 font-bold text-sm mb-2">Cloudinary Pipeline</p>
                <p className="text-xs text-gray-400">Auto-optimization & CDN delivery</p>
              </div>
            </div>

            {/* System Flow - shown on hover */}
            {isHovering && <SystemFlowAnimation />}

            {/* Device Toggle */}
            {isHovering && <DeviceToggle3D isHovering={isHovering} />}

            {/* Tech Stack */}
            <div className="mb-6">
              <p className="text-yellow-400 font-bold text-sm mb-4">Tech Stack</p>
              <TechOrbit techs={experience.techs} />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                📋 View Technical Case Study
              </motion.button>
              {experience.liveLink !== '#' && (
                <motion.a
                  href={experience.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                >
                  <FaExternalLinkAlt size={16} /> Live Demo
                </motion.a>
              )}
              {experience.repoLink !== '#' && (
                <motion.a
                  href={experience.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                >
                  <FaGithub size={16} /> Repository
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && <TechnicalCaseStudyModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

    </>
  );
};

// Main Experience Component
export default function Experience() {
  const experienceData = [
    {
      title: 'Cinematic Studio Management System & Portfolio',
      role: 'Lead Full-Stack Developer (Freelance)',
      duration: 'Jan 2024 - Present',
      description:
        'Architected a premium studio portfolio platform with decoupled architecture, featuring a high-performance read-only frontend and a custom admin engine. Built sophisticated image optimization pipeline with viewport-specific crops and precision sizing controls.',
      challenge:
        'Create a scalable, secure studio management system that enables admins to manage content with pixel-perfect image controls while delivering lightning-fast, read-only frontend experiences to end users.',
      solution: [
        'Decoupled Architecture: Frontend reads from centralized database, zero write operations for security',
        'Custom Admin Panel: JWT-secured CMS for content, media, and SEO management',
        'Adaptive Image Pipeline: Viewport optimization with desktop vs mobile crop controls',
        'Precision Sizing: Pixel-perfect dimensions ensuring images match layouts without distortion',
        'Cloudinary Integration: Automated image optimization, format conversion, and CDN delivery',
      ],
      outcome:
        'Successfully delivered a production-ready system with 98+ Lighthouse score, real-time content sync, and a seamless experience for both admins and public visitors.',
      techs: [
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟩' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Tailwind', icon: '🎨' },
        { name: 'Cloudinary', icon: '☁️' },
        { name: 'JWT', icon: '🔐' },
      ],
      liveLink: '#',
      repoLink: '#',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black py-20 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-full mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Professional <span className="text-yellow-500">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Senior Software Architect - Building scalable, high-performance systems with meticulous attention to technical excellence
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experienceData.map((experience, idx) => (
            <ExperienceCard
              key={idx}
              experience={experience}
              index={idx}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
