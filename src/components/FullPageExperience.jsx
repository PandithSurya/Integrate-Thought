import React, { useState } from 'react';
import { ExternalLink, BookOpen, ArrowRight, Grid } from 'lucide-react';

// ============================================================================
// DATA DEFINITIONS
// ============================================================================
const SERVICES_DATA = [
  {
    id: '01',
    title: 'Web Design & Development',
    description: 'High-performance, responsive websites and web applications custom-built to elevate your brand, engage users, and drive measurable business growth.',
    bgClass: 'bg-[#c73827]', // Terracotta Red / Orange (Card 1 top tab)
  },
  {
    id: '02',
    title: 'AI Automation & Workflows',
    description: 'Streamline complex business processes, eliminate manual data entry, and integrate intelligent AI models directly into your enterprise software stack.',
    bgClass: 'bg-[#1351d8]', // Royal Deep Blue (Card 2 top tab)
  },
  {
    id: '03',
    title: 'RAG Knowledge Systems',
    description: 'Connect AI models securely to your private company data, documents, and internal databases for fast, accurate, context-aware intelligence.',
    bgClass: 'bg-[#0e593c]', // Forest Emerald Green (Card 3 top tab)
  },
  {
    id: '04',
    title: 'Custom Autonomous AI Agents',
    description: 'Deploy 24/7 intelligent AI agents capable of handling customer support, qualifying leads, booking appointments, and triggering backend actions.',
    bgClass: 'bg-[#a82828]', // Rich Crimson Red (Card 4 front card)
  },
];

const WORKS_DATA = [
  {
    id: '01',
    title: 'Old Glen Landscapes',
    subtitle: "Glasgow's Premier Exterior Studio",
    headline: "How Old Glen Landscapes Elevated Exterior Architecture in Scotland",
    description: 'Bespoke outdoor living spaces, luxury paving, architectural garden design, and master craftsmanship.',
    url: 'https://old-glen-landscapes.vercel.app/',
    coverBg: 'bg-[#14122b] border-purple-500/40',
    innerCardBg: 'bg-gradient-to-br from-[#00b4d8] via-[#0096c7] to-[#03045e]',
    badge: 'CASE STUDY 01',
    bullets: [
      'Architectural Garden Layouts',
      'Scottish Climate Hardscaping',
      '3D Landscape Prototyping',
    ],
  },
];

// ============================================================================
// 3D BOOK COVER CARD COMPONENT
// ============================================================================
function BookCoverCard({ work }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[320px] sm:w-[360px] h-[390px] [perspective:1200px] select-none mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d]">
        
        {/* 1. BACK LAYER (Base Backing Frame with Live Link - z-0) */}
        <div className="absolute inset-0 rounded-3xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-0 [transform:translateZ(0px)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
              {work.badge}
            </span>
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              {work.title}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-white tracking-tight">
              Ready to Explore the Studio?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {work.description}
            </p>
          </div>

          <div>
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. INNER CARD (Pops Out On Hover - Hidden z-10 in default state) */}
        <div
          style={{
            transform: hovered
              ? 'translate3d(48px, -12px, 40px) rotateY(-16deg) rotateZ(2deg)'
              : 'translate3d(0px, 0px, 10px) scale(0.94)',
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? 'auto' : 'none',
          }}
          className={`absolute inset-y-4 right-4 w-5/6 rounded-2xl ${work.innerCardBg} text-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/25 transition-all duration-500 ease-out z-10 flex flex-col justify-between`}
        >
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest bg-black/30 text-white border border-white/20 mb-2">
              INSIDE HIGHLIGHTS
            </span>
            <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-white mb-2 leading-tight">
              {work.subtitle}
            </h4>
            <ul className="space-y-1 text-xs text-white/95 font-medium">
              {work.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[10px] font-mono font-semibold">
            <span>CLICK TO READ</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* 3. FRONT COVER LAYER (Cover Card - z-20 on top in default state) */}
        <div
          style={{
            transformOrigin: 'left center',
            transform: hovered
              ? 'rotateY(-75deg) scale(0.97)'
              : 'rotateY(0deg) scale(1)',
          }}
          className={`absolute inset-0 rounded-3xl ${work.coverBg} border p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-500 ease-out z-20 [backface-visibility:hidden]`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-mono font-semibold tracking-wider text-slate-300 uppercase">
                <BookOpen className="w-3 h-3 text-purple-400" />
                <span>{work.badge}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">HOVER TO OPEN</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-2">
              {work.headline}
            </h3>

            <p className="text-slate-400 text-xs font-mono">
              {work.subtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-sm">{work.title}</span>
            <span className="text-purple-400 font-semibold text-xs group-hover:translate-x-1 transition-transform">
              Hover to Flip &rarr;
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// FULL PAGE EXPERIENCE PIPELINE (COMPACT ZERO-GAP SPACING)
// ============================================================================
export default function FullPageExperience() {
  const heroText = "Integrate Thought";

  const handleScrollPrompt = () => {
    const el = document.getElementById('purpose-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowAllWorks = () => {
    alert("Showing full case studies & client portfolio catalog.");
  };

  return (
    <div className="relative w-full bg-transparent">

      {/* ================================================================== */}
      {/* SECTION 1: HERO LOGO & TITLE                                       */}
      {/* ================================================================== */}
      <section className="relative w-full pt-28 pb-16 min-h-[85vh] flex flex-col items-center justify-center p-6 select-none">
        <div className="flex flex-col items-center text-center max-w-5xl my-auto">
          {/* Static Brain Logo */}
          <div className="mb-6 sm:mb-8 pointer-events-none">
            <img
              src="/logo.png"
              alt="Integrate Thought Logo"
              className="w-44 sm:w-60 md:w-72 lg:w-[340px] h-auto object-contain"
            />
          </div>

          {/* Title - Single Line Non-wrapping Layout */}
          <h1 className="group whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white transition-all duration-300">
            <span className="inline-flex justify-center">
              {heroText.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block cursor-pointer transition-all duration-200 ease-out hover:scale-115 hover:-translate-y-2.5 hover:text-[#00b4d8]"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.03}s both`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Scroll Prompt Button */}
        <button
          onClick={handleScrollPrompt}
          className="mt-8 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-all cursor-pointer z-20"
          title="Scroll to Our Purpose"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>


      {/* ================================================================== */}
      {/* SECTION 2: OUR PURPOSE                                             */}
      {/* ================================================================== */}
      <section
        id="purpose-section"
        className="relative w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto z-10 select-none"
      >
        <div>
          {/* Tagline Badge with Solid Magenta Logo Accent (#ec4899) */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] animate-pulse shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#ec4899] uppercase">
              02 / OUR PURPOSE
            </span>
          </div>

          {/* Main Section Heading with Full Stop in #ec4899 */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12] max-w-5xl">
            Building digital systems{' '}
            <span className="block text-slate-300 mt-2 sm:mt-4">
              that move businesses forward<span className="text-[#ec4899]">.</span>
            </span>
          </h2>
        </div>
      </section>


      {/* ================================================================== */}
      {/* SECTION 3: STACKED SERVICES CARDS DECK (Reference Image 2 Match)   */}
      {/* ================================================================== */}
      <section
        id="services-section"
        className="relative w-full py-20 px-4 sm:px-8 md:px-12 z-20 bg-transparent"
      >
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center select-none">
          <span className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3 block">
            03 / OUR SERVICES
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Architecting High-Impact Systems
          </h2>
        </div>

        {/* Stacked File-Folder Cards Deck matching reference image 2 identically */}
        <div className="relative max-w-4xl mx-auto space-y-40 pb-36">
          {SERVICES_DATA.map((service, index) => {
            const topOffset = 100 + index * 16;
            const zIndex = 10 + index * 10;

            return (
              <div
                key={service.id}
                style={{
                  position: 'sticky',
                  top: `${topOffset}px`,
                  zIndex: zIndex,
                }}
                className={`rounded-[28px] ${service.bgClass} text-white p-8 sm:p-12 md:p-14 transition-all duration-300 select-none shadow-[0_25px_60px_rgba(0,0,0,0.9)]`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Text Column */}
                  <div className="md:col-span-7 flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal max-w-md">
                      {service.description}
                    </p>
                  </div>

                  {/* Right Image Frame displaying /logo.png placeholder */}
                  <div className="md:col-span-5 flex items-center justify-center p-6 bg-black/20 rounded-2xl aspect-square">
                    <img
                      src="/logo.png"
                      alt={service.title}
                      className="w-36 sm:w-44 h-auto object-contain"
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ================================================================== */}
      {/* SECTION 4: FEATURED WORKS SECTION (Deep Midnight Violet #09081a)    */}
      {/* ================================================================== */}
      <section
        id="works-section"
        className="relative w-full py-24 px-6 sm:px-12 z-20 bg-[#09081a] border-t border-purple-900/40 text-white select-none shadow-[0_-30px_80px_rgba(0,0,0,0.9)]"
      >
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-xs font-mono tracking-widest text-purple-300 uppercase mb-4 shadow-lg">
            <span>04 / FEATURED CLIENT WORKS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Read What Our Work Delivers
          </h2>
          <p className="text-purple-200/70 text-sm sm:text-base max-w-xl mx-auto">
            Hover over each case study book to flip open the front cover and reveal the inner architecture.
          </p>
        </div>

        {/* Centered Compact 3D Book Cover Cards Grid */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16">
          {WORKS_DATA.map((work) => (
            <BookCoverCard key={work.id} work={work} />
          ))}
        </div>

        {/* View All Works CTA Button */}
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={handleShowAllWorks}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00b4d8] hover:bg-[#0096c7] text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-2xl active:scale-95 cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span>View All Works & Portfolio</span>
          </button>
        </div>

      </section>

    </div>
  );
}
