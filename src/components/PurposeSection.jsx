import React, { useEffect, useRef, useState } from 'react';

export default function PurposeSection() {
  const containerRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(40);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

        // Smooth fade-in & slide-up as Section 2 enters view
        let op = 0;
        let transY = 0;

        if (progress <= 0.25) {
          op = Math.min(1, progress / 0.20);
          transY = (1 - Math.min(1, progress / 0.20)) * 40;
        } else if (progress > 0.25 && progress <= 0.70) {
          op = 1;
          transY = 0;
        } else {
          op = Math.max(0, 1 - (progress - 0.70) / 0.25);
          transY = -((progress - 0.70) / 0.25) * 40;
        }

        setOpacity(op);
        setTranslateY(transY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} id="purpose-section" className="relative w-full h-[150vh] bg-transparent">
      {/* Viewport Frame (Sticky top-0, guaranteeing text stays 100% stuck to screen natively) */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto z-10 select-none overflow-hidden pointer-events-none bg-transparent">
        <div
          style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
            pointerEvents: opacity < 0.05 ? 'none' : 'auto',
          }}
          className="transition-transform duration-75 ease-out pointer-events-auto"
        >
          {/* Section Identifier Tag with Solid Magenta Logo Accent (#ec4899) */}
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
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
      </div>
    </div>
  );
}
