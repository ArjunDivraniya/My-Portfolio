import "../index.css";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCamera,
  FaCompass,
  FaExpand,
  FaTimes,
  FaVideo,
  FaEye,
  FaPlay,
} from "react-icons/fa";
import {
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiDavinciresolve,
} from "react-icons/si";
import { RiUnsplashFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

// ===================== PHOTO DATA WITH METADATA =====================
const photoGallery = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dncosrakg/image/upload/v1739952177/nc24cfk1agfrrrdpcryo.jpg",
    title: "Majestic Lion",
    location: "Gir Forest Expedition",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 800, f/4.0, 1/500s",
    category: "Wildlife",
    size: "large"
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dncosrakg/image/upload/v1739952501/jzruiokcmichun4bombt.jpg",
    title: "Nature's Detail",
    location: "Forest Adventure",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 400, f/2.8, 1/250s",
    category: "Nature",
    size: "medium"
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dncosrakg/image/upload/v1739952478/lm01xmiqfjfeqchxf0c6.jpg",
    title: "Wildlife Portrait",
    location: "Wildlife Sanctuary",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 1600, f/5.6, 1/1000s",
    category: "Wildlife",
    size: "medium"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1736584165907-77535de5c17f?q=80&w=2070&auto=format&fit=crop",
    title: "Mountain Vista",
    location: "Himalayan Trek",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 100, f/11, 1/125s",
    category: "Landscape",
    size: "large"
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dncosrakg/image/upload/v1740218192/Wildlife/hwnjerk0njtlls7hclxl.jpg",
    title: "Wild Encounter",
    location: "Safari Expedition",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 1200, f/4.0, 1/640s",
    category: "Wildlife",
    size: "medium"
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dncosrakg/image/upload/v1740217955/Wildlife/chizobfvoawiaepmmlim.jpg",
    title: "Natural Habitat",
    location: "Conservation Area",
    camera: "Sony Alpha 7 IV",
    settings: "ISO 640, f/3.5, 1/320s",
    category: "Wildlife",
    size: "medium"
  }
];

// ===================== CAMERA VIEWFINDER OVERLAY =====================
const CameraViewfinder = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-yellow-500" />
    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-yellow-500" />
    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-yellow-500" />
    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-yellow-500" />
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="w-10 h-10 border-2 border-yellow-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-500 -translate-x-1/2 -translate-y-1/2" />
    </div>

    <div className="absolute top-1/3 left-1/3 w-2 h-2 border border-yellow-500/50" />
    <div className="absolute top-1/3 right-1/3 w-2 h-2 border border-yellow-500/50" />
    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 border border-yellow-500/50" />
    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 border border-yellow-500/50" />
  </motion.div>
);

// ===================== FULL SCREEN MODAL =====================
const FullScreenModal = ({ photo, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-6xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full transition-all duration-300 hover:scale-110 z-50"
          >
            <FaTimes size={24} />
          </button>
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-2">{photo.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white text-sm">
              <p className="flex items-center gap-2">
                <FaCompass className="text-purple-400" size={14} />
                {photo.location}
              </p>
              <p className="flex items-center gap-2">
                <FaCamera className="text-yellow-400" size={14} />
                {photo.camera}
              </p>
              <p className="text-gray-300 col-span-full text-xs">{photo.settings}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ===================== PARALLAX PHOTO CARD =====================
const ParallaxPhotoCard = ({ photo, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const speed = index % 3 === 0 ? 20 : index % 3 === 1 ? -15 : 10;
    gsap.to(cardRef.current, {
      y: speed,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 ${
          photo.size === "large" ? "md:col-span-2 md:row-span-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative h-full min-h-[280px] md:min-h-[320px] bg-black overflow-hidden rounded-2xl">
          <motion.img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${isHovered ? 1.1 : 1})`,
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

          <AnimatePresence>
            {isHovered && <CameraViewfinder />}
          </AnimatePresence>

          <motion.div
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-yellow-500/30 rounded-lg p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: 10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            <p className="text-yellow-400 text-[10px] md:text-xs font-bold mb-1 flex items-center gap-1">
              <FaCamera className="text-[10px] md:text-xs" />
              {photo.camera}
            </p>
            <p className="text-white text-[9px] md:text-[10px]">{photo.settings}</p>
            <p className="text-purple-400 text-[9px] md:text-[10px] mt-1 flex items-center gap-1">
              <FaCompass className="text-[9px] md:text-[10px]" />
              {photo.location}
            </p>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-2">{photo.title}</h3>
            <motion.button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-bold transition-all duration-300 opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExpand className="text-xs" />
              <span>View Full</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <FullScreenModal photo={photo} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

// ===================== VIDEO MONTAGE CARD =====================
const VideoMontageCard = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <motion.div
        className="md:col-span-2 lg:col-span-3 relative group overflow-hidden rounded-2xl cursor-pointer border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="relative h-[350px] md:h-[450px] bg-black rounded-2xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
          >
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-beautiful-resort-2944/1080p.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <motion.div
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-xl border border-purple-400/40 rounded-xl p-3 md:p-4"
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-yellow-400 text-xs font-bold mb-2 flex items-center gap-2">
              <FaVideo /> EDITING SUITE
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white text-xs">
                <SiAdobepremierepro className="text-purple-400" />
                <span>Premiere Pro</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs">
                <SiAdobeaftereffects className="text-blue-400" />
                <span>After Effects</span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs">
                <SiDavinciresolve className="text-red-400" />
                <span>DaVinci Resolve</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setShowVideoModal(true)}
            className="absolute inset-0 flex flex-col items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="bg-yellow-500 text-black p-6 md:p-8 rounded-full shadow-2xl mb-4"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(234, 179, 8, 0.7)",
                  "0 0 0 25px rgba(234, 179, 8, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
            >
              <FaPlay size={28} />
            </motion.div>
            <h3 className="text-xl md:text-3xl font-bold text-yellow-400 mb-2">Wildlife Montage</h3>
            <p className="text-purple-300 text-sm">Watch Full Video</p>
          </motion.button>
        </div>
      </motion.div>

      {showVideoModal && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <FaTimes size={24} />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Wildlife Video Montage"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// ===================== MAIN COMPONENT =====================
const Photography = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="photography" 
      className="relative min-h-screen bg-black pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="parallax-bg absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80')",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.div
            className="relative bg-gradient-to-r from-yellow-500 to-purple-400 text-black px-5 py-2.5 rounded-full font-bold shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 25px rgba(234, 179, 8, 0.4)",
                "0 0 40px rgba(168, 139, 250, 0.4)",
                "0 0 25px rgba(234, 179, 8, 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2.5">
              <FaCamera size={20} />
              <FaCompass size={20} />
              <span className="text-sm">4+ Years Visual Storytelling</span>
            </div>
            <motion.div
              className="absolute -top-1.5 -right-1.5 bg-black text-yellow-400 p-1.5 rounded-full border-2 border-yellow-500"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaEye size={14} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-yellow-500 via-purple-400 to-yellow-500 bg-clip-text text-transparent">
            Creative Passion
          </span>
        </motion.h2>
        <motion.p
          className="text-center text-purple-300 max-w-2xl mx-auto mb-5 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Technical precision meets artistic vision. Wildlife photography & cinematic editing.
        </motion.p>

        <motion.a
          href="https://unsplash.com/@arjun_01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-white w-fit mx-auto mb-10 px-5 py-2.5 rounded-full border-2 border-yellow-500 bg-black/80 backdrop-blur-xl hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <RiUnsplashFill className="text-xl" />
          <span className="font-bold text-sm">View on Unsplash</span>
        </motion.a>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          <VideoMontageCard />
          {photoGallery.map((photo, index) => (
            <ParallaxPhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-gray-300 leading-relaxed text-base">
            As a <span className="text-yellow-400 font-bold">Technical Creative</span>, I merge{" "}
            <span className="text-purple-400 font-bold">9.74 CGPA excellence</span> with{" "}
            <span className="text-yellow-400 font-bold">4+ years visual storytelling</span>. 
            The patience for perfect shots translates to clean code and intuitive UX.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Photography;
