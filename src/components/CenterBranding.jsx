import React, { useEffect, useRef, useState } from 'react';

export default function CenterBranding() {
  const containerRef = useRef(null);
  const [animState, setAnimState] = useState({ opacity: 1, scale: 1, translateY: 0 });

  const text = "Integrate Thought";

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

        // Smooth fade-out calculation
        setAnimState({
          opacity: Math.max(0, 1 - progress * 1.3),
          scale: 1 - progress * 0.15,
          translateY: -progress * 80,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('purpose-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[140vh] bg-transparent">
      {/* Viewport Frame (Sticky top-0, guaranteeing text stays 100% stuck to screen natively) */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center z-10 p-6 select-none overflow-hidden pointer-events-none bg-transparent">
        <div
          style={{
            opacity: animState.opacity,
            transform: `translateY(${animState.translateY}px) scale(${animState.scale})`,
            pointerEvents: animState.opacity < 0.05 ? 'none' : 'auto',
          }}
          className="flex flex-col items-center text-center max-w-5xl my-auto transition-all duration-75 ease-out pointer-events-auto"
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
              {text.split("").map((char, index) => (
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
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-all cursor-pointer z-20 pointer-events-auto"
          title="Scroll to Our Purpose"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

      </div>
    </div>
  );
}
