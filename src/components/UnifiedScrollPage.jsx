import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, BookOpen, ArrowRight, Grid, ArrowUpRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: '01',
    tag: 'POPULAR',
    title: 'Web Design & Development',
    description: 'High-performance, responsive websites and web applications custom-built to elevate your brand, engage users, and drive measurable business growth.',
    bgClass: 'bg-[#c73827]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(199,56,39,0.35)]',
  },
  {
    id: '02',
    tag: 'ENTERPRISE AI',
    title: 'AI Automation & Workflows',
    description: 'Streamline complex business processes, eliminate manual data entry, and integrate intelligent AI models directly into your enterprise software stack.',
    bgClass: 'bg-[#1351d8]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(19,81,216,0.35)]',
  },
  {
    id: '03',
    tag: 'ADVANCED AI',
    title: 'RAG Knowledge Systems',
    description: 'Connect AI models securely to your private company data, documents, and internal databases for fast, accurate, context-aware intelligence.',
    bgClass: 'bg-[#0e593c]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(14,89,60,0.35)]',
  },
  {
    id: '04',
    tag: '24/7 SUPPORT',
    title: 'Custom Autonomous AI Agents',
    description: 'Deploy 24/7 intelligent AI agents capable of handling customer support, qualifying leads, booking appointments, and triggering backend actions.',
    bgClass: 'bg-[#a82828]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(168,40,40,0.35)]',
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
  {
    id: '02',
    title: 'Brim Burgers',
    subtitle: 'Smashed. Halal. Unforgettable.',
    headline: "How Brim Burgers Digitalized Glasgow's Smashed Burger Destination",
    description: 'Bold brand identity and high-converting digital ordering experience for Glasgow premium fast-casual landmark.',
    url: 'https://jay0073.github.io/brim-demo/',
    coverBg: 'bg-[#1b1028] border-pink-500/40',
    innerCardBg: 'bg-gradient-to-br from-[#ec4899] via-[#d946ef] to-[#8b5cf6]',
    badge: 'CASE STUDY 02',
    bullets: [
      'High-Energy Brand Identity',
      'Seamless Digital Ordering',
      'Glasgow Culinary Landmark',
    ],
  },
];

function BookCoverCard({ work }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[300px] sm:w-[340px] h-[370px] [perspective:1200px] select-none mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d]">
        
        {/* BACK LAYER */}
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
            <h4 className="text-sm font-bold text-white tracking-tight">
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
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* INNER CARD (FLIP HOVER) */}
        <div
          style={{
            transform: hovered
              ? 'translate3d(42px, -10px, 35px) rotateY(-16deg) rotateZ(2deg)'
              : 'translate3d(0px, 0px, 10px) scale(0.94)',
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? 'auto' : 'none',
          }}
          className={`absolute inset-y-3 right-3 w-5/6 rounded-2xl ${work.innerCardBg} text-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/25 transition-all duration-500 ease-out z-10 flex flex-col justify-between`}
        >
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest bg-black/30 text-white border border-white/20 mb-2">
              HIGHLIGHTS
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-white mb-2 leading-tight">
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

          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-mono font-semibold">
            <span>CLICK TO READ</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* FRONT COVER LAYER */}
        <div
          style={{
            transformOrigin: 'left center',
            transform: hovered
              ? 'rotateY(-75deg) scale(0.97)'
              : 'rotateY(0deg) scale(1)',
          }}
          className={`absolute inset-0 rounded-3xl ${work.coverBg} border p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-500 ease-out z-20 [backface-visibility:hidden]`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-mono font-semibold tracking-wider text-slate-300 uppercase">
                <BookOpen className="w-3 h-3 text-purple-400" />
                <span>{work.badge}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">HOVER TO OPEN</span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug mb-2">
              {work.headline}
            </h3>

            <p className="text-slate-400 text-xs font-mono">
              {work.subtitle}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold text-white text-xs sm:text-sm">{work.title}</span>
            <span className="text-purple-400 font-semibold text-xs group-hover:translate-x-1 transition-transform">
              Hover to Flip &rarr;
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function UnifiedScrollPage() {
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const heroText = "Integrate Thought";

  const updateTargetProgress = (delta) => {
    targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
  };

  useEffect(() => {
    // Lock body scrolling so viewport is 100% fixed
    document.body.style.overflow = 'hidden';

    // Wheel event handler updating target progress
    const handleWheel = (e) => {
      const sensitivity = 0.00035;
      updateTargetProgress(e.deltaY * sensitivity);
    };

    // Touch support for mobile & touchpad gestures
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 1.5;
      touchStartY = touchY;
      updateTargetProgress(deltaY * 0.0008);
    };

    // Keyboard arrow navigation
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        updateTargetProgress(0.06);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateTargetProgress(-0.06);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Silky Smooth requestAnimationFrame Physics Lerp Loop
    let animId;
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.12; // 0.12 lerp factor for smooth momentum
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      document.body.style.overflow = 'auto';
      cancelAnimationFrame(animId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --------------------------------------------------------------------------
  // OVERLAPPING ANIMATION TIMELINE (0.00 -> 1.00)
  // --------------------------------------------------------------------------

  // Phase 1: Hero Logo & Title (0.00 -> 0.22)
  const heroOpacity = Math.max(0, 1 - progress / 0.18);
  const heroScale = 1 - progress * 0.15;
  const heroTranslateY = -progress * 90;

  // Phase 2: Our Purpose (0.12 -> 0.38)
  let purposeOpacity = 0;
  if (progress >= 0.12 && progress <= 0.24) {
    purposeOpacity = Math.min(1, (progress - 0.12) / 0.12);
  } else if (progress > 0.24 && progress <= 0.38) {
    purposeOpacity = Math.max(0, 1 - (progress - 0.26) / 0.12);
  }
  const purposeTranslateY = progress < 0.24 ? Math.max(0, (0.24 - progress) * 120) : 0;

  // Phase 3: White Mask Sheet for Services Cards Deck (0.34 -> 0.76)
  const whiteSheetP = Math.min(1, Math.max(0, (progress - 0.34) / 0.10));
  const whiteSheetTranslateY = (1 - whiteSheetP) * 100; // Slide UP from 100vh to 0vh
  const deckProgress = Math.min(1, Math.max(0, (progress - 0.40) / 0.34));

  // Phase 4: Dark Violet Sheet for Featured Works Section (0.72 -> 1.00)
  const worksSheetP = Math.min(1, Math.max(0, (progress - 0.72) / 0.10));
  const worksSheetTranslateY = (1 - worksSheetP) * 100; // Slide UP from 100vh to 0vh

  const handleScrollPrompt = () => {
    targetProgressRef.current = 0.24;
  };

  const handleProposalClick = (title) => {
    alert(`Initiated project proposal request for "${title}".`);
  };

  const handleShowAllWorks = () => {
    alert("Showing full case studies & client portfolio catalog.");
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 bg-[#050505] text-white select-none">
      
      {/* ================================================================== */}
      {/* PHASE 1: HERO LOGO & TITLE                                         */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto"
      >
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

        {/* Scroll Prompt Button */}
        <button
          onClick={handleScrollPrompt}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-opacity cursor-pointer z-20 pointer-events-auto"
          title="Scroll to Our Purpose"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>


      {/* ================================================================== */}
      {/* PHASE 2: OUR PURPOSE                                               */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: purposeOpacity,
          transform: `translate3d(0, ${purposeTranslateY}px, 0)`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto pointer-events-auto"
      >
        {/* Section Tagline Badge with Solid Magenta Logo Accent (#ec4899) */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#ec4899] uppercase">
            02 / OUR PURPOSE
          </span>
        </div>

        {/* Main Section Heading with Full Stop in #ec4899 */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.12] max-w-5xl">
          Building digital systems{' '}
          <span className="block text-slate-300 mt-2 sm:mt-4">
            that move businesses forward<span className="text-[#ec4899]">.</span>
          </span>
        </h2>
      </div>


      {/* ================================================================== */}
      {/* PHASE 3: STACKED SERVICES CARDS DECK (White Sheet Overlay)         */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${whiteSheetTranslateY}vh, 0)`,
          pointerEvents: whiteSheetP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-4 sm:p-8 z-20 pointer-events-auto"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Section Header */}
          <div className="w-full text-center mb-6 sm:mb-8 shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono tracking-widest text-slate-600 uppercase mb-2">
              <span>03 / OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Architecting High-Impact Systems
            </h2>
          </div>

          {/* Cards Deck */}
          <div className="relative w-full h-[390px] sm:h-[420px]">
            {SERVICES_DATA.map((service, index) => {
              let cardP = 1;
              if (index > 0) {
                const startP = (index - 1) * 0.24;
                const endP = startP + 0.24;
                const rawP = (deckProgress - startP) / (endP - startP);
                cardP = Math.min(1, Math.max(0, rawP));
              }

              const stackedTop = index * 20;
              const zIndex = 10 + index * 10;
              const translateY = index === 0 ? 0 : (1 - cardP) * 750;

              return (
                <div
                  key={service.id}
                  style={{
                    top: `${stackedTop}px`,
                    transform: `translate3d(0, ${translateY}px, 0)`,
                    zIndex: zIndex,
                    willChange: 'transform',
                  }}
                  className={`absolute inset-x-0 rounded-[28px] ${service.bgClass} ${service.shadowStyle} text-white p-5 sm:p-8 md:p-10 border border-white/20`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                    
                    {/* Left Text Column */}
                    <div className="md:col-span-7 flex flex-col justify-center space-y-2 sm:space-y-3">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal max-w-sm">
                        {service.description}
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={() => handleProposalClick(service.title)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-all backdrop-blur-md border border-white/30 cursor-pointer active:scale-95"
                        >
                          <span>Request Proposal</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Image Frame */}
                    <div className="md:col-span-5 flex items-center justify-center p-3 sm:p-5 bg-black/20 rounded-2xl border border-white/10 aspect-square max-h-[150px] sm:max-h-[180px] mx-auto">
                      <img
                        src="/logo.png"
                        alt={service.title}
                        className="w-28 sm:w-36 h-auto object-contain"
                      />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>


      {/* ================================================================== */}
      {/* PHASE 4: FEATURED CLIENT WORKS SECTION (Deep Midnight Violet)      */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${worksSheetTranslateY}vh, 0)`,
          pointerEvents: worksSheetP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#09081a] border-t border-purple-900/40 text-white shadow-[0_-30px_80px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center p-6 z-30 pointer-events-auto"
      >
        <div className="w-full max-w-4xl mx-auto text-center my-auto">
          
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-xs font-mono tracking-widest text-purple-300 uppercase mb-3 shadow-lg">
              <span>04 / FEATURED CLIENT WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Read What Our Work Delivers
            </h2>
            <p className="text-purple-200/70 text-xs sm:text-sm max-w-md mx-auto">
              Hover over each case study book to flip open the front cover and reveal the inner architecture.
            </p>
          </div>

          {/* 3D Book Cards Grid */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-8">
            {WORKS_DATA.map((work) => (
              <BookCoverCard key={work.id} work={work} />
            ))}
          </div>

          {/* View All Works CTA Button */}
          <button
            onClick={handleShowAllWorks}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00b4d8] hover:bg-[#0096c7] text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-2xl active:scale-95 cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span>View All Works & Portfolio</span>
          </button>

        </div>
      </div>

    </div>
  );
}
