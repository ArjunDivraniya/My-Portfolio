import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaPlay, FaRegWindowMaximize } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeepDetailModal from './DeepDetailModal';
import { projectData } from './portfolio';

const springTransition = {
  type: 'spring',
  stiffness: 220,
  damping: 22.4,
};

const collectionOrder = [
  { key: 'flagship', label: 'Flagship', accent: 'from-amber-300 to-yellow-500' },
  { key: 'hackathons', label: 'Hackathons', accent: 'from-cyan-300 to-sky-500' },
  { key: 'backend', label: 'Backend', accent: 'from-emerald-300 to-green-500' },
  { key: 'oss', label: 'Open Source', accent: 'from-fuchsia-300 to-pink-500' },
  { key: 'lab', label: 'Learning Lab', accent: 'from-violet-300 to-purple-500' },
  { key: 'uiux', label: 'UI/UX', accent: 'from-orange-300 to-rose-500' },
];

const getYouTubeVideoId = (value) => {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed === '#') return null;

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
    const videoId = parsed.searchParams.get('v');
    if (videoId) return videoId;
  } catch {
    return null;
  }

  return null;
};

const toEmbedUrl = (value) => {
  const videoId = getYouTubeVideoId(value);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1` : value;
};

const normalizeProject = (item, collection) => ({
  ...item,
  categoryKey: collection.key,
  categoryLabel: collection.label,
  categoryAccent: collection.accent,
  displayTitle: item.title || item.project || 'Untitled Project',
  displaySubtitle: item.subtitle || item.event || collection.label,
  summary: item.about || item.problem || 'Project summary unavailable.',
  coverImage: item.thumbnail || item.images?.[0] || '',
  techList: Array.isArray(item.tech) ? item.tech : Array.isArray(item.stack) ? item.stack : [],
  highlightsList: item.features || item.highlights || item.flows || [],
  workflowList: item.workflow || item.phases || [],
  liveUrl: item.links?.live || item.links?.demo || '#',
  githubUrl: item.links?.github || '#',
  videoUrl: item.links?.video || item.video || '#',
  embedUrl: item.links?.embedLink || item.embedLink || item.links?.video || item.video || '#',
  docsUrl: item.links?.docs || item.links?.certificate || '#',
});

const buildCatalog = () => collectionOrder.flatMap((collection) => (projectData[collection.key] || []).map((item) => normalizeProject(item, collection)));

const getDeckState = (offset) => {
  if (offset === 0) {
    return { scale: 1, y: 0, z: 0, rotateX: 0, opacity: 1, blur: 0 };
  }

  if (offset === 1) {
    return { scale: 0.92, y: -30, z: -50, rotateX: 8, opacity: 0.75, blur: 1 };
  }

  if (offset === 2) {
    return { scale: 0.84, y: -60, z: -100, rotateX: 16, opacity: 0.4, blur: 3 };
  }

  return { scale: 0.78, y: -90, z: -140, rotateX: 22, opacity: 0, blur: 0 };
};

const ProjectDeckCard = React.forwardRef(({ project, offset, total, active, onOpen }, ref) => {
  const reducedMotion = useReducedMotion();
  const deckState = getDeckState(offset);
  const isLiveEmbed = offset === 0 && project.embedUrl && project.embedUrl !== '#';
  const embedSource = isLiveEmbed ? toEmbedUrl(project.embedUrl) : '';

  if (offset > 2) return null;

  return (
    <motion.div
      ref={ref}
      key={project.id}
      className="border-pencil-amber border-pencil absolute left-1/2 top-1/2 h-[360px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#0c0c0c] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] md:h-[450px] md:w-[320px] lg:h-[580px] lg:w-[420px]"
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1800,
        willChange: 'transform, opacity, filter',
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.88, y: 60 }}
      animate={{
        scale: deckState.scale,
        y: deckState.y,
        z: deckState.z,
        rotateX: deckState.rotateX,
        opacity: deckState.opacity,
        filter: `blur(${deckState.blur}px)`,
      }}
      exit={{ y: -180, scale: 1.1, opacity: 0, filter: 'blur(6px)' }}
      transition={springTransition}
      onClick={() => active && onOpen(project)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,rgba(0,0,0,0.84))]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          </div>
          <div className="border-pencil-button rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 overflow-hidden">
            {offset === 0 ? 'Active Node' : `Layer 0${offset + 1}`}
          </div>
        </div>

        <div className="border-pencil relative mx-5 mt-4 aspect-video overflow-hidden bg-black">
          {isLiveEmbed ? (
            <iframe
              title={`${project.displayTitle}-preview`}
              src={embedSource}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <img
              src={project.coverImage}
              alt={project.displayTitle}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="border-pencil-button absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-300 overflow-hidden">
            {project.displaySubtitle}
          </div>
          {offset === 0 ? (
            <button
              type="button"
              className="border-pencil-button absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center bg-white/10 text-white transition hover:text-yellow-300 overflow-hidden"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(project);
              }}
              aria-label="Open deep analysis"
            >
              <FaPlay />
            </button>
          ) : null}
        </div>

        <div className="flex-1 px-6 pb-6 pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.4em] text-yellow-300/80">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
              {project.categoryLabel}
            </span>
          </div>
          <h3 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">{project.displayTitle}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gray-400">{project.displaySubtitle}</p>
        </div>
      </div>
    </motion.div>
  );
});

ProjectDeckCard.displayName = 'ProjectDeckCard';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const catalog = useMemo(() => buildCatalog(), []);
  const filters = useMemo(
    () => [
      { key: 'all', label: 'All Projects', count: catalog.length, accent: 'from-white to-white' },
      ...collectionOrder.map((collection) => ({
        key: collection.key,
        label: collection.label,
        count: (projectData[collection.key] || []).length,
        accent: collection.accent,
      })),
    ],
    [catalog.length]
  );

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const activeCardRef = useRef(null);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') return catalog;
    return catalog.filter((project) => project.categoryKey === activeFilter);
  }, [activeFilter, catalog]);

  useEffect(() => {
    setActiveProjectIndex(0);
    wheelLockRef.current = false;
  }, [activeFilter]);

  const activeProject = visibleProjects[activeProjectIndex] || visibleProjects[0] || null;

  const changeProject = (direction) => {
    if (wheelLockRef.current || !visibleProjects.length) return;

    wheelLockRef.current = true;
    setActiveProjectIndex((current) => (current + direction + visibleProjects.length) % visibleProjects.length);
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 680);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) < 10) return;
    changeProject(event.deltaY > 0 ? 1 : -1);
  };

  const handlePointerDown = (event) => {
    touchStartRef.current = { y: event.clientY };
  };

  const handlePointerUp = (event) => {
    const start = touchStartRef.current;
    if (!start) return;

    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaY) > 50) {
      changeProject(deltaY > 0 ? -1 : 1);
    }

    touchStartRef.current = null;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      changeProject(1);
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      changeProject(-1);
    }
  };

  const openAnalysis = (project) => {
    setSelectedProject(project);
    setOriginRect(activeCardRef.current?.getBoundingClientRect() || null);
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden select-none bg-[#060606] text-white"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,#0b0b0b_0%,#060606_46%,#050505_100%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-12 lg:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="border-pencil-button inline-flex items-center gap-2 overflow-hidden bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-yellow-400 hover:text-black"
          >
            <FaArrowLeft /> Back Home
          </button>
          <div className="border-pencil-button hidden overflow-hidden bg-black/45 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.35em] text-white/60 lg:block">
            Wheel, swipe, or arrow keys to cycle the deck
          </div>
        </div>

        <div className="grid h-full min-h-0 grid-cols-1 items-center gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          <motion.section
            key={activeProject?.id || activeFilter}
            className="order-2 flex flex-col justify-center lg:order-1"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, stiffness: 180 }}
          >
            <div className="border-pencil max-w-xl overflow-hidden bg-white/[0.04] p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 font-mono text-sm tracking-[0.4em] text-yellow-300/80">
                <span>[ {String(activeProjectIndex + 1).padStart(2, '0')} / {String(visibleProjects.length).padStart(2, '0')} ]</span>
                <span className="h-px w-16 bg-gradient-to-r from-yellow-400/80 to-transparent" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${activeProject?.categoryAccent || 'from-white to-white'} px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-black`}>
                  <FaLayerGroup /> {activeProject?.categoryLabel || 'Projects'}
                </span>
                <span className="border-pencil-button overflow-hidden bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">
                  Infinite 3D Deck
                </span>
              </div>

              <motion.h1
                className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springTransition, stiffness: 200 }}
              >
                {activeProject?.displayTitle || 'Projects'}
              </motion.h1>

              <motion.p
                className="mt-3 text-sm uppercase tracking-[0.28em] text-gray-400"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springTransition, delay: 0.04 }}
              >
                {activeProject?.displaySubtitle || 'Collection overview'}
              </motion.p>

              <motion.p
                className="mt-6 max-w-lg text-sm leading-7 text-gray-200 sm:text-base line-clamp-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.08 }}
              >
                {activeProject?.summary}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-2.5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.12 }}
              >
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`border-pencil-button overflow-hidden px-4 py-2 text-xs font-semibold transition ${activeFilter === filter.key ? 'bg-yellow-400 text-black shadow-[0_14px_30px_-18px_rgba(250,204,21,0.75)]' : 'bg-white/5 text-white/75 hover:bg-white/10'}`}
                  >
                    {filter.label} <span className="opacity-70">({filter.count})</span>
                  </button>
                ))}
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.16 }}
              >
                <a
                  href={activeProject?.liveUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="border-pencil-button inline-flex min-h-[44px] items-center gap-2 overflow-hidden bg-yellow-400 px-5 py-3 text-sm font-bold text-black shadow-[0_18px_40px_-18px_rgba(250,204,21,0.65)] transition hover:bg-yellow-300 hover:text-black"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a
                  href={activeProject?.githubUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="border-pencil-button inline-flex min-h-[44px] items-center gap-2 overflow-hidden bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <FaGithub /> GitHub Repo
                </a>
                <button
                  type="button"
                  onClick={() => openAnalysis(activeProject)}
                  className="border-pencil-button inline-flex min-h-[44px] items-center gap-2 overflow-hidden bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:text-yellow-300"
                >
                  <FaRegWindowMaximize /> Deep Analysis
                </button>
              </motion.div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-white/65 sm:grid-cols-3">
                <div className="border-pencil overflow-hidden bg-black/25 px-4 py-3">
                  <p className="uppercase tracking-[0.28em] text-white/40">Collection</p>
                  <p className="mt-2 font-semibold text-white">{activeProject?.categoryLabel}</p>
                </div>
                <div className="border-pencil overflow-hidden bg-black/25 px-4 py-3">
                  <p className="uppercase tracking-[0.28em] text-white/40">Media</p>
                  <p className="mt-2 font-semibold text-white">{activeProject?.embedUrl !== '#' ? 'Video Preview' : 'Image Preview'}</p>
                </div>
                <div className="border-pencil overflow-hidden bg-black/25 px-4 py-3 col-span-2 sm:col-span-1">
                  <p className="uppercase tracking-[0.28em] text-white/40">Coverage</p>
                  <p className="mt-2 font-semibold text-white">All home-page projects included</p>
                </div>
              </div>

              <motion.div
                className="mt-8 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.2 }}
              >
                {(activeProject?.techList || []).slice(0, 8).map((tech) => (
                  <span key={typeof tech === 'string' ? tech : tech?.label} className="border-pencil-button overflow-hidden bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-md">
                    {typeof tech === 'string' ? tech : tech?.label}
                  </span>
                ))}
              </motion.div>

              <motion.p
                className="mt-8 max-w-md text-xs uppercase tracking-[0.32em] text-white/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...springTransition, delay: 0.24 }}
              >
                Scroll wheel or swipe advances the active card, then recycles the deck behind it.
              </motion.p>
            </div>
          </motion.section>

          <section
            className="order-1 flex h-[48vh] items-center justify-center overflow-visible lg:order-2 lg:h-full"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              touchStartRef.current = null;
            }}
          >
            <div className="relative h-[360px] w-[260px] md:h-[450px] md:w-[320px] lg:h-[620px] lg:w-[420px]">
              <AnimatePresence mode="sync">
                {visibleProjects.map((project, index) => {
                  const offset = (index - activeProjectIndex + visibleProjects.length) % visibleProjects.length;
                  return (
                    <ProjectDeckCard
                      key={project.id}
                      ref={offset === 0 ? activeCardRef : null}
                      project={project}
                      offset={offset}
                      total={visibleProjects.length}
                      active={offset === 0}
                      onOpen={openAnalysis}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

          <motion.div
            className="order-3 flex justify-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            <div className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.32em] text-white/60">
              Swipe up / down to recycle the stack
            </div>
          </motion.div>
        </div>
      </div>

      <DeepDetailModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        originRect={originRect}
        title={selectedProject?.displayTitle}
        subtitle={selectedProject?.displaySubtitle}
        project={selectedProject}
        actions={selectedProject ? [
          { label: 'Live Demo', href: selectedProject.liveUrl || '#', variant: 'primary' },
          { label: 'GitHub Repo', href: selectedProject.githubUrl || '#', variant: 'ghost' },
          { label: 'Video Walkthrough', href: selectedProject.videoUrl || '#', variant: 'ghost' },
        ] : []}
      >
        {selectedProject ? (
          <div className="space-y-4">
            <div className="border-pencil bg-white/[0.04] p-5 overflow-hidden">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Problem</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-100">{selectedProject.problem || selectedProject.summary}</p>
            </div>
            <div className="border-pencil bg-white/[0.04] p-5 overflow-hidden">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Solution</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-100">{selectedProject.solution || selectedProject.summary}</p>
            </div>
            <div className="border-pencil bg-white/[0.04] p-5 overflow-hidden">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Tech Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(selectedProject.techList || []).map((tech) => (
                  <span key={typeof tech === 'string' ? tech : tech?.label} className="border-pencil-button rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white/85 overflow-hidden">
                    {typeof tech === 'string' ? tech : tech?.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </DeepDetailModal>
    </div>
  );
};

export default ProjectsPage;
