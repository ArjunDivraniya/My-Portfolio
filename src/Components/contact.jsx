import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, 
  FaUser, 
  FaCommentDots, 
  FaWhatsapp, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef(null);
  const phoneNumber = "6351565043";
  
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Junagadh, Gujarat",
      color: "text-red-400"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "arjundivraniya8@gmail.com",
      link: "mailto:arjundivraniya8@gmail.com",
      color: "text-yellow-400"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+91 6351565043",
      link: `https://wa.me/${phoneNumber}`,
      color: "text-green-400"
    }
  ];

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      link: "https://www.linkedin.com/in/divraniya-arjun", 
      color: "from-blue-600 to-blue-400",
      hoverColor: "hover:shadow-blue-500/50"
    },
    { 
      icon: FaGithub, 
      link: "https://github.com/ArjunDivraniya", 
      color: "from-gray-700 to-gray-500",
      hoverColor: "hover:shadow-gray-500/50"
    },
    { 
      icon: FaInstagram, 
      link: "https://www.instagram.com/arjun__divraniya__/", 
      color: "from-pink-600 to-purple-600",
      hoverColor: "hover:shadow-pink-500/50"
    },
    { 
      icon: FaTwitter, 
      link: "https://x.com/DivraniyaArjun", 
      color: "from-blue-500 to-blue-300",
      hoverColor: "hover:shadow-blue-400/50"
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  // Magnetic Button Effect
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 120) {
      setMousePosition({
        x: distanceX * 0.25,
        y: distanceY * 0.25
      });
    } else {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section id="contact" className="min-h-screen relative overflow-hidden pt-28 sm:pt-32 pb-20 px-4 sm:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12 sm:mb-16 px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
            initial={{ scale: 0.5 }}
            animate={headerInView ? { scale: 1 } : { scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-600">
              Let's Connect
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start px-4">
          {/* Left Side - Contact Info & Social */}
          <motion.div
            ref={infoRef}
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500 transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-900 to-black border border-purple-500 flex-shrink-0`}>
                      <info.icon className={`text-xl sm:text-2xl ${info.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">{info.title}</p>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white text-sm sm:text-base md:text-lg font-semibold hover:text-yellow-400 transition break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm sm:text-base md:text-lg font-semibold break-words">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/50"
              initial={{ opacity: 0, y: 50 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
                Follow Me On
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                {socialLinks.map(({ icon: Icon, link, color, hoverColor }, index) => (
                  <motion.a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-6 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center ${hoverColor} hover:shadow-2xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="text-3xl text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* WhatsApp Quick Contact */}
            <motion.a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition-all duration-300"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={infoInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4">
                <FaWhatsapp className="text-4xl text-white" />
                <div className="text-left">
                  <p className="text-white font-bold text-lg">Quick Chat</p>
                  <p className="text-green-100 text-sm">Message me on WhatsApp</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 100 }}
            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
          >
            <motion.form
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/50 shadow-2xl"
              onSubmit={handleSubmit}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ borderColor: "rgba(168, 85, 247, 0.8)" }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 sm:mb-8 text-center">
                Send Me a Message
              </h2>

              {/* Name Input */}
              <motion.div 
                className="mb-5 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-400 text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Arjun Divraniya"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-500 transition-all duration-300"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div 
                className="mb-5 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-400 text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider">
                  Your Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    placeholder="arjundivramiya8@gmail.com"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-500 transition-all duration-300"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Message Input */}
              <motion.div 
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-400 text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <div className="relative">
                  <FaCommentDots className="absolute left-3 sm:left-4 top-5 sm:top-6 text-purple-400 text-sm" />
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-500 transition-all duration-300 min-h-[120px] sm:min-h-[150px] resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </motion.div>

              {/* Magnetic Submit Button */}
              <motion.button
                ref={buttonRef}
                type="submit"
                className="w-full py-3 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-base sm:text-lg relative overflow-hidden"
                animate={{
                  x: mousePosition.x,
                  y: mousePosition.y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(234, 179, 8, 0.8)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Let's create something <span className="text-yellow-400 font-bold">amazing</span> together! 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
