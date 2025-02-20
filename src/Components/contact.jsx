import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [score, setScore] = useState(0);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Contact Me</h1>
      
      <motion.form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center mb-4 bg-gray-700 p-3 rounded-md">
          <FaUser className="text-yellow-400 mr-3" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full bg-transparent text-white outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mb-4 bg-gray-700 p-3 rounded-md">
          <FaEnvelope className="text-yellow-400 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full bg-transparent text-white outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-start mb-4 bg-gray-700 p-3 rounded-md">
          <FaCommentDots className="text-yellow-400 mr-3 mt-1" />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full bg-transparent text-white outline-none"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

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
          className="w-16 h-16 bg-yellow-500 rounded-full mt-4 cursor-pointer"
          whileTap={{ scale: 0.8 }}
          animate={{ x: Math.random() * 300 - 150, y: Math.random() * 200 - 100 }}
          transition={{ duration: 0.3 }}
          onClick={handleGameClick}
        ></motion.div>
        <p className="mt-2 text-lg">Score: {score}</p>
      </div>
    </div>
  );
};

export default ContactMe;
