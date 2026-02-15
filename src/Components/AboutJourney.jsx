import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCamera, FaCode, FaPython } from 'react-icons/fa';
import { MdAutoFixHigh } from 'react-icons/md';
import './AboutJourney.css';

gsap.registerPlugin(ScrollTrigger);

// ===================== ABOUT JOURNEY ROADMAP =====================
export default function AboutJourney() {
  const timelineRef = useRef(null);
  const glowPathRef = useRef(null);
  const phasesRef = useRef([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Get all phase cards and nodes
    const phaseCards = gsap.utils.toArray('.phase-card');
    const phaseNodes = gsap.utils.toArray('.phase-node');
    const glowPath = glowPathRef.current;

    // ===================== ANIMATE THE GLOWING PATH =====================
    gsap.to(glowPath, {
      scrollTrigger: {
        trigger: timeline,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      strokeDashoffset: 0,
      duration: 2,
      ease: 'none',
    });

    // ===================== ANIMATE PHASE CARDS =====================
    phaseCards.forEach((card, index) => {
      const node = phaseNodes[index];
      const isLeft = index % 2 === 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotationY: isLeft ? -45 : 45,
          scale: 0.8,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top center+=100px',
            end: 'top center-=100px',
            scrub: 0.5,
            markers: false,
          },
          opacity: 1,
          x: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out',
        }
      );

      // ===================== PULSE ANIMATION FOR NODES =====================
      gsap.fromTo(
        node,
        {
          scale: 1,
          boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
        },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
              gsap.to(node, {
                scale: 1.3,
                boxShadow: '0 0 30px rgba(234, 179, 8, 1)',
                duration: 0.6,
                repeat: -1,
                yoyo: true,
              });
            },
            onLeave: () => {
              gsap.killTweensOf(node);
              gsap.to(node, {
                scale: 1,
                boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
                duration: 0.3,
              });
            },
            onEnterBack: () => {
              gsap.to(node, {
                scale: 1.3,
                boxShadow: '0 0 30px rgba(234, 179, 8, 1)',
                duration: 0.6,
                repeat: -1,
                yoyo: true,
              });
            },
            onLeaveBack: () => {
              gsap.killTweensOf(node);
              gsap.to(node, {
                scale: 1,
                boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
                duration: 0.3,
              });
            },
          },
        }
      );
    });

    // ===================== SCROLL TRIGGER CLEANUP =====================
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const phases = [
    {
      year: '2022',
      title: 'Creative Spark',
      subtitle: '2022 & Before',
      icon: <FaCamera className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      description:
        'Completed 10th grade and dove deep into creative pursuits. Mastered wildlife photography, video editing, and logo design. My lens became my voice—capturing the untamed beauty of nature.',
      highlights: [
        '📸 Wildlife Photography - Capturing moments in the wild',
        '🎬 Video Editing - Crafting compelling visual narratives',
        '🎨 Logo Design - Creating brand identities from scratch',
        '🌿 Nature Immersion - Exploring the world through creativity',
      ],
      isLeft: true,
    },
    {
      year: '2024',
      title: 'Logical Shift',
      subtitle: 'Grade 12 & Transition',
      icon: <FaPython className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      description:
        'Completed 12th grade and experienced a profound shift in perspective. Developed an obsession with mathematics, logical puzzles, and algorithmic thinking. Chose Computer Science as my path forward.',
      highlights: [
        '∑ Mathematics Mastery - Competitive math and problem-solving',
        '🧩 Logical Puzzles - Building algorithmic thinking',
        '💭 Pattern Recognition - Finding elegant solutions',
        '🚀 CS Decision - Committing to technology as my career',
      ],
      isLeft: false,
    },
    {
      year: '2024-2025',
      title: 'The Foundation',
      subtitle: 'B.Tech Year 1',
      icon: <FaCode className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      description:
        'Started my B.Tech journey and established strong fundamentals. Mastered core CS concepts, learned advanced architecture principles, and laid the groundwork for deep technical expertise.',
      highlights: [
        '🏗️ Core CS Fundamentals - DSA, OOP, DBMS mastery',
        '⚙️ Advanced Architecture - System design & patterns',
        '💻 Full-Stack Basics - Frontend, backend, databases',
        '🎓 Academic Excellence - Building strong foundations',
      ],
      isLeft: true,
    },
    {
      year: '2026',
      title: 'The Architect',
      subtitle: '2nd Year, 2nd Semester',
      icon: <MdAutoFixHigh className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-400',
      description:
        'Currently in 2nd year, exploring deep-tech and full-stack scalability. Achieving a 9.74 CGPA while building real-world systems, cloud solutions, and enterprise-grade architectures.',
      highlights: [
        '🔥 Deep-Tech Exploration - AI, Cloud, Microservices',
        '📊 Full-Stack Scalability - Building production systems',
        '🏆 Elite Performance - 9.74 CGPA achievement',
        '🌐 Real-World Systems - From concept to deployment',
      ],
      cgpa: '9.74',
      isLeft: false,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black py-20 px-4 overflow-hidden">
      {/* ===================== BACKGROUND ELEMENTS ===================== */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* ===================== TIMELINE CONTAINER ===================== */}
      <div ref={timelineRef} className="relative z-10 max-w-6xl mx-auto">
        {/* ===================== SECTION HEADER ===================== */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            My Journey <span className="text-yellow-500">Unfolds</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From creative spark to architectural mastery—a timeline of evolution and transformation
          </p>
        </motion.div>

        {/* ===================== VERTICAL TIMELINE ===================== */}
        <div className="relative py-10">
          {/* SVG Glowing Path */}
          <svg
            className="absolute left-1/2 top-0 w-1 h-full transform -translate-x-1/2 md:left-auto md:right-auto md:inset-0 md:m-auto"
            style={{ perspective: '1000px' }}
          >
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0)" />
                <stop offset="50%" stopColor="rgba(234, 179, 8, 1)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.5)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              ref={glowPathRef}
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              filter="url(#glow)"
            />
          </svg>

          {/* ===================== PHASE CARDS ===================== */}
          <div className="space-y-20">
            {phases.map((phase, index) => (
              <div key={index} className="relative h-96">
                {/* Timeline Node */}
                <div
                  ref={(el) => (phasesRef.current[index] = el)}
                  className={`phase-node absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300`}
                  style={{
                    boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
                  }}
                />

                {/* Phase Card Container */}
                <motion.div
                  className={`phase-card absolute top-1/2 transform -translate-y-1/2 w-full md:w-5/12 ${
                    phase.isLeft
                      ? 'md:left-0 md:text-right md:pr-20 left-1/2 md:translate-x-0 -translate-x-1/2'
                      : 'md:right-0 md:text-left md:pl-20 left-1/2 md:translate-x-0 -translate-x-1/2'
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  {/* Glassmorphism Card */}
                  <div className="group relative p-8 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/10 backdrop-blur-lg border border-yellow-500/20 rounded-2xl hover:border-yellow-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Year Badge */}
                      <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-sm rounded-full">
                          {phase.year}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className={`mb-4 text-4xl ${phase.color} bg-gradient-to-r bg-clip-text text-transparent`}>
                        {phase.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-black text-white mb-1">{phase.title}</h3>
                      <p className="text-yellow-500 font-semibold mb-4">{phase.subtitle}</p>

                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed text-justify md:text-left">
                        {phase.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {phase.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">▸</span>
                            <p className="text-sm text-gray-300">{highlight}</p>
                          </div>
                        ))}
                      </div>

                      {/* CGPA Badge for 2026 */}
                      {phase.cgpa && (
                        <motion.div
                          className="flex items-center justify-start md:justify-end gap-3 pt-4 border-t border-yellow-500/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-sm font-semibold text-gray-400">Elite Achievement:</span>
                          <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-black rounded-lg shadow-lg">
                            {phase.cgpa} CGPA
                          </span>
                        </motion.div>
                      )}

                      {/* Hover Effect Border */}
                      <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== CALL TO ACTION ===================== */}
        <motion.div
          className="text-center mt-20 pt-20 border-t border-yellow-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-6">
            This is just the beginning. Let's build something extraordinary together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Let's Collaborate 🚀
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
