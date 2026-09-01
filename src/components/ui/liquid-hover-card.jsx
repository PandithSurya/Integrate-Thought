import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowUpRight, Clock, CheckCircle } from 'lucide-react';

export function LiquidHoverCard({ course, onSelect }) {
  const cardRef = useRef(null);
  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const filterId = `liquid-filter-${course.id}`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  useGSAP(() => {
    if (!turbRef.current || !dispRef.current) return;

    if (hovered) {
      gsap.to(dispRef.current, {
        scale: 24,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(turbRef.current, {
        attr: { baseFrequency: '0.012 0.030' },
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    } else {
      gsap.to(dispRef.current, {
        scale: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.to(turbRef.current, {
        attr: { baseFrequency: '0.001 0.001' },
        duration: 0.4,
      });
    }
  }, [hovered]);

  const waveBulgeX = mousePos.x * 100;
  const waveBulgeY = hovered ? 92 : 100;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect?.(course)}
      className="group relative w-full rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 hover:border-blue-400/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
      style={{
        transform: hovered ? 'translate3d(0, -6px, 0)' : 'translate3d(0, 0, 0)',
      }}
    >
      {/* SVG Liquid Distortion Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.001 0.001"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* TOP IMAGE CONTAINER WITH LIQUID WAVE MASK */}
      <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-slate-900">
        <img
          src={course.image}
          alt={course.title}
          style={{
            filter: hovered ? `url(#${filterId})` : 'none',
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Liquid Wobbly Bottom Wave Border */}
        <svg
          className="absolute bottom-0 left-0 w-full h-8 pointer-events-none transition-all duration-300 text-white"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          <path
            d={`M 0,20 L 0,10 Q ${waveBulgeX},${waveBulgeY === 92 ? -2 : 10} 100,10 L 100,20 Z`}
            fill="currentColor"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10 font-sans">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-slate-950/85 backdrop-blur-md text-white border border-white/20 uppercase shadow-md">
            {course.category}
          </span>
        </div>

        {/* Duration Badge on Top Right */}
        <div className="absolute top-4 right-4 z-10 font-sans">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-blue-600/90 backdrop-blur-md text-white shadow-md">
            {course.duration}
          </span>
        </div>

        {/* Level Overlay Badge at bottom left of image */}
        <div className="absolute bottom-10 left-4 z-10 flex items-center gap-2 text-xs font-semibold text-white/90 font-sans">
          <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-slate-200 text-[10px] font-bold uppercase tracking-wider border border-white/10">
            {course.level}
          </span>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-6 sm:p-7 pt-2 flex flex-col justify-between flex-1 space-y-4 font-sans">
        <div className="space-y-3">
          
          {/* Duration & Status */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 font-sans pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-bold text-slate-950">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admissions Open</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight leading-snug font-sans group-hover:text-blue-700 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
            {course.description}
          </p>

          {/* Key Module Chips */}
          {course.modules && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {course.modules.map((mod, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200/70"
                >
                  {mod}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER & ENROLL BUTTON */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-sans">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              PROGRAM DURATION
            </span>
            <span className="text-sm font-extrabold text-slate-950 font-sans">
              {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            <span>Inquire / Enroll</span>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-300 shadow-sm">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
