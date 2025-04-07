import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTypewriter } from "react-simple-typewriter";

const photos = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947951/ekjtczfjhz92tffcuq4m.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1738656424/WhatsApp_Image_2025-01-31_at_13.51.48_ddpmxi.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739947697/afo6a2uq7sij5qrooodq.jpg"
];

const educationData = [
  {
    year: "2021 - 2022",
    title: "10th Standard",
    institute: "Alpha Vidhya Sankul, Junagadh",
    description: "Completed SSC with a strong foundation in Science & Mathematics.",
    score: "92%",
    location: "Junagadh, Gujarat",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3708.025453812144!2d70.38399797481036!3d21.52187617181638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395803725248ec05%3A0x82062556b4718a9d!2sAlpha%20Vidhya%20Sankul!5e0!3m2!1sen!2sin!4v1711872456650"
  },
  {
    year: "2023 - 2024",
    title: "12th Standard (PCM)",
    institute: "Alpha Vidhya Sankul, Junagadh",
    description: "Completed HSC with focus on Physics, Chemistry & Maths.",
    score: "89%",
    location: "Junagadh, Gujarat"
  },
  {
    year: "2024 - Present",
    title: "B.Tech in Computer Science & Engineering",
    institute: "Rai University, Ahmedabad",
    description: "Pursuing specialization in Full Stack Development & UI.",
    score: "Currently Studying",
    location: "Ahmedabad, Gujarat",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.6958781954346!2d72.54815527480456!3d23.120454913498333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bff517e08b1%3A0xdcefd750456b213b!2sRai%20University!5e0!3m2!1sen!2sin!4v1711872674624"
  }
];

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

      <motion.div
        className="mt-16 w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-10">Education Journey</h2>
        <div className="flex flex-col items-center w-full">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className={`flex items-start mb-10 sm:mb-16 w-full px-4 sm:px-0 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
              <div className="ml-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full">
                <h3 className="text-lg sm:text-xl font-bold text-yellow-400">{edu.year}</h3>
                <h4 className="text-base sm:text-lg font-semibold text-white">{edu.title}</h4>
                <p className="text-gray-300">{edu.institute}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Score: {edu.score}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Location: {edu.location}</p>
                {edu.mapUrl && (
                  <div className="mt-4">
                    <iframe
                      src={edu.mapUrl}
                      width="100%"
                      height="200"
                      className="rounded-lg border-2 border-yellow-400"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Location of ${edu.institute}`}
                    ></iframe>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
