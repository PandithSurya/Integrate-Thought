import React, { useEffect, useRef } from 'react';

export const ROW_1_BRANDS = [
  { id: 'immitrics', name: 'Immitrics', image: '/brand-logos/immitrics-lockup.png' },
  { id: 'pioneer-hospitals', name: 'Pioneer Hospitals', image: '/brand-logos/pioneer.png' },
  { id: 'avs-hospital', name: 'AVS Hospital', image: '/brand-logos/avs-hospital.png' },
  { id: 'sri-sai-nethralaya', name: 'Sri Sai Nethrayala', image: '/brand-logos/sri-sai-nethralaya-contrast.png' },
  { id: 'kashvi-hospital', name: 'Kashvi Hospital', image: '/brand-logos/kashvi-hospital.png' },
  { id: 'new-central-school', name: 'New Central School', image: '/brand-logos/new-central-school.png', isCircular: true },
];

export const ROW_2_BRANDS = [
  { id: 'integrated-learning-academy', name: 'Integrated Learning Academy', image: '/brand-logos/integrated-learning-academy.webp', isCircular: true },
  { id: 'rrr-jewellery', name: 'RRR Jewellery', image: '/brand-logos/rrr-jewellery-contrast.png', isCircular: true },
  { id: 'learneefy', name: 'Learneefy', image: '/brand-logos/learneefy.webp' },
  { id: 'old-glen-landscapes', name: 'Old Glen Landscapes', image: '/brand-logos/old-glen-landscapes.jpg', isCircular: true },
  { id: 'mayavi-media', name: 'Mayavi Media Creations', image: '/brand-logos/mayavi-media-dark-text.png' },
];

export default function BrandsTrustUsSection({ progress = 0, isMobile = false }) {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const targetShiftRef = useRef(0);
  const currentShiftRef = useRef(0);
  const animRunningRef = useRef(false);

  // Update target shift directly from scroll without triggering any React re-renders
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const y = window.scrollY || 0;
        targetShiftRef.current = y * 0.35;
        startLoop();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Desktop: driven by timeline progress
      targetShiftRef.current = progress * 550;
      startLoop();
    }
  }, [progress, isMobile]);

  // High-performance direct DOM rAF loop that automatically sleeps when settled
  const startLoop = () => {
    if (animRunningRef.current) return;
    animRunningRef.current = true;

    const tick = () => {
      const diff = targetShiftRef.current - currentShiftRef.current;
      if (Math.abs(diff) > 0.08) {
        currentShiftRef.current += diff * 0.14;
        const s = currentShiftRef.current;

        // Directly update DOM transform - zero React re-render overhead
        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${-s}px, 0, 0)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${s}px, 0, 0)`;
        }
        requestAnimationFrame(tick);
      } else {
        currentShiftRef.current = targetShiftRef.current;
        const s = currentShiftRef.current;
        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${-s}px, 0, 0)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${s}px, 0, 0)`;
        }
        animRunningRef.current = false;
      }
    };
    requestAnimationFrame(tick);
  };

  const renderBrandCard = (brand, uniqueKey) => (
    <div
      key={uniqueKey}
      className="w-[210px] sm:w-[250px] md:w-[270px] h-[84px] sm:h-[96px] px-6 py-3 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex items-center justify-center shrink-0 cursor-default select-none"
    >
      <img
        src={brand.image}
        alt={brand.name}
        className={`w-auto h-auto ${
          brand.isCircular
            ? 'max-h-[58px] sm:max-h-[68px]'
            : 'max-h-[44px] sm:max-h-[52px]'
        } max-w-[88%] object-contain pointer-events-none transition-transform duration-200`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/logo.png';
        }}
      />
    </div>
  );

  // Repeat items to ensure track is sufficiently wide for seamless 60fps infinite marquee
  const row1Items = [...ROW_1_BRANDS, ...ROW_1_BRANDS];
  const row2Items = [...ROW_2_BRANDS, ...ROW_2_BRANDS];

  return (
    <section
      id="brands-trust-us-section"
      className="w-full bg-white text-slate-950 font-sans py-10 sm:py-14 overflow-hidden select-none"
      style={{ contain: 'layout paint' }}
    >
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-8 sm:mb-10 text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00b4d8] shadow-[0_0_8px_#00b4d8]" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">
            INTEGRATE THOUGHT NETWORK
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
          Brands that trust us
        </h2>
      </div>

      {/* Dual Horizontal Bars Container */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
        
        {/* Subtle Side Gradient Feather Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

        {/* BAR 1 (Top Bar: Moves Towards LEFT, accelerates leftward on scroll down) */}
        <div className="w-full overflow-hidden">
          <div ref={row1Ref} className="w-full will-change-transform">
            <div className="flex w-max animate-marquee-left items-center gap-4 sm:gap-6 will-change-transform">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {row1Items.map((brand, bIdx) =>
                    renderBrandCard(brand, `b1-l${loopIdx}-${brand.id}-${bIdx}`)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAR 2 (Bottom Bar: Moves Towards RIGHT, accelerates rightward on scroll down) */}
        <div className="w-full overflow-hidden">
          <div ref={row2Ref} className="w-full will-change-transform">
            <div className="flex w-max animate-marquee-right items-center gap-4 sm:gap-6 will-change-transform">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {row2Items.map((brand, bIdx) =>
                    renderBrandCard(brand, `b2-l${loopIdx}-${brand.id}-${bIdx}`)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
