import React, { useEffect, useRef, useState } from 'react';

/**
 * StickyScrollContainer Component
 * Unified sticky viewport frame for Hero (Section 1) and Purpose (Section 2):
 * - Screen remains 100% stuck.
 * - On a single scroll, Hero fades out and Section 2 ("02 / OUR PURPOSE") immediately appears in the same pinned viewport frame.
 * - Continuing to scroll transitions directly into Section 3 (Stacked Services Deck).
 */
export default function StickyScrollContainer() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const heroText = "Integrate Thought";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const p = scrolled / totalScrollable;
        setProgress(Math.min(1, Math.max(0, p)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phase 1: Hero Logo & Title (visible at start 0.0, fades out by 0.30)
  const heroOpacity = Math.max(0, 1 - progress / 0.30);
  const heroScale = 1 - progress * 0.12;
  const heroTranslateY = -progress * 70;

  // Phase 2: Purpose Section (fades in on single scroll 0.15 -> 0.45, holds 0.45 -> 0.75, fades out 0.75 -> 1.0)
  let purposeOpacity = 0;
  let purposeTranslateY = 0;
  if (progress <= 0.15) {
    purposeOpacity = 0;
    purposeTranslateY = 40;
  } else if (progress > 0.15 && progress <= 0.45) {
    const rawP = (progress - 0.15) / 0.30;
    purposeOpacity = Math.min(1, rawP);
    purposeTranslateY = (1 - Math.min(1, rawP)) * 40;
  } else if (progress > 0.45 && progress <= 0.75) {
    purposeOpacity = 1;
    purposeTranslateY = 0;
  } else {
    const rawP = (progress - 0.75) / 0.25;
    purposeOpacity = Math.max(0, 1 - rawP);
    purposeTranslateY = -rawP * 40;
  }

  const handleScrollDown = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-transparent">
      
      {/* Native CSS Sticky Viewport Frame (Guarantees screen stays 100% stuck) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-10 p-6 pointer-events-none select-none bg-transparent">
        
        {/* SECTION 1: HERO (Brain Logo & Title) */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px) scale(${heroScale})`,
            pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto transition-all duration-75 ease-out pointer-events-auto"
        >
          {/* Static Brain Logo */}
          <div className="mb-6 sm:mb-8 pointer-events-none">
            <img
              src="/logo.png"
              alt="Integrate Thought Logo"
              className="w-44 sm:w-60 md:w-72 lg:w-[320px] h-auto object-contain"
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

          {/* Scroll Down Prompt Button */}
          <button
            onClick={handleScrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-opacity cursor-pointer z-20 pointer-events-auto"
            title="Scroll to Our Purpose"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
            <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* SECTION 2: PURPOSE (02 / OUR PURPOSE) */}
        <div
          style={{
            opacity: purposeOpacity,
            transform: `translateY(${purposeTranslateY}px)`,
            pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto transition-all duration-75 ease-out pointer-events-auto"
        >
          {/* Section Tagline Badge */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899] animate-pulse shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#ec4899] uppercase">
              02 / OUR PURPOSE
            </span>
          </div>

          {/* Main Section Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.12] max-w-5xl">
            Building digital systems{' '}
            <span className="block text-slate-300 mt-2 sm:mt-4">
              that move businesses forward<span className="text-[#ec4899]">.</span>
            </span>
          </h2>
        </div>

      </div>
    </div>
  );
}
