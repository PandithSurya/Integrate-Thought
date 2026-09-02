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
    challenge: 'The client needed a sophisticated booking portal that reflected traditional Turkish hospitality while enabling rapid mobile scheduling without double-bookings.',
    solution: 'Engineered an opulent, high-converting digital storefront with real-time barber availability, service selection, and instant appointment booking.',
  },
  {
    id: 3,
    title: 'Mayavi Media Creations',
    client: 'MAYAVI MEDIA CREATIONS',
    cat: 'Cinematic Media',
    headline: 'Next-Gen Vertical Video & Cinematic Storytelling Agency',
    img: '/Hero-Images/mayavi-mc-hero.png',
    url: 'https://mayavi-mc.vercel.app/',
    description: 'A dynamic creative agency portfolio highlighting viral short-form video campaigns, commercial production, and brand elevation.',
    accentColor: '#8b5cf6',
    tabBgClass: 'bg-[#8b5cf6]',
    textColor: 'text-[#8b5cf6]',
    overview: 'Next-generation creative studio specializing in viral short-form video strategies, cinematic brand commercials, and high-retention social content.',
    metrics: [
      { label: 'Client campaign reach', val: '12M+' },
      { label: 'Average viewer retention', val: '84%' },
      { label: 'Production speed factor', val: '3×' },
    ],
    tags: ['Cinematic Video', 'Portfolio Showcase', 'Short-Form Reel', 'Brand Films'],
    challenge: 'Agency needed an immersive, fast-loading showcase to display high-resolution video reels without lag or playback buffering on mobile.',
    solution: 'Built an optimized video showcase platform with lazy-loading previews, fluid custom video controls, and interactive client case studies.',
  },
  {
    id: 4,
    title: 'AP Mohan Sai Dental',
    client: 'AP MOHAN CLINIC',
    cat: 'Clinical Architecture',
    headline: 'Scroll-Driven Architectural Precision & Clinical Excellence',
    img: '/Hero-Images/ap-mohan-hero.png',
    url: 'https://ap-mohan.vercel.app/',
    description: 'An interactive scroll-driven digital architectural showcase displaying master-crafted clinical facilities and structural engineering precision.',
    accentColor: '#0284c7',
    tabBgClass: 'bg-[#0284c7]',
    textColor: 'text-[#0284c7]',
    overview: 'State-of-the-art dental architecture and clinical facility celebrating contemporary design, structural precision, and modern healthcare environments.',
    metrics: [
      { label: 'High-value client inquiries', val: '+220%' },
      { label: 'Session dwell duration', val: '4m 12s' },
      { label: 'Scroll engagement rate', val: '92%' },
    ],
    tags: ['Canvas Scroll', 'Architecture UX', 'Clinical Facility', 'Interactive 3D'],
    challenge: 'The clinic required a captivating digital experience that conveyed the physical scale, modern architectural model, and clinical sophistication of their 1966 facility.',
    solution: 'Engineered a scroll-driven canvas sequence showcasing architectural transitions, spatial depth, and clinical capabilities.',
  },
  {
    id: 5,
    title: 'Old Glen Landscapes',
    client: 'OLD GLEN LANDSCAPES',
    cat: 'Exterior Architecture',
    headline: "Glasgow's Premier Exterior Architecture & Master Landscaping Studio",
    img: '/Hero-Images/old-glen-hero.png',
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
    id: 6,
    title: 'AVS Hospitals',
    client: 'AVS HOSPITALS HMSS',
    cat: 'Enterprise Healthcare',
    headline: 'Hospital Management & Integrated Patient Record System',
    img: '/Hero-Images/avs-hospitals-hero.png',
    url: 'https://avs-hospitals-hmss.vercel.app/',
    description: 'An enterprise-grade Healthcare Management System Interface for hospital networks, simplifying doctor scheduling, bed tracking, and online intake.',
    accentColor: '#059669',
    tabBgClass: 'bg-[#059669]',
    textColor: 'text-[#059669]',
    overview: 'Integrated hospital administration platform streamlining inpatient and outpatient workflows, bed occupancy analytics, and electronic medical records.',
    metrics: [
      { label: 'Patient wait time reduction', val: '-48%' },
      { label: 'Bed allocation efficiency', val: '99.2%' },
      { label: 'Daily active clinical staff', val: '1,500+' },
    ],
    tags: ['Enterprise HMSS', 'Doctor Scheduling', 'EMR Integration', 'Bed Management'],
    challenge: 'Large multi-specialty hospital required a unified portal to coordinate doctor appointments, room allotments, and fast patient admissions.',
    solution: 'Delivered an intuitive hospital operating dashboard with live department synchronization, online doctor booking, and secure medical history lookups.',
  },
  {
    id: 7,
    title: 'VAMP Roofing',
    client: 'VAMP ROOFING & SYSTEMS',
    cat: 'Commercial Roofing',
    headline: 'Industrial & Residential Precision Roofing Estimate Engine',
    img: '/Hero-Images/roof-nu-hero.png',
    url: 'https://roof-nu.vercel.app/',
    description: 'A high-converting roofing contractor platform engineered for instant quote estimates, storm damage inspection booking, and warranty tracking.',
    accentColor: '#dc2626',
    tabBgClass: 'bg-[#dc2626]',
    textColor: 'text-[#dc2626]',
    overview: 'Comprehensive roofing services platform connecting property owners with certified roof inspection, emergency leak repairs, and warranty-backed installations.',
    metrics: [
      { label: 'Instant quote submissions', val: '+240%' },
      { label: 'Inspection turnaround', val: '< 24 hrs' },
      { label: 'Customer trust index', val: '99.5%' },
    ],
    tags: ['Roofing Estimator', 'Storm Damage Inspection', 'Emergency Booking', 'Warranty Hub'],
    challenge: 'Property owners facing storm emergencies needed instant roof replacement estimates and quick scheduling without tedious phone tag.',
    solution: 'Built an interactive roof cost calculator and inspection booking engine that immediately captures roof dimensions and schedules field assessors.',
  },
  {
    id: 8,
    title: 'Dr. Rathod Dental Clinic',
    client: 'DR. RATHOD DENTAL',
    cat: 'Aesthetic & Clinical Dental',
    headline: 'Swiss-Grade Implantology, Aesthetic Dentistry & Patient Care',
    img: '/Hero-Images/dr-rathod-hero.png',
    url: 'https://jazzy-pastelito-855f86.netlify.app/',
    description: 'A modern, empathetic dental platform facilitating patient onboarding, Swiss-grade surgical implantology, and virtual appointment scheduling.',
    accentColor: '#0891b2',
    tabBgClass: 'bg-[#0891b2]',
    textColor: 'text-[#0891b2]',
    overview: 'State-of-the-art dental clinic delivering computer-guided surgical implantology, full mouth rehabilitations, smile design, and gentle family dentistry.',
    metrics: [
      { label: 'Patient onboarding time', val: '-65%' },
      { label: 'New consultation growth', val: '3.8×' },
      { label: 'Patient satisfaction rate', val: '99.4%' },
    ],
    tags: ['Surgical Implantology', 'Patient Intake', 'Digital Smile Design', 'Online Booking'],
    challenge: 'Clinic needed an approachable yet sophisticated digital portal where patients could learn about complex implant procedures and book consults with confidence.',
    solution: 'Engineered an empathetic patient experience with transparent procedure breakdowns, doctor credentials, guided treatment walkthroughs, and fast intake.',
  },
  {
    id: 9,
    title: "Usy'z Blizers",
    client: "USY'Z BLIZERS",
    cat: 'Streetwear & Luxury Vault',
    headline: 'Urban Streetwear Flagship, Apparel Drops & Shettleston Vault',
    img: "/Hero-Images/usy'z-blizers-hero.png",
    url: 'https://fancy-lokum-dfbfba.netlify.app/',
    description: 'A visually striking streetwear and luxury essentials platform featuring dynamic product interaction, collection drops, and Glasgow flagship showcase.',
    accentColor: '#d97706',
    tabBgClass: 'bg-[#d97706]',
    textColor: 'text-[#d97706]',
    overview: 'Glasgow flagship and urban streetwear studio delivering limited-edition apparel, luxury Speyside single malts, and curated seasonal style lookbooks.',
    metrics: [
      { label: 'Collection drop sellout time', val: '18 mins' },
      { label: 'Mobile checkout conversion', val: '4.8%' },
      { label: 'VIP vault reservations', val: '450+' },
    ],
    tags: ['Streetwear E-Commerce', 'Flagship Showcase', 'Luxury Essentials', 'Micro-Animations'],
    challenge: 'Brand required high-energy streetwear aesthetics with fast mobile ordering and private vault reserve capabilities for high-demand drops.',
    solution: 'Created an urban, high-contrast digital flagship with fluid animations, interactive collection browsing, and secure dispatch reservation.',
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
        hoverColor="#10b981"
      />

      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar progress={0.32} onNavigate={onNavigate} activePage="Works" />

        {/* Hero Section */}
        <section className="pt-40 sm:pt-44 pb-12 px-6 max-w-6xl mx-auto text-center">
          <div className="section-badge-light mb-4">
            <span>01 / CLIENT SHOWCASE &amp; PORTFOLIO</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-4 font-sans">
            Work That Moves the Needle.
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal font-sans">
            Long-term engagements where design, engineering, and automation shipped together. Click any project booklet for in-depth technical case studies.
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

      {/* ULTRA-PREMIUM ANIMATED POPUP MODAL DIALOG (COMPACT & PERFECTLY CENTERED) */}
      {selectedWork && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-out ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[88vh] overflow-y-auto text-slate-900 border border-slate-200/90 font-sans transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              isClosing
                ? 'scale-95 translate-y-3 opacity-0'
                : 'scale-100 translate-y-0 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Color Accent Bar */}
            <div
              className="absolute top-0 inset-x-0 h-1.5"
              style={{ backgroundColor: selectedWork.accentColor }}
            />

            {/* Close Button (X) */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer font-bold text-xs shadow-xs"
            >
              ✕
            </button>

            {/* Header Info */}
            <div className="mb-3.5 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: selectedWork.accentColor }}
                >
                  {selectedWork.client}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
                  {selectedWork.cat}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 leading-snug font-sans">
                {selectedWork.headline}
              </h2>
            </div>

            {/* Main Image + Overview & Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 mb-4 items-center">
              {/* Left Preview Image Frame (5 cols) */}
              <div className="md:col-span-5 w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950 relative shrink-0">
                <img
                  src={selectedWork.img}
                  alt={selectedWork.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Overview & Metrics (7 cols) */}
              <div className="md:col-span-7 space-y-3">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.overview}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100">
                  {selectedWork.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div
                        className="text-base sm:text-lg font-black tracking-tight font-sans leading-none"
                        style={{ color: selectedWork.accentColor }}
                      >
                        {m.val}
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-slate-500 font-medium leading-tight font-sans">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech & Feature Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedWork.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] sm:text-[9.5px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenge & Solution Side-by-Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 space-y-1">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase font-mono tracking-wider">
                  The Challenge
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.challenge}
                </p>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 sm:p-3.5 space-y-1">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Our Solution
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal font-sans">
                  {selectedWork.solution}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {selectedWork.url && selectedWork.url !== '#' ? (
                <a
                  href={selectedWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-white font-bold text-xs tracking-wide transition-all shadow-sm hover:opacity-90 active:scale-95 cursor-pointer font-sans"
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
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs tracking-wide transition-colors cursor-pointer font-sans"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 w-full shrink-0 bg-white">
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}
