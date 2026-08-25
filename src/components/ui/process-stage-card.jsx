import React from 'react';
import { Settings, Globe, Gem, BarChart3, Rocket } from 'lucide-react';

const STAGE_ICONS = [Settings, Globe, Gem, BarChart3, Rocket];

export function ProcessStageCard({ stage, index, onSelect }) {
  const IconComponent = STAGE_ICONS[index % STAGE_ICONS.length];

  return (
    <div
      onClick={() => onSelect && onSelect(stage)}
      className="group relative w-full max-w-[270px] sm:max-w-[290px] h-[310px] sm:h-[380px] rounded-[24px] bg-white text-slate-900 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] active:scale-95 active:shadow-md transition-all duration-300 ease-out overflow-hidden cursor-pointer flex flex-col justify-between border border-slate-100/90 select-none touch-manipulation"
    >
      {/* LAYER 1: DEFAULT UNHOVERED CARD CONTENT */}
      <div className="flex flex-col justify-between h-full p-6 sm:p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
        <div>
          {/* Top-Left Line Icon */}
          <div className="mb-6 sm:mb-10 text-slate-800">
            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25]" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-slate-900 tracking-tight leading-snug mb-2 sm:mb-3 font-sans">
            {stage.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal font-sans">
            {stage.description}
          </p>
        </div>
      </div>

      {/* LAYER 2: HOVERED CARD IMAGE OVERLAY */}
      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-[24px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 z-20 pointer-events-none group-hover:pointer-events-auto">
        {/* Full Image Background with Subtle Zoom Effect */}
        <img
          src={stage.image}
          alt={stage.title}
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for Optimal Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />

        {/* Top Icon Badge in Hovered State */}
        <div className="relative z-10 text-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <IconComponent className="w-8 h-8 stroke-[1.25]" />
        </div>

        {/* Hover Bottom Title */}
        <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug font-sans">
            {stage.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
