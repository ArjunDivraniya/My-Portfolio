import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaCamera, FaStar, FaAward, FaCode, FaTrophy } from "react-icons/fa";
import { SiCplusplus, SiLeetcode } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { isMobile, getHoverProps, getMobileInViewProps, conditionalAnimation } from "../utils/mobileOptimization";

// Animated Name Characters with Fire Effect (Mobile-Optimized)
const AnimatedNameChar = ({ char, index }) => {
  const mobile = isMobile();
  
  return (
    <motion.span
      className="inline-block relative"
      {...(!mobile && {
        whileHover: {
          scale: 1.3,
          color: "#fbbf24",
        }
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
        transition={{
          duration: mobile ? 0 : 2,
          repeat: mobile ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
};

// Floating 3D Achievement Cards with Draggable Physics (Mobile-Optimized)
const AchievementCard = ({ title, subtitle, badge, icon: Icon, iconColor, link, delay, position }) => {
  const mobile = isMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], mobile ? [0, 0] : [10, -10]);
  const rotateY = useTransform(x, [-100, 100], mobile ? [0, 0] : [-10, 10]);

  const CardContent = (
    <motion.div
      className="p-4 rounded-2xl bg-gradient-to-br from-black/70 via-black/60 to-purple-900/40 border border-yellow-500/30 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(234,179,8,0.4)] cursor-grab active:cursor-grabbing max-w-xs"
      style={{
        rotateX: mobile ? 0 : rotateX,
        rotateY: mobile ? 0 : rotateY,
        transformStyle: mobile ? "flat" : "preserve-3d",
      }}
      {...getHoverProps({ 
        scale: 1.2, 
        zIndex: 100,
        boxShadow: "0 30px 80px -15px rgba(234,179,8,0.6)",
        borderColor: "rgba(234,179,8,0.6)"
      })}
      animate={!mobile ? {
        y: [0, -25, 0],
      } : {}}
      transition={{
        y: {
          duration: 3.5 + Math.random() * 2,
          repeat: mobile ? 0 : Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        },
      }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <motion.div
            className={`h-14 w-14 rounded-xl bg-black/60 border border-yellow-400/30 flex items-center justify-center ${iconColor} backdrop-blur`}
            animate={!mobile ? { 
              rotate: 360,
              boxShadow: [
                "0 0 20px rgba(234,179,8,0.3)",
                "0 0 30px rgba(234,179,8,0.6)",
                "0 0 20px rgba(234,179,8,0.3)",
              ]
            } : {}}
            transition={{ 
              rotate: { duration: mobile ? 0 : 20, repeat: mobile ? 0 : Infinity, ease: "linear" },
              boxShadow: { duration: mobile ? 0 : 2, repeat: mobile ? 0 : Infinity, ease: "easeInOut" }
            }}
          >
            <Icon size={26} />
          </motion.div>
        )}
        <div className="space-y-1">
          <p className="font-extrabold text-yellow-300 text-base leading-tight">{title}</p>
          <p className="text-xs text-gray-300 leading-tight">{subtitle}</p>
          {badge && (
            <motion.span 
              className="inline-block text-[10px] bg-yellow-500/30 text-yellow-100 px-2.5 py-1 rounded-full border border-yellow-400/60 font-bold shadow-lg"
              animate={!mobile ? {
                boxShadow: [
                  "0 0 10px rgba(234,179,8,0.3)",
                  "0 0 20px rgba(234,179,8,0.6)",
                  "0 0 10px rgba(234,179,8,0.3)",
                ]
              } : {}}
              transition={{ duration: mobile ? 0 : 2, repeat: mobile ? 0 : Infinity, ease: "easeInOut" }}
            >
              {badge}
            </motion.span>
          )}
        </div>
      </div>
      {link && (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-purple-600 border-2 border-yellow-400 flex items-center justify-center text-white text-xs hover:bg-purple-500 z-10"
          {...getHoverProps({ scale: 1.3, rotate: 360 })}
          whileTap={{ scale: 0.9 }}
          title="Verify Credential"
        >
          ✓
        </motion.a>
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="absolute"
      style={{ ...position }}
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      drag={!mobile}
      dragElastic={mobile ? 0 : 0.2}
      dragMomentum={!mobile}
      onMouseMove={!mobile ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      } : undefined}
      onMouseLeave={!mobile ? () => {
        x.set(0);
        y.set(0);
      } : undefined}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {CardContent}
    </motion.div>
  );
};

// Magnetic Button Component (Mobile-Optimized)
const MagneticButton = ({ children, ...props }) => {
  const mobile = isMobile();
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 200, damping: 10 });
  const y = useSpring(targetY, { stiffness: 200, damping: 10 });

  const handleMouseMove = (e) => {
    if (mobile) return; // Disable magnetic effect on mobile
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);

    if (distance < 100) {
      setIsHovered(true);
      const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX);
      targetX.set(Math.cos(angle) * 30);
      targetY.set(Math.sin(angle) * 30);
    } else {
      setIsHovered(false);
      targetX.set(0);
      targetY.set(0);
    }
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        targetX.set(0);
        targetY.set(0);
      }}
      style={mobile ? {} : { x, y }}
      className="relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-black font-bold bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_20px_60px_-12px_rgba(234,179,8,0.6)] hover:shadow-[0_25px_70px_-12px_rgba(234,179,8,0.8)] transition-shadow"
      {...getHoverProps({ scale: 1.05 })}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      <motion.span 
        animate={!mobile ? { x: [0, 6, 0] } : {}} 
        transition={{ duration: mobile ? 0 : 1.2, repeat: mobile ? 0 : Infinity }}
      >
        →
      </motion.span>
    </motion.button>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const mobile = isMobile();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const mouseXForAura = useMotionValue(0);
  const mouseYForAura = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(cursorY, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(smoothY, [-300, 300], mobile ? [0, 0] : [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], mobile ? [0, 0] : [-15, 15]);

  const auraX = useSpring(mouseXForAura, { stiffness: 80, damping: 30 });
  const auraY = useSpring(mouseYForAura, { stiffness: 80, damping: 30 });

  useEffect(() => setMounted(true), []);

  const handlePointer = (e) => {
    if (mobile || !containerRef.current) return; // Disable on mobile
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    cursorX.set(e.clientX - centerX);
    cursorY.set(e.clientY - centerY);
    mouseXForAura.set((e.clientX - centerX) * 0.3);
    mouseYForAura.set((e.clientY - centerY) * 0.3);
  };

  const handleLeave = () => {
    if (mobile) return; // Disable on mobile
    cursorX.set(0);
    cursorY.set(0);
    mouseXForAura.set(0);
    mouseYForAura.set(0);
  };

  const desktopImage = "https://res.cloudinary.com/dncosrakg/image/upload/v1740032195/x608ojr0yuf8j87wdnba.jpg";
  const nameText = "ARJUN DIVRANIYA";

  // Achievement Cards Configuration - Tech Architect Focus
  const achievementCards = [
    {
      title: "9.74 CGPA",
      subtitle: "Rai University",
      badge: "Academic Excellence",
      icon: FaAward,
      iconColor: "text-yellow-400",
      link: null,
      position: { top: "8%", left: "5%" },
    },
    {
      title: "200+ Problems",
      subtitle: "DSA Mastery",
      badge: "5★ C++ Golden",
      icon: SiCplusplus,
      iconColor: "text-blue-500",
      link: "https://leetcode.com/u/Arjun_divraniya",
      position: { bottom: "30%", left: "3%" },
    },
    {
      title: "68+ Repos",
      subtitle: "GitHub Portfolio",
      badge: "500+ Commits",
      icon: FaGithub,
      iconColor: "text-purple-400",
      link: "https://github.com/ArjunDivraniya",
      position: { top: "45%", right: "4%" },
    },
    {
      title: "Top 10%",
      subtitle: "LeetCode Rank",
      badge: "721K+ Ranking",
      icon: SiLeetcode,
      iconColor: "text-orange-500",
      link: "https://leetcode.com/u/Arjun_divraniya",
      position: { bottom: "10%", right: "6%" },
    },
    {
      title: "Open Source",
      subtitle: "Contributor",
      badge: "Community Active",
      icon: FiUsers,
      iconColor: "text-cyan-400",
      link: "https://github.com/ArjunDivraniya",
      position: { bottom: "50%", left: "6%" },
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-x-hidden overflow-y-visible flex items-center justify-center bg-black"
    >
      {/* Staggered Background Aurora - Simplified on Mobile */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0 }}
      >
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent 40%)",
          }}
          animate={!mobile ? { scale: [1, 1.08, 1], x: [0, 20, 0] } : {}}
          transition={{ duration: mobile ? 0 : 12, repeat: mobile ? 0 : Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 80% 40%, rgba(250,204,21,0.25), transparent 45%)",
          }}
          animate={!mobile ? { scale: [1.05, 0.95, 1.05], x: [0, -20, 0] } : {}}
          transition={{ duration: mobile ? 0 : 14, repeat: mobile ? 0 : Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Achievement Cards - Hidden on Mobile */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-auto hidden lg:block">
          {achievementCards.map((card, idx) => (
            <AchievementCard
              key={idx}
              title={card.title}
              subtitle={card.subtitle}
              badge={card.badge}
              icon={card.icon}
              iconColor={card.iconColor}
              link={card.link}
              delay={idx * 0.15}
              position={card.position}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-center mx-auto">
        {/* Left Text Column - Staggered Entrance */}
        <motion.div className="space-y-4 sm:space-y-6 lg:order-1 order-2">
          {/* Advanced Name with Hover Fire Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-yellow-300 leading-tight whitespace-nowrap">
              {nameText.split("").map((char, idx) => (
                <AnimatedNameChar key={idx} char={char === " " ? "\u00A0" : char} index={idx} />
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Engineering Scalable Tech Solutions for Real-World Problems
            </motion.p>
          </motion.div>

          {/* Multi-Persona Roles with TypeAnimation */}
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-bold h-16 sm:h-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2200,
                  "UI/UX Visionary",
                  2200,
                  "Wildlife Photographer",
                  2200,
                  "Competitive Coder",
                  2200,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </div>
          </motion.div>

          {/* CTA Buttons Section */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticButton onClick={() => navigate("/contact")}>
              Get In Touch
            </MagneticButton>

            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border border-yellow-400/50 text-white font-semibold hover:border-yellow-300 hover:bg-yellow-500/10 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(250,204,21,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
              <span>↓</span>
            </motion.a>
          </motion.div>

          {/* Social Links - Mobile Optimized */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { Icon: FaGithub, href: "https://github.com/ArjunDivraniya", label: "GitHub" },
              { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: FaCamera, href: "#projects", label: "Photography" },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target={social.href.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl border border-white/20 text-white hover:border-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-all"
                {...getHoverProps({ scale: 1.2, y: -4 })}
                whileTap={{ scale: 0.9 }}
                title={social.label}
              >
                <social.Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual Column - 3D Photo with Aura (Mobile-Optimized) */}
        <motion.div
          ref={containerRef}
          className="relative w-full flex justify-center lg:order-2 order-1"
          onMouseMove={!mobile ? handlePointer : undefined}
          onMouseLeave={!mobile ? handleLeave : undefined}
          style={mobile ? {} : { perspective: "2000px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Interactive Aura Glow - Disabled on Mobile */}
          {!mobile && (
            <motion.div
              className="absolute -inset-20 rounded-full blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(250,204,21,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)",
                x: auraX,
                y: auraY,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* 3D Tilt Photo Container - Flat on Mobile */}
          <motion.div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[420px] sm:h-[520px] md:h-[620px] rounded-2xl sm:rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-black/40 to-purple-900/30 shadow-[0_60px_120px_-40px_rgba(250,204,21,0.4)] overflow-hidden"
            style={mobile ? {} : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Depth Layer 1 - Glow Behind - Simplified on Mobile */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-transparent to-yellow-500/20"
              animate={!mobile ? {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              } : {}}
              transition={{
                duration: mobile ? 0 : 6,
                repeat: mobile ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Depth Layer 2 - Image */}
            <motion.img
              src={desktopImage}
              alt="Arjun Divraniya - Full Stack Architect"
              className="relative z-10 h-full w-full object-cover object-[center_20%] sm:object-[center_20%] rounded-2xl sm:rounded-3xl"
              style={mobile ? {} : { transform: "translateZ(40px)" }}
              {...getHoverProps({ scale: 1.03 })}
              transition={{ duration: 0.4 }}
            />

            {/* Depth Layer 3 - Border Glow - Simplified on Mobile */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-yellow-300/40 shadow-[inset_0_0_40px_rgba(250,204,21,0.2)]"
              style={mobile ? {} : { transform: "translateZ(50px)" }}
              animate={!mobile ? {
                boxShadow: [
                  "inset 0 0 40px rgba(250,204,21,0.1)",
                  "inset 0 0 60px rgba(250,204,21,0.3)",
                  "inset 0 0 40px rgba(250,204,21,0.1)",
                ],
              } : {}}
              transition={{
                duration: mobile ? 0 : 4,
                repeat: mobile ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-8 h-12 border-2 border-yellow-400/40 rounded-full mx-auto flex justify-center pt-2">
          <motion.span
            className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="text-xs mt-3 tracking-widest uppercase">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
