import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

export const LenisContext = createContext({
  lenis: null,
  isReducedMotion: false,
});

export const useLenis = () => useContext(LenisContext);

/**
 * Global SmoothScrollProvider
 * Initializes Lenis smooth scrolling for normal users.
 * Strictly respects prefers-reduced-motion: disables Lenis completely and
 * falls back to native instant scrolling when reduced motion is preferred.
 */
export default function SmoothScrollProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const [isReduced, setIsReduced] = useState(false);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionMode = () => {
      const prefersReduced = mediaQuery.matches;
      setIsReduced(prefersReduced);

      if (prefersReduced) {
        // Disable and tear down Lenis if active
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          setLenisInstance(null);
          if (typeof window !== 'undefined' && window.lenis) {
            delete window.lenis;
          }
        }
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        // Initialize Lenis smooth scroll for standard users
        if (!lenisRef.current) {
          const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
          });

          lenisRef.current = lenis;
          setLenisInstance(lenis);
          if (typeof window !== 'undefined') {
            window.lenis = lenis;
          }

          const raf = (time) => {
            lenis.raf(time);
            rafIdRef.current = requestAnimationFrame(raf);
          };
          rafIdRef.current = requestAnimationFrame(raf);
        }
      }
    };

    updateMotionMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMotionMode);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMotionMode);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMotionMode);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateMotionMode);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (typeof window !== 'undefined' && window.lenis) {
        delete window.lenis;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, isReducedMotion: isReduced }}>
      {children}
    </LenisContext.Provider>
  );
}
