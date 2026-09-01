import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: '01',
    tag: 'POPULAR',
    title: 'Web Design & Development',
    description: 'High-performance, responsive websites and web applications custom-built to elevate your brand, engage users, and drive measurable business growth.',
    bgStyle: 'bg-gradient-to-br from-[#e04f26] via-[#d9441c] to-[#b8320e]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(224,79,38,0.35)]',
  },
  {
    id: '02',
    tag: 'ENTERPRISE AI',
    title: 'AI Automation & Workflows',
    description: 'Streamline complex business processes, eliminate manual data entry, and integrate intelligent AI models directly into your enterprise software stack.',
    bgStyle: 'bg-gradient-to-br from-[#0650ed] via-[#0443ca] to-[#022f99]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(6,80,237,0.35)]',
  },
  {
    id: '03',
    tag: 'ADVANCED AI',
    title: 'RAG Knowledge Systems',
    description: 'Connect AI models securely to your private company data, documents, and internal databases for fast, accurate, context-aware intelligence.',
    bgStyle: 'bg-gradient-to-br from-[#0b6e4f] via-[#085a40] to-[#04432f]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(11,110,79,0.35)]',
  },
  {
    id: '04',
    tag: '24/7 SUPPORT',
    title: 'Custom Autonomous AI Agents',
    description: 'Deploy 24/7 intelligent AI agents capable of handling customer support, qualifying leads, booking appointments, and triggering backend actions.',
    bgStyle: 'bg-gradient-to-br from-[#a21caf] via-[#86198f] to-[#6b1472]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(162,28,175,0.35)]',
  },
];

export default function UnifiedScrollDeck() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);

  const heroText = "Integrate Thought";

  const updateProgress = (val) => {
    const clamped = Math.min(1, Math.max(0, val));
    progressRef.current = clamped;
    setScrollProgress(clamped);
  };

  useEffect(() => {
    // 1. Direct Wheel Event Interceptor (Drives progress smoothly from 0.00 to 1.00)
    const handleWheel = (e) => {
      const sensitivity = 0.0005;
      updateProgress(progressRef.current + e.deltaY * sensitivity);
    };

    // 2. Touch Swiping Support for Mobile & Touchpads
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 1.5;
      touchStartY = touchY;
      updateProgress(progressRef.current + deltaY * 0.001);
    };

    // 3. Keyboard Arrow Navigation
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        updateProgress(progressRef.current + 0.08);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateProgress(progressRef.current - 0.08);
      }
    };

    // Prevent body bounce
    document.body.style.overflow = 'hidden';

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --------------------------------------------------------------------------
  // STICKY SCROLL TIMELINE (ZERO BLANK GAP)
  // --------------------------------------------------------------------------

  // Phase 1: Hero Logo & Title (0.00 -> 0.24)
  const heroOpacity = Math.max(0, 1 - scrollProgress / 0.22);
  const heroScale = 1 - scrollProgress * 0.15;
  const heroTranslateY = -scrollProgress * 90;

  // Phase 2: Our Purpose (0.15 -> 0.46)
  let purposeOpacity = 0;
  if (scrollProgress >= 0.15 && scrollProgress <= 0.34) {
    purposeOpacity = Math.min(1, (scrollProgress - 0.15) / 0.14);
  } else if (scrollProgress > 0.34 && scrollProgress <= 0.46) {
    purposeOpacity = Math.max(0, 1 - (scrollProgress - 0.36) / 0.10);
  }
  const purposeTranslateY = scrollProgress < 0.34 ? Math.max(0, (0.34 - scrollProgress) * 140) : 0;

  // Phase 3: Solid White Sheet Mask Overlaying Previous Sections (0.38 -> 1.00)
  const whiteSheetP = Math.min(1, Math.max(0, (scrollProgress - 0.36) / 0.12));
  const whiteSheetTranslateY = (1 - whiteSheetP) * 100; // Slide UP from +100vh to 0vh

  // Card deck progress within Section 3 (0.46 to 1.00)
  const deckProgress = Math.min(1, Math.max(0, (scrollProgress - 0.46) / 0.52));

  const handleScrollPrompt = () => {
    updateProgress(0.28);
  };

  const handleProposalClick = (title) => {
    alert(`Initiated project proposal request for "${title}".`);
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden flex items-center justify-center z-10 p-4 sm:p-8 bg-transparent select-none">
      
      {/* ================================================================== */}
      {/* PHASE 1: HERO LOGO & TITLE                                         */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto transition-all duration-75 ease-out"
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
          transform: `translateY(${purposeTranslateY}px)`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
        }}
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto transition-all duration-75 ease-out pointer-events-auto"
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
      {/* PHASE 3: SOLID WHITE MASK SHEET FOR STACKED SERVICES CARDS        */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translateY(${whiteSheetTranslateY}vh)`,
          pointerEvents: whiteSheetP < 0.05 ? 'none' : 'auto',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-4 sm:p-8 z-30 transition-transform duration-100 ease-out pointer-events-auto"
      >
        {/* Section Header (Crisp Dark Typography) */}
        <div className="w-full max-w-4xl text-center mb-6 sm:mb-8 shrink-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono tracking-widest text-slate-600 uppercase mb-2">
            <span>03 / OUR WORKS & SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Architecting High-Impact Systems
          </h2>
        </div>

        {/* Enhanced Zoom-In / Zoom-Out Card Deck Frame */}
        <div className="relative w-full max-w-4xl h-[420px] sm:h-[460px]">
          {SERVICES_DATA.map((service, index) => {
            let cardP = 1;
            if (index > 0) {
              const startP = (index - 1) * 0.28;
              const endP = startP + 0.28;
              const rawP = (deckProgress - startP) / (endP - startP);
              cardP = Math.min(1, Math.max(0, rawP));
            }

            // Active card determination:
            const currentActiveIdx = Math.min(3, Math.floor(deckProgress / 0.28));
            const isFrontActive = index === currentActiveIdx || (index === 0 && deckProgress < 0.05);
            const isPassed = index < currentActiveIdx;

            // Zoom In / Zoom Out Dynamic Scale:
            let scale = 1.0;
            if (isFrontActive) {
              scale = 1.04;
            } else if (isPassed) {
              scale = 0.96 - (currentActiveIdx - index) * 0.02;
            }

            // Stacked top offset (20px for exposed top tab above)
            const stackedTop = index * 20;

            // Y Translation from bottom (+700px) to top (0px)
            const translateY = index === 0 ? 0 : (1 - cardP) * 700;

            return (
              <div
                key={service.id}
                style={{
                  top: `${stackedTop}px`,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex: 10 + index * 10,
                }}
                className={`absolute inset-x-0 rounded-[32px] ${service.bgStyle} ${service.shadowStyle} text-white p-6 sm:p-10 md:p-12 border border-white/25 transition-all duration-300 ease-out`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  
                  {/* Left Text Column */}
                  <div className="md:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/25 text-white/90 border border-white/20 mb-2">
                        {service.tag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-md">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => handleProposalClick(service.title)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-all backdrop-blur-md border border-white/30 cursor-pointer active:scale-95"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right Image Frame displaying /logo.png placeholder */}
                  <div className="md:col-span-5 flex items-center justify-center p-4 sm:p-6 bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 aspect-square max-h-[180px] sm:max-h-[220px] mx-auto shadow-inner">
                    <img
                      src="/logo.png"
                      alt={service.title}
                      className="w-32 sm:w-40 h-auto object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
