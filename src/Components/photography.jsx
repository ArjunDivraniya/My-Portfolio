import "../index.css";
import React from "react";
import { motion } from "framer-motion";
import { SiAdobephotoshop, SiAdobelightroom ,SiAdobepremierepro  } from "react-icons/si";
import {FaArrowDown, FaCameraRetro, FaCamera } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { RiUnsplashFill } from "react-icons/ri";
import { GiDeliveryDrone } from "react-icons/gi";
import {  TbBrandSnapseed } from "react-icons/tb";
const photos = [
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952177/nc24cfk1agfrrrdpcryo.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952501/jzruiokcmichun4bombt.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1739952478/lm01xmiqfjfeqchxf0c6.jpg",
  "https://images.unsplash.com/photo-1736584165907-77535de5c17f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740218192/Wildlife/hwnjerk0njtlls7hclxl.jpg",
  "https://res.cloudinary.com/dncosrakg/image/upload/v1740217955/Wildlife/chizobfvoawiaepmmlim.jpg",
];

const iconVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
const Photography = () => {
  return (
    <div className="p-8 relative overflow-hidden">
    
    <div className="p-8 relative overflow-hidden">
      {/* 🔹 Background Icons */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <motion.div
          className="absolute top-10 left-10  opacity-10 text-9xl"
          variants={iconVariants}
          animate="float"
        >
          <FaCameraRetro />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20  opacity-10 text-9xl animate-pulse"
          variants={iconVariants}
          animate="float"
        >
          <FaCamera />
        </motion.div>
        <motion.div
          className="absolute top-40 right-40  opacity-10 text-9xl animate-bounce"
          variants={iconVariants}
          animate="float"
        >
          <GiDeliveryDrone />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-32  opacity-10 text-9xl animate-spin"
          variants={iconVariants}
          animate="float"
        >
          <BiCameraMovie />
        </motion.div>
      </div>

      {/* 🔹 Photography Section */}
      <div id="photography" className="py-16 text-center relative bg-transparent">
        <motion.h2
          className="text-4xl font-bold text-white mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Photography
        </motion.h2>

        <p className="text-lg text-gray-300 px-6 mb-8 max-w-3xl mx-auto">
          I love capturing the beauty of nature, people, and landscapes. I use a{" "}
          <strong>Sony Alpha A7 III</strong> with a 50mm f/1.8 lens to bring out
          stunning details in my shots.
        </p>

        <a
          href="https://unsplash.com/@arjun_01"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-blue-400 text-lg mb-8 hover:text-blue-600 transition"
        >
          <RiUnsplashFill className="text-3xl" /> Check out my Unsplash profile
        </a>

        <div className="flex flex-wrap justify-center gap-6 px-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="overflow-hidden cursor-pointer rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3"
              whileHover={{ scale: 1.1 }}
              animate={{
                opacity: [0.8, 1, 0.8],
                transition: { duration: 1.5, repeat: Infinity },
              }}
            >
              <img
                src={photo}
                alt={`Photography ${index + 1}`}
                className="w-full h-60 object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        className="fixed right-6 bottom-16 bg-white text-gray-900 p-4 rounded-full shadow-md hover:bg-gray-300 transition"
        whileHover={{ scale: 1.2 }}
        onClick={() => document.getElementById("editing").scrollIntoView({ behavior: "smooth" })}
      >
        <FaArrowDown className="text-2xl" />
      </motion.button>

      <section
        id="editing"
        className="py-16 text-center relative overflow-hidden text-white"
      >
        <motion.h2
          className="text-4xl font-bold mb-8 backdrop-blur-md bg-black/50 p-4 inline-block rounded-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Editing Skills
        </motion.h2>

        <p className="text-lg text-gray-300 px-6 mb-8 max-w-3xl mx-auto bg-black/40 p-4 rounded-lg">
          I enhance photos and videos using <strong>Adobe Photoshop, Lightroom, and Premiere Pro</strong>.  
          My expertise includes **color correction, retouching, and cinematic video editing**, bringing visuals to life.
          <br />
          <br />
          I focus on **maintaining natural colors while enhancing sharpness and details**. For video editing, I use  
          **smooth transitions, dynamic effects, and precise audio syncing** to create **visually compelling** stories.
        </p>
      </section>
    </div>
    </div>
  );
};

export default Photography;
