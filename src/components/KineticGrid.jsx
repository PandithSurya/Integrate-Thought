import React, { useEffect, useRef } from 'react';

/**
 * KineticGrid Component
 * Physics grid canvas with section-specific solid logo color accents:
 * - Section 1 (Home): Solid Electric Cyan (#00b4d8) hover glow & laser ribbon.
 * - Section 2 (Purpose): Solid Logo Magenta (#ec4899) hover glow & laser ribbon.
 */
export default function KineticGrid({
  spacing = 64,
  dotSize = 2,
  gridStroke = 1,
  gridOpacity = 0.20,
  repulsion = 5,
  radius = 60,
  stiffness = 1.0,
  damping = 0.09,
  clickIntensity = 30,
  trailIntensity = 0.15,
  backgroundColor = '#050505',
  lineColor = '#262626',
  dotColor = '#404040',
  hoverColor = null,
  className = '',
}) {
  const canvasRef = useRef(null);

  // Section-specific solid logo colors (fallback for Home page)
  const SECTION_COLORS = {
    section1: [0, 180, 216],   // Solid Cyan (#00b4d8)
    section2: [236, 72, 153],  // Solid Logo Magenta (#ec4899)
  };

  const stateRef = useRef({
    nodes: [],
    cols: 0,
    rows: 0,
    mouse: { x: -1000, y: -1000, active: false },
    smoothMouse: { x: -1000, y: -1000 },
    laserPoints: [],
    pulses: [],
    animId: null,
    activeSectionColor: [0, 180, 216],
  });

  const parseColor = (colorStr) => {
    if (!colorStr) return [0, 180, 216, 1];
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = colorStr;
    const computed = ctx.fillStyle;
    
    if (computed.startsWith('#')) {
      const hex = computed.slice(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b, 1];
    } else if (computed.startsWith('rgb')) {
      const parts = computed.match(/\d+(\.\d+)?/g);
      if (parts) {
        return [
          parseFloat(parts[0]),
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parts[3] ? parseFloat(parts[3]) : 1,
        ];
      }
    }
    return [0, 180, 216, 1];
  };

  const interpolateToSolidColor = (baseRGBA, targetRGB, t, baseAlpha = 1) => {
    const clampedT = Math.min(Math.max(t, 0), 1);
    const r = Math.round(baseRGBA[0] + (targetRGB[0] - baseRGBA[0]) * clampedT);
    const g = Math.round(baseRGBA[1] + (targetRGB[1] - baseRGBA[1]) * clampedT);
    const b = Math.round(baseRGBA[2] + (targetRGB[2] - baseRGBA[2]) * clampedT);
    const alpha = (baseRGBA[3] + (1 - baseRGBA[3]) * clampedT) * baseAlpha;
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const parsedLine = parseColor(lineColor);
    const parsedDot = parseColor(dotColor);
    const parsedHover = hoverColor ? parseColor(hoverColor) : null;

    const initGrid = () => {
      const isSectionScoped = Boolean(className && className.includes('absolute') && canvas.parentElement);
      const width = isSectionScoped ? canvas.parentElement.clientWidth : window.innerWidth;
      const height = isSectionScoped ? canvas.parentElement.clientHeight : window.innerHeight;
      const isMobile = width < 640;
      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // On mobile, use wider spacing to reduce canvas nodes and draw calls for 60fps performance
      const effectiveSpacing = isMobile ? Math.max(100, spacing * 1.6) : Math.max(25, spacing);
      const cols = Math.ceil(width / effectiveSpacing) + 3;
      const rows = Math.ceil(height / effectiveSpacing) + 3;

      const offsetX = (width - (cols - 1) * effectiveSpacing) / 2;
      const offsetY = (height - (rows - 1) * effectiveSpacing) / 2;

      const nodes = [];
      for (let r = 0; r < rows; r++) {
        const rowNodes = [];
        for (let c = 0; c < cols; c++) {
          const targetX = offsetX + c * effectiveSpacing;
          const targetY = offsetY + r * effectiveSpacing;
          
          const existing = stateRef.current.nodes[r]?.[c];

          rowNodes.push({
            x: existing ? existing.x : targetX,
            y: existing ? existing.y : targetY,
            ox: targetX,
            oy: targetY,
            vx: existing ? existing.vx : 0,
            vy: existing ? existing.vy : 0,
            disp: existing ? existing.disp : 0,
          });
        }
        nodes.push(rowNodes);
      }

      stateRef.current.nodes = nodes;
      stateRef.current.cols = cols;
      stateRef.current.rows = rows;
    };

    initGrid();

    const handleResize = () => initGrid();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      stateRef.current.mouse.x = x;
      stateRef.current.mouse.y = y;
      stateRef.current.mouse.active = isInside;

      if (isInside) {
        const points = stateRef.current.laserPoints;
        const lastPt = points[points.length - 1];

        if (!lastPt || Math.hypot(x - lastPt.x, y - lastPt.y) > 2) {
          points.push({ x, y, time: performance.now() });
        }
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.mouse.active = false;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      stateRef.current.pulses.push({
        x,
        y,
        currentRadius: 0,
        maxRadius: Math.max(rect.width, rect.height) * 0.65,
        speed: 10 + (clickIntensity * 0.15),
        intensity: clickIntensity,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    let lastTime = performance.now();

    const animate = (now) => {
      const rawDt = (now - lastTime) / 1000;
      const dt = Math.min(rawDt, 0.033);
      lastTime = now;

      // Determine active section color (use page-specific hoverColor if provided, otherwise scroll transition)
      let activeColor;
      if (parsedHover) {
        activeColor = [parsedHover[0], parsedHover[1], parsedHover[2]];
      } else {
        const scrollY = window.scrollY;
        const scrollProgress = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 1.2)));

        const color1 = SECTION_COLORS.section1;
        const color2 = SECTION_COLORS.section2;

        activeColor = [
          Math.round(color1[0] + (color2[0] - color1[0]) * scrollProgress),
          Math.round(color1[1] + (color2[1] - color1[1]) * scrollProgress),
          Math.round(color1[2] + (color2[2] - color1[2]) * scrollProgress),
        ];
      }

      stateRef.current.activeSectionColor = activeColor;

      const isSectionScoped = Boolean(className && className.includes('absolute') && canvas.parentElement);
      const width = isSectionScoped ? canvas.parentElement.clientWidth : window.innerWidth;
      const height = isSectionScoped ? canvas.parentElement.clientHeight : window.innerHeight;
      const isMobile = width < 640;
      const { nodes, cols, rows, mouse, smoothMouse, laserPoints, pulses } = stateRef.current;

      const LASER_LIFESPAN = 380;
      while (laserPoints.length > 0 && now - laserPoints[0].time > LASER_LIFESPAN) {
        laserPoints.shift();
      }

      const lerpSpeed = Math.min(1, (1 - Math.min(0.9, trailIntensity * 0.8)) * 25 * dt);
      if (mouse.active) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * lerpSpeed;
        smoothMouse.y += (mouse.y - smoothMouse.y) * lerpSpeed;
      } else {
        smoothMouse.x += (-1000 - smoothMouse.x) * lerpSpeed;
        smoothMouse.y += (-1000 - smoothMouse.y) * lerpSpeed;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.currentRadius += p.speed;
        if (p.currentRadius > p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Physics integration pass (1 step on mobile for 60fps performance)
      const subSteps = isMobile ? 1 : 2;
      const subDt = dt / subSteps;

      for (let s = 0; s < subSteps; s++) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const node = nodes[r][c];

            const k = stiffness * 18;
            let fx = -k * (node.x - node.ox);
            let fy = -k * (node.y - node.oy);

            const mdx = node.x - smoothMouse.x;
            const mdy = node.y - smoothMouse.y;
            const distSq = mdx * mdx + mdy * mdy;

            if (distSq < radius * radius && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const normX = mdx / dist;
              const normY = mdy / dist;
              const ratio = 1 - dist / radius;
              const factor = ratio * ratio * (3 - 2 * ratio);
              const force = repulsion * factor * 80;
              fx += normX * force;
              fy += normY * force;
            }

            for (let pIdx = 0; pIdx < pulses.length; pIdx++) {
              const pulse = pulses[pIdx];
              const pdx = node.x - pulse.x;
              const pdy = node.y - pulse.y;
              const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
              const ringWidth = 60;

              const diff = Math.abs(pdist - pulse.currentRadius);
              if (diff < ringWidth && pdist > 0.1) {
                const ringFactor = Math.pow(1 - diff / ringWidth, 2);
                const falloff = Math.max(0, 1 - pulse.currentRadius / pulse.maxRadius);
                const shockForce = pulse.intensity * ringFactor * falloff * 60;
                fx += (pdx / pdist) * shockForce;
                fy += (pdy / pdist) * shockForce;
              }
            }

            const dampFactor = Math.pow(damping, subDt * 60);
            node.vx = (node.vx + fx * subDt) * dampFactor;
            node.vy = (node.vy + fy * subDt) * dampFactor;

            node.x += node.vx * subDt * 60;
            node.y += node.vy * subDt * 60;

            if (s === subSteps - 1) {
              const dxOrigin = node.x - node.ox;
              const dyOrigin = node.y - node.oy;
              node.disp = Math.sqrt(dxOrigin * dxOrigin + dyOrigin * dyOrigin);
            }
          }
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const cursorX = smoothMouse.x;
      const cursorY = smoothMouse.y;
      const torchRadius = Math.max(90, radius * 1.6);
      const [cr, cg, cb] = activeColor;

      // 1. Solid Section Color Torch Spotlight
      if (mouse.active || cursorX > -500) {
        const torchGrad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, torchRadius);
        torchGrad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.26)`);
        torchGrad.addColorStop(0.35, `rgba(${cr}, ${cg}, ${cb}, 0.12)`);
        torchGrad.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, 0.03)`);
        torchGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = torchGrad;
        ctx.arc(cursorX, cursorY, torchRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Horizontal Lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const n1 = nodes[r][c];
          const n2 = nodes[r][c + 1];

          const midX = (n1.x + n2.x) * 0.5;
          const midY = (n1.y + n2.y) * 0.5;
          const distToCursor = Math.hypot(midX - cursorX, midY - cursorY);

          const torchFactor = Math.max(0, 1 - distToCursor / torchRadius);
          const dispFactor = Math.min((n1.disp + n2.disp) * 0.04, 1);
          const t = Math.max(Math.pow(torchFactor, 1.8), dispFactor);

          ctx.beginPath();
          ctx.lineWidth = gridStroke + t * 0.6;
          ctx.strokeStyle = interpolateToSolidColor(parsedLine, activeColor, t, gridOpacity + t * 0.7);
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // 3. Vertical Lines
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols; c++) {
          const n1 = nodes[r][c];
          const n2 = nodes[r + 1][c];

          const midX = (n1.x + n2.x) * 0.5;
          const midY = (n1.y + n2.y) * 0.5;
          const distToCursor = Math.hypot(midX - cursorX, midY - cursorY);

          const torchFactor = Math.max(0, 1 - distToCursor / torchRadius);
          const dispFactor = Math.min((n1.disp + n2.disp) * 0.04, 1);
          const t = Math.max(Math.pow(torchFactor, 1.8), dispFactor);

          ctx.beginPath();
          ctx.lineWidth = gridStroke + t * 0.6;
          ctx.strokeStyle = interpolateToSolidColor(parsedLine, activeColor, t, gridOpacity + t * 0.7);
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // 4. Intersecting Dots
      if (dotSize > 0) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const node = nodes[r][c];
            const distToCursor = Math.hypot(node.x - cursorX, node.y - cursorY);
            const torchFactor = Math.max(0, 1 - distToCursor / torchRadius);
            const dispFactor = Math.min(node.disp * 0.04, 1);
            const t = Math.max(Math.pow(torchFactor, 1.8), dispFactor);

            const rDot = (dotSize * 0.5) + t * 1.0;

            ctx.beginPath();
            ctx.fillStyle = interpolateToSolidColor(parsedDot, activeColor, t, gridOpacity + 0.25 + t * 0.65);
            ctx.arc(node.x, node.y, rDot, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 5. Thinner & Shorter Solid Section Color Laser Ribbon Trail
      if (laserPoints.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < laserPoints.length; i++) {
          const pt1 = laserPoints[i - 1];
          const pt2 = laserPoints[i];
          const age = now - pt2.time;
          
          if (age < LASER_LIFESPAN) {
            const lifeRatio = 1 - (age / LASER_LIFESPAN);
            const progressRatio = i / laserPoints.length;
            
            const strokeAlpha = Math.pow(lifeRatio, 1.1) * Math.min(1, progressRatio + 0.2) * 0.9;
            const strokeWidth = (0.4 + progressRatio * 0.9) * lifeRatio;

            ctx.beginPath();
            ctx.lineWidth = Math.max(0.3, strokeWidth);
            ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${strokeAlpha.toFixed(3)})`;
            ctx.shadowColor = `rgba(${cr}, ${cg}, ${cb}, 0.8)`;
            ctx.shadowBlur = 4 * lifeRatio;
            
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      stateRef.current.animId = requestAnimationFrame(animate);
    };

    stateRef.current.animId = requestAnimationFrame(animate);

    return () => {
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [
    spacing,
    dotSize,
    gridStroke,
    gridOpacity,
    repulsion,
    radius,
    stiffness,
    damping,
    clickIntensity,
    trailIntensity,
    backgroundColor,
    lineColor,
    dotColor,
    hoverColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 block w-full h-full pointer-events-none z-0 ${className}`}
      style={{ backgroundColor }}
    />
  );
}
