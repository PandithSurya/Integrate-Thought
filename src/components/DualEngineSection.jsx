import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Pre-tokenized lines for the Academy TypeScript editor
const CODE_LINES_DATA = [
  [
    { text: 'import', cls: 'text-[#f43f5e]' },
    { text: ' { ', cls: 'text-slate-300' },
    { text: 'AutonomousAgent', cls: 'text-[#38bdf8]' },
    { text: ', ', cls: 'text-slate-300' },
    { text: 'StagingRuntime', cls: 'text-[#38bdf8]' },
    { text: ' } ', cls: 'text-slate-300' },
    { text: 'from', cls: 'text-[#f43f5e]' },
    { text: ' \'', cls: 'text-slate-300' },
    { text: '@integrate/core', cls: 'text-[#a7f3d0]' },
    { text: '\';', cls: 'text-slate-300' },
  ],
  [],
  [
    { text: 'export async function', cls: 'text-[#c084fc]' },
    { text: ' ', cls: 'text-slate-300' },
    { text: 'deployToStaging', cls: 'text-[#38bdf8] font-bold' },
    { text: '() {', cls: 'text-slate-300' },
  ],
  [
    { text: '  // Live production code review pipeline', cls: 'text-[#64748b]' },
  ],
  [
    { text: '  ', cls: 'text-slate-300' },
    { text: 'const', cls: 'text-[#f43f5e]' },
    { text: ' runner = ', cls: 'text-slate-300' },
    { text: 'new', cls: 'text-[#f43f5e]' },
    { text: ' ', cls: 'text-slate-300' },
    { text: 'StagingRuntime', cls: 'text-[#fbbf24]' },
    { text: '({', cls: 'text-slate-300' },
  ],
  [
    { text: '    target: ', cls: 'text-slate-300' },
    { text: '\'production-mirror\'', cls: 'text-[#a7f3d0]' },
    { text: ',', cls: 'text-slate-300' },
  ],
  [
    { text: '    leadArchitectReview: ', cls: 'text-slate-300' },
    { text: 'true', cls: 'text-[#fbbf24]' },
  ],
  [
    { text: '  });', cls: 'text-slate-300' },
  ],
  [
    { text: '  ', cls: 'text-slate-300' },
    { text: 'return await', cls: 'text-[#f43f5e]' },
    { text: ' runner.', cls: 'text-slate-300' },
    { text: 'verifyBuild', cls: 'text-[#38bdf8]' },
    { text: '();', cls: 'text-slate-300' },
  ],
  [
    { text: '}', cls: 'text-slate-300' },
  ],
];

// Pre-compute individual characters with line coordinates and styles
let totalCodeChars = 0;
const FLATTENED_CODE_CHARS = [];
CODE_LINES_DATA.forEach((line, lineIdx) => {
  if (line.length === 0) {
    FLATTENED_CODE_CHARS.push({
      char: '\n',
      cls: '',
      lineIdx,
      charIdx: totalCodeChars++,
      isNewline: true,
    });
    return;
  }
  line.forEach((token) => {
    token.text.split('').forEach((char) => {
      FLATTENED_CODE_CHARS.push({
        char,
        cls: token.cls,
        lineIdx,
        charIdx: totalCodeChars++,
        isNewline: false,
      });
    });
  });
  FLATTENED_CODE_CHARS.push({
    char: '\n',
    cls: '',
    lineIdx,
    charIdx: totalCodeChars++,
    isNewline: true,
  });
});

export default function DualEngineSection({ onNavigate }) {
  // 1. Intersection Observer Refs
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const dividerRef = useRef(null);

  // 2. Trigger States (once only)
  const [p1Visible, setP1Visible] = useState(false);
  const [p2Visible, setP2Visible] = useState(false);
  const [dividerDrawn, setDividerDrawn] = useState(false);

  // 3. Telemetry Counter States (Pillar 01)
  const [throughput, setThroughput] = useState(0);
  const [latency, setLatency] = useState(0);
  const [agents, setAgents] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // 4. Typewriter State (Pillar 02)
  const [typedCharsCount, setTypedCharsCount] = useState(0);

  // Observer for Pillar 01 (Telemetry + Staggered Fade-Up)
  useEffect(() => {
    if (!p1Ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setP1Visible(true);
          observer.disconnect();

          // Trigger Telemetry Counter: count up over 1.5s
          const duration = 1500;
          const startTime = performance.now();

          const animateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic curve
            const ease = 1 - Math.pow(1 - progress, 3);

            setThroughput(ease * 1.4);
            setLatency(ease * 18.4);
            setAgents(Math.round(ease * 28));
            setAccuracy(ease * 99.98);

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              setThroughput(1.4);
              setLatency(18.4);
              setAgents(28);
              setAccuracy(99.98);
            }
          };

          requestAnimationFrame(animateCounter);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(p1Ref.current);
    return () => observer.disconnect();
  }, []);

  // Observer for Divider Line (Self-Drawing from Left to Right)
  useEffect(() => {
    if (!dividerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDividerDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(dividerRef.current);
    return () => observer.disconnect();
  }, []);

  // Observer for Pillar 02 (Typewriter + Staggered Fade-Up)
  useEffect(() => {
    if (!p2Ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setP2Visible(true);
          observer.disconnect();

          // Start character-by-character typewriter at 30ms per character
          const interval = setInterval(() => {
            setTypedCharsCount((prev) => {
              if (prev >= totalCodeChars) {
                clearInterval(interval);
                return prev;
              }
              return prev + 1;
            });
          }, 30);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(p2Ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="py-20 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto space-y-20 select-none">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#0284c7] uppercase">
          Dual-Engine Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] font-sans">
          Two Synchronized Engines. <br className="hidden sm:inline" />
          One Unfair Advantage.
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
          We operate two deeply intertwined pillars: high-caliber software solutions for enterprises,
          and intensive, industry-grade training for rising technical talent. One sharpens the other.
        </p>
      </div>

      <div className="space-y-16">
        {/* ======================================================== */}
        {/* PILLAR 01: ENTERPRISE (Visual 60% Left | Text 40% Right) */}
        {/* ======================================================== */}
        <div
          ref={p1Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F8F9FA] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* Visual Block: LEFT (60% -> 7 cols) - Dark SaaS Data Dashboard */}
          <div className="lg:col-span-7 w-full min-h-[350px] lg:h-[420px] rounded-2xl overflow-hidden relative bg-[#090d16] border border-slate-800 shadow-xl shadow-slate-950/20 flex flex-col justify-between p-5 sm:p-7 select-none">
            {/* Teal Grid Lines on Charcoal/Navy Canvas */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d948818_1px,transparent_1px),linear-gradient(to_bottom,#0d948818_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Ambient Teal Radial Glow */}
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Dashboard Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
                  Enterprise Ops // Workflow Runtime
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold text-teal-400 bg-teal-950/70 border border-teal-800/80 px-2.5 py-0.5 rounded-full">
                  ● LIVE TELEMETRY
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                  30D
                </span>
              </div>
            </div>

            {/* 3 Metric Cards Row with Scroll-Triggered Telemetry Counter */}
            <div className="relative z-10 grid grid-cols-3 gap-3 my-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-1 backdrop-blur-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Throughput
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-white block">
                  {throughput.toFixed(1)}M/day
                </span>
                <span className="text-[10px] font-mono text-teal-400 font-semibold block">
                  +24.8% ↑
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-1 backdrop-blur-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Avg Latency
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-white block">
                  {latency.toFixed(1)}ms
                </span>
                <span className="text-[10px] font-mono text-teal-400 font-semibold block">
                  -42ms ↓
                </span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-1 backdrop-blur-xs">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  AI Agents / SLA
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-white block">
                  {accuracy.toFixed(2)}%
                </span>
                <span className="text-[10px] font-mono text-sky-400 font-semibold block">
                  {agents} Active
                </span>
              </div>
            </div>

            {/* Vector Waveform Area Chart Graphic */}
            <div className="relative z-10 bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2 backdrop-blur-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Workflow Orchestration Flow</span>
                <span className="text-teal-400">P99: 22ms</span>
              </div>

              {/* SVG Line & Area Chart */}
              <div className="w-full h-16 sm:h-20 relative overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 80">
                  <defs>
                    <linearGradient id="tealGraphGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,65 Q40,55 80,48 T160,35 T240,40 T320,18 T400,12 L400,80 L0,80 Z"
                    fill="url(#tealGraphGradient)"
                  />
                  <path
                    d="M0,65 Q40,55 80,48 T160,35 T240,40 T320,18 T400,12"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="2.5"
                  />
                  <circle cx="320" cy="18" r="4" fill="#5eead4" />
                  <circle cx="400" cy="12" r="4" fill="#2dd4bf" />
                </svg>
              </div>
            </div>

            {/* Footer Telemetry Status */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-800/80 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-teal-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Autonomous Processing Pipeline Active
              </span>
              <span className="text-slate-500">Node Cluster: v4.2</span>
            </div>
          </div>

          {/* Text Block: RIGHT (40% -> 5 cols) with Staggered Fade-Up */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Headline: 0ms delay */}
            <div
              style={{
                opacity: p1Visible ? 1 : 0,
                transform: p1Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
              className="space-y-2"
            >
              <div className="text-xs font-mono font-bold tracking-wider text-[#0284c7] uppercase">
                Pillar 01 / Enterprise Solutions
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                Digital Engineering &amp; AI Systems
              </h3>
            </div>

            {/* 2. Subtext/Paragraph: 200ms delay */}
            <p
              style={{
                opacity: p1Visible ? 1 : 0,
                transform: p1Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
              }}
              className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed font-sans"
            >
              We build AI-agents and web apps that kill workflow friction.
            </p>

            {/* 3. Horizontal pill-shaped tags: 400ms delay */}
            <div
              style={{
                opacity: p1Visible ? 1 : 0,
                transform: p1Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
              className="flex flex-row items-center gap-2 pt-1 overflow-x-auto no-scrollbar py-0.5"
            >
              {[
                'Bespoke Web Apps',
                'Private RAG',
                'Autonomous Agents',
                'Workflows',
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-[#0284c7] text-slate-800 bg-transparent whitespace-nowrap shadow-2xs transition-colors hover:bg-sky-50/60"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* 4. Button: 600ms delay - exact styling as navbar 'Get Started' button */}
            <div
              style={{
                opacity: p1Visible ? 1 : 0,
                transform: p1Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms',
              }}
              className="pt-2"
            >
              <button
                onClick={() => onNavigate && onNavigate('Services')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white font-sans group/btn"
              >
                <span>Explore Engineering Services</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SELF-DRAWING DIVIDER LINE (Left to Right over 1.0s)      */}
        {/* ======================================================== */}
        <div ref={dividerRef} className="w-full flex items-center justify-center my-6 sm:my-8 overflow-hidden py-1">
          <div
            style={{
              transform: dividerDrawn ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full h-px bg-slate-300/80"
          />
        </div>

        {/* ======================================================== */}
        {/* PILLAR 02: ACADEMY (Text 40% Left | Visual 60% Right)   */}
        {/* ======================================================== */}
        <div
          ref={p2Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F8F9FA] border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* Text Block: LEFT (40% -> 5 cols on lg, ordered 2 on mobile) with Staggered Fade-Up */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            {/* 1. Headline: 0ms delay */}
            <div
              style={{
                opacity: p2Visible ? 1 : 0,
                transform: p2Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms',
              }}
              className="space-y-2"
            >
              <div className="text-xs font-mono font-bold tracking-wider text-[#0284c7] uppercase">
                Pillar 02 / Academy &amp; Upskilling
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                IT School &amp; Practical Internships
              </h3>
            </div>

            {/* 2. Subtext/Paragraph: 200ms delay */}
            <p
              style={{
                opacity: p2Visible ? 1 : 0,
                transform: p2Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
              }}
              className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed font-sans"
            >
              Learn by breaking staging. Not by reading slides.
            </p>

            {/* 3. Horizontal pill-shaped tags: 400ms delay */}
            <div
              style={{
                opacity: p2Visible ? 1 : 0,
                transform: p2Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
              className="flex flex-row items-center gap-2 pt-1 overflow-x-auto no-scrollbar py-0.5"
            >
              {[
                'Full-Stack Dev',
                'Applied AI',
                'Code Reviews',
                'Internships',
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-[#0284c7] text-slate-800 bg-transparent whitespace-nowrap shadow-2xs transition-colors hover:bg-sky-50/60"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* 4. Button: 600ms delay - exact styling as navbar 'Get Started' button */}
            <div
              style={{
                opacity: p2Visible ? 1 : 0,
                transform: p2Visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms',
              }}
              className="pt-2"
            >
              <button
                onClick={() => onNavigate && onNavigate('IT School')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white font-sans group/btn"
              >
                <span>View IT School Programs</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Visual Block: RIGHT (60% -> 7 cols on lg, ordered 1 on mobile) - VS Code Editor with Typewriter */}
          <div className="lg:col-span-7 w-full min-h-[350px] lg:h-[420px] rounded-2xl overflow-hidden relative bg-[#0d1117] border border-slate-800 shadow-xl shadow-slate-950/20 flex flex-col justify-between font-mono text-xs select-none order-1 lg:order-2">
            {/* Window Chrome Header */}
            <div className="bg-[#161b22] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="ml-3 px-3 py-1 bg-[#0d1117] border-t border-x border-slate-700/80 rounded-t-md text-slate-200 text-[11px] flex items-center gap-2">
                  <span className="text-[#38bdf8]">TS</span>
                  <span>deployPipeline.ts</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 tracking-wider">WORKSPACE // COHORT_STAGING</span>
            </div>

            {/* Code Body with Scroll-Triggered Typewriter Effect at 30ms/char */}
            <div className="p-4 sm:p-5 flex gap-4 leading-relaxed overflow-x-hidden min-h-[260px]">
              {/* Line Numbers */}
              <div className="text-slate-600 select-none text-right pr-3 border-r border-slate-800/80 space-y-1 text-[11px] sm:text-xs">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
                <div>07</div>
                <div>08</div>
                <div>09</div>
                <div>10</div>
              </div>

              {/* Code Lines with character-by-character typewriter reveal & blinking cursor */}
              <div className="space-y-1 text-[11px] sm:text-xs tracking-tight whitespace-pre font-mono">
                {CODE_LINES_DATA.map((line, lIdx) => {
                  const lineChars = FLATTENED_CODE_CHARS.filter((c) => c.lineIdx === lIdx && !c.isNewline);
                  const visibleChars = lineChars.filter((c) => c.charIdx < typedCharsCount);

                  // Determine if the blinking cursor should appear on this line
                  let showCursorHere = false;
                  if (p2Visible) {
                    if (typedCharsCount >= totalCodeChars) {
                      // After full code is typed: cursor blinks at end of last line
                      showCursorHere = lIdx === CODE_LINES_DATA.length - 1;
                    } else if (typedCharsCount === 0) {
                      showCursorHere = lIdx === 0;
                    } else {
                      const lastTyped = FLATTENED_CODE_CHARS[typedCharsCount - 1];
                      if (lastTyped.isNewline) {
                        const nextChar = FLATTENED_CODE_CHARS[typedCharsCount];
                        showCursorHere = nextChar ? nextChar.lineIdx === lIdx : lIdx === CODE_LINES_DATA.length - 1;
                      } else {
                        showCursorHere = lastTyped.lineIdx === lIdx;
                      }
                    }
                  }

                  return (
                    <div key={lIdx} className="min-h-[1.4em] flex items-center">
                      {visibleChars.map((item) => (
                        <span key={item.charIdx} className={item.cls}>
                          {item.char}
                        </span>
                      ))}
                      {showCursorHere && (
                        <span className="inline-block w-2 h-3.5 bg-[#38bdf8] ml-0.5 align-middle animate-pulse" />
                      )}
                      {visibleChars.length === 0 && !showCursorHere && <span>&nbsp;</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VS Code Bottom Status Bar */}
            <div className="bg-[#0b1b36] px-4 py-1.5 border-t border-slate-800 text-[10px] sm:text-[11px] text-sky-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sky-400">
                  <span>⚡</span> TypeScript 5.6
                </span>
                <span className="text-slate-400 hidden sm:inline">UTF-8</span>
                <span className="text-emerald-400">✓ 0 Errors</span>
              </div>
              <span className="font-semibold text-slate-300">
                Ln 10, Col {Math.min(24, Math.max(1, typedCharsCount % 35))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM TICKER: CLEAN 20+ PARTNER BRANDS MARQUEE              */}
      {/* ============================================================ */}
      <div className="w-full overflow-hidden py-4 border-y border-slate-200/90 relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#EEF4FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#EEF4FA] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee space-x-10 items-center whitespace-nowrap text-xs font-mono font-semibold tracking-widest text-[#64748B] uppercase select-none">
          <span>✦ 20+ Partner Brands</span>
          <span>✦ Enterprise Production Deployments</span>
          <span>✦ 20+ Partner Brands</span>
          <span>✦ 3x Verified Business Growth</span>
          <span>✦ 20+ Partner Brands</span>
          <span>✦ Digital Engineering &amp; AI Systems</span>
          <span>✦ 20+ Partner Brands</span>
          <span>✦ Enterprise Production Deployments</span>
          <span>✦ 20+ Partner Brands</span>
          <span>✦ 3x Verified Business Growth</span>
          <span>✦ 20+ Partner Brands</span>
          <span>✦ Digital Engineering &amp; AI Systems</span>
        </div>
      </div>
    </section>
  );
}
