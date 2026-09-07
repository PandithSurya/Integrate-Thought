import React, { useEffect, useRef, useState } from 'react';

const PRINCIPLES = [
  {
    number: '01',
    headline: 'Architecture Precedes Code',
    punchline: 'We solve problems first. Code is just the implementation.',
    tag: 'Engineering Discipline',
  },
  {
    number: '02',
    headline: 'Pragmatic AI & High Leverage',
    punchline: 'We engineer RAG, not wrappers.',
    tag: 'Applied Intelligence',
  },
  {
    number: '03',
    headline: 'Apprenticeship Over Abstract Theory',
    punchline: 'Students write live PRs, not slide decks.',
    tag: 'Academy Philosophy',
  },
  {
    number: '04',
    headline: 'Measurable Operational Leverage',
    punchline: 'We track velocity, not vanity metrics.',
    tag: 'Business Impact',
  },
];

export default function HowWeThinkSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive mobile check for staggered delay calculation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to trigger animation strictly ONCE
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Triggers only once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80 select-none"
    >
      {/* Scoped CSS Keyframes for Number Glow, Bar Shimmer, and Card Shadows */}
      <style>{`
        @keyframes pulseGlow {
          0% {
            text-shadow: 0 0 10px rgba(2, 132, 199, 0.2);
          }
          50% {
            text-shadow: 0 0 30px rgba(2, 132, 199, 0.6);
          }
          100% {
            text-shadow: 0 0 10px rgba(2, 132, 199, 0.2);
          }
        }

        @keyframes shimmerMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .number-glow-pulse {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .gradient-bar-shimmer {
          animation: shimmerMove 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .how-we-think-card {
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          will-change: transform, box-shadow;
        }

        .how-we-think-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
          border-color: rgba(2, 132, 199, 0.35);
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#0284c7] uppercase">
          How We Think &amp; Build
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
          Non-Negotiable Core Principles
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          These four tenets govern every line of code we write, every AI agent we deploy, and every student we mentor.
        </p>
      </div>

      {/* Progress Bar Divider (Draws from left to right over 1.2s) */}
      <div className="w-full max-w-3xl mx-auto my-8 sm:my-10 h-[2px] bg-slate-200/80 rounded-full overflow-hidden">
        <div
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="w-full h-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0284c7] rounded-full"
        />
      </div>

      {/* 2x2 Grid of Principle Cards (Single column on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
        {PRINCIPLES.map((item, index) => {
          // Staggered Entrance Delay: Desktop (0, 150, 300, 450)ms, Mobile (0, 100, 200, 300)ms
          const delay = isMobile ? index * 100 : index * 150;

          return (
            <div
              key={item.number}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
              }}
              className="h-full"
            >
              <div className="how-we-think-card bg-white border border-slate-200/90 rounded-[12px] h-full flex flex-col justify-between overflow-hidden cursor-pointer group">
                {/* FIX 1: 60px Tall Visual Gradient Header Bar across Full Width */}
                <div
                  className="h-[60px] w-full rounded-t-[12px] relative overflow-hidden flex items-center px-6 select-none"
                  style={{
                    background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)',
                  }}
                >
                  {/* Gradient Bar Shimmer Effect */}
                  <div
                    className="absolute inset-0 pointer-events-none w-full h-full gradient-bar-shimmer"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.28) 50%, transparent 100%)',
                    }}
                  />

                  {/* FIX 1 & FIX 4: Principle Number in bold white text with continuous pulseGlow */}
                  <div className="relative z-10 flex items-center">
                    <span className="font-mono font-bold text-2xl tracking-wider text-white number-glow-pulse">
                      {item.number}
                    </span>
                  </div>

                  {/* FIX 2: Redundant 'TENET//01' text deleted completely */}
                </div>

                {/* Card Body: Headline & One-Sentence Punchline */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight font-sans leading-tight">
                      {item.headline}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                      {item.punchline}
                    </p>
                  </div>

                  {/* Footer Tag: Pill Badge */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border border-[#0284c7] text-[#0284c7] bg-sky-50/50 shadow-2xs transition-colors group-hover:bg-sky-100/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
