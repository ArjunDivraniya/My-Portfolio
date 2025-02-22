import React from "react";
import { motion } from "framer-motion";
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro, SiAdobeaftereffects, SiAdobelightroom, SiAdobexd } from "react-icons/si";
import {  FaCameraRetro } from "react-icons/fa"; // Snapseed & Camera Retro
import {  GiDeliveryDrone } from "react-icons/gi"; // Camera Lens & Drone
import { TbBrandSnapseed } from "react-icons/tb";
import { RiCameraLensLine } from "react-icons/ri";


// 🎨 Editing Software & Photography Icons
const icons = [
  { Component: SiAdobephotoshop, top: "10%", left: "15%", color: "#31A8FF" }, // Photoshop
  { Component: SiAdobeillustrator, top: "20%", left: "70%", color: "#FF9A00" }, // Illustrator
  { Component: SiAdobepremierepro, top: "40%", left: "10%", color: "#9999FF" }, // Premiere Pro
  { Component: SiAdobeaftereffects, top: "60%", left: "80%", color: "#9999FF" }, // After Effects
  { Component: SiAdobelightroom, top: "80%", left: "30%", color: "#2FA3F7" }, // Lightroom
  { Component: SiAdobexd, top: "50%", left: "50%", color: "#FF61F6" }, // Adobe XD
  { Component: TbBrandSnapseed, top: "40%", left: "30%", color: "#76C74E" }, // Snapseed

  // 📷 Camera & Drone Icons
  { Component: RiCameraLensLine, top: "25%", left: "50%", color: "#ffffff" }, // Camera Lens
  { Component: GiDeliveryDrone, top: "70%", left: "40%", color: "#d1d5db" }, // Drone
  { Component: FaCameraRetro, top: "90%", left: "20%", color: "#ffffff" }, // Retro Camera
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 🔹 Background Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

      {/* 🔹 Floating Icons */}
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
