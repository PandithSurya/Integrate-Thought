import React, { useState } from 'react';
import { ExternalLink, BookOpen, ArrowRight, Grid } from 'lucide-react';

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

export default function FeaturedWorksSection() {
  const handleShowAllWorks = () => {
    alert("Showing full case studies & client portfolio catalog.");
  };

  return (
    <section
      id="works-section"
      className="relative w-full py-28 px-6 sm:px-12 z-20 bg-[#09081a] border-t border-purple-900/40 text-white select-none shadow-[0_-30px_80px_rgba(0,0,0,0.8)]"
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
  );
}
