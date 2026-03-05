import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiPython,
  SiFirebase,
  SiPostgresql,
  SiDocker,
} from 'react-icons/si';
import DeepDetailModal from './DeepDetailModal';

const hackathonData = [
  {
    id: 'iit-gn-odoo',
    event: 'Odoo X IIT Gandhinagar',
    project: 'HRMS Velocity Suite',
    location: 'IIT Gandhinagar, Gujarat',
    date: 'Aug 2024',
    position: 'Finalist',
    thumbnail:
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiNodedotjs, SiPostgresql],
    problem:
      'Unify employee onboarding, attendance, and payroll across distributed teams with offline resilience.',
    solution:
      'Built a modular HRMS with offline-first workflows, role-based approvals, and automated payroll checks.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'REST APIs', 'Role-Based Access'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
    badge: 'Selected for Top 1% Offline Round',
  },
  {
    id: 'odoo-nmit',
    event: 'Odoo X NMIT',
    project: 'Expense Command Center',
    location: 'NMIT, Bangalore',
    date: 'Sep 2024',
    position: 'Participant',
    thumbnail:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiFirebase, SiTailwindcss],
    problem:
      'Track employee spending with real-time visibility while preventing duplicate reimbursements.',
    solution:
      'Designed a smart expense audit flow with live approvals, OCR receipt capture, and anomaly alerts.',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'Cloud Functions', 'OCR Integration'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
  },
  {
    id: 'odoo-spit',
    event: 'Odoo X SPIT',
    project: 'StockMaster Ops',
    location: 'SPIT, Mumbai',
    date: 'Oct 2024',
    position: 'Winner',
    thumbnail:
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiDocker, SiMongodb],
    problem:
      'Monitor inventory drift in real time and reduce stockouts across multi-warehouse operations.',
    solution:
      'Delivered a live inventory cockpit with predictive alerts, reorder automation, and fleet analytics.',
    stack: ['React', 'Docker', 'MongoDB', 'GraphQL', 'Realtime Analytics'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
  },
  {
    id: 'rai-university',
    event: 'Rai University Hackathon',
    project: 'Campus Safety Mesh',
    location: 'Rai University, Ahmedabad',
    date: 'Nov 2024',
    position: 'Finalist',
    thumbnail:
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiPython, SiReact, SiFirebase],
    problem:
      'Improve emergency response time on campus with real-time alerts and location intelligence.',
    solution:
      'Built a dispatch dashboard with live alerts, safe-route guidance, and priority escalation.',
    stack: ['Python', 'React', 'Firebase', 'Geo APIs', 'Push Notifications'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
  },
  {
    id: 'hackathon-marathon',
    event: 'Hackathon Marathon',
    project: 'AI Ops Relay',
    location: 'Virtual Global',
    date: 'Dec 2024',
    position: 'Participant',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiNodedotjs, SiMongodb],
    problem:
      'Coordinate multi-day engineering sprints while keeping release quality high.',
    solution:
      'Automated sprint checkpoints, release health scoring, and AI-guided retrospectives.',
    stack: ['React', 'Node.js', 'MongoDB', 'CI/CD', 'Telemetry'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
  },
  {
    id: 'college-codefest',
    event: 'College Codefest',
    project: 'Pulse Learning Hub',
    location: 'Coding Gita, Ahmedabad',
    date: 'Jan 2025',
    position: 'Winner',
    thumbnail:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiTailwindcss, SiFirebase],
    problem:
      'Keep learners engaged with adaptive learning paths and habit reinforcement.',
    solution:
      'Crafted a gamified learning hub with streak analytics, adaptive modules, and mentor chat.',
    stack: ['React', 'Tailwind CSS', 'Firebase', 'Analytics', 'Gamification'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
      video: 'https://example.com',
      certificate: 'https://example.com',
    },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Hackathons = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeHackathon, setActiveHackathon] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const data = useMemo(() => hackathonData, []);

  const openModal = (hackathon, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOriginRect(rect);
    setActiveHackathon(hackathon);
  };

  const closeModal = () => {
    setActiveHackathon(null);
    setOriginRect(null);
  };

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-full sm:max-w-7xl">
        <div className="flex items-end justify-between gap-6 mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-400 font-bold">Hackathons & Competitions</p>
            <h2 className="industrial-title mt-3 text-4xl font-extrabold text-white sm:text-5xl">
              Hackathons & Competitions
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Real-world problem solving under pressure
            </p>
          </div>
          <div className="hidden text-right text-sm text-slate-300 md:block">
            Premium timeline + card hybrid
            <span className="block text-amber-300 font-semibold">Story-driven highlights</span>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {data.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
              onOpen={openModal}
            />
          ))}
        </motion.div>
      </div>

      <DeepDetailModal
        isOpen={Boolean(activeHackathon)}
        onClose={closeModal}
        originRect={originRect}
        title={activeHackathon?.project}
        subtitle={activeHackathon ? activeHackathon.event : ''}
        actions={
          activeHackathon
            ? [
                { label: 'Live Demo', href: activeHackathon.links.live },
                { label: 'GitHub Code', href: activeHackathon.links.github, variant: 'ghost' },
                { label: 'Video Walkthrough', href: activeHackathon.links.video, variant: 'ghost' },
                { label: 'View Certificate', href: activeHackathon.links.certificate, variant: 'ghost' },
              ]
            : []
        }
      >
        {activeHackathon ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-purple-400/30 bg-purple-400/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Problem Statement</p>
              <p className="mt-2 text-sm text-gray-100">{activeHackathon.problem}</p>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">My Solution</p>
              <p className="mt-2 text-sm text-gray-100">{activeHackathon.solution}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Full Tech Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeHackathon.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple-400/40 bg-black px-3 py-1 text-xs font-semibold text-purple-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </DeepDetailModal>
    </section>
  );
};

const HackathonCard = ({ hackathon, onOpen }) => {
  const TechIcons = hackathon.techIcons.slice(0, 3);
  const tags = hackathon.stack.slice(0, 4);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className="group relative h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_30px_80px_-35px_rgba(15,23,42,0.8)] sm:h-[560px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hackathon.thumbnail})` }}
      />
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />

      {hackathon.badge ? (
        <div className="absolute right-4 top-4 z-20 rounded-full border border-amber-300/60 bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-200">
          {hackathon.badge}
        </div>
      ) : null}

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-300 font-bold">
            <FaTrophy />
            {hackathon.event}
          </div>
          <h3 className="text-3xl font-extrabold text-white leading-tight sm:text-4xl">{hackathon.project}</h3>

          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{hackathon.location}</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{hackathon.date}</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-amber-200">
              {hackathon.position}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-200 line-clamp-2">
            {hackathon.problem}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${hackathon.id}-${tag}`}
                className="rounded-full border border-slate-400/30 bg-slate-900/40 px-3 py-1 text-xs font-semibold text-slate-200 transition-transform duration-300 group-hover:-translate-y-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-slate-200">
            {TechIcons.map((Icon, index) => (
              <span
                key={`${hackathon.id}-tech-${index}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl"
              >
                <Icon />
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hackathon.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20"
              onClick={(event) => event.stopPropagation()}
            >
              View Project
              <FaExternalLinkAlt className="text-xs" />
            </a>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(hackathon, event);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-xs sm:text-sm font-semibold text-amber-200 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/70 hover:bg-amber-300/20 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Hackathons;
