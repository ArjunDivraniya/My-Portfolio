import React, { useEffect, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaFigma } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          id="preloader"
        >
          <div className="preloader-icons">
            <motion.div
              className="preloader-icon html"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaHtml5 />
            </motion.div>

            <motion.div
              className="preloader-icon css"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaCss3Alt />
            </motion.div>

            <motion.div
              className="preloader-icon js"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaJsSquare />
            </motion.div>

            <motion.div
              className="preloader-icon react"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaReact />
            </motion.div>

            <motion.div
              className="preloader-icon figma"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaFigma />
            </motion.div>
          </div>

          <motion.p
            className="preloader-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            Loading Your Creative Space...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
