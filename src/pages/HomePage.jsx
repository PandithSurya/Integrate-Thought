import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Grid, ArrowUpRight, Globe, Cpu, Database, Bot } from 'lucide-react';
import KineticGrid from '../components/KineticGrid';
import { RadialScrollGallery } from '../components/ui/portfolio-and-image-gallery';
import { ProcessStageCard } from '../components/ui/process-stage-card';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import CompanyMarqueeBanner from '../components/CompanyMarqueeBanner';
import { StackedTestimonials } from '../components/StackedTestimonials';

const SERVICES_DATA = [
  {
    id: '01',
    tag: 'POPULAR',
    title: 'Web Design & Development',
    description: 'High-performance, responsive websites and web applications custom-built to elevate your brand, engage users, and drive measurable business growth.',
    bgClass: 'bg-[#c73827]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(199,56,39,0.35)]',
    icon: Globe,
  },
  {
    id: '02',
    tag: 'ENTERPRISE AI',
    title: 'AI Automation & Workflows',
    description: 'Streamline complex business processes, eliminate manual data entry, and integrate intelligent AI models directly into your enterprise software stack.',
    bgClass: 'bg-[#1351d8]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(19,81,216,0.35)]',
    icon: Cpu,
  },
  {
    id: '03',
    tag: 'ADVANCED AI',
    title: 'RAG Knowledge Systems',
    description: 'Connect AI models securely to your private company data, documents, and internal databases for fast, accurate, context-aware intelligence.',
    bgClass: 'bg-[#0e593c]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(14,89,60,0.35)]',
    icon: Database,
  },
  {
    id: '04',
    tag: '24/7 SUPPORT',
    title: 'Custom Autonomous AI Agents',
    description: 'Deploy 24/7 intelligent AI agents capable of handling customer support, qualifying leads, booking appointments, and triggering backend actions.',
    bgClass: 'bg-[#a82828]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(168,40,40,0.35)]',
    icon: Bot,
  },
];

const WORKS_DATA = [
  {
    id: 1,
    title: "WNB Barber",
    client: "WNB TURKISH BARBER",
    cat: "Grooming & Lifestyle",
    tagline: "Mastering Traditional Craft & Modern Grooming Artistry",
    img: "/Hero-Images/wnbturkish-hero.png",
    url: "https://wnbturkishbarber.netlify.app/",
    description: "A luxury digital experience designed for WNB Turkish Barber, offering seamless service selection, instant appointment bookings, and an interactive grooming portfolio showcasing traditional and modern hair artistry.",
  },
  {
    id: 2,
    title: "BRIM Burgers",
    client: "BRIM BURGERS",
    cat: "Halal F&B Franchise",
    tagline: "Multi-Location Franchise Platform & Gourmet Menu Engine",
    img: "/Hero-Images/brim-tawny-hero.png",
    url: "https://brim-tawny.vercel.app/franchise",
    description: "An immersive digital franchise hub and interactive menu engine built for BRIM Burgers, highlighting gourmet halal burgers, franchise inquiry pipelines, and location finders.",
  },
  {
    id: 3,
    title: "Sai Dental Clinic",
    client: "SAI DENTAL CLINIC",
    cat: "Clinical Healthcare",
    tagline: "High-Trust Clinical Healthcare & Patient Intake System",
    img: "/Hero-Images/dr-rathod-hero.png",
    url: "https://gorgeous-daffodil-31a9c9.netlify.app/",
    description: "A modern, empathetic healthcare web platform designed for Sai Dental Clinic to facilitate patient onboarding, virtual consultations, dental procedure breakdowns, and appointment scheduling.",
  },
  {
    id: 4,
    title: "Usy'z Blizers",
    client: "USY'Z BLIZERS",
    cat: "Apparel & Fashion",
    tagline: "Next-Gen Urban Streetwear E-Commerce & Lookbook",
    img: "/Hero-Images/usy'z-blizers-hero.png",
    url: "https://jazzy-pastelito-855f86.netlify.app/",
    description: "A visually striking streetwear e-commerce platform featuring dynamic product interaction, collection drop countdowns, and fluid micro-animations.",
  },
  {
    id: 5,
    title: "Mayavi Media",
    client: "MAYAVI MEDIA CREATIONS",
    cat: "Cinematic Media",
    tagline: "Where Vertical Video Meets Cinematic Production",
    img: "/Hero-Images/mayavi-mc-hero.png",
    url: "https://fancy-lokum-dfbfba.netlify.app/",
    description: "Next-gen creative media house producing high-impact vertical video campaigns, cinematic brand films, and viral storytelling content.",
  },
  {
    id: 6,
    title: "Old Glen Landscapes",
    client: "OLD GLEN LANDSCAPES",
    cat: "Exterior Studio",
    tagline: "Premium Landscape Architecture & Estate Project Hub",
    img: "/Hero-Images/old-glen-hero.png",
    url: "https://old-glen-landscapes.vercel.app/",
    description: "An elegant digital portfolio showcasing luxury residential landscaping, garden designs, stone masonry, and exterior living architectural projects.",
  },
  {
    id: 7,
    title: "VAMP Roofing",
    client: "VAMP ROOFING",
    cat: "Estate Roofing",
    tagline: "Industrial & Residential Commercial Roofing Engine",
    img: "/Hero-Images/roof-nu-hero.png",
    url: "https://roof-nu.vercel.app/",
    description: "A high-converting roofing contractor platform engineered for instant quote estimates, storm damage inspection booking, and structural warranty management.",
  },
  {
    id: 8,
    title: "AVS Hospitals",
    client: "AVS HOSPITALS HMSS",
    cat: "Enterprise HMSS",
    tagline: "Hospital Management & Patient Record System",
    img: "/Hero-Images/avs-hospitals-hero.png",
    url: "https://avs-hospitals-hmss.vercel.app/",
    description: "An enterprise-grade Healthcare Management System Interface for hospital networks, simplifying doctor scheduling, bed availability tracking, and online diagnostic booking.",
  },
  {
    id: 9,
    title: "BRIM Demo",
    client: "BRIM BURGERS DEMO",
    cat: "Canvas Scroll & Halal F&B",
    tagline: "Interactive 3D Canvas Scroll & Culinary Experience",
    img: "/Hero-Images/brim-burgers-hero.png",
    url: "https://jay0073.github.io/brim-demo/",
    description: "An experimental web experience utilizing canvas frame sequence scroll, interactive product exploded views, and micro-interactions for culinary branding.",
  }
];

const PROCESS_STAGES_DATA = [
  {
    id: 1,
    title: 'Green compliance',
    description: 'We help organizations meet environmental standards and secure recognized certifications.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Environment assurance',
    description: 'We support businesses in validating their sustainability practices through formal certification.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Responsible operations',
    description: 'We guide companies to align with sustainability benchmarks and industry certifications.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Impact-driven standards',
    description: 'We assist businesses in proving their environmental responsibility with trusted certifications.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomePage({ onNavigate }) {
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [selectedStageModal, setSelectedStageModal] = useState(null);

  const heroText = "Integrate Thought";

  const updateTargetProgress = (delta) => {
    targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
  };

  useEffect(() => {
    // Lock body scrolling to enable silky smooth scroll animation timeline
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    // Wheel event handler updating target progress
    const handleWheel = (e) => {
      const sensitivity = e.deltaY < 0 ? 0.00045 : 0.00035;
      updateTargetProgress(e.deltaY * sensitivity);
    };

    // Touch support tuned specifically for controlled, smooth mobile responsiveness
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    };
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;

      const diffY = touchStartY - touchY;
      const diffX = touchStartX - touchX;

      touchStartY = touchY;
      touchStartX = touchX;

      // Ignore horizontal swiping over galleries/carousels
      if (Math.abs(diffX) > Math.abs(diffY) * 1.2) {
        return;
      }

      // Controlled touch multiplier: smooth, gradual progress per touch drag
      const isMobile = window.innerWidth < 640;
      const multiplier = isMobile ? (diffY < 0 ? 0.00035 : 0.00028) : (diffY < 0 ? 0.00045 : 0.00035);
      updateTargetProgress(diffY * multiplier);
    };

    // Keyboard arrow navigation
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        updateTargetProgress(0.04);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateTargetProgress(-0.04);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Controlled Lerp Loop (Smooth 60fps physics, avoiding micro re-renders on mobile)
    let animId;
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      const isMobile = window.innerWidth < 640;
      const threshold = isMobile ? 0.00015 : 0.00003;
      if (Math.abs(diff) > threshold) {
        const lerpFactor = isMobile ? 0.12 : 0.14;
        currentProgressRef.current += diff * lerpFactor;
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      document.documentElement.style.overscrollBehavior = 'auto';
      cancelAnimationFrame(animId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // --------------------------------------------------------------------------
  // OVERLAPPING ANIMATION TIMELINE (0.00 -> 1.00)
  // --------------------------------------------------------------------------

  // Phase 1: Hero Logo & Title (0.00 -> 0.16)
  const heroOpacity = Math.max(0, 1 - progress / 0.14);
  const heroScale = 1 - progress * 0.15;
  const heroTranslateY = -progress * 90;

  // Phase 2: Our Purpose (0.10 -> 0.28)
  let purposeOpacity = 0;
  if (progress >= 0.10 && progress <= 0.18) {
    purposeOpacity = Math.min(1, (progress - 0.10) / 0.08);
  } else if (progress > 0.18 && progress <= 0.28) {
    purposeOpacity = Math.max(0, 1 - (progress - 0.18) / 0.10);
  }
  const purposeTranslateY = progress < 0.18 ? Math.max(0, (0.18 - progress) * 120) : 0;

  // Phase 3: White Sheet Overlay for Services Cards Deck (0.20 -> 0.52)
  const whiteSheetP = Math.min(1, Math.max(0, (progress - 0.20) / 0.08));
  const deckProgress = Math.min(1, Math.max(0, (progress - 0.26) / 0.24));

  // Continuous page transitions between sections
  const phase4TransitionP = Math.min(1, Math.max(0, (progress - 0.46) / 0.08));
  const phase5TransitionP = Math.min(1, Math.max(0, (progress - 0.60) / 0.08));
  const phase6TransitionP = Math.min(1, Math.max(0, (progress - 0.72) / 0.10));
  const tailProgress = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));

  // Document continuation translates
  const whiteSheetTranslateY = (1 - whiteSheetP) * 100 - phase4TransitionP * 100;
  const worksSheetTranslateY = (1 - phase4TransitionP) * 100 - phase5TransitionP * 100;
  const processSheetTranslateY = (1 - phase5TransitionP) * 100 - phase6TransitionP * 100;
  const tailSheetTranslateY = (1 - phase6TransitionP) * 100;
  const tailInnerTranslateY = -tailProgress * 16;

  // Wheel rotation animation phase: 0.46 -> 0.66
  const phase4Progress = Math.min(1, Math.max(0, (progress - 0.46) / 0.20));

  const handleNavClick = (link) => {
    if (link === 'Home') {
      targetProgressRef.current = 0;
      return;
    }
    if (onNavigate) {
      onNavigate(link);
    }
  };

  const handleScrollPrompt = () => {
    targetProgressRef.current = 0.18;
  };

  const handleProposalClick = (title) => {
    alert(`Initiated project proposal request for "${title}".`);
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 bg-[#050505] text-white select-none font-sans">
      
      {/* Universal Fixed Adaptive Navbar Header */}
      <Navbar progress={progress} onNavigate={handleNavClick} activePage="Home" />

      {/* Interactive Kinetic Grid Canvas at z-0 */}
      <KineticGrid
        spacing={64}
        dotSize={2}
        gridStroke={1}
        gridOpacity={0.20}
        repulsion={5}
        radius={60}
        stiffness={1.0}
        damping={0.09}
        clickIntensity={30}
        trailIntensity={0.15}
        backgroundColor="#050505"
        lineColor="#262626"
        dotColor="#404040"
      />

      {/* ================================================================== */}
      {/* PHASE 1: HERO LOGO & TITLE                                         */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto"
      >
        {/* Static Brain Logo */}
        <div className="mb-6 sm:mb-8 pointer-events-none">
          <img
            src="/logo.png"
            alt="Integrate Thought Logo"
            className="w-40 sm:w-56 md:w-64 lg:w-[340px] h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Title - Single Line Non-wrapping Layout */}
        <h1 className="group whitespace-nowrap text-[22px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter sm:tracking-tight text-white transition-all duration-300">
          <span className="inline-flex justify-center">
            {heroText.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block cursor-pointer transition-all duration-200 ease-out hover:scale-115 hover:-translate-y-2.5 hover:text-[#00b4d8]"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.03}s both`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Scroll Prompt Button */}
        <button
          onClick={handleScrollPrompt}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-opacity cursor-pointer z-20 pointer-events-auto active:scale-95"
          title="Scroll to Our Purpose"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* ================================================================== */}
      {/* PHASE 2: OUR PURPOSE                                               */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: purposeOpacity,
          transform: `translate3d(0, ${purposeTranslateY}px, 0)`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-16 md:px-24 max-w-7xl mx-auto pointer-events-auto z-10 pt-20 sm:pt-24 pb-10"
      >
        {/* Top Tagline + Massive Bold Heading */}
        <div className="max-w-5xl">
          <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-slate-400 uppercase mb-4 sm:mb-6">
            DIGITAL EXPERIENCE &bull; GROWTH &bull; AI & AUTOMATION &bull; TECHNOLOGY &bull; DATA
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[84px] font-extrabold tracking-tight leading-[0.98] text-white uppercase font-sans">
            BUILDING DIGITAL <br />
            SYSTEMS THAT <br />
            MOVE BUSINESSES <br />
            <span className="text-[#00b4d8]">
              FORWARD.
            </span>
          </h2>
        </div>

        {/* Bottom Row: Subtext & Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-md font-sans">
            Digital experiences, AI and automation designed to help businesses attract customers, streamline operations and scale.
          </p>

          <div className="flex items-center gap-3.5 shrink-0">
            <button
              onClick={() => alert("Initiating project consultation with Integrate Thought.")}
              className="px-6 py-3 rounded-md bg-[#48a9dc] hover:bg-[#3898cb] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
            >
              Start a Project
            </button>

            <button
              onClick={() => {
                targetProgressRef.current = 0.54;
              }}
              className="px-6 py-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/25 hover:border-white/50 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer font-sans"
            >
              Explore Our Work
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* PHASE 3: STACKED SERVICES CARDS DECK (White Sheet Overlay)         */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${whiteSheetTranslateY}vh, 0)`,
          pointerEvents: whiteSheetP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between z-20 pointer-events-auto overflow-hidden"
      >
        <div className="w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center pt-5 sm:pt-8 px-4 sm:px-8 my-auto">
          
          {/* Section Header */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-3 sm:mb-8 shrink-0 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-mono font-semibold tracking-widest text-slate-600 uppercase mb-1 sm:mb-2">
                03 / OUR SERVICES
              </div>
              <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                Architecting High-Impact Systems
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-[11px] sm:text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards Deck Container (Resized Smaller for Mobile Viewport) */}
          <div className="relative w-full h-[350px] sm:h-[480px]">
            {SERVICES_DATA.map((service, index) => {
              let cardP = 1;
              if (index > 0) {
                const cardStep = 0.22;
                const startP = (index - 1) * cardStep + 0.10;
                const endP = startP + cardStep;
                const rawP = Math.min(1, Math.max(0, (deckProgress - startP) / (endP - startP)));
                cardP = 1 - Math.pow(1 - rawP, 3);
              }

              const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
              const stackedTop = index * (isMobile ? 22 : 24);
              const zIndex = 10 + index * 10;
              const translateY = index === 0 ? 0 : (1 - cardP) * (isMobile ? 260 : 700);
              const scale = index === 0 ? 1 : (isMobile ? 0.97 + cardP * 0.03 : 0.94 + cardP * 0.06);
              const opacity = index === 0 ? 1 : Math.min(1, cardP * 2.2);

              const IconComponent = service.icon || Globe;

              return (
                <div
                  key={service.id}
                  style={{
                    top: `${stackedTop}px`,
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute inset-x-0 rounded-[20px] sm:rounded-[32px] ${service.bgClass} ${service.shadowStyle} text-white p-3.5 sm:p-9 md:p-10 border border-white/20 transition-transform duration-75 max-h-[220px] sm:max-h-none flex flex-col justify-between overflow-hidden`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-center h-full">
                    
                    {/* Left Text Column */}
                    <div className="sm:col-span-8 flex flex-col justify-between h-full space-y-1.5 sm:space-y-4">
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-white">
                          {service.tag}
                        </span>
                        <span className="sm:hidden text-[10px] font-mono font-bold text-white/80">
                          0{index + 1} / 04
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-white/90 text-[11px] sm:text-sm leading-snug font-normal line-clamp-2 sm:line-clamp-none">
                        {service.description}
                      </p>

                      <div className="pt-0.5 sm:pt-2">
                        <button
                          onClick={() => handleProposalClick(service.title)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-[10px] sm:text-xs transition-all backdrop-blur-md border border-white/30 cursor-pointer active:scale-95"
                        >
                          <span>Request Proposal</span>
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Vector Icon Frame */}
                    <div className="hidden sm:flex sm:col-span-4 items-center justify-center p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl aspect-square max-h-[170px] mx-auto shadow-inner">
                      <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-2xl ring-4 ring-white/30">
                        <IconComponent className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={1.75} />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* PHASE 4: FEATURED CLIENT WORKS SECTION                             */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${worksSheetTranslateY}vh, 0)`,
          pointerEvents: phase4TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f4f7fa] text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col justify-between p-4 sm:p-8 z-30 pointer-events-auto overflow-visible"
      >
        {/* Header */}
        <div className="w-full max-w-5xl mx-auto pt-10 sm:pt-14 shrink-0 z-40 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase mb-1.5">
              FEATURED WORK
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-2 font-sans">
              Work that moves <br className="hidden sm:inline" />
              the needle.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium tracking-normal max-w-md font-sans leading-relaxed">
              Long-term engagements where design, engineering and automation shipped together.
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('Works');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <span>View All Works</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MOBILE VIEW: SIDE-BY-SIDE HORIZONTAL CARDS TRACK (sm:hidden) */}
        <div className="w-full flex sm:hidden overflow-x-auto gap-4 px-4 py-4 snap-x snap-mandatory no-scrollbar touch-pan-x my-auto">
          {WORKS_DATA.map((work) => (
            <div
              key={work.id}
              onClick={() => {
                if (work.url && work.url !== '#') {
                  window.open(work.url, '_blank');
                } else {
                  alert(`Exploring case study for "${work.title}".`);
                }
              }}
              className="shrink-0 snap-center w-[250px] h-[330px] relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-xl active:scale-95 transition-transform cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={work.img}
                  alt={work.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 text-slate-950 font-bold text-[10px] shadow-md font-sans">
                    {work.cat}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold leading-tight text-white font-sans drop-shadow-md">
                    {work.title}
                  </h3>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 text-slate-950 font-bold text-[10px] shadow-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b70b2]" />
                      <span>Detailed Case Study</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: RADIAL SCROLL GALLERY COMPONENT (hidden sm:flex) */}
        <div className="hidden sm:flex w-full flex-1 relative items-center justify-center my-auto overflow-visible">
          <RadialScrollGallery
            className="!min-h-[360px] sm:!min-h-[460px] md:!min-h-[520px] w-full overflow-visible"
            baseRadius={380}
            mobileRadius={200}
            visiblePercentage={50}
            rotationProgress={phase4Progress}
            scrollDuration={2000}
            onItemSelect={(index) => {
              const work = WORKS_DATA[index];
              if (work && work.url && work.url !== '#') {
                window.open(work.url, '_blank');
              } else if (work) {
                alert(`Exploring case study for "${work.title}".`);
              }
            }}
          >
            {(hoveredIndex) =>
              WORKS_DATA.map((work, index) => {
                const isActive = hoveredIndex === index;
                return (
                  <div
                    key={work.id}
                    className="group relative w-[200px] h-[280px] sm:w-[245px] sm:h-[335px] md:w-[275px] md:h-[375px] overflow-hidden rounded-[20px] sm:rounded-[26px] bg-slate-900 border border-slate-700/50 shadow-[0_22px_55px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={work.img}
                        alt={work.title}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                          isActive ? 'scale-110 blur-0' : 'scale-100 blur-[0.5px]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-4.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-slate-950 font-bold text-[9px] sm:text-[11px] tracking-tight shadow-md font-sans">
                          {work.cat}
                        </span>
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1e3a8a]/90 text-white flex items-center justify-center transition-all duration-300 shadow-lg ${isActive ? 'scale-110 bg-[#3b70b2]' : 'opacity-80'}`}>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-sm sm:text-lg md:text-xl font-extrabold leading-tight text-white font-sans drop-shadow-md">
                          {work.title}
                        </h3>
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur text-slate-950 font-bold text-[9px] sm:text-[11px] shadow-lg transition-all font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b70b2]" />
                            <span>Detailed Case Study</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </RadialScrollGallery>
        </div>
      </div>

      {/* ================================================================== */}
      {/* PHASE 5: OUR PROCESS SECTION                                       */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${processSheetTranslateY}vh, 0)`,
          pointerEvents: phase5TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f5f3ec] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-4 sm:p-8 z-40 pointer-events-auto overflow-hidden select-none"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-full py-8 sm:py-12 my-auto">
          {/* Header */}
          <div className="w-full max-w-5xl mx-auto text-center shrink-0 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-300/80 text-slate-700 text-[11px] font-mono font-semibold tracking-widest uppercase mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              <span>05 / OUR PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 font-sans">
              Our Operating Standards
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium tracking-normal max-w-lg mx-auto font-sans leading-relaxed">
              Battle-tested frameworks designed to align operations, validate technical benchmarks, and drive measurable impact.
            </p>
          </div>

          {/* MOBILE VIEW: SIDE-BY-SIDE HORIZONTAL SWIPE TRACK (sm:hidden) */}
          <div className="w-full flex sm:hidden overflow-x-auto gap-4 px-4 py-2 snap-x snap-mandatory no-scrollbar touch-pan-x my-auto">
            {PROCESS_STAGES_DATA.map((stage, idx) => (
              <div key={stage.id} className="shrink-0 snap-center w-[250px]">
                <ProcessStageCard
                  stage={stage}
                  index={idx}
                  onSelect={(stg) => setSelectedStageModal(stg)}
                />
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: 4-COLUMN GRID (hidden sm:grid) */}
          <div className="hidden sm:grid w-full max-w-6xl mx-auto py-2 sm:py-4 grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center items-stretch">
            {PROCESS_STAGES_DATA.map((stage, idx) => (
              <ProcessStageCard
                key={stage.id}
                stage={stage}
                index={idx}
                onSelect={(stg) => setSelectedStageModal(stg)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* PHASE 6: TESTIMONIALS, MARQUEE BANNER & TAIL FOOTER SHEET        */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${tailSheetTranslateY}vh, 0)`,
          pointerEvents: phase6TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.15)] flex flex-col justify-between z-50 pointer-events-auto overflow-hidden select-none"
      >
        <div
          style={{
            transform: `translate3d(0, ${tailInnerTranslateY}vh, 0)`,
            willChange: 'transform',
          }}
          className="w-full flex flex-col justify-between min-h-full"
        >
          {/* 1. STACKED TESTIMONIALS CAROUSEL */}
          <div className="w-full pt-4 sm:pt-8 pb-2">
            <StackedTestimonials />
          </div>

          {/* 2. MARQUEE BANNER & FOOTER */}
          <div className="w-full shrink-0 bg-white text-slate-900">
            <CompanyMarqueeBanner />
            <Footer onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      {/* Operating Standards Detail Modal */}
      {selectedStageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
            <button
              onClick={() => setSelectedStageModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-bold text-sm"
            >
              ✕
            </button>
            <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest mb-2">
              OPERATING STANDARD 0{selectedStageModal.id}
            </div>
            <h3 className="text-2xl font-black text-slate-950 mb-3 font-sans">
              {selectedStageModal.title}
            </h3>
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
              <img
                src={selectedStageModal.image}
                alt={selectedStageModal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
              {selectedStageModal.description}
            </p>
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-blue-900 text-xs font-medium space-y-1 font-sans">
              <div className="font-bold uppercase tracking-wider text-[11px] text-blue-700">Verification Standard</div>
              <div>Audited annually by Integrate Thought Quality &amp; Compliance Team.</div>
            </div>
            <button
              onClick={() => setSelectedStageModal(null)}
              className="w-full mt-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer font-sans"
            >
              Close Operating Standard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
