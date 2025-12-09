// File: src/Components/aboutme.jsx (UPDATED)

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTypewriter } from "react-simple-typewriter";
import EducationRoadmap from "./EducationRoadmap"; // <--- NEW IMPORT

const photos = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947951/ekjtczfjhz92tffcuq4m.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1738656424/WhatsApp_Image_2025-01-31_at_13.51.48_ddpmxi.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947697/afo6a2uq7sij5qrooodq.jpg"
];

// Education data moved to EducationRoadmap.jsx

const socialLinks = [
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/divraniya-arjun-b51497354/" },
  { icon: FaGithub, link: "https://github.com/ArjunDivraniya" },
  { icon: FaInstagram, link: "https://www.instagram.com/arjun__divraniya__/" },
  { icon: FaTwitter, link: "https://x.com/DivraniyaArjun" }
];

const AboutMe = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const [typewriterText] = useTypewriter({
    words: [
      "A Passionate Full Stack Developer",
      "A UI/UX Designer with Creative Vision",
      "A Photographer Who Captures Life's Beauty"
    ],
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 bg-black text-white pt-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-16">
        <motion.div
          className="lg:w-2/3 text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-yellow-500">I'm Arjun Divraniya</h1>
          <p className="mt-6 text-lg sm:text-2xl text-yellow-400">{typewriterText}</p>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
            I am from Junagadh, Gujarat, currently pursuing my B.Tech in Computer Science and Engineering at Rai University.
            My journey in coding started with HTML and JavaScript, and now I build <strong>full-stack web applications</strong> using
            <strong> React, Node.js, Express, and MongoDB</strong>.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Find Me On</h2>
            <div className="flex space-x-6 sm:space-x-8 mt-4 justify-center lg:justify-start">
              {socialLinks.map(({ icon: Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    rotate: 360,
                    scale: 1.3,
                    boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-3xl sm:text-4xl text-white hover:text-yellow-500"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-72 sm:w-96 h-72 sm:h-96 border-4 border-yellow-500 rounded-lg overflow-hidden shadow-2xl">
            <motion.img
              key={currentPhoto}
              src={photos[currentPhoto]}
              alt="Arjun Divraniya"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Renders the new animated roadmap */}
      <EducationRoadmap /> 

      <motion.div
        className="mt-20 px-6 max-w-4xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">My Journey 🚀</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          From a curious school kid exploring HTML to a passionate full-stack developer and creative photographer,
          my journey has been a blend of learning and building. Starting from Junagadh, I completed my school education with excellent grades and continued to pursue Computer Science at Rai University. Alongside academics, I crafted websites, explored UI/UX in Figma, and captured life through my camera lens. I'm committed to growing as a developer and making ideas come to life.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutMe;