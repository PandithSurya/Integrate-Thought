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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white text-slate-950 select-none pointer-events-auto overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading Integrate Thought"
        >
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
            {/* HERO BRAIN LOGO MARK WITH SPECULAR SHINE ANIMATION */}
            <div className="relative flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Integrate Thought"
                className="h-28 sm:h-36 md:h-44 lg:h-48 w-auto aspect-[1536/1024] object-contain filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.08)] select-none"
                draggable={false}
              />

              {/* Pristine Specular Shine Sweep across the Brain Logo */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none animate-brain-shine" />
                </div>
              )}
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
                    color: currentVariant.color || '#0a0a0a',
                  }}
                  className={`brand-loader-text block text-center font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none whitespace-nowrap transition-colors duration-200 ${currentVariant.tracking}`}
                >
                  {currentVariant.text}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* OFFICIAL BRAND TAGLINE LOCKUP: THINK IT • BUILD IT • INTEGRATE IT */}
            <div className="mt-3 sm:mt-3.5 flex items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] select-none font-sans">
              <span className="text-slate-800 font-bold">Think it</span>
              <span className="text-slate-300 text-[9px] select-none">•</span>
              <span className="text-slate-800 font-bold">Build it</span>
              <span className="text-slate-300 text-[9px] select-none">•</span>
              <span className="text-slate-800 font-bold">Integrate it</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
