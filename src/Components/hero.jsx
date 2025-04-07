import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const images = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740032195/x608ojr0yuf8j87wdnba.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740032195/x608ojr0yuf8j87wdnba.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740032195/x608ojr0yuf8j87wdnba.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740032195/x608ojr0yuf8j87wdnba.jpg",
];

const images1 = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1744034962/IMG_20250405_131817_djpgf7.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1744034962/IMG_20250405_131817_djpgf7.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1744034962/IMG_20250405_131817_djpgf7.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1744034962/IMG_20250405_131817_djpgf7.jpg"
];

const Hero = () => (
  <motion.section
    id="home"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="h-screen flex justify-center items-center relative overflow-hidden pt-20 px-4 sm:px-8 lg:px-16"
  >
    {/* Background Images (Responsive) */}
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Desktop Image */}
      {images.map((photo, index) => (
        <motion.img
          key={index}
          src={photo}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === 0 ? 1 : 0 }}
          transition={{
            delay: index * 4,
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      {/* Mobile Image */}
      {images1.map((photo, index) => (
        <motion.img
          key={index}
          src={photo}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === 0 ? 1 : 0 }}
          transition={{
            delay: index * 4,
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>

    {/* Hero Content */}
    <div className="relative text-center z-10 text-white max-w-2xl">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold"
      >
        Hi, I'm <span className="text-yellow-500">Arjun Divraniya</span>
      </motion.h1>

      {/* Animated Typing Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="text-base sm:text-xl mt-4"
      >
        <TypeAnimation
          sequence={[
            "I'm a Full Stack Developer",
            2000,
            "I'm a UI/UX Designer",
            2000,
            "I'm a Photographer",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
        />
      </motion.div>

      {/* Call to Action */}
      <motion.a
        href="#contact"
        className="mt-6 inline-block px-5 sm:px-6 py-3 sm:py-4 bg-yellow-500 text-black font-semibold rounded-md text-lg sm:text-xl transition duration-300 hover:bg-yellow-600 hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get In Touch
      </motion.a>
    </div>
  </motion.section>
);

export default Hero;
