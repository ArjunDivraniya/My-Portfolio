import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { isMobile, getHoverProps } from "../utils/mobileOptimization";

// **KEEP YOUR EXACT IMAGE IMPORTS**
import headshotImage from "../assets/Profile/Arjun.webp";
import portfolioImageOne from "../assets/Profile/Arjun-Portfolio-1.webp";
import photographyImageOne from "../assets/Profile/Arjun-Portfolio-2.webp";
import photographyImageTwo from "../assets/Profile/Arjun-Portfolio-3.webp";
import arrowPhotographer from "../assets/Hero-Arrow/Photographer-Arrow.png";

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

const renderAnimatedWord = (word, keyPrefix) =>
  word.split("").map((char, index) => (
    <AnimatedNameChar key={`${keyPrefix}-${index}`} char={char} />
  ));

const heroSocialLinks = [
  { Icon: FaGithub, href: "https://github.com/ArjunDivraniya", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/divraniya-arjun", label: "LinkedIn" },
  { Icon: FaInstagram, href: "https://www.instagram.com/arjun__divraniya__/", label: "Instagram" },
  { Icon: FaTwitter, href: "https://x.com/DivraniyaArjun", label: "X / Twitter" },
  { Icon: FaEnvelope, href: "mailto:arjundivraniya8@gmail.com", label: "Email" },
];

const floatingRoleNodes = [
  {
    id: "developer",
    label: "developer",
    labelClassName: "left-8 top-8 xl:left-[-8%] xl:top-[-8%]",
    arrowSrc: arrowPhotographer,
    arrowClassName: "left-[-3%] top-[2%] w-20 xl:w-28 rotate-[240deg] transform: scale-y-[-1] ",
    delay: 0.25,
  },
  {
    id: "designer",
    label: "Designer",
    labelClassName: "right-8 top-8 xl:right-[-17%] xl:top-[8%]",
    arrowSrc: arrowPhotographer,
    arrowClassName: "right-[3%] top-[15%] w-20 xl:w-28 rotate-[-28deg]",
    delay: 0.35,
  },
  {
    id: "architect",
    label: "Architecture Designer",
    labelClassName: "left-2 bottom-12 xl:left-[8%] xl:bottom-[-1%]",
    arrowSrc: arrowPhotographer,
    arrowClassName: "left-[-5%] bottom-[10%] w-26 xl:w-36 rotate-[80deg]",
    delay: 0.45,
  },
  {
    id: "photographer",
    label: "Photographer",
    labelClassName: "right-2 bottom-12 xl:right-[-30%] xl:bottom-[27%]",
    arrowSrc: arrowPhotographer,
    arrowClassName: "right-[3%] bottom-[35%] w-20 xl:w-28 rotate-[30deg] transform: scale-y-[-1]",
    delay: 0.55,
  },
];

const SignatureMark = () => (
  <div className="inline-flex max-w-max items-center rounded-[18px_26px_18px_24px] border border-white/20 bg-black/60 px-4 py-3 backdrop-blur-md">
    <div className="hero-signature text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-purple-300">
      Turning Ideas Into <span className="text-purple-300">Scalable Products</span>
    </div>
  </div>
);

// **1. UPDATED: Refactored Data Structure for Stack Logic**
const heroGalleryImages = [
  { id: "1", src: headshotImage, alt: "Arjun Headshot" },
  { id: "2", src: portfolioImageOne, alt: "Portfolio Frame One" },
  { id: "3", src: photographyImageOne, alt: "Photography Frame One" },
  { id: "4", src: photographyImageTwo, alt: "Photography Frame Two" },
  { id: "5", src: portfolioImageOne, alt: "Portfolio Close Frame" },
];

const MagneticButton = ({ children, onClick }) => {
  const mobile = isMobile();
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
      onClick={onClick}
      className="relative inline-flex items-center gap-2 border-2 border-yellow-300/80 bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-bold text-black shadow-lg"
      aria-label="Get in touch"
      type="button"
      {...(!mobile && { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } })}
      style={{
        x: springX,
        y: springY,
        borderRadius: "16px 26px 14px 24px / 22px 14px 24px 16px",
      }}
    >
      {children}
      <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
    </motion.button>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const mobile = isMobile();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const containerRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const auraX = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });
  const auraY = useSpring(useMotionValue(0), { stiffness: 80, damping: 30 });

  const rotateX = useTransform(useSpring(cursorY, { stiffness: 100, damping: 25 }), [-300, 300], [15, -15]);
  const rotateY = useTransform(useSpring(cursorX, { stiffness: 100, damping: 25 }), [-300, 300], [-15, 15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % heroGalleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // **2. UPDATED: Logic for identifying background cards (Stack logic)**
  const prevIndex = (activeGalleryIndex - 1 + heroGalleryImages.length) % heroGalleryImages.length;
  const nextIndex = (activeGalleryIndex + 1) % heroGalleryImages.length;

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#080808] pt-24 sm:pt-28">
      <motion.div className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="absolute inset-0 opacity-55" style={{ background: "radial-gradient(circle at 18% 18%, rgba(168,85,247,0.28), transparent 34%)" }} animate={{ scale: [1, 1.08, 1], x: [0, 18, 0] }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div className="absolute inset-0 opacity-45" style={{ background: "radial-gradient(circle at 78% 34%, rgba(250,204,21,0.22), transparent 40%)" }} animate={{ scale: [1.04, 0.96, 1.04], x: [0, -18, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div className="order-1 space-y-5 sm:space-y-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }} className="relative space-y-4 pt-14 sm:pt-16">
            <div className="absolute left-0 top-0">
              <SignatureMark />
            </div>

            {/* Removed the small role badge per request */}

            <h1 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95]">
              <span className="inline-block text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                {renderAnimatedWord("ARJUN", "arjun")}
              </span>
              <span className="inline-block text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.25)]">
                {renderAnimatedWord("DIVRANIYA", "divraniya")}
              </span>
            </h1>

            <motion.p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-medium max-w-2xl leading-7 sm:leading-8 text-pretty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              I build production-ready web systems and interfaces—full‑stack apps, workflow automation, and designer-quality UI—focused on speed, clarity, and scale.
              I bring a photographer’s eye for visuals and a systems architect’s mindset for reliable, polished products.
            </motion.p>
          </motion.div>

          <motion.div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold h-14 sm:h-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
            <div className="bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              <TypeAnimation sequence={[
                "Developer",
                1800,
                "Designer",
                1800,
                "Photographer",
                1800,
                "System Architect",
                1800,
              ]} speed={50} repeat={Infinity} cursor={true} />
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
            <MagneticButton onClick={() => navigate("/contact")}>Get In Touch</MagneticButton>
            <motion.a
              href="/ArjunDivraniya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/45 px-6 py-3 text-white font-semibold hover:border-yellow-300 hover:bg-yellow-500/10 transition-all"
              style={{ borderRadius: "20px 13px 22px 12px / 14px 22px 12px 20px" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(250,204,21,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Resume <span>↓</span>
            </motion.a>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.75 }}>
            {heroSocialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white hover:border-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 transition-all"
                {...getHoverProps({ scale: 1.16, y: -4 })}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          <div className="pt-2">
            <motion.a
              href="mailto:arjundivraniya8@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-100 hover:bg-purple-500/20 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <FaEnvelope className="text-yellow-300" />
              arjundivraniya8@gmail.com
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="relative order-2 flex w-full items-center justify-center lg:min-h-[620px]"
          onMouseMove={!mobile ? (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            cursorX.set(e.clientX - (rect.left + rect.width / 2));
            cursorY.set(e.clientY - (rect.top + rect.height / 2));
          } : undefined}
          onMouseLeave={!mobile ? () => { cursorX.set(0); cursorY.set(0); } : undefined}
          style={mobile ? {} : { perspective: "2200px" }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          {floatingRoleNodes.map((node) => (
            <motion.img
              key={`${node.id}-arrow`}
              src={node.arrowSrc}
              alt={`${node.label} arrow`}
              className={`pointer-events-none absolute z-20 hidden select-none lg:block ${node.arrowClassName}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.96 }}
              transition={{ duration: 0.5, delay: node.delay }}
              loading="lazy"
            />
          ))}

          {floatingRoleNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute z-30 hidden text-zinc-100 lg:block ${node.labelClassName}`}
              initial={{ opacity: 0, y: node.id === "developer" || node.id === "designer" ? -10 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: node.delay }}
            >
              <span
                className="text-[2rem] leading-none tracking-[0.01em] drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                style={{ fontFamily: "'Architects Daughter', cursive" }}
              >
                {node.label}
              </span>
            </motion.div>
          ))}

          {!mobile && <motion.div className="absolute inset-0 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,204,21,0.28) 0%, rgba(168,85,247,0.22) 50%, transparent 72%)", x: auraX, y: auraY }} animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.6, 0.42] }} transition={{ duration: 8, repeat: Infinity }} />}

          <motion.div className="relative h-[480px] w-full max-w-[620px] sm:h-[580px] lg:h-[640px]" style={mobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div className="absolute h-60 w-60 rounded-full blur-3xl" style={{ backgroundColor: "rgba(59,130,246,0.12)" }} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center perspective-[1600px] overflow-visible">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-[74%] w-[72%] rounded-[2rem] border border-white/10 bg-white/[0.02] blur-[1px]" />
                <div className="absolute h-[64%] w-[60%] rounded-[2rem] border border-yellow-400/10 bg-yellow-500/[0.02]" />
              </div>

              <div className="relative h-[360px] w-[280px] sm:h-[470px] sm:w-[360px] lg:h-[520px] lg:w-[400px]">
                {mobile ? (
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={heroGalleryImages[activeGalleryIndex].id}
                        src={heroGalleryImages[activeGalleryIndex].src}
                        alt={heroGalleryImages[activeGalleryIndex].alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ x: "100%", scale: 0.82, opacity: 0.9 }}
                        animate={{ x: 0, scale: 1, opacity: 1 }}
                        exit={{ x: "-100%", scale: 0.82, opacity: 0.9 }}
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
                            opacity: isCenter ? 1 : 0.35,
                            scale: isCenter ? 1 : 0.74,
                            x: isCenter ? 0 : isLeft ? -150 : 150,
                            rotateY: isCenter ? 0 : isLeft ? 24 : -24,
                            zIndex: isCenter ? 30 : 10,
                            filter: isCenter ? "blur(0px)" : "blur(2px)",
                          }}
                          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                          transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          className="absolute w-[260px] h-[350px] sm:w-[300px] sm:h-[420px] lg:w-[340px] lg:h-[470px] rounded-[2rem] overflow-hidden border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] origin-bottom"
                        >
                          <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
                          {!isCenter && <div className="absolute inset-0 bg-black/40" />}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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