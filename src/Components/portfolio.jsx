import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiFigma } from "react-icons/si"; 

const projects = {
  frontend: [
    {
      title: "YouTube Clone",
      description: "A fully responsive YouTube UI clone using HTML, CSS, and JavaScript.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ArjunDivraniya/Youtube-Clone",
      demo: "https://your-demo-link.com",
      details: "Created a responsive YouTube-like UI with a home page, video player, and sidebar navigation.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025410/vpeznpus6sl7cohgyfzg.png",
    },
    {
      title: "YouTube Search & Results",
      description: "YouTube search functionality with real-time API-based results.",
      tech: ["React", "Tailwind CSS", "YouTube API"],
      github: "https://github.com/ArjunDivraniya/YouTube-React-Clone",
      demo: "https://your-demo-link.com",
      details: "Implemented a search section where users can type queries and fetch real-time results from the YouTube API.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025411/dzbte8usadkoo0zsin23.png ",
    },
    {
      title: "Spotify Clone",
      description: "Music streaming app UI using React & API integration.",
      tech: ["React", "Tailwind CSS", "Spotify API"],
      github: "https://github.com/ArjunDivraniya/Spotify-Clone",
      demo: "https://github.com/ArjunDivraniya/Spotify_",
      details: "Designed a Spotify clone with user authentication and API-based song streaming.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025409/jwhf9vrlz7vwhv1p7yed.png",
    },
    {
      title: "Netflix Clone",
      description: "A Netflix UI clone with dynamic movie listing and trailers.",
      tech: ["React", "Tailwind CSS", "TMDb API"],
      github: "https://github.com/ArjunDivraniya/Netflix-Clone",
      demo: "https://beamish-frangollo-ea0007.netlify.app/",
      details: "Built a Netflix-like UI that fetches movie data from an API and displays trending content.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025410/u1kxztkc7x0uc2gbkuhw.png",
    },
    {
      title: "ReadBus Clone",
      description: "A bus ticket booking platform UI similar to RedBus.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/ArjunDivraniya/RedBus",
      demo: "https://nimble-alfajores-aa7527.netlify.app/",
      details: "Developed a RedBus-like ticket booking interface with an interactive seat selection feature.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025410/fypwfmuyckz8piby1oe8.png",
    }
  ],
  fullstack: [
    {
      title: "Shutter Sphere (In Progress)",
      description: "A full-stack photographer search and booking platform.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/ArjunDivraniya/shutter_sphere",
      demo: "https://your-demo-link.com",
      details: "Users can search for photographers based on location & specialization, book them, and chat through an integrated chat board.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025409/kkwwhosyginpfwvsux6v.png",
    }
  ],
  uiux: [
    {
      title: "Shutter Sphere (In Progress)",
      description: "A creative UI design for a full-stack web application.",
      tech: ["Figma", "Adobe XD"],
      figma: "https://www.figma.com/design/rGMySFjXI7AcEytfM11DgC/Full-Stack-Project?node-id=0-1&t=OF3Nfe8wfcNbKYun-1",
      details: "Designed an interactive UI for a full-stack web app focusing on user experience and modern aesthetics.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025410/sbct3wxsp5qrqrosfudi.png",
    },
    {
      title: "Personal Photography Website",
      description: "A portfolio UI for showcasing my photography work.",
      tech: ["Figma", "Adobe XD"],
      figma: "https://www.figma.com/design/caL2xnuuFymXGs4p3GUs1T/MY-WEBSITE?node-id=0-1&t=0xSuZPL1zDkVpCyQ-1",
      details: "Designed a personal photography website to highlight my work, portfolio, and contact details.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025410/ggac3wjqbgpei1ajwhuu.png",
    },
    {
      title: "Netflix Clone UI",
      description: "A UI design concept for a Netflix-like platform.",
      tech: ["Figma", "Adobe XD"],
      figma: "https://www.figma.com/design/MI3i3nAe7FgSqLD6TgYSUK/netflix?node-id=0-1&t=FNCDtB4dWHD6TBoq-1",
      details: "Designed a modern, sleek UI for a movie streaming platform inspired by Netflix.",
      image: "https://res.cloudinary.com/dncosrakg/image/upload/v1740025409/kedo5u8yhwwvaupbfpur.png",
    }
  ]
};


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-16 text-center text-white ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">My Projects</h2>

        {Object.entries(projects).map(([category, projectList]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold capitalize mb-6 text-purple-400">
              {category === "frontend" ? "Frontend Projects" : category === "fullstack" ? "Full-Stack Projects" : "UI/UX Design"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projectList.map((project, index) => (
                <motion.div
                  key={index}
                  className=" p-6 rounded-lg shadow-lg hover:scale-105 transition-transform relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Project Image */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />

                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                  
                  <div className="flex justify-center mt-4 space-x-3">
                    {project.github && (
                      <a href={project.github} target="_blank" className="text-gray-300 hover:text-white">
                        <FaGithub size={22} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" className="text-gray-300 hover:text-white">
                        <FaExternalLinkAlt size={22} />
                      </a>
                    )}
                    {project.figma && (
                      <a href={project.figma} target="_blank" className="text-gray-300 hover:text-white">
                      <SiFigma className="text-purple-500 w-8 h-8" />
                      </a>
                    )}
                  </div>

                  <button
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    View More
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {selectedProject && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => setSelectedProject(null)}
              >
                <FaTimes size={24} />
              </button>
              
              {/* Large Project Image */}
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-2xl font-semibold">{selectedProject.title}</h3>
              <p className="text-gray-400 mt-2">{selectedProject.details}</p>
              
              <div className="flex flex-wrap justify-center mt-4 space-x-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600">
                    <FaGithub className="inline mr-2" /> GitHub Repo
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" className="bg-purple-500 px-4 py-2 rounded text-white hover:bg-purple-600">
                    <FaExternalLinkAlt className="inline mr-2" /> Live Demo
                  </a>
                )}
                {selectedProject.figma && (
                  <a href={selectedProject.figma} target="_blank" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
                    <Figma className="text-purple-500 w-10 h-10" /> View Figma
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
