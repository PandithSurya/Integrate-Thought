import type { Variants } from 'framer-motion';

/**
 * Shared Motion Variants & Configuration
 * Standardized across all section-level and component animations.
 */

// 1. fadeUp: Motion variants object
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 2. staggerContainer: Container variant orchestrating staggered child reveals
export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 3. viewportOnce: Standard viewport trigger configuration
export const viewportOnce = {
  once: true,
  margin: '-100px',
};

/**
 * Reduced Motion Helpers
 * Respects user preferences by skipping stagger/parallax and falling back to instant opacity/position.
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

export const staggerContainerReduced: Variants = {
  visible: {
    transition: {
      staggerChildren: 0,
    },
  },
};
