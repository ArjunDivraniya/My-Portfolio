import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaCheckCircle,
  FaMicrosoft,
  FaShieldAlt,
  FaCloud,
} from 'react-icons/fa';
import { SiHackerrank, SiJavascript, SiMeta, SiGithub, SiAmazondocumentdb } from 'react-icons/si';
import DeepDetailModal from './DeepDetailModal';

import azureFundamentals from '../assets/certificates/Azure-Fundamentals.jpg';
import microsoftPowerBi from '../assets/certificates/Microsoft-Power-BI.jpg';
import frontendDeveloperReactJpg from '../assets/certificates/frontend_developer_react certificate_page-0001.jpg';
import javascriptBasicJpg from '../assets/certificates/javascript_basic certificate_page-0001.jpg';
import problemSolvingBasicJpg from '../assets/certificates/problem_solving_basic certificate_page-0001.jpg';
import problemSolvingIntermediateJpg from '../assets/certificates/problem_solving_intermediate certificate_page-0001.jpg';
import restApiIntermediateJpg from '../assets/certificates/rest_api_intermediate certificate_page-0001.jpg';

const certifications = [
  {
    id: 'azure-fundamentals',
    name: 'Azure Fundamentals',
    issuer: 'Microsoft',
    issuedBy: 'Microsoft',
    category: 'Backend',
    date: '2025',
    thumbnail: azureFundamentals,
    logo: FaMicrosoft,
    logoColor: 'text-blue-300',
    verifyLink: azureFundamentals,
    verificationId: 'AZURE-FUNDAMENTALS',
    skills: ['Azure Core Services', 'Cloud Concepts', 'Security Basics'],
  },
  {
    id: 'microsoft-power-bi',
    name: 'Microsoft Power BI',
    issuer: 'Microsoft',
    issuedBy: 'Microsoft',
    category: 'Backend',
    date: '2025',
    thumbnail: microsoftPowerBi,
    logo: FaMicrosoft,
    logoColor: 'text-blue-300',
    verifyLink: microsoftPowerBi,
    verificationId: 'POWER-BI',
    skills: ['Data Visualization', 'Dashboards', 'Reporting'],
  },
  {
    id: 'frontend-developer-react',
    name: 'Front-End Developer React',
    issuer: 'Meta',
    issuedBy: 'Meta',
    category: 'Frontend',
    date: '2025',
    thumbnail: frontendDeveloperReactJpg,
    logo: SiMeta,
    logoColor: 'text-blue-400',
    verificationId: 'FRONTEND-REACT',
    skills: ['React', 'Components', 'State Management'],
  },
  {
    id: 'javascript-basic',
    name: 'JavaScript Basic',
    issuer: 'HackerRank',
    issuedBy: 'HackerRank',
    category: 'Frontend',
    date: '2025',
    thumbnail: javascriptBasicJpg,
    logo: SiJavascript,
    logoColor: 'text-yellow-400',
    verificationId: 'JAVASCRIPT-BASIC',
    skills: ['ES6+', 'DOM', 'Async Basics'],
  },
  {
    id: 'problem-solving-basic',
    name: 'Problem Solving Basic',
    issuer: 'HackerRank',
    issuedBy: 'HackerRank',
    category: 'Hackathon',
    date: '2025',
    thumbnail: problemSolvingBasicJpg,
    logo: SiHackerrank,
    logoColor: 'text-green-400',
    verificationId: 'PROBLEM-SOLVING-BASIC',
    skills: ['Logic', 'Problem Solving', 'Complexity Basics'],
  },
  {
    id: 'problem-solving-intermediate',
    name: 'Problem Solving Intermediate',
    issuer: 'HackerRank',
    issuedBy: 'HackerRank',
    category: 'Hackathon',
    date: '2025',
    thumbnail: problemSolvingIntermediateJpg,
    logo: SiHackerrank,
    logoColor: 'text-green-400',
    verificationId: 'PROBLEM-SOLVING-INTERMEDIATE',
    skills: ['Algorithms', 'Optimization', 'Time Complexity'],
  },
  {
    id: 'rest-api-intermediate',
    name: 'REST API Intermediate',
    issuer: 'HackerRank',
    issuedBy: 'HackerRank',
    category: 'Backend',
    date: '2025',
    thumbnail: restApiIntermediateJpg,
    logo: SiHackerrank,
    logoColor: 'text-green-400',
    verificationId: 'REST-API-INTERMEDIATE',
    skills: ['HTTP', 'API Design', 'Authentication'],
  },
  {
    id: 'documentdb',
    name: 'Getting Started with Amazon DocumentDB (with MongoDB compatibility)',
    issuer: 'Simplilearn',
    issuedBy: 'Simplilearn',
    category: 'Backend',
    date: '2025',
    thumbnail: null,
    logo: SiAmazondocumentdb,
    logoColor: 'text-orange-300',
    verifyLink:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDkwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyNjIyM184NzgwMDc0MTc0OTAyMDI4MTAxOC5wbmciLCJ1c2VybmFtZSI6IkFyanVuIERpdnJhbml5YSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7421%2FGetting-Started-with-Amazon-DocumentDB-%2528with-MongoDB-compatibility%2529%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1494623939221840213&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVT0sJNTaMNA8MDU%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAEHV8RZBAAAA',
    verificationId: 'DOCDB-2025',
    skills: ['DocumentDB', 'NoSQL', 'MongoDB Compatibility'],
  },
  {
    id: 'azure-basics',
    name: 'Introduction to the Basics of Azure Services',
    issuer: 'Simplilearn',
    issuedBy: 'Simplilearn',
    category: 'Backend',
    date: '2025',
    thumbnail: null,
    logo: FaMicrosoft,
    logoColor: 'text-blue-300',
    verifyLink:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQxOTEyMV84NzgwMDc0MTc0ODg1Nzk2NjUxNi5wbmciLCJ1c2VybmFtZSI6IkFyanVuIERpdnJhbml5YSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4621%2FIntroduction-to-the-Basics-of-Azure-Services%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1494623939221840213&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVLyv1cDG2zAoKDU%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAD%2FlnwNBAAAA',
    verificationId: 'AZURE-BASICS',
    skills: ['Azure Fundamentals', 'Compute', 'Networking'],
  },
  {
    id: 'github-copilot-fundamentals',
    name: 'GitHub Copilot Fundamentals',
    issuer: 'Simplilearn',
    issuedBy: 'Simplilearn',
    category: 'Backend',
    date: '2025',
    thumbnail: null,
    logo: SiGithub,
    logoColor: 'text-purple-300',
    verifyLink:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODc2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQyODUxNF84NzgwMDc0MTc0OTA1NTg0NTUyMC5wbmciLCJ1c2VybmFtZSI6IkFyanVuIERpdnJhbml5YSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7867%2FGitHub-Copilot-Fundamentals%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1494623939221840213&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVDymtCPPyLAoKDU%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAM4nFDNBAAAA',
    verificationId: 'GITHUB-COPILOT',
    skills: ['AI Assistance', 'Prompting', 'Productivity'],
  },
  {
    id: 'container-security',
    name: 'Deep Dive on Container Security',
    issuer: 'Simplilearn',
    issuedBy: 'Simplilearn',
    category: 'Backend',
    date: '2025',
    thumbnail: null,
    logo: FaShieldAlt,
    logoColor: 'text-emerald-300',
    verifyLink:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDk1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQ1MDc3N184NzkxNTc3MTc0OTU2NDgzODM3Ni5wbmciLCJ1c2VybmFtZSI6IkFyanVuIERpdnJhbml5YSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7426%2FDeep-Dive-on-Container-Security%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1494623939221840213&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVN6os8%2FVMdAwODU%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAGSybbNBAAAA',
    verificationId: 'CONTAINER-SECURITY',
    skills: ['Container Hardening', 'Security Posture', 'Vulnerability Scanning'],
  },
  {
    id: 'gateway-load-balancer',
    name: 'Getting Started with Gateway Load Balancer',
    issuer: 'Simplilearn',
    issuedBy: 'Simplilearn',
    category: 'Backend',
    date: '2025',
    thumbnail: null,
    logo: FaCloud,
    logoColor: 'text-amber-300',
    verifyLink:
      'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTg2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQ2MDU5M184NzkxNTc3MTc0OTc0NzcxNTg2My5wbmciLCJ1c2VybmFtZSI6IkFyanVuIERpdnJhbml5YSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F7526%2FGetting%2520Started%2520with%2520Gateway%2520Load%2520Balancer%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1494623939221840213&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVNw6LyMh2rAgODU%2ByrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDAG%2F76I9BAAAA',
    verificationId: 'GATEWAY-LB',
    skills: ['Load Balancing', 'Traffic Inspection', 'Cloud Networking'],
  },
];

const extractSimplilearnImage = (url) => {
  try {
    const token = new URL(url).searchParams.get('token');
    if (!token) return null;
    const padded = token.padEnd(Math.ceil(token.length / 4) * 4, '=');
    const decoded = JSON.parse(atob(padded));
    return decoded?.certificate_url || null;
  } catch (error) {
    return null;
  }
};

const HACKERRANK_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1f2937"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.3" cy="0.2" r="0.8">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#0b1020" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="18"/>
      </filter>
    </defs>
    <rect width="1200" height="700" fill="url(#bg)"/>
    <rect width="1200" height="700" fill="url(#glow)"/>
    <g filter="url(#blur)">
      <circle cx="240" cy="140" r="120" fill="#f59e0b" fill-opacity="0.2"/>
      <circle cx="980" cy="520" r="180" fill="#38bdf8" fill-opacity="0.18"/>
    </g>
  </svg>`
)}`;

const getCertPreviewImage = (cert) => {
  if (cert.previewImage) return cert.previewImage;
  const simplilearnImage = extractSimplilearnImage(cert.verifyLink);
  if (simplilearnImage) return simplilearnImage;
  if (cert.iframeLink && cert.iframeLink.includes('hackerrank.com')) {
    return HACKERRANK_PLACEHOLDER;
  }
  return cert.thumbnail;
};

const Certifications = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(
    () => ['All', 'Frontend', 'Backend', 'Design', 'Hackathon'],
    []
  );

  const filteredCerts = useMemo(() => {
    if (activeCategory === 'All') return certifications;
    return certifications.filter((cert) => cert.category === activeCategory);
  }, [activeCategory]);

  const visibleCerts = useMemo(() => {
    if (showAll) return filteredCerts;
    return filteredCerts.slice(0, 6);
  }, [filteredCerts, showAll]);

  const openModal = (cert, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOriginRect(rect);
    setActiveCert(cert);
  };

  const closeModal = () => {
    setActiveCert(null);
    setOriginRect(null);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-20 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.12) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="relative mx-auto max-w-full sm:max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300 font-bold">Certifications</p>
            <h2 className="industrial-title mt-3 text-4xl font-extrabold text-white sm:text-5xl">
              Certifications
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              Continuous Learning & Skill Validation
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'border-amber-300 bg-amber-300 text-slate-900 shadow-[0_10px_20px_-12px_rgba(251,191,36,0.45)]'
                    : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-amber-300/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {visibleCerts.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} onOpen={openModal} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length > 6 ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-amber-300/60 hover:text-white"
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        ) : null}
      </div>

      <DeepDetailModal
        isOpen={Boolean(activeCert)}
        onClose={closeModal}
        originRect={originRect}
        title={activeCert?.name}
        subtitle={activeCert ? `Issued by ${activeCert.issuer}` : ''}
        actions={
          activeCert
            ? [
                {
                  label: 'Credential',
                  href: activeCert.verifyLink,
                  variant: 'primary',
                },
              ]
            : []
        }
      >
        {activeCert ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-black via-black to-purple-900/30 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Verification ID</p>
                  <p className="mt-1 text-lg font-semibold text-yellow-400">
                    {activeCert.verificationId}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-bold uppercase text-yellow-300">
                  <FaCheckCircle />
                  Verified
                </div>
              </div>
            </div>

            {activeCert.iframeLink ? (
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-black">
                  <iframe
                    title={`${activeCert.name} certificate`}
                    src={activeCert.iframeLink}
                    className="h-[420px] w-full"
                    loading="lazy"
                    allow="fullscreen"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  If the preview does not load, use the Verify Credential button below.
                </p>
              </div>
            ) : getCertPreviewImage(activeCert) ? (
              <div className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-black">
                <img
                  src={getCertPreviewImage(activeCert)}
                  alt={`${activeCert.name} certificate`}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Skills Learned</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-purple-400/40 bg-purple-400/10 px-3 py-1 text-xs font-semibold text-purple-100"
                  >
                    {skill}
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

const CertificationCard = ({ cert, onOpen }) => {
  const Icon = cert.logo;
  const previewImage = getCertPreviewImage(cert);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.6)]"
    >
      <div className="relative h-48 overflow-hidden">
        {cert.iframeLink ? (
          <iframe
            title={`${cert.name} certificate preview`}
            src={cert.iframeLink}
            className="h-full w-full border-0 pointer-events-none"
            loading="lazy"
            allow="fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : previewImage && !imageFailed ? (
          <img
            src={previewImage}
            alt={cert.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 text-center">
            <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/70 text-2xl ${cert.logoColor}`}>
              <Icon />
            </div>
            <p className="text-sm font-semibold text-slate-100">Certificate Preview Unavailable</p>
            <p className="mt-1 text-xs text-slate-400">Open details to verify this credential</p>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/95 p-4 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white">
            <span>{cert.issuer}</span>
            <span className="text-amber-200">{cert.date}</span>
          </div>
          <button
            type="button"
            onClick={(event) => onOpen(cert, event)}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-300 px-4 py-2 text-xs font-semibold text-slate-900 transition-all duration-300 hover:shadow-[0_0_18px_rgba(251,191,36,0.6)]"
          >
            View
            <FaExternalLinkAlt className="text-[10px]" />
          </button>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className={`h-12 w-12 rounded-xl border border-slate-700 bg-slate-800/70 ${cert.logoColor} flex items-center justify-center text-2xl`}>
            <Icon />
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
            {cert.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{cert.name}</h3>
          <p className="mt-2 text-sm text-slate-300">{cert.issuedBy}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700 pt-3 text-xs text-slate-400">
          <span>{cert.date}</span>
          <span>{cert.verificationId}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default Certifications;
