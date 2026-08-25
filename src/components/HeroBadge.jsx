import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Sliders } from 'lucide-react';

export default function HeroBadge({ onToggleControls }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const sampleComponentCode = `<KineticGrid
  spacing={40}
  dotSize={3}
  gridStroke={1}
  repulsion={25}
  radius={180}
  hoverColor="#3b82f6"
/>`;
    navigator.clipboard.writeText(sampleComponentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-10 p-4">
      <div className="pointer-events-auto flex flex-col items-center text-center max-w-lg select-none">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg mb-6">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 0h16v8h-8zM4 8h8v8H4zM4 16h8v8z" />
          </svg>
          <span className="text-xs font-medium text-slate-300">Framer Component</span>
        </div>

        {/* Main Heading with Blue Rect Box around "Grid" as in Reference Image */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4 flex items-center justify-center gap-3">
          <span>Kinetic</span>
          <span className="relative inline-block px-3 py-0.5 border-2 border-blue-500 rounded-lg text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Grid
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed font-normal">
          An interactive grid that reacts to cursor and clicks.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-all shadow-lg active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-900" />}
            <span>{copied ? 'Copied Code!' : 'Copy component'}</span>
          </button>

          <button
            onClick={onToggleControls}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-xs backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>Customize</span>
          </button>

          <a
            href="https://framer.university/resources/kinetic-grid-component-in-framer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-medium text-xs backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            <span>Original</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
