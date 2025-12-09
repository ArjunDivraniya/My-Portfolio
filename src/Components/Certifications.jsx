// File: src/Components/Certifications.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCode, FaAws } from 'react-icons/fa';
import { SiMeta } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

const certificationsData = [
  {
    name: "Meta Frontend Developer Professional Certificate",
    issuer: "Coursera/Meta",
    icon: SiMeta,
    color: "text-blue-500",
    link: "#", // Replace with your actual link
    skills: ["React", "JavaScript", "HTML/CSS", "UI/UX Principles"]
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    icon: FaAws,
    color: "text-orange-500",
    link: "#", // Replace with your actual link
    skills: ["Cloud Concepts", "Security", "EC2", "S3", "VPC"]
  },
  {
    name: "Complete Python Bootcamp",
    issuer: "Udemy",
    icon: FaCode,
    color: "text-yellow-500",
    link: "#", // Replace with your actual link
    skills: ["Python", "Data Structures", "OOP", "Scripting"]
  },
];

const CertCard = ({ data, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: delay } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative bg-gray-800 p-6 rounded-xl shadow-2xl border-l-4 border-yellow-500 transition-all duration-300 hover:scale-[1.03] flex flex-col"
    >
      <data.icon className={`text-5xl ${data.color} mb-4`} />
      <h3 className="text-xl font-bold text-white mb-2">{data.name}</h3>
      <p className="text-sm text-gray-400 italic mb-4">Issued by {data.issuer}</p>
      
      <div className="mt-auto">
        <p className="text-yellow-400 font-semibold mb-2">Key Skills:</p>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 self-start text-yellow-400 font-semibold hover:text-white transition-colors duration-300 flex items-center text-sm"
      >
        View Credential <FaCertificate className="ml-2" />
      </a>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="min-h-screen py-20 px-4 sm:px-8 bg-black text-white flex flex-col items-center justify-center">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Verified Certifications 📜
      </motion.h2>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {certificationsData.map((data, index) => (
          <CertCard key={index} data={data} delay={index * 0.2} />
        ))}
      </div>

      <motion.p
        className="mt-16 text-center text-lg max-w-3xl text-gray-400"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        Formal credentials that validate my expertise in key industry technologies and development practices.
      </motion.p>
    </section>
  );
};

export default Certifications;