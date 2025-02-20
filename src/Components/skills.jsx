
import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPython, FaJava, FaBootstrap, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiExpress, SiMongodb, SiMysql, SiAdobephotoshop, SiAdobexd, SiCplusplus, SiCanva } from "react-icons/si";

const skills = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
     
      { name: "React", icon: FaReact, color: "#61DAFB" },
     
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
     
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#8CC84B" },
      { name: "Express.js", icon: SiExpress, color: "#404D59" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" }
    ]
  },
  {
    category: "UI/UX Design",
    skills: [
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Adobe Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
      { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" }
    ]
  },
  {
    category: "Other Technical Skills",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" }
      
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 text-center text-white  w-full">
      {/* Title */}
      <motion.h2 
        className="text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Professional <span className="text-purple-400">Skillset</span>
      </motion.h2>

      {/* Skills Wrapper with Margin on Left & Right */}
      <div className="max-w-6xl mx-auto px-6 w">
        {skills.map((category, index) => (
          <motion.div 
            key={index} 
            className="p-6  rounded-lg shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Category Title */}
            <h3 className="text-3xl font-semibold mb-6 text-purple-400">{category.category}</h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {category.skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center p-6 border border-purple-400 rounded-lg hover:scale-110 transition-transform duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <skill.icon className="text-6xl mb-4" style={{ color: skill.color }} />
                  <span className="text-xl font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
