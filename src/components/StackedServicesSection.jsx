import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

export default function StackedServicesSection({ onNavigate }) {
  const containerRef = useRef(null);
  const [deckProgress, setDeckProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const p = scrolled / totalScrollable;
        setDeckProgress(Math.min(1, Math.max(0, p)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="services-section"
      ref={containerRef}
      className="relative w-full h-[360vh] bg-white text-slate-950 z-20 shadow-[0_-30px_80px_rgba(0,0,0,0.6)]"
    >
      {/* Sticky Full-Width Pinned Viewport Frame on Solid White Background Sheet */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-4 sm:p-8 z-20 select-none bg-white">
        
        {/* Sleeker Centered Inner Container with Reduced Width (max-w-xl) */}
        <div className="w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center">
          
          {/* Section Header */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 shrink-0 text-center sm:text-left">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold tracking-widest text-slate-600 uppercase mb-2">
                03 / OUR SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                Architecting High-Impact Systems
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sleeker Stacked Cards Deck with Reduced Width & Increased Height */}
          <div className="relative w-full h-[460px] sm:h-[500px]">
            {SERVICES_DATA.map((service, index) => {
              let cardP = 1;
              if (index > 0) {
                const startP = (index - 1) * 0.24;
                const endP = startP + 0.24;
                const rawP = (deckProgress - startP) / (endP - startP);
                cardP = Math.min(1, Math.max(0, rawP));
              }

              // Top offset increments by 24px so top tabs are clearly exposed
              const stackedTop = index * 24;
              const zIndex = 10 + index * 10;

              // Y Translation dynamically slides cards up from below screen bottom (850px) to top (0px)
              const translateY = index === 0 ? 0 : (1 - cardP) * 850;

              return (
                <div
                  key={service.id}
                  style={{
                    top: `${stackedTop}px`,
                    transform: `translateY(${translateY}px)`,
                    zIndex: zIndex,
                  }}
                  className={`absolute inset-x-0 rounded-[32px] ${service.bgClass} text-white p-6 sm:p-9 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/20 transition-transform duration-75 ease-out`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                    
                    {/* Left Text Column */}
                    <div className="md:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal max-w-sm">
                        {service.description}
                      </p>
                    </div>

                    {/* Right Image Frame displaying /logo.png placeholder */}
                    <div className="md:col-span-5 flex items-center justify-center p-4 sm:p-6 bg-black/20 rounded-2xl border border-white/10 aspect-square max-h-[170px] sm:max-h-[200px] mx-auto">
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
    </section>
  );
}
