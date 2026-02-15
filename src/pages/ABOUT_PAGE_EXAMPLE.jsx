import React from 'react';
import { motion } from 'framer-motion';

// ===================== IMPORT THE ABOUTJOURNEY COMPONENT =====================
import AboutJourney from './Components/AboutJourney';

/**
 * ===================== EXAMPLE: About Page Integration =====================
 * 
 * This file shows how to integrate the AboutJourney component into your
 * main portfolio or About page with proper section navigation and context.
 */

export default function About() {
  return (
    <div className="w-full bg-black text-white">
      {/* ===================== HERO SECTION ===================== */}
      <motion.section
        className="relative w-full min-h-screen bg-black py-20 px-4 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-yellow-500">Me</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I'm a passionate full-stack developer and creative technologist who transforms 
            complex problems into elegant, scalable solutions.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#journey"
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Journey ↓
            </motion.a>
            <motion.a
              href="#expertise"
              className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Expertise
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* ===================== ABOUT JOURNEY COMPONENT ===================== */}
      <section id="journey" className="relative w-full bg-black">
        <AboutJourney />
      </section>

      {/* ===================== EXPERTISE SECTION ===================== */}
      <section id="expertise" className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              My <span className="text-yellow-500">Expertise</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Skills and technologies I've mastered throughout my journey
            </p>
          </motion.div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Frontend Development',
                skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
                icon: '💻',
              },
              {
                title: 'Backend Development',
                skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs'],
                icon: '⚙️',
              },
              {
                title: 'Full-Stack Architecture',
                skills: ['System Design', 'Scalability', 'DevOps', 'Cloud Services', 'Microservices'],
                icon: '🏗️',
              },
              {
                title: 'Creative Design',
                skills: ['UI/UX Design', 'Photography', 'Video Editing', 'Animation', 'Branding'],
                icon: '🎨',
              },
              {
                title: 'Problem Solving',
                skills: ['Data Structures', 'Algorithms', 'Competitive Coding', 'Optimization', 'Testing'],
                icon: '🧩',
              },
              {
                title: 'DevTools & Platforms',
                skills: ['Git/GitHub', 'Docker', 'AWS', 'CI/CD', 'VS Code'],
                icon: '🛠️',
              },
            ].map((expertise, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-gradient-to-br from-black/80 via-black/70 to-purple-900/10 backdrop-blur-lg border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ translateY: -5 }}
              >
                <div className="text-5xl mb-4">{expertise.icon}</div>
                <h3 className="text-xl font-black text-yellow-500 mb-4">{expertise.title}</h3>
                <div className="space-y-2">
                  {expertise.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-yellow-500">→</span>
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VALUES SECTION ===================== */}
      <section className="relative w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              My <span className="text-yellow-500">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Innovation',
                description:
                  'I believe in pushing boundaries and exploring new technologies to create cutting-edge solutions that move the industry forward.',
              },
              {
                title: 'Quality',
                description:
                  'Every line of code, every design decision, and every interaction is carefully crafted to deliver excellence.',
              },
              {
                title: 'Collaboration',
                description:
                  'Great products come from great teamwork. I thrive in collaborative environments where ideas flourish.',
              },
              {
                title: 'Continuous Learning',
                description:
                  'The tech world never stops evolving, and neither do I. I constantly learn, experiment, and grow.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="p-8 border-l-4 border-yellow-500 bg-white/5 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-black text-yellow-500 mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="relative w-full min-h-96 bg-gradient-to-br from-black via-purple-900/10 to-black py-20 px-4 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to Build Something <span className="text-yellow-500">Amazing?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Let's collaborate and create solutions that make a real impact
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-lg rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch 🚀
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}

/**
 * ===================== HOW TO USE THIS FILE =====================
 *
 * 1. Import this About component in your main App.jsx:
 *    import About from './pages/About';
 *
 * 2. Add it to your router:
 *    <Route path="/about" element={<About />} />
 *
 * 3. Link from navigation:
 *    <Link to="/about">About Me</Link>
 *
 * 4. Customize sections with your own content
 *
 * 5. The AboutJourney component will be the centerpiece of your about page
 */
