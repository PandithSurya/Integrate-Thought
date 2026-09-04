import React from 'react';
import { cn } from '@/lib/utils';

export function BorderBeam({
  className,
  size = 130,
  duration = 7,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#0284c7',
  colorTo = '#38bdf8',
  delay = 0,
}) {
  return (
    <div
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--anchor': `${anchor}%`,
        '--border-width': `${borderWidth}px`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': `-${delay}s`,
      }}
      className={cn('border-beam-container', className)}
    />
  );
}

export default BorderBeam;
