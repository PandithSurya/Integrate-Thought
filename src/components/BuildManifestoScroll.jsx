import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { id: 'better', text: 'better,' },
  { id: 'faster', text: 'faster,' },
  { id: 'stronger', text: 'stronger.' },
];

const MANIFESTO_LINES = [
  'We combine agile execution with',
  'bold design thinking to deliver',
  'sharper results in less time.',
];

// Pre-compute stable character indices for the 3-line manifesto
let manifestoCharCounter = 0;
const PRECOMPUTED_MANIFESTO = MANIFESTO_LINES.map((line, lIdx) => {
  const words = line.split(' ');
  return words.map((word, wIdx) => {
    const chars = word.split('').map((char) => ({
      char,
      idx: manifestoCharCounter++,
      isPunctuation: char === '.' || char === ',',
      lineIndex: lIdx,
    }));
    if (wIdx < words.length - 1) {
      manifestoCharCounter++; // account for whitespace between words
    }
    return chars;
  });
});
const TOTAL_MANIFESTO_CHARS = manifestoCharCounter;

export default function BuildManifestoScroll({ isPageRevealed = true }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Hook into Lenis smooth scroll if active
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.on('scroll', handleLenisScroll);
    }

    // 2. Create pinned ScrollTrigger instance with GSAP
    let st = null;

    const initScrollTrigger = () => {
      if (st) st.kill();
      if (!sectionRef.current) return;

      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: '+=3500',
        scrub: 0.5,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    // Immediate init + staggered initialization timers to guarantee layout settles
    initScrollTrigger();
    const timer1 = setTimeout(initScrollTrigger, 60);
    const timer2 = setTimeout(initScrollTrigger, 300);

    const handleResize = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.off('scroll', handleLenisScroll);
      }
      if (st) st.kill();
    };
  }, [isPageRevealed]);

  // ==========================================
  // PROGRESS TIMELINE MAPPINGS (0.00 -> 1.00)
  // ==========================================

  // Top and Bottom atmosphere transition fades into #eef4fa
  const topBlendOpacity = Math.max(0, 1 - progress / 0.08);
  const bottomBlendOpacity = Math.max(0, (progress - 0.92) / 0.08);

  // Act 1 ("We build [better -> faster, -> stronger.]") visibility
  const act1Opacity = progress < 0.68
    ? 1
    : progress < 0.74
      ? Math.max(0, 1 - (progress - 0.68) / 0.06)
      : 0;

  // Act 1 exits sliding upwards
  const act1TranslateY = progress < 0.68
    ? 0
    : -((progress - 0.68) / 0.06) * 24;

  // Act 2 (3-Line Manifesto) visibility
  const act2Opacity = progress < 0.68
    ? 0
    : progress < 0.74
      ? Math.min(1, (progress - 0.68) / 0.06)
      : progress > 0.985
        ? Math.max(0, 1 - (progress - 0.985) / 0.015)
        : 1;

  // Act 2 enters coming UP from below (+36px -> 0px)
  const act2TranslateY = progress < 0.68
    ? 36
    : progress < 0.74
      ? (1 - (progress - 0.68) / 0.06) * 36
      : 0;

  // Word 1 ("better"): reveal 0.02 -> 0.16, hold until 0.20, exit 0.20 -> 0.24 (slides up -20px)
  const word1LetterProgress = Math.max(0, Math.min(1, (progress - 0.02) / 0.14));
  const word1Opacity = progress < 0.20
    ? 1
    : progress < 0.24
      ? Math.max(0, 1 - (progress - 0.20) / 0.04)
      : 0;
  const word1TranslateY = progress > 0.20 ? -((progress - 0.20) / 0.04) * 20 : 0;

  // Word 2 ("faster,"): enters from down (+22px -> 0px) 0.20 -> 0.24, reveals 0.25 -> 0.40, holds until 0.44, exits 0.44 -> 0.48 (slides up -20px)
  const word2LetterProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.15));
  const word2Opacity = progress < 0.20
    ? 0
    : progress < 0.24
      ? Math.min(1, (progress - 0.20) / 0.04)
      : progress < 0.44
        ? 1
        : progress < 0.48
          ? Math.max(0, 1 - (progress - 0.44) / 0.04)
          : 0;
  const word2TranslateY = progress < 0.24
    ? (1 - (progress - 0.20) / 0.04) * 22
    : progress > 0.44
      ? -((progress - 0.44) / 0.04) * 20
      : 0;

  // Word 3 ("stronger."): enters from down (+22px -> 0px) 0.44 -> 0.48, reveals 0.49 -> 0.64, holds until 0.68
  const word3LetterProgress = Math.max(0, Math.min(1, (progress - 0.49) / 0.15));
  const word3Opacity = progress < 0.44
    ? 0
    : progress < 0.48
      ? Math.min(1, (progress - 0.44) / 0.04)
      : 1;
  const word3TranslateY = progress < 0.48
    ? (1 - (progress - 0.44) / 0.04) * 22
    : 0;

  // Manifesto scrub progress: 0.74 -> 0.91
  const manifestoLetterProgress = Math.max(0, Math.min(1, (progress - 0.74) / 0.17));

  // Paper Yellow Highlighter & Red Underline scrub progress on Line 3 ("sharper results in less time.")
  // Sweeps in right after line 3 starts revealing (manifestoLetterProgress 0.68 -> 0.92)
  const highlightProgress = Math.max(0, Math.min(1, (manifestoLetterProgress - 0.68) / 0.22));
  const underlineProgress = Math.max(0, Math.min(1, (manifestoLetterProgress - 0.72) / 0.20));

  // Helper for letter illumination & rising from down motion
  const getCharStyle = (charP, isPunctuation = false) => {
    const clamped = Math.max(0, Math.min(1, charP));

    // Smooth cubic curve for the rising motion
    const easeY = 1 - Math.pow(1 - clamped, 2.4);
    // Letter rises 16px from below into its baseline (proportionate to reduced font size)
    const translateY = (1 - easeY) * 16;

    // Opacity: starts faint at 0.18, ascends to 1.0
    const opacity = 0.18 + 0.82 * clamped;

    // Color interpolation for light theme:
    // Faint unrevealed: slate-300 (rgb 203, 213, 225)
    // Target revealed: deep authoritative slate-950 (rgb 2, 6, 23)
    let r = Math.round(203 + (2 - 203) * clamped);
    let g = Math.round(213 + (6 - 213) * clamped);
    let b = Math.round(225 + (23 - 225) * clamped);

    // If it's punctuation (comma or period) and revealed, highlight with signature sky blue (#0284c7)
    if (isPunctuation && clamped > 0.5) {
      const pFactor = (clamped - 0.5) * 2;
      r = Math.round(r + (2 - r) * pFactor);
      g = Math.round(g + (132 - g) * pFactor);
      b = Math.round(b + (199 - b) * pFactor);
    }

    return {
      opacity,
      color: `rgb(${r}, ${g}, ${b})`,
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
      display: 'inline-block',
      willChange: 'transform, opacity, color',
      transition: 'color 0.04s ease-out, opacity 0.04s ease-out',
    };
  };

  // Helper to render word letter-by-letter with rising motion
  const renderScrubWord = (text, wordP) => {
    const chars = text.split('');
    const totalChars = chars.length;

    return chars.map((char, i) => {
      const charStart = (i / totalChars) * 0.82;
      const charSpan = 0.18 + (1 / totalChars) * 0.4;
      const charProgress = Math.max(0, Math.min(1, (wordP - charStart) / charSpan));
      const isPunctuation = char === ',' || char === '.';

      return (
        <span
          key={i}
          style={getCharStyle(charProgress, isPunctuation)}
          className="inline-block"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white text-slate-900 select-none overflow-hidden z-20 border-y border-slate-200/60"
      aria-label="What We Do - Value Architecture"
    >
      {/* Top Atmosphere Blend into Hero (#eef4fa) */}
      <div
        style={{ opacity: topBlendOpacity }}
        className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#eef4fa] via-[#eef4fa]/30 to-transparent pointer-events-none z-30 transition-opacity duration-150"
      />

      {/* Background Architectural Dot Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />

      {/* Subtle Ambient Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.04) 0%, rgba(238, 244, 250, 0.5) 45%, transparent 75%)',
        }}
      />

      {/* Screen Viewport Center Display */}
      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 relative z-20">

        {/* ============================================================ */}
        {/* ACT 1: "WHAT WE DO" -> "We build [better / faster, / stronger.]" */}
        {/* ============================================================ */}
        <div
          style={{
            opacity: act1Opacity,
            transform: `translate3d(0, ${act1TranslateY}px, 0)`,
            pointerEvents: act1Opacity > 0.05 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-transform duration-75 ease-out"
        >
          {/* Eyebrow: Minimal clean text (box and dot removed per instruction) */}
          <div className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.22em] text-slate-400/90 uppercase mb-2.5 sm:mb-3">
            WHAT WE DO
          </div>

          {/* Constant Headline: "We build" (Reduced text size) */}
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-slate-950 font-sans leading-[1.12]">
            We build
          </div>

          {/* Dynamic Changing Word Slot (Reduced text size) */}
          <div className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] font-sans leading-[1.12] mt-1 sm:mt-2 h-[1.25em] w-full flex items-center justify-center">

            {/* Word 1: better */}
            {word1Opacity > 0.01 && (
              <div
                style={{
                  opacity: word1Opacity,
                  transform: `translate3d(0, ${word1TranslateY}px, 0)`,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {renderScrubWord(WORDS[0].text, word1LetterProgress)}
              </div>
            )}

            {/* Word 2: faster, */}
            {word2Opacity > 0.01 && (
              <div
                style={{
                  opacity: word2Opacity,
                  transform: `translate3d(0, ${word2TranslateY}px, 0)`,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {renderScrubWord(WORDS[1].text, word2LetterProgress)}
              </div>
            )}

            {/* Word 3: stronger. */}
            {word3Opacity > 0.01 && (
              <div
                style={{
                  opacity: word3Opacity,
                  transform: `translate3d(0, ${word3TranslateY}px, 0)`,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {renderScrubWord(WORDS[2].text, word3LetterProgress)}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ACT 2: 3-LINE MANIFESTO STATEMENT WITH PAPER HIGHLIGHTER & RED UNDERLINE */}
        {/* "We combine agile execution with */}
        {/*  bold design thinking to deliver */}
        {/*  sharper results in less time." */}
        {/* ============================================================ */}
        <div
          style={{
            opacity: act2Opacity,
            transform: `translate3d(0, ${act2TranslateY}px, 0)`,
            pointerEvents: act2Opacity > 0.05 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 transition-transform duration-75 ease-out max-w-4xl mx-auto"
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] font-bold tracking-tight leading-[1.38] sm:leading-[1.32] font-sans text-center text-slate-950">
            {PRECOMPUTED_MANIFESTO.map((lineWords, lineIdx) => {
              const isLastLine = lineIdx === 2;

              return (
                <div key={lineIdx} className="block my-1 sm:my-1.5">
                  <span className={isLastLine ? "relative inline-block" : ""}>
                    {/* PAPER YELLOW HIGHLIGHTER STROKE (on the final punchline) */}
                    {isLastLine && (
                      <span
                        style={{
                          transform: `scaleX(${highlightProgress}) rotate(-0.35deg)`,
                          transformOrigin: 'left center',
                          opacity: highlightProgress > 0.02 ? 1 : 0,
                        }}
                        className="absolute -inset-x-2.5 sm:-inset-x-3.5 top-[16%] bottom-[8%] bg-yellow-200/75 rounded-xs sm:rounded-[3px] -z-10 pointer-events-none mix-blend-multiply transition-transform duration-75 ease-out shadow-xs"
                      />
                    )}

                    {/* RED HAND-DRAWN PEN UNDERLINE (like on physical paper) */}
                    {isLastLine && (
                      <svg
                        className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-2.5 sm:h-3.5 overflow-visible pointer-events-none -z-10"
                        viewBox="0 0 320 16"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M 3,11 C 75,15 170,7 318,12 C 235,14 105,15 18,15"
                          stroke="#ef4444"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            strokeDasharray: 450,
                            strokeDashoffset: (1 - underlineProgress) * 450,
                            opacity: underlineProgress > 0.02 ? 0.95 : 0,
                            transition: 'stroke-dashoffset 0.04s ease-out, opacity 0.1s ease-out',
                          }}
                        />
                      </svg>
                    )}

                    {/* Words & Characters */}
                    {lineWords.map((wordChars, wordIdx) => (
                      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
                        {wordChars.map(({ char, idx, isPunctuation }) => {
                          const charStart = (idx / TOTAL_MANIFESTO_CHARS) * 0.85;
                          const charSpan = 0.15;
                          const charP = Math.max(0, Math.min(1, (manifestoLetterProgress - charStart) / charSpan));

                          return (
                            <span
                              key={idx}
                              style={getCharStyle(charP, isPunctuation)}
                              className="inline-block"
                            >
                              {char}
                            </span>
                          );
                        })}
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Atmosphere Blend into Section 02 (#eef4fa) */}
      <div
        style={{ opacity: bottomBlendOpacity }}
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#eef4fa] via-[#eef4fa]/30 to-transparent pointer-events-none z-30 transition-opacity duration-150"
      />
    </section>
  );
}
