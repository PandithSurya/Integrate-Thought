import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_BRAND_SEQUENCE, NAVIGATION_BRAND_SEQUENCE } from '../data/brandLanguages';

/**
 * IntegrateThoughtLoader
 * 
 * An ultra-minimal, editorial brand loading experience.
 * "ONE BRAND. MANY LANGUAGES. ONE IDENTITY."
 * 
 * Features:
 *  - Commanding hero brand mark
 *  - Multilingual brand name representations across Indian scripts
 *  - Logo facet-matched jewel tones
 *  - Signature Zoom-Out exit choreography paired with landing page Gaussian blur resolution
 */
export default function IntegrateThoughtLoader({
  isReady = true,
  onComplete,
  onExiting,
  mode = 'initial', // 'initial' | 'navigation'
}) {
  const sequence = mode === 'navigation' ? NAVIGATION_BRAND_SEQUENCE : INITIAL_BRAND_SEQUENCE;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isFirstRender = useRef(true);
  const timerRef = useRef(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Mark first render after mount so initial text renders immediately
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleTriggerExit = () => {
    setIsExiting(true);
    if (onExiting) {
      onExiting();
    }
  };

  // Sequencer loop
  useEffect(() => {
    if (prefersReducedMotion) {
      if (isReady) {
        timerRef.current = setTimeout(() => {
          handleTriggerExit();
        }, 2200);
      }
      return () => clearTimeout(timerRef.current);
    }

    const currentItem = sequence[currentIndex];
    const isFinalItem = currentIndex === sequence.length - 1;

    if (isFinalItem) {
      // Reached the final English hold
      if (isReady) {
        timerRef.current = setTimeout(() => {
          handleTriggerExit();
        }, currentItem.duration);
      } else {
        // App still loading, loop through regional languages again
        timerRef.current = setTimeout(() => {
          setCurrentIndex(1);
        }, currentItem.duration);
      }
    } else {
      // Continue to next language in sequence
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, currentItem.duration);
    }

    return () => clearTimeout(timerRef.current);
  }, [currentIndex, isReady, prefersReducedMotion, sequence]);

  const currentVariant = prefersReducedMotion ? sequence[0] : sequence[currentIndex];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="brand-loader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1], // Buttery smooth luxury dissolve
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center text-slate-950 select-none pointer-events-auto overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: `
              radial-gradient(circle at 50% 48%, #ffffff 0%, #fafbfc 60%, #f1f5f9 100%)
            `,
          }}
          role="status"
          aria-live="polite"
          aria-label="Loading Integrate Thought"
        >
          {/* 1. PHYSICAL 3D COLD-PRESS BRIGHT WHITE PAPER SURFACE RELIEF */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-25"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <filter id="whitePaperRelief" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035 0.048"
                numOctaves="5"
                result="roughNoise"
              />
              <feDiffuseLighting
                in="roughNoise"
                lightingColor="#ffffff"
                surfaceScale="1.6"
                result="paperLight"
              >
                <feDistantLight azimuth="55" elevation="60" />
              </feDiffuseLighting>
            </filter>
            <rect width="100%" height="100%" filter="url(#whitePaperRelief)" fill="#ffffff" />
          </svg>

          {/* 2. DENSE CLEAN PHYSICAL TOOTH NOISE (Pure Monochrome) */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-12 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* 3. ULTRA-FINE CLEAN ARCHITECTURAL DOT MATRIX */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(#94a3b8 0.75px, transparent 0.75px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* OPTICALLY CENTERED UNIFIED BRAND LOCKUP */}
          <motion.div
            exit={{
              opacity: 0,
              filter: 'blur(4px)',
              transition: {
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="relative z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none -translate-y-2 sm:-translate-y-3 will-change-[opacity,filter]"
          >
            {/* HERO BRAIN PAPER LOGO MARK WITH PRISMATIC HALO & FLOATING SHIMMER EFFECT */}
            <div className="relative flex items-center justify-center">
              {/* 1. PRISMATIC AMBIENT FACET BACKLIGHT GLOW (Breathing & Responsive to Active Language Facet) */}
              <motion.div
                animate={{
                  scale: [0.95, 1.15, 0.95],
                  opacity: [0.45, 0.8, 0.45],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-10 sm:-inset-14 rounded-full pointer-events-none -z-10 blur-3xl transition-colors duration-700"
                style={{
                  background:
                    currentVariant.color && currentVariant.color !== '#0a0a0a'
                      ? `radial-gradient(circle, ${currentVariant.color}40 0%, rgba(2, 132, 199, 0.15) 45%, transparent 75%)`
                      : 'radial-gradient(circle, rgba(2, 132, 199, 0.22) 0%, rgba(124, 58, 237, 0.14) 45%, transparent 75%)',
                }}
              />

              {/* 2. SUBTLE FLOATING & BREATHING LOGO WRAPPER */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [-4, 4, -4],
                        scale: [1, 1.025, 1],
                      }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center"
              >
                {/* 3. HERO PAPER LOGO WITH MULTI-LAYER TACTILE DROP SHADOW ON PURE WHITE */}
                <img
                  src="/paper-logo.png"
                  alt="Integrate Thought"
                  className="h-28 sm:h-36 md:h-44 lg:h-48 w-auto aspect-[1536/1024] object-contain select-none"
                  style={{
                    filter:
                      'drop-shadow(0 22px 36px rgba(15, 23, 42, 0.12)) drop-shadow(0 6px 14px rgba(15, 23, 42, 0.06)) drop-shadow(0 1px 3px rgba(15, 23, 42, 0.04))',
                  }}
                  draggable={false}
                />

                {/* 4. SILHOUETTE-MASKED PRISMATIC LIGHT SWEEP (Clipped to exact brain contours) */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    WebkitMaskImage: 'url(/paper-logo.png)',
                    maskImage: 'url(/paper-logo.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                >
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            x: ['-130%', '130%'],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-full h-full"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.85) 50%, transparent 70%)',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* TIGHT, HARMONIOUS MULTILINGUAL BRAND NAME LOCKUP */}
            <div className="mt-3.5 sm:mt-4 md:mt-5 h-8 sm:h-9 md:h-10 flex items-center justify-center w-full min-w-[240px] sm:min-w-[360px] md:min-w-[480px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentVariant.id}
                  initial={
                    prefersReducedMotion || isFirstRender.current
                      ? false
                      : { opacity: 0, y: 5, filter: 'blur(3px)' }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -5, filter: 'blur(3px)' }
                  }
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1], // Crisp physical typographic settling
                  }}
                  style={{
                    '--loader-font': currentVariant.font,
                    color: currentVariant.color || '#18181b',
                  }}
                  className={`brand-loader-text block text-center font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none whitespace-nowrap transition-colors duration-200 ${currentVariant.tracking}`}
                >
                  {currentVariant.text}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* OFFICIAL BRAND TAGLINE LOCKUP: THINK IT • BUILD IT • INTEGRATE IT */}
            <div className="mt-3 sm:mt-3.5 flex items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] select-none font-sans">
              <span className="text-slate-900 font-bold">Think it</span>
              <span className="text-slate-300 text-[9px] select-none">•</span>
              <span className="text-slate-900 font-bold">Build it</span>
              <span className="text-slate-300 text-[9px] select-none">•</span>
              <span className="text-slate-900 font-bold">Integrate it</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
