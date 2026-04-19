// File: src/Components/CompetitiveCoding.jsx (repurposed as Hackathons & Events)

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaCrown, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const hackathons = [
  {
    name: "Odoo X IIT Gandhinagar",
    role: "Offline Selected Round",
    date: "2025",
    badge: "Elite Selection",
    highlight: "Elite Offline Selection",
    description: "Selected for the prestigious offline round after a highly competitive online phase.",
    tech: ["Odoo", "Python", "PostgreSQL", "REST"],
    verified: true,
  },
  {
    name: "Odoo X NMIT",
    role: "Online Hackathon",
    date: "2025",
    badge: "Rapid Build",
    highlight: "Fast Prototyping",
    description: "Built and deployed features under 24 hours with lean sprints and quick iterations.",
    tech: ["React", "Node", "Tailwind", "API"],
    verified: false,
  },
  {
    name: "Odoo X SPIT",
    role: "Competitive Coding",
    date: "2025",
    badge: "Solution Architect",
    highlight: "Problem Solving",
    description: "Architected secure, scalable solutions during timed competitive rounds.",
    tech: ["Data Structures", "Algorithms", "Security"],
    verified: false,
  },
  {
    name: "Odoo X GCET",
    role: "Team Build",
    date: "2025",
    badge: "Collaboration",
    highlight: "Team Dynamics",
    description: "Co-led a multi-role squad to ship a working product in a high-pressure environment.",
    tech: ["Scrum", "Git", "CI/CD"],
    verified: false,
  },
  {
    name: "Rai University Hackathon",
    role: "Local Engineering Challenge",
    date: "2025",
    badge: "Full-Stack",
    highlight: "End-to-End Delivery",
    description: "Delivered a full-stack solution focused on real-world impact for the campus community.",
    tech: ["Full Stack", "Cloud", "Database"],
    verified: false,
  },
  {
    name: "Hackathon Marathon",
    role: "48h Build Challenge",
    date: "2025",
    badge: "Endurance",
    highlight: "24/7 Shipping",
    description: "Maintained velocity across a 48-hour build, integrating CI/CD and rapid QA cycles.",
    tech: ["DevOps", "Testing", "Monitoring"],
    verified: false,
  },
];

const HackathonCard = ({ item, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(useSpring(y, { stiffness: 150, damping: 20 }), [-200, 200], [12, -12]);
  const ry = useTransform(useSpring(x, { stiffness: 150, damping: 20 }), [-200, 200], [-12, 12]);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative perspective-1000"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full p-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-purple-900/20 border border-yellow-500/30 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
        whileHover={{ scale: 1.03, borderColor: "rgba(234,179,8,0.6)", boxShadow: "0 30px 80px -20px rgba(234,179,8,0.4)" }}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 text-xs font-bold text-yellow-300" style={{ transform: "translateZ(30px)" }}>
          <FaCrown className="text-yellow-400" size={14} />
          <span>{item.badge}</span>
          {item.verified && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-400/50 text-green-300 text-[10px] uppercase">Verified</span>
          )}
        </div>

        {/* Header */}
        <div className="mt-3 flex items-start justify-between gap-3" style={{ transform: "translateZ(25px)" }}>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-yellow-300 leading-tight">{item.name}</h3>
            <p className="text-sm text-purple-300">{item.role}</p>
            <span className="text-xs text-gray-400">{item.date}</span>
          </div>
          <motion.div
            className="h-12 w-12 rounded-xl border border-yellow-500/40 bg-black/60 flex items-center justify-center text-yellow-300"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <FaCode size={18} />
          </motion.div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-300 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
          {item.description}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-2" style={{ transform: "translateZ(18px)" }}>
          {item.tech.map((tech, i) => (
            <motion.span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-xs"
              whileHover={{ scale: 1.08, backgroundColor: "rgba(234,179,8,0.12)", borderColor: "rgba(234,179,8,0.4)" }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="https://www.linkedin.com/in/arjun-divraniya-/details/certifications/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-sm shadow-[0_10px_30px_-8px_rgba(234,179,8,0.5)]"
          style={{ transform: "translateZ(16px)" }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaExternalLinkAlt size={12} />
          View Credential
        </motion.a>

        {/* Shine */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{ transform: "translateZ(40px)" }}
          animate={{ x: ["-200%", "200%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const HackathonsSection = () => {
  return (
    <section className="px-4 sm:px-8 py-16 bg-black" id="hackathons">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/40 text-yellow-300 text-xs font-bold tracking-[0.2em]">
            Hackathons & Events
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white">
            High-Impact <span className="text-purple-400">Build-athons</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            Six competitive hackathons proving rapid problem-solving, cross-functional teamwork, and end-to-end delivery under time pressure. Includes elite offline selection at IIT Gandhinagar.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          {hackathons.map((item, index) => (
            <HackathonCard key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonsSection;