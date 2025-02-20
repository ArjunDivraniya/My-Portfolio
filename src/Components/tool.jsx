import React from "react";
import { FaFigma,  FaAdn, FaRegObjectGroup, FaCode, FaGitAlt, FaGithub, FaNode } from "react-icons/fa";
import { SiMongodb, SiPostman,SiAdobe , SiExpress, SiReact, SiTailwindcss } from "react-icons/si";

const toolIcons = {
  FaFigma, SiAdobe, FaAdn, FaRegObjectGroup, FaCode, FaGitAlt, FaGithub, FaNode,
  SiMongodb, SiPostman, SiExpress, SiReact, SiTailwindcss
};

const tools = [
    { name: "VS Code", icon: "FaCode" },
  { name: "Figma", icon: "FaFigma" },
  { name: "GitHub", icon: "FaGithub" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "Postman", icon: "SiPostman" },
  { name: "Node.js", icon: "FaNode" },
  { name: "Express.js", icon: "SiExpress" },
  { name: "Adobe Photoshop", icon: "SiAdobe" },
  
  { name: "Canva", icon: "FaRegObjectGroup" },
  
  { name: "Git", icon: "FaGitAlt" },
 
  { name: "React DevTools", icon: "SiReact" },
  { name: "Tailwind CSS", icon: "SiTailwindcss" }
];

const ToolsIUse = () => {
  return (
    <section className="py-16 text-center text-white ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Tools I Use</h2>

        <div className="grid grid-cols-4 gap-6 justify-center items-center">
          {tools.map((tool, index) => {
            const Icon = toolIcons[tool.icon];
            return (
              <div
                key={index}
                className=" p-6 rounded-lg shadow-lg hover:scale-110 transition-transform flex flex-col items-center justify-center text-center"
              >
                <Icon size={40} className="mb-3 text-blue-400" />
                <span className="text-lg font-semibold">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsIUse;
