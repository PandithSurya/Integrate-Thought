import React from 'react';

const MARQUEE_ITEMS = [
  { text: 'INTEGRATE THOUGHT', type: 'brand' },
  { text: '•', type: 'dot' },
  { text: 'WEB DESIGN', type: 'main' },
  { text: '&', type: 'amp' },
  { text: 'DEVELOPMENT AGENCY', type: 'main' },
  { text: '•', type: 'dot' },
  { text: 'AI', type: 'accent' },
  { text: 'AUTOMATION & WORKFLOWS', type: 'main' },
  { text: '•', type: 'dot' },
  { text: 'AUTONOMOUS AGENTS', type: 'brand' },
  { text: '•', type: 'dot' },
  { text: 'RAG KNOWLEDGE SYSTEMS', type: 'main' },
  { text: '•', type: 'dot' },
  { text: "HYDERABAD'S PREMIER TECH STUDIO", type: 'accent' },
  { text: '•', type: 'dot' },
];

export default function CompanyMarqueeBanner() {
  return (
    <div className="w-full overflow-hidden bg-white text-slate-950 py-3 sm:py-4 border-t border-b border-slate-200/90 shadow-sm relative z-30 font-sans select-none my-0">
      
      {/* Subtle White Side Gradient Fade */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex w-max animate-marquee space-x-6 sm:space-x-10 items-center">
        {[...Array(4)].map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex items-center gap-5 sm:gap-8 shrink-0">
            {MARQUEE_ITEMS.map((item, idx) => {
              if (item.type === 'dot') {
                return (
                  <span key={idx} className="text-[#00b4d8] text-lg sm:text-3xl font-black">
                    •
                  </span>
                );
              }
              if (item.type === 'amp') {
                return (
                  <span key={idx} className="text-[#f97316] font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight">
                    &amp;
                  </span>
                );
              }
              if (item.type === 'brand') {
                return (
                  <span key={idx} className="text-[#00b4d8] font-black text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase hover:text-slate-950 transition-colors">
                    {item.text}
                  </span>
                );
              }
              if (item.type === 'accent') {
                return (
                  <span key={idx} className="text-blue-700 font-extrabold text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase hover:text-[#00b4d8] transition-colors">
                    {item.text}
                  </span>
                );
              }
              return (
                <span key={idx} className="text-slate-950 font-extrabold text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase hover:text-blue-700 transition-colors">
                  {item.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
