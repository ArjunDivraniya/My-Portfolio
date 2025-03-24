import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots, FaWhatsapp } from "react-icons/fa";

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [score, setScore] = useState(0);
  const phoneNumber = "6351565043"; // Replace with your actual WhatsApp number

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleGameClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 sm:p-10 relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-6">Contact Me</h1>

      <motion.form
        className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        {['name', 'email', 'message'].map((field, index) => (
          <div key={index} className="flex items-center mb-4 bg-gray-700 p-3 rounded-md">
            {field === 'name' && <FaUser className="text-yellow-400 mr-3" />}
            {field === 'email' && <FaEnvelope className="text-yellow-400 mr-3" />}
            {field === 'message' && <FaCommentDots className="text-yellow-400 mr-3 mt-1" />}
            {field === 'message' ? (
              <textarea
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="w-full bg-transparent text-white outline-none"
                rows="4"
                value={formData[field]}
                onChange={handleChange}
                required
              ></textarea>
            ) : (
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="w-full bg-transparent text-white outline-none"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}

        <motion.button
          className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-600"
          whileHover={{ scale: 1.1 }}
          type="submit"
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Mini Click Game */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-yellow-400">Click the Ball Game</h2>
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500 rounded-full mt-4 cursor-pointer"
          whileTap={{ scale: 0.8 }}
          animate={{ x: Math.random() * 200 - 100, y: Math.random() * 150 - 75 }}
          transition={{ duration: 0.3 }}
          onClick={handleGameClick}
        ></motion.div>
        <p className="mt-2 text-lg">Score: {score}</p>
      </div>

      {/* Floating WhatsApp Chat Icon */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-green-500 p-4 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity } }}
        onClick={() => window.open(`https://wa.me/${phoneNumber}`, "_blank")}
      >
        <FaWhatsapp className="text-white text-3xl sm:text-4xl" />
      </motion.div>
    </div>
  );
};

export default ContactMe;
