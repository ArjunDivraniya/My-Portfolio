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
  SiOdoo,
} from 'react-icons/si';
import DeepDetailModal from './DeepDetailModal';

const hackathonData = [
  {
    id: 'iit-gn-odoo',
    event: 'Odoo X IITGN (Online)',
    project: 'Expense Management',
    location: 'IIT Gandhinagar',
    date: '2024',
    position: 'Finalist',
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiOdoo, SiPython, SiPostgresql],
    problem:
      'Manual expense entries for hackathon and travel claims are slow, error-prone, and difficult to verify.',
    solution:
      'Built an OCR-based tracking flow inside Odoo to automate receipt extraction, policy checks, and approvals.',
    stack: ['Odoo', 'Python', 'OCR Logic', 'Finance Workflow', 'Policy Checks'],
    links: {
      live: 'https://expense-managment-eight.vercel.app/',
      github: 'https://github.com/ArjunDivraniya/ODOOxIITG-Virtual-Round-',
      video: 'https://www.youtube.com/watch?v=RrZAaDPay9g',
      embedLink: 'https://www.youtube.com/embed/RrZAaDPay9g',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: 'https://www.youtube.com/embed/RrZAaDPay9g',
    badge: 'Selected for Offline Round',
  },
  {
    id: 'odoo-nmit',
    event: 'Odoo X NMIT',
    project: 'Project Collab',
    location: 'NMIT',
    date: '2024',
    position: 'Agile Workspace',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiNodedotjs, SiTailwindcss],
    problem:
      'Fragmented tools spread project updates across chat logs and code repos, making team coordination harder.',
    solution:
      'Forged a unified collaboration board linking sprint velocity directly to dynamic task updates.',
    stack: ['React', 'Node.js', 'Kanban Engine', 'Sprint Planning', 'Task Tracking'],
    links: {
      live: '#',
      github: 'https://github.com/ArjunDivraniya/ODOOxNMIT',
      video: 'https://www.youtube.com/watch?v=lj_SfjZODq0',
      embedLink: 'https://www.youtube.com/embed/lj_SfjZODq0',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: 'https://www.youtube.com/embed/lj_SfjZODq0',
  },
  {
    id: 'odoo-spit',
    event: 'Odoo X SPIT',
    project: 'StockMaster Ops',
    location: 'SPIT',
    date: '2024',
    position: 'Inventory Intelligence',
    thumbnail:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiOdoo, SiDocker, SiMongodb],
    problem:
      'Asynchronous inventory writes can cause stock drift and break live warehouse operations under load.',
    solution:
      'Built custom multi-warehouse logic to process updates sequentially and keep inventory in sync.',
    stack: ['Odoo', 'Docker', 'Python', 'Inventory Analytics', 'Realtime Sync'],
    links: {
      live: 'https://odoo-management-system-ad.vercel.app/login',
      github: 'https://github.com/ArjunDivraniya/Odoo-X-SPIT',
      video: 'https://www.youtube.com/watch?v=dRXl1a0PcGA',
      embedLink: 'https://www.youtube.com/embed/dRXl1a0PcGA',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: 'https://www.youtube.com/embed/dRXl1a0PcGA',
  },
  {
    id: 'rai-university',
    event: 'Odoo X GCET',
    project: 'Dayflow',
    location: 'GCET',
    date: '2024',
    position: 'Operations Dashboard',
    thumbnail:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiOdoo, SiPostgresql, SiReact],
    problem:
      'Manual attendance and operational reporting leave managers without timely visibility into daily activity.',
    solution:
      'Developed secure auth-backed dashboards that map data updates directly into a streamlined client view.',
    stack: ['Odoo', 'PostgreSQL', 'Authentication Hooks', 'Analytics Engine', 'Operations'],
    links: {
      live: 'https://www.youtube.com/watch?v=43DaRK0WBLg',
      github: 'https://github.com/mayank-dudhatra/ODOOxGCET',
      video: 'https://www.youtube.com/watch?v=43DaRK0WBLg',
      embedLink: 'https://www.youtube.com/embed/43DaRK0WBLg',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: 'https://www.youtube.com/embed/43DaRK0WBLg',
  },
  {
    id: 'hackathon-marathon',
    event: 'Craftathon',
    project: 'Bus Safety Alert',
    location: 'Gandhinagar University',
    date: '2024',
    position: 'Secure Transport Ecosystem',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiReact, SiFirebase, SiMongodb],
    problem:
      'Public transit systems lack reliable validation layers to trigger alerts for unauthorized route changes.',
    solution:
      'Engineered a data-socket infrastructure that validates credentials and broadcasts safety alerts in real time.',
    stack: ['React', 'State Machinery', 'Synchronized Alerts', 'Real-time Validation'],
    links: {
      live: '#',
      github: 'https://github.com/ArjunDivraniya/Bus-Safety-Alert',
      video: '#',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: null,
  },
  {
    id: 'college-codefest',
    event: 'Odoo X IITGN (Offline)',
    project: 'HRMS Enterprise',
    location: 'IIT Gandhinagar',
    date: '2024',
    position: 'Offline Round Selection',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop',
    techIcons: [SiOdoo, SiPostgresql, SiPython],
    problem:
      'Paper-heavy onboarding and leave workflows create audit gaps and slow down enterprise HR operations.',
    solution:
      'Built secure authorization levels and background processing for payroll-ready HR data sync.',
    stack: ['Odoo', 'PostgreSQL', 'Python', 'Role Authorization', 'Payroll Reconciliation'],
    links: {
      live: '#',
      github: 'https://github.com/mayank-dudhatra/ODOOxIITGxHRMS',
      video: 'https://www.youtube.com/watch?v=mFVR0ihWdTo',
      embedLink: 'https://www.youtube.com/embed/mFVR0ihWdTo',
      certificate: 'https://www.linkedin.com/in/arjun-divraniya/details/certifications/',
    },
    embedLink: 'https://www.youtube.com/embed/mFVR0ihWdTo',
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
        project={activeHackathon}
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
      className="border-pencil group relative h-[520px] overflow-hidden bg-white/5 text-left shadow-[0_20px_60px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_30px_80px_-35px_rgba(15,23,42,0.8)] sm:h-[560px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hackathon.thumbnail})` }}
      />
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />

      {hackathon.badge ? (
        <div className="border-pencil-button absolute right-4 top-4 z-20 rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-200 overflow-hidden">
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
            <span className="border-pencil-button rounded-full bg-white/5 px-3 py-1 overflow-hidden">{hackathon.location}</span>
            <span className="border-pencil-button rounded-full bg-white/5 px-3 py-1 overflow-hidden">{hackathon.date}</span>
            <span className="border-pencil-button rounded-full bg-amber-300/10 px-3 py-1 text-amber-200 overflow-hidden">
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
                className="border-pencil-button rounded-full bg-slate-900/40 px-3 py-1 text-xs font-semibold text-slate-200 transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden"
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
                className="border-pencil-button flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl overflow-hidden"
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
