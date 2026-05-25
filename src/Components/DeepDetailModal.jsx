import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBook,
  FaCheckCircle,
  FaCode,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaPause,
  FaPlay,
  FaProjectDiagram,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
  FaExclamationTriangle,
  FaServer,
  FaUserAlt,
  FaLayerGroup,
  FaChartLine,
} from 'react-icons/fa';
import portfolioLoopVideo from '../assets/public/Signature 2.o.mp4';

const techInsights = {
  React: {
    icon: FaCode,
    text: 'Builds the interactive interface and keeps the UI responsive as state changes.',
  },
  Node: {
    icon: FaServer,
    text: 'Handles request orchestration and backend execution for the project flows.',
  },
  MongoDB: {
    icon: FaDatabase,
    text: 'Stores project data in a flexible schema for fast iteration and retrieval.',
  },
  PostgreSQL: {
    icon: FaDatabase,
    text: 'Keeps relational data consistent for approvals, records, and reporting.',
  },
  Python: {
    icon: FaCode,
    text: 'Runs automation, data logic, and backend helpers with readable service code.',
  },
  Odoo: {
    icon: FaLayerGroup,
    text: 'Coordinates modular business workflows and enterprise screens with reusable apps.',
  },
  Reports: {
    icon: FaChartLine,
    text: 'Turns raw records into decision-ready summaries and operational dashboards.',
  },
  Inventory: {
    icon: FaDatabase,
    text: 'Tracks stock movement and availability so the system can react before shortages happen.',
  },
  Analytics: {
    icon: FaChartLine,
    text: 'Surfaces trends and performance patterns for faster decisions and planning.',
  },
  Kanban: {
    icon: FaProjectDiagram,
    text: 'Visualizes work progress so the team can move tasks through a clear pipeline.',
  },
  Auth: {
    icon: FaUserAlt,
    text: 'Protects access with identity checks and role-aware routing.',
  },
  'Next.js': {
    icon: FaCode,
    text: 'Delivers the app shell and server-rendered entry points for fast page loads.',
  },
  Charts: {
    icon: FaChartLine,
    text: 'Transforms data into visual comparisons that are easy to scan and explain.',
  },
  Redis: {
    icon: FaDatabase,
    text: 'Caches hot data and speeds up repeated requests for smoother interactions.',
  },
  JWT: {
    icon: FaUserAlt,
    text: 'Secures sessions with lightweight token-based authentication.',
  },
  Testing: {
    icon: FaCheckCircle,
    text: 'Validates behavior and helps keep the codebase stable as features evolve.',
  },
};

const defaultTechInsight = {
  icon: FaCode,
  text: 'Supports the project with a reusable implementation role inside the stack.',
};

const getTechItem = (tech) => {
  if (typeof tech === 'string') {
    return {
      icon: techInsights[tech]?.icon || defaultTechInsight.icon,
      label: tech,
      text: techInsights[tech]?.text || defaultTechInsight.text,
    };
  }

  return {
    icon: tech?.icon || defaultTechInsight.icon,
    label: tech?.label || 'Tech',
    text: tech?.description || techInsights[tech?.label]?.text || defaultTechInsight.text,
  };
};

const getTimeline = (project) => project?.workflow || project?.phases || ['User Input', 'Processing', 'Database', 'Output'];

const isValidMediaUrl = (value) => {
  if (typeof value !== 'string') return false;

  const trimmed = value.trim();
  if (!trimmed || trimmed === '#') return false;

  return /^(https?:)?\/\//.test(trimmed) || trimmed.startsWith('blob:') || trimmed.startsWith('data:') || trimmed.endsWith('.mp4') || trimmed.endsWith('.webm');
};

const getYouTubeVideoId = (url) => {
  if (typeof url !== 'string') return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  const patterns = [
    /(?:youtu\.be\/)([\w-]{11})/i,
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/i,
    /(?:youtube-nocookie\.com\/embed\/)([\w-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }

  try {
    const parsed = new URL(trimmed, 'https://www.youtube.com');
    const v = parsed.searchParams.get('v');
    if (v) return v;
  } catch {
    return null;
  }

  return null;
};

const toYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const DeepDetailModal = ({
  isOpen,
  onClose,
  originRect,
  title,
  subtitle,
  project,
  actions,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);
    setIsMuted(true);
  }, [isOpen, project?.id]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const playPromise = videoRef.current.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isOpen, project?.id]);

  const footerActions = useMemo(() => {
    if (actions?.length) return actions;

    const links = project?.links || {};
    return [
      { label: 'GitHub Repo', href: links.github || '#', variant: 'ghost' },
      { label: 'Live Production Link', href: links.demo || '#', variant: 'primary' },
      { label: 'Technical Documentation', href: links.docs || links.github || '#', variant: 'ghost' },
      { label: 'Architecture Diagram', href: links.architecture || links.docs || links.github || '#', variant: 'ghost' },
    ];
  }, [actions, project]);
  // Prefer explicit media fields; fall back to known video links or the loop fallback
  const candidateMedia = project?.mediaVideo || project?.embedLink || project?.links?.embedLink || project?.links?.video || project?.video;
  const rawMedia = isValidMediaUrl(candidateMedia) ? candidateMedia : portfolioLoopVideo;
  const isYouTube = typeof rawMedia === 'string' && /youtu(?:\.be|be\.com|be-nocookie)\/.+|youtube/.test(rawMedia);

  const mediaSource = useMemo(() => {
    if (!isYouTube || typeof rawMedia !== 'string') return rawMedia;

    const embedUrl = toYouTubeEmbedUrl(rawMedia);

    const joiner = embedUrl.includes('?') ? '&' : '?';
    return `${embedUrl}${joiner}autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;
  }, [isYouTube, rawMedia]);
  const problemText = project?.problem || project?.about || 'This project was built to resolve a real user or workflow bottleneck.';
  const solutionText = project?.solution || project?.about || 'The engineering approach focused on clarity, speed, and a friction-free user path.';
  const techItems = (project?.tech || []).map(getTechItem);
  const highlights = (project?.features || project?.highlights || []).slice(0, 4);
  const timeline = getTimeline(project).slice(0, 5);

  const handleClose = () => {
    onClose();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-[#080808]/92"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="border-pencil-amber relative z-10 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border-pencil bg-[#080808] text-white shadow-[0_35px_100px_-40px_rgba(0,0,0,0.7)] will-change-transform transform-gpu isolate"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <button
            onClick={handleClose}
            className="border-pencil-button absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center overflow-hidden bg-black/60 text-lg text-white backdrop-blur-md transition hover:bg-yellow-400 hover:text-black"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>

          {/* Hero Video */}
          <div className="relative h-[40vh] md:h-1/2 min-h-[160px] max-h-[60vh] w-full border-b border-white/10 bg-black overflow-hidden">
            {isYouTube ? (
              <iframe
                title={`project-video-${project?.id || 'case'}`}
                className="h-full w-full"
                src={mediaSource}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="eager"
              />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={project?.images?.[0]}
              >
                <source src={mediaSource} type="video/mp4" />
              </video>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="border-pencil-button absolute left-4 top-4 flex items-center gap-2 overflow-hidden bg-black/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Case Study
            </div>

            <div className="absolute bottom-4 left-4 max-w-3xl space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/80">{subtitle}</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            </div>

            <div className="border-pencil-button absolute bottom-4 right-4 flex items-center gap-2 overflow-hidden bg-black/60 p-2">
              {isYouTube ? (
                <a
                  href={project?.links?.video || project?.video || mediaSource}
                  target="_blank"
                  rel="noreferrer"
                  className="border-pencil-button inline-flex h-11 w-11 items-center justify-center overflow-hidden bg-white/5 text-white transition hover:bg-yellow-400 hover:text-black"
                  aria-label="Open video in new tab"
                >
                  <FaExternalLinkAlt />
                </a>
              ) : (
                <>
                  <button
                    onClick={togglePlay}
                    className="border-pencil-button flex h-11 w-11 items-center justify-center overflow-hidden bg-white/5 text-white transition hover:bg-yellow-400 hover:text-black"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="border-pencil-button flex h-11 w-11 items-center justify-center overflow-hidden bg-white/5 text-white transition hover:bg-yellow-400 hover:text-black"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Scrollable Study Sections */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 lg:px-10" style={{ WebkitOverflowScrolling: 'touch', contain: 'content' }}>
            <div className="mx-auto max-w-6xl space-y-10 pb-8">
              <motion.section
                className="grid gap-4 lg:grid-cols-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                <motion.div
                    className="border-pencil overflow-hidden bg-white/[0.04] p-5 sm:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="border-pencil-button mb-3 inline-flex items-center gap-2 overflow-hidden bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-red-300">
                    <FaExclamationTriangle /> The Challenge
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200 sm:text-base">{problemText}</p>
                </motion.div>

                <motion.div
                  className="border-pencil overflow-hidden bg-white/[0.04] p-5 sm:p-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.08 }}
                >
                  <div className="border-pencil-button mb-3 inline-flex items-center gap-2 overflow-hidden bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                    <FaCheckCircle /> The Engineering Fix
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200 sm:text-base">{solutionText}</p>
                </motion.div>
              </motion.section>

              <motion.section
                className="border-pencil overflow-hidden bg-white/[0.04] p-5 sm:p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
                  <h3 className="text-xl font-black text-white sm:text-2xl">Technical Workflow</h3>
                </div>

                <div className="space-y-4">
                  {timeline.map((step, index) => (
                    <motion.div
                      key={`${step}-${index}`}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="border-pencil-button flex h-10 w-10 items-center justify-center overflow-hidden bg-yellow-500/10 text-sm font-black text-yellow-300">
                          {index + 1}
                        </div>
                        {index < timeline.length - 1 ? <div className="h-full w-px bg-gradient-to-b from-yellow-400/50 to-transparent" /> : null}
                      </div>
                      <div className="border-pencil flex-1 overflow-hidden bg-black/25 px-4 py-3">
                        <p className="text-sm font-semibold text-white sm:text-base">{step}</p>
                        <p className="mt-1 text-sm text-gray-400">
                          {index === 0
                            ? 'The journey starts when the user enters data or triggers an action.'
                            : index === timeline.length - 1
                              ? 'The final output is stored, displayed, or delivered back to the user.'
                              : 'Data is transformed, validated, and moved to the next system layer.'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                className="border-pencil overflow-hidden bg-white/[0.04] p-5 sm:p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <h3 className="text-xl font-black text-white sm:text-2xl">Tech Stack Work</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {techItems.map((item, index) => {
                    const TechIcon = item.icon;

                    return (
                      <motion.div
                        key={`${item.label}-${index}`}
                        className="border-pencil overflow-hidden bg-black/30 p-4"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className="border-pencil-button mb-3 flex h-11 w-11 items-center justify-center overflow-hidden bg-white/[0.05] text-yellow-300">
                          <TechIcon />
                        </div>
                        <h4 className="text-sm font-bold text-white">{item.label}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section
                className="border-pencil overflow-hidden bg-white/[0.04] p-5 sm:p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.5)]" />
                  <h3 className="text-xl font-black text-white sm:text-2xl">Key Highlights</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={`${item}-${index}`}
                      className="border-pencil overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5"
                      initial={{ opacity: 0, scale: 0.96, y: 16 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-300">High Performance</p>
                      <p className="mt-3 text-lg font-semibold leading-relaxed text-white">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>

          {/* Footer (sits at modal bottom) */}
          <div className="flex-none z-20 border-t border-white/10 bg-black/90 px-4 py-4 sm:px-6 lg:px-10 overflow-hidden">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-2 sm:gap-3">
              {footerActions.map((action) => {
                const isDisabled = !action?.href || action.href === '#';
                const baseClasses =
                  'border-pencil-button inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 overflow-hidden px-4 py-3 text-sm font-bold transition';
                const variantClasses =
                  action.variant === 'primary'
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 hover:bg-yellow-300 hover:text-black'
                    : 'bg-white/[0.04] text-white hover:bg-white/[0.08]';

                if (isDisabled) {
                  return (
                    <div key={action.label} className={`${baseClasses} cursor-not-allowed opacity-50 ${variantClasses}`}>
                      {action.label}
                    </div>
                  );
                }

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${baseClasses} ${variantClasses}`}
                  >
                    {action.label === 'GitHub Repo' ? <FaGithub /> : null}
                    {action.label === 'Live Production Link' ? <FaExternalLinkAlt /> : null}
                    {action.label === 'Technical Documentation' ? <FaBook /> : null}
                    {action.label === 'Architecture Diagram' ? <FaProjectDiagram /> : null}
                    <span>{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeepDetailModal;
