import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCamera,
  FaCompass,
  FaPlay,
  FaTimes,
  FaTree,
  FaMountain,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Adventure Card Component
const AdventureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-black/40 border border-yellow-500/20 hover:border-yellow-500/60 p-6 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, borderColor: "rgba(234,179,8,0.6)" }}
    >
      <motion.div
        className="text-yellow-400 mb-3"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
      >
        <Icon size={40} />
      </motion.div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function CreativePassions() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-black via-green-950/5 to-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80')",
            backgroundSize: "cover",
          }}
        />
      </div>

      <div className="section-container relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30"
            animate={{
              borderColor: ["rgba(168,139,250,0.3)", "rgba(168,139,250,0.6)", "rgba(168,139,250,0.3)"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-purple-400 text-sm font-bold">🌲 Beyond the Code</span>
          </motion.div>

          <h2 className="fluid-title font-black mb-3 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
            Exploring the Wild
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            4+ years of wildlife photography, videography & adventure. The patience of nature reflects in my code.
          </p>
        </motion.div>

        {/* Adventure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <AdventureCard
            icon={FaCamera}
            title="Wildlife Photography"
            description="Capturing raw nature through a lens. Every shot tells a story of patience and observation."
            index={0}
          />
          <AdventureCard
            icon={FaMountain}
            title="Mountain Expeditions"
            description="Exploring peaks and trails. Technical mastery in challenging environments."
            index={1}
          />
          <AdventureCard
            icon={FaTree}
            title="Forest Adventures"
            description="Deep forest expeditions. Understanding nature's complexity mirrors debugging code."
            index={2}
          />
        </div>

        {/* Closing Statement */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              As a <span className="text-yellow-400 font-bold">Technical Creative</span>, I merge{" "}
              <span className="text-purple-400 font-bold">technical excellence</span> with{" "}
              <span className="text-green-400 font-bold">artistic vision</span>. 
              The patience required for perfect wildlife shots translates directly to writing clean, 
              intuitive, production-ready code.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
