import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaCamera, FaAward } from "react-icons/fa";
import { SiCplusplus, SiLeetcode } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { isMobile, getHoverProps } from "../utils/mobileOptimization";

// **KEEP YOUR EXACT IMAGE IMPORTS**
import headshotImage from "../assets/Profile/Arjun.webp";
import portfolioImageOne from "../assets/Profile/Arjun-Portfolio-1.webp";
import photographyImageOne from "../assets/Profile/Arjun-Portfolio-2.webp";
import photographyImageTwo from "../assets/Profile/Arjun-Portfolio-3.webp";

// Staging all components exactly as in your original file
const AnimatedNameChar = ({ char }) => {
  const mobile = isMobile();
  return (
    <motion.span
      className="inline-block relative"
      {...(!mobile && {
        whileHover: { scale: 1.3, color: "#fbbf24" },
      })}
      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
    >
      <motion.span
        className="inline-block"
        animate={!mobile ? {
          textShadow: [
            "0 0 10px rgba(250, 204, 21, 0.6)",
            "0 0 20px rgba(251, 191, 36, 0.8)",
            "0 0 10px rgba(250, 204, 21, 0.6)",
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
};

// **1. UPDATED: Refactored Data Structure for Stack Logic**
const heroGalleryImages = [
  { id: "1", src: headshotImage, alt: "Arjun Headshot" },
  { id: "2", src: portfolioImageOne, alt: "Portfolio Frame One" },
  { id: "3", src: photographyImageOne, alt: "Photography Frame One" },
  { id: "4", src: photographyImageTwo, alt: "Photography Frame Two" },
  { id: "5", src: portfolioImageOne, alt: "Portfolio Close Frame" },
];

const AchievementCard = ({ title, subtitle, badge, icon: Icon, iconColor, link, delay, position }) => {
  const mobile = isMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], mobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(x, [-100, 100], mobile ? [0, 0] : [-10, 10]);

  return (
    <motion.div
      className="absolute"
      style={{ ...position }}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      drag={!mobile}
      onMouseMove={!mobile ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      } : undefined}
      onMouseLeave={!mobile ? () => { x.set(0); y.set(0); } : undefined}
    >
      <motion.div
        className="p-4 rounded-2xl bg-gradient-to-br from-black/70 via-black/60 to-purple-900/40 border border-yellow-500/30 backdrop-blur-2xl shadow-xl cursor-grab max-w-xs"
        style={{ rotateX, rotateY, transformStyle: mobile ? "flat" : "preserve-3d" }}
        animate={!mobile ? { y: [0, -25, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 }}
      >
        <div className="flex items-center gap-3">
          {Icon && <div className={`h-14 w-14 rounded-xl bg-black/60 border border-yellow-400/30 flex items-center justify-center ${iconColor}`}><Icon size={26} /></div>}
          <div className="space-y-1">
            <p className="font-extrabold text-yellow-300 text-base leading-tight">{title}</p>
            <p className="text-xs text-gray-300 leading-tight">{subtitle}</p>
            {badge && <span className="inline-block text-[10px] bg-yellow-500/30 px-2.5 py-1 rounded-full">{badge}</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 10 });
  const springY = useSpring(y, { stiffness: 200, damping: 10 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      className="relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-black font-bold bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg"
    >
      {children}
      <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
    </motion.button>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const mobile = isMobile();
  const [mounted, setMounted] = useState(false);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const auraX = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  const auraY = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });

  const rotateX = useTransform(useSpring(cursorY, { stiffness: 100, damping: 25 }), [-300, 300], [15, -15]);
  const rotateY = useTransform(useSpring(cursorX, { stiffness: 100, damping: 25 }), [-300, 300], [-15, 15]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % heroGalleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // LeetCode fetching logic remains exact same
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/Arjun_divraniya');
        if (response.ok) {
          const data = await response.json();
          setLeetcodeData({
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            ranking: data.ranking || 'N/A',
          });
        }
      } catch (error) { console.error('Failed to fetch LeetCode data:', error); }
    };
    fetchLeetCodeData();
  }, []);

  // **2. UPDATED: Logic for identifying background cards (Stack logic)**
  const prevIndex = (activeGalleryIndex - 1 + heroGalleryImages.length) % heroGalleryImages.length;
  const nextIndex = (activeGalleryIndex + 1) % heroGalleryImages.length;

  // Exact same cards and links as your file
  const achievementCards = [
    { title: "9.74 CGPA", subtitle: "Rai University", badge: "Academic Excellence", icon: FaAward, iconColor: "text-yellow-400", position: { top: "8%", left: "5%" } },
    { title: leetcodeData ? `${leetcodeData.totalSolved}+ Problems` : "Loading...", subtitle: "DSA Mastery", icon: SiCplusplus, iconColor: "text-blue-500", link: "https://leetcode.com/u/Arjun_divraniya", position: { bottom: "30%", left: "3%" } },
    { title: "68+ Repos", subtitle: "GitHub Portfolio", badge: "500+ Commits", icon: FaGithub, iconColor: "text-purple-400", link: "https://github.com/ArjunDivraniya", position: { top: "45%", right: "4%" } },
    { title: leetcodeData ? `Rank #${Math.floor(leetcodeData.ranking / 1000)}K` : "Loading...", subtitle: "LeetCode Global", icon: SiLeetcode, iconColor: "text-orange-500", link: "https://leetcode.com/u/Arjun_divraniya", position: { bottom: "10%", right: "6%" } },
    { title: "Open Source", subtitle: "Contributor", icon: FiUsers, iconColor: "text-cyan-400", link: "https://github.com/ArjunDivraniya", position: { bottom: "50%", left: "6%" } },
  ];

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black pt-20 sm:pt-24">
      {/* **UNTOUCHED: Background Auroras** */}
      <motion.div className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent 40%)" }} animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 80% 40%, rgba(250,204,21,0.25), transparent 45%)" }} animate={{ scale: [1.05, 0.95, 1.05], x: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity }} />
      </motion.div>

      {/* **UNTOUCHED: Achievement Cards (Legacy CSS via `AchievementCard` props)** */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-auto hidden lg:block">
          {achievementCards.map((card, idx) => (
            <AchievementCard key={idx} {...card} delay={idx * 0.15} />
          ))}
        </div>
      )}

      <div className="relative z-20 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center mx-auto">
        {/* **UNTOUCHED: Left Text Column (Staggered Entrance/TypeAnimation)** */}
        <motion.div className="space-y-4 sm:space-y-6 lg:order-1 order-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-yellow-300 leading-tight whitespace-nowrap">
              {"ARJUN DIVRANIYA".split("").map((c, i) => <AnimatedNameChar key={i} char={c === " " ? "\u00A0" : c} />)}
            </h1>
            <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              Engineering Scalable Tech Solutions for Real-World Problems
            </motion.p>
          </motion.div>
          <motion.div className="text-xl sm:text-2xl md:text-3xl font-bold h-16 sm:h-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              <TypeAnimation sequence={["Full Stack Developer", 2200, "UI/UX Visionary", 2200, "Wildlife Photographer", 2200, "Competitive Coder", 2200]} speed={50} repeat={Infinity} cursor={true} />
            </div>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <MagneticButton onClick={() => navigate("/contact")}>Get In Touch</MagneticButton>
            <motion.a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border border-yellow-400/50 text-white font-semibold hover:border-yellow-300 hover:bg-yellow-500/10 transition-all" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(250,204,21,0.3)" }} whileTap={{ scale: 0.95 }}>
              View Portfolio <span>↓</span>
            </motion.a>
          </motion.div>
          {/* Social Icons untouched */}
          <motion.div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            {[ { Icon: FaGithub, href: "https://github.com/ArjunDivraniya", label: "GitHub" }, { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" }, { Icon: FaCamera, href: "#projects", label: "Photography" } ].map((social, idx) => (
              <motion.a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-all" {...getHoverProps({ scale: 1.2, y: -4 })} whileTap={{ scale: 0.9 }}>
                <social.Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* **3. UPDATED: Visual Column - Only the Image logic is refactored** */}
        <motion.div
          ref={containerRef}
          className="relative w-full flex justify-center lg:order-2 order-1"
          onMouseMove={!mobile ? (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            cursorX.set(e.clientX - (rect.left + rect.width / 2));
            cursorY.set(e.clientY - (rect.top + rect.height / 2));
          } : undefined}
          onMouseLeave={!mobile ? () => { cursorX.set(0); cursorY.set(0); } : undefined}
          style={mobile ? {} : { perspective: "2000px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* **UNTOUCHED: Interactive Aura Glow** */}
          {!mobile && <motion.div className="absolute inset-0 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,204,21,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)", x: auraX, y: auraY }} animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 8, repeat: Infinity }} />}

          {/* **UNTOUCHED CSS: Image Animation Container** */}
          <motion.div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[420px] sm:h-[520px] md:h-[620px]"
            style={mobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* **UNTOUCHED CSS: Central Glow** */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div className="absolute h-52 w-52 rounded-full blur-3xl" style={{ backgroundColor: "rgba(59,130,246,0.10)" }} />
            </div>

            {/* Mobile uses a single smooth slide-scale card; desktop keeps stacked perspective cards. */}
            <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
              {mobile ? (
                <div className="relative h-[320px] w-[240px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={heroGalleryImages[activeGalleryIndex].id}
                      src={heroGalleryImages[activeGalleryIndex].src}
                      alt={heroGalleryImages[activeGalleryIndex].alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ x: "100%", scale: 0.8, opacity: 0.9 }}
                      animate={{ x: 0, scale: 1, opacity: 1 }}
                      exit={{ x: "-100%", scale: 0.8, opacity: 0.9 }}
                      transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                      loading={activeGalleryIndex === 0 ? "eager" : "lazy"}
                      fetchPriority={activeGalleryIndex === 0 ? "high" : "auto"}
                    />
                  </AnimatePresence>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {heroGalleryImages.map((img, i) => {
                    const isCenter = i === activeGalleryIndex;
                    const isLeft = i === prevIndex;
                    const isRight = i === nextIndex;

                    if (!isCenter && !isLeft && !isRight) return null;

                    return (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.8, x: isRight ? 100 : isLeft ? -100 : 0 }}
                        animate={{
                          opacity: isCenter ? 1 : 0.4,
                          scale: isCenter ? 1 : 0.75,
                          x: isCenter ? 0 : isLeft ? -140 : 140,
                          rotateY: isCenter ? 0 : isLeft ? 25 : -25,
                          zIndex: isCenter ? 30 : 10,
                          filter: isCenter ? "blur(0px)" : "blur(2px)",
                        }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute w-[240px] h-[320px] md:w-[320px] md:h-[450px] rounded-2xl sm:rounded-3xl object-cover overflow-hidden border-2 border-white/10 shadow-2xl origin-bottom"
                      >
                        <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
                        {!isCenter && <div className="absolute inset-0 bg-black/40" />}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* **UNTOUCHED: Scroll Indicator** */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-8 h-12 border-2 border-yellow-400/40 rounded-full mx-auto flex justify-center pt-2">
          <motion.span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
        <p className="text-xs mt-3 tracking-widest uppercase">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;