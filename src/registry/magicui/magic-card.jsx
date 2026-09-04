import React, { useCallback } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * MagicCard (MagicUI)
 * Interactive card component featuring a cursor-tracking radial spotlight/glow.
 * Optimized with Framer Motion motion values to eliminate React re-renders on mousemove.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 320,
  glowFrom = 'rgba(2, 132, 199, 0.12)',
  glowTo = 'rgba(56, 189, 248, 0.02)',
  ...props
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const isHovered = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    isHovered.set(1);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    isHovered.set(0);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY, isHovered]);

  const spotlightBackground = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${glowFrom} 0%, ${glowTo} 55%, transparent 100%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(${gradientSize * 0.8}px circle at ${mouseX}px ${mouseY}px, ${glowFrom} 0%, transparent 100%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative rounded-3xl overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle border spotlight tracking cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          background: borderSpotlight,
          opacity: isHovered,
        }}
      />

      {/* Interior cursor-tracking radial spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          background: spotlightBackground,
          opacity: isHovered,
        }}
      />

      {/* Card Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between space-y-6">
        {children}
      </div>
    </div>
  );
}

export default MagicCard;
