import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaFigma, FaNodeJs } from "react-icons/fa";
import { FaGitAlt, FaPython, FaDatabase, FaGithub } from "react-icons/fa";


const icons = [
  { Component: FaReact, top: "10%", left: "15%", color: "#61DAFB" },
  { Component: FaHtml5, top: "20%", left: "70%", color: "#E34F26" },
  { Component: FaCss3Alt, top: "40%", left: "10%", color: "#1572B6" },
  { Component: FaJs, top: "60%", left: "80%", color: "#F7DF1E" },
  { Component: FaFigma, top: "80%", left: "30%", color: "#F24E1E" },
  { Component: FaNodeJs, top: "50%", left: "50%", color: "#8CC84B" },
  
  
  
 
  
  { Component: FaGitAlt, top: "40%", left: "30%", color: "#F05032" }, // Git

  { Component: FaDatabase, top: "25%", left: "50%", color: "#0064a5" }, // Database (SQL/Mongo)
  { Component: FaGithub, top: "90%", left: "20%", color: "#ffffff" }, // GitHub (white)
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Floating Logos */}
      {icons.map(({ Component, top, left, color }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 3, delay: index * 0.5 }}
          style={{ top, left, color }}
          
        >
          <Component size={60} className="animate-float" />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
