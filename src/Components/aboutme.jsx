import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const photos = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947951/ekjtczfjhz92tffcuq4m.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1738656424/WhatsApp_Image_2025-01-31_at_13.51.48_ddpmxi.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947697/afo6a2uq7sij5qrooodq.jpg"
];

const AboutMe = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-8 bg-black text-white pt-20">

      <div className="container mx-auto flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-16">
        {/* Left Side - Text Content */}
        <motion.div
          className="lg:w-2/3 text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-extrabold text-yellow-500">I'm Arjun Divraniya</h1>
          <p className="mt-6 text-2xl">
            <Typewriter
              options={{
                strings: [
                  "A Passionate Full Stack Developer",
                  "A UI/UX Designer with Creative Vision",
                  "A Photographer Who Captures Life's Beauty"
                ],
                autoStart: true,
                loop: true,
                delay: 50
              }}
            />
          </p>

          {/* About Me Paragraph */}
          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            I am from Junagadh, Gujarat, currently pursuing my B.Tech in Computer Science and Engineering at Rai University. 
            My journey in coding started with HTML and JavaScript, and now I build **full-stack web applications** using 
            **React, Node.js, Express, and MongoDB**.  
            Apart from coding, photography is my creative escape where I capture the beauty of nature and life through my lens. 
          </p>

          {/* Social Media Links */}
          <h2 className="mt-8 text-3xl font-semibold text-yellow-400">Find Me On</h2>
          <div className="flex space-x-8 mt-4 justify-center lg:justify-start">
            {[
              { icon: FaLinkedin, link: "https://linkedin.com/in/arjun" },
              { icon: FaGithub, link: "https://github.com/arjun" },
              { icon: FaInstagram, link: "https://instagram.com/arjun" },
              { icon: FaTwitter, link: "https://twitter.com/arjun" }
            ].map(({ icon: Icon, link }, index) => (
              <motion.a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="text-4xl text-white hover:text-yellow-500"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Auto Changing Photo Frame */}
        <motion.div
          className="lg:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-96 h-96 border-4 border-yellow-500 rounded-lg overflow-hidden shadow-2xl">
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

      {/* Google Map for Location */}
      <motion.div
        className="w-full flex justify-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.564524601101!2d72.47077331548754!3d22.81698417934685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e92d7452e8655%3A0x8b3fd7e0e7f3d3bb!2sRai%20University!5e0!3m2!1sen!2sin!4v1645100000000!5m2!1sen!2sin"
          className="w-full max-w-4xl h-80 rounded-lg shadow-lg"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default AboutMe;
