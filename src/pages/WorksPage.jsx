import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import KineticGrid from '../components/KineticGrid';
import { Footer } from '../components/Footer';

const WORKS_SHOWCASE = [
  {
    id: 1,
    title: 'WNB Turkish Barber',
    client: 'WNB TURKISH BARBER',
    cat: 'Grooming & Lifestyle',
    headline: 'Traditional Ottoman Grooming & Luxury Barbering Experience',
    img: '/Hero-Images/wnbturkish-hero.png',
    url: 'https://wnbturkishbarber.netlify.app/',
    description: 'A luxury digital experience designed for WNB Turkish Barber featuring interactive service selection and automated booking.',
    accentColor: '#c73827',
    tabBgClass: 'bg-[#c73827]',
    textColor: 'text-[#c73827]',
    overview: 'Premier Turkish barbering studio offering traditional hot-towel shaves, beard sculpting, razor fades, and luxury grooming experiences.',
    metrics: [
      { label: 'Client satisfaction rating', val: '4.9 ★' },
      { label: 'Online bookings surge', val: '3.5×' },
      { label: 'Mobile optimized experience', val: '100%' },
    ],
    tags: ['Web Platform', 'Barber Booking', 'Service Menu UX', 'Mobile Scheduling'],
    challenge: 'The client needed a sophisticated booking portal that reflected traditional Turkish hospitality while enabling rapid mobile scheduling.',
    solution: 'Engineered an opulent, high-converting digital storefront with real-time barber availability, service selection, and instant appointment booking.',
  },
  {
    id: 2,
    title: 'BRIM Burgers',
    client: 'BRIM BURGERS',
    cat: 'Halal F&B Franchise',
    headline: 'High-Velocity Franchise Hub & Smashed Gourmet Burger Destination',
    img: '/Hero-Images/brim-tawny-hero.png',
    url: 'https://brim-tawny.vercel.app/franchise',
    description: 'Immersive digital franchise hub and interactive menu engine built to streamline location discovery and application pipelines.',
    accentColor: '#d97706',
    tabBgClass: 'bg-[#d97706]',
    textColor: 'text-[#d97706]',
    overview: 'Bold brand identity and high-converting digital ordering experience for Glasgow premium fast-casual gourmet burger landmark.',
    metrics: [
      { label: 'Monthly franchise inquiries', val: '250+' },
      { label: 'Conversion rate surge', val: '4.2×' },
      { label: 'Average order speedup', val: '45s' },
    ],
    tags: ['Franchise Portal', 'Menu Architecture', 'Brand Identity', 'Fast-Casual UX'],
    challenge: 'BRIM needed to scale franchise inquiries rapidly across new regions while serving a seamless interactive menu to online diners.',
    solution: 'Built a dedicated franchise application engine and interactive food menu platform that captured high-intent leads and boosted restaurant discovery.',
  },
  {
    id: 3,
    title: 'Sai Dental Clinic',
    client: 'SAI DENTAL CLINIC',
    cat: 'Clinical Healthcare',
    headline: 'Empathetic Healthcare Portal & Virtual Patient Scheduling',
    img: '/Hero-Images/dr-rathod-hero.png',
    url: 'https://gorgeous-daffodil-31a9c9.netlify.app/',
    description: 'Empathetic healthcare web portal facilitating patient intake, virtual consultation bookings, and procedure breakdowns.',
    accentColor: '#0284c7',
    tabBgClass: 'bg-[#0284c7]',
    textColor: 'text-[#0284c7]',
    overview: 'Modern clinical web platform designed to facilitate patient intake, virtual consultation bookings, and procedure breakdowns.',
    metrics: [
      { label: 'New patient intake boost', val: '3.5×' },
      { label: 'Patient onboarding time', val: '-65%' },
      { label: 'Patient trust & rating', val: '99%' },
    ],
    tags: ['Clinical Portal', 'Patient Intake', 'Procedure Breakdown', 'Telehealth Schedule'],
    challenge: 'Patients needed a welcoming, informative portal to understand dental procedures, view before/after results, and schedule visits effortlessly.',
    solution: 'Delivered a clean, patient-centric digital platform with interactive procedure guides, instant appointment requests, and mobile intake forms.',
  },
  {
    id: 4,
    title: 'Old Glen Landscapes',
    client: 'OLD GLEN LANDSCAPES',
    cat: 'Exterior Architecture',
    headline: "Glasgow's Premier Exterior Architecture & Master Landscaping Studio",
    img: '/Hero-Images/wnbturkish-hero.png',
    url: 'https://old-glen-landscapes.vercel.app/',
    description: 'Bespoke outdoor living spaces, luxury paving, architectural garden design, and Scottish hardscaping master craftsmanship.',
    accentColor: '#0e593c',
    tabBgClass: 'bg-[#0e593c]',
    textColor: 'text-[#0e593c]',
    overview: 'Bespoke outdoor living spaces, luxury paving, architectural garden design, and Scottish hardscaping master craftsmanship in Glasgow.',
    metrics: [
      { label: 'Project lead growth', val: '4.1×' },
      { label: 'High-value quote requests', val: '+180%' },
      { label: 'Scottish climate rating', val: '100%' },
    ],
    tags: ['3D Garden Layouts', 'Hardscaping Studio', 'Portfolio Showcase', 'Quote Engine'],
    challenge: 'High-end landscape studio needed to present 3D outdoor architectural layouts and capture premium residential landscaping quotes.',
    solution: 'Architected an elegant portfolio gallery highlighting project transformations with an automated quote request pipeline.',
  },
  {
    id: 5,
    title: 'Integrate AI Systems',
    client: 'INTEGRATE THOUGHT',
    cat: 'Enterprise AI & RAG',
    headline: 'Autonomous AI Workflows & Private Enterprise RAG Architecture',
    img: '/Hero-Images/brim-tawny-hero.png',
    url: '#',
    description: 'Custom enterprise AI agent orchestration and secure internal RAG knowledge architectures connected to private company databases.',
    accentColor: '#7c3aed',
    tabBgClass: 'bg-[#7c3aed]',
    textColor: 'text-[#7c3aed]',
    overview: 'Custom enterprise AI agent orchestration and secure internal RAG knowledge architectures connected to private company databases.',
    metrics: [
      { label: 'Engineering hours saved', val: '1,200+' },
      { label: 'Query retrieval accuracy', val: '99.4%' },
      { label: 'Workflow automation speed', val: '10×' },
    ],
    tags: ['Private RAG', 'Vector Embeddings', 'AI Autonomous Agents', 'Data Security'],
    challenge: 'Enterprise client required a secure knowledge retrieval engine to query thousands of private internal technical documents securely.',
    solution: 'Deployed a local RAG vector database and custom AI agent pipeline that answers complex engineering queries in seconds with citation accuracy.',
  },
  {
    id: 6,
    title: 'Nexus Engine',
    client: 'NEXUS SYSTEMS',
    cat: 'Cloud & Automation',
    headline: 'High-Speed Cloud Deployment & Real-Time Analytics Architecture',
    img: '/Hero-Images/dr-rathod-hero.png',
    url: '#',
    description: 'Automated cloud deployment pipelines, container orchestration, and high-speed data analytics architectures.',
    accentColor: '#1351d8',
    tabBgClass: 'bg-[#1351d8]',
    textColor: 'text-[#1351d8]',
    overview: 'Automated cloud deployment pipelines, container orchestration, and high-speed data analytics architectures.',
    metrics: [
      { label: 'Cloud infra cost reduction', val: '35%' },
      { label: 'Uptime reliability score', val: '99.99%' },
      { label: 'Deployment speedup factor', val: '8.5×' },
    ],
    tags: ['Cloud Orchestration', 'DevOps Pipeline', 'Real-Time Analytics', 'Serverless'],
    challenge: 'Needed high-speed automated cloud provisioning to handle traffic spikes during product launches without over-budget infrastructure.',
    solution: 'Engineered auto-scaling serverless containers with automated CI/CD deployment hooks and real-time telemetry monitoring.',
  },
];

export default function WorksPage({ onNavigate }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpenModal = (work) => {
    setSelectedWork(work);
    setIsClosing(false);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedWork(null);
      setIsClosing(false);
    }, 280);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedWork) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWork]);

  return (
    <div className="relative min-h-screen w-full bg-[#eef4fa] text-slate-900 font-sans flex flex-col justify-between select-none overflow-x-hidden">
      
      {/* Interactive KineticGrid Canvas Background */}
      <KineticGrid
        spacing={64}
        dotSize={2}
        gridStroke={1}
        gridOpacity={0.45}
        repulsion={5}
        radius={60}
        stiffness={1.0}
        damping={0.09}
        clickIntensity={30}
        trailIntensity={0.15}
        backgroundColor="#eef4fa"
        lineColor="#cbd5e1"
        dotColor="#94a3b8"
      />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar progress={0.32} onNavigate={onNavigate} activePage="Works" />

        {/* Hero Section */}
        <section className="pt-40 sm:pt-44 pb-12 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-900 text-[11px] font-mono font-semibold tracking-widest uppercase mb-4 shadow-sm">
            02 / CLIENT SHOWCASE &amp; PORTFOLIO
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto mb-4 font-sans">
            Work that moves the needle.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal font-sans">
            Long-term engagements where design, engineering and automation shipped together. Hover over any booklet card to preview, and click to view full details.
          </p>
        </section>

        {/* 3 CARDS PER ROW GRID CONTAINER WITH GENEROUS SPACING */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {WORKS_SHOWCASE.map((work) => (
              <div
                key={work.id}
                onClick={() => handleOpenModal(work)}
                className="group relative w-full h-[370px] sm:h-[400px] cursor-pointer [perspective:1400px]"
              >
                {/* LAYER 3: DEEPEST BACK PAGE (Tilts top-right on hover in a cross fanned manner) */}
                <div
                  className="absolute inset-0 rounded-[24px] bg-[#d9e4f2] border border-blue-200/60 p-5 shadow-sm transition-all duration-500 ease-out group-hover:translate-x-10 group-hover:-translate-y-3 group-hover:rotate-[5deg] group-hover:scale-[0.95] group-hover:shadow-md"
                />

                {/* LAYER 2: SOLID ACCENT COLOR TAB PAGE (Tilts slightly right & holds CLICK TO READ) */}
                <div
                  className={`absolute inset-0 rounded-[24px] ${work.tabBgClass} shadow-md flex flex-col justify-center items-end pr-2.5 transition-all duration-500 ease-out group-hover:translate-x-6 group-hover:rotate-[2deg] group-hover:shadow-xl`}
                >
                  {/* Sticking Vertical Text Tab */}
                  <div className="h-full flex items-center justify-center">
                    <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-white uppercase select-none [writing-mode:vertical-lr] rotate-180 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                      <span>CLICK TO READ</span>
                    </span>
                  </div>
                </div>

                {/* LAYER 1: FRONT BOOKLET COVER CARD (Swings open to the left on hover) */}
                <div
                  className="absolute inset-0 rounded-[24px] bg-[#ffffff] border border-slate-200/90 p-5 sm:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-500 ease-out [transform-origin:left_center] group-hover:-rotate-[3deg] group-hover:[-rotate-y-18deg] group-hover:-translate-x-3 group-hover:scale-[1.01] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
                >
                  {/* Top Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-700 uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                      {work.cat}
                    </span>
                  </div>

                  {/* Main Title & Embedded Image Preview */}
                  <div className="my-auto space-y-2.5 pt-2">
                    <h3 className={`text-base sm:text-lg font-black tracking-tight leading-[1.25] ${work.textColor} font-sans`}>
                      {work.title}
                    </h3>

                    {/* Embedded Hero Image Preview Frame */}
                    <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200/80 shadow-sm relative my-2 bg-slate-900">
                      <img
                        src={work.img}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans line-clamp-2">
                      {work.description}
                    </p>
                  </div>

                  {/* Bottom Client Footer */}
                  <div className="pt-3 border-t border-slate-200/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                        {work.client.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-900 tracking-tight font-sans">
                        {work.client}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold group-hover:text-slate-900 transition-colors">
                      View Details &rarr;
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ULTRA-PREMIUM ANIMATED POPUP MODAL DIALOG */}
      {selectedWork && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-out ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-slate-900 border border-slate-200/90 font-sans transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              isClosing
                ? 'scale-95 translate-y-4 opacity-0'
                : 'scale-100 translate-y-0 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Color Accent Bar */}
            <div
              className="absolute top-0 inset-x-0 h-2"
              style={{ backgroundColor: selectedWork.accentColor }}
            />

            {/* Close Button (X) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
            >
              ✕
            </button>

            {/* Header Info */}
            <div className="mb-6 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ color: selectedWork.accentColor }}
                >
                  {selectedWork.client}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200/80 px-3 py-0.5 rounded-full">
                  {selectedWork.cat}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight font-sans">
                {selectedWork.headline}
              </h2>
            </div>

            {/* Main Image + Overview & Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
              {/* Left Preview Image - Real Project Screenshot */}
              <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative">
                <img
                  src={selectedWork.img}
                  alt={selectedWork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Overview & Metrics */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.overview}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-slate-100">
                  {selectedWork.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div
                        className="text-xl sm:text-2xl font-black tracking-tight font-sans"
                        style={{ color: selectedWork.accentColor }}
                      >
                        {m.val}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight font-sans">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech & Feature Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedWork.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenge & Solution Side-by-Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  The Challenge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.challenge}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Our Solution
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.solution}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {selectedWork.url && selectedWork.url !== '#' ? (
                <a
                  href={selectedWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-xs tracking-wide transition-all shadow-md hover:opacity-90 active:scale-95 cursor-pointer font-sans"
                  style={{ backgroundColor: selectedWork.accentColor }}
                >
                  <span>Explore Website</span>
                  <span>↗</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-400 italic">
                  Internal Enterprise Project (Private Repo)
                </span>
              )}

              <button
                onClick={handleCloseModal}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs tracking-wide transition-colors cursor-pointer font-sans"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
