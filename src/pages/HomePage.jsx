import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Grid, ArrowUpRight, Globe, Cpu, Database, Bot } from 'lucide-react';
import KineticGrid from '../components/KineticGrid';
import { RadialScrollGallery } from '../components/ui/portfolio-and-image-gallery';
import { Badge } from '../components/ui/badge';
import { ProcessStageCard } from '../components/ui/process-stage-card';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import CompanyMarqueeBanner from '../components/CompanyMarqueeBanner';
import { submitInquiry } from '../utils/inquiryHandler';

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
    challenge: "Legacy phone-based booking system caused long wait times, scheduling conflicts, and poor online brand visibility among young urban professionals.",
    solution: "Designed a high-converting web app featuring interactive service menus, automated time-slot reservations, real-time barber availability, and high-contrast aesthetic UI.",
    services: ["UI/UX Design", "Full-Stack Web App", "Booking Engine Integration", "Brand Identity"],
    results: [
      { value: "3.8×", label: "Online Bookings Surge" },
      { value: "4.9 ★", label: "Client Satisfaction" },
      { value: "65%", label: "Reduced Wait Times" }
    ]
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
    challenge: "Fragmented franchise applications and outdated online menus limited brand expansion across UK and international markets.",
    solution: "Built a high-velocity franchise portal complete with financial calculators, interactive location maps, streamlined franchise application workflows, and mouth-watering visual menus.",
    services: ["Franchise Web Portal", "Interactive Menu Design", "Lead Generation System", "Performance Optimization"],
    results: [
      { value: "250+", label: "Franchise Inquiries / Mo" },
      { value: "4.2×", label: "Conversion Rate" },
      { value: "<1.2s", label: "Page Load Speed" }
    ]
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
    challenge: "High patient drop-off rates on mobile and difficulty explaining complex dental treatments clearly to prospective patients.",
    solution: "Created a clean, HIPAA-conscious responsive portal with visual treatment guides, before-and-after smile galleries, and 1-click WhatsApp/Online booking integrations.",
    services: ["Healthcare Portal", "Patient UX", "Appointment Automation", "SEO Optimization"],
    results: [
      { value: "100%", label: "Mobile Optimized" },
      { value: "3.5×", label: "New Patient Intake" },
      { value: "98%", label: "Positive Feedback" }
    ]
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
    challenge: "Mobile shoppers bounced due to slow loading lookbooks and clunky checkout steps on standard template platforms.",
    solution: "Engineered a custom high-performance storefront with ultra-fast page transitions, interactive product lookbooks, and frictionless cart drawer interactions.",
    services: ["E-Commerce UX", "Motion Design", "Frontend Development", "Custom Cart Flow"],
    results: [
      { value: "4.5×", label: "Session Duration" },
      { value: "82%", label: "Checkout Completion" },
      { value: "60fps", label: "Fluid Animation Rate" }
    ]
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
    challenge: "Demonstrating immersive video portfolios across desktop and mobile viewports without sacrificing video playback speed.",
    solution: "Delivered an immersive media platform with full-bleed vertical video previews, dynamic campaign analytics, and brand booking.",
    services: ["Cinematic Video", "Vertical Content", "Brand Campaigns", "Creative Production"],
    results: [
      { value: "10M+", label: "Organic views delivered" },
      { value: "4.8×", label: "Brand engagement surge" },
      { value: "100%", label: "Campaign delivery rate" }
    ]
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
    challenge: "High-value homeowners couldn't visualize scope or craftsmanship through low-res gallery photos.",
    solution: "Crafted an editorial-style project showcase featuring high-definition interactive before/after sliders, material breakdown cards, and consultation request pipelines.",
    services: ["Editorial Web Design", "Before/After Visualizers", "Lead Acquisition", "Content Architecture"],
    results: [
      { value: "4.8×", label: "High-Ticket Lead Growth" },
      { value: "94%", label: "User Engagement" },
      { value: "$50k+", label: "Avg Project Value" }
    ]
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
    challenge: "Slow response times on estimate requests caused lost deals to regional competitors.",
    solution: "Implemented an instant 60-second online quote estimator, storm repair emergency portal, and interactive roofing material selector.",
    services: ["Instant Estimator Engine", "Lead Automation", "Local SEO Dominance", "Responsive Web App"],
    results: [
      { value: "5.2×", label: "Quote Request Growth" },
      { value: "<2 min", label: "Lead Response Time" },
      { value: "#1", label: "Local Search Ranking" }
    ]
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
    challenge: "Fragmented legacy hospital software caused registration bottlenecks and delayed critical patient admissions.",
    solution: "Designed a modern, unified HMSS dashboard suite with real-time OPD booking, emergency triage status displays, and digital health records access.",
    services: ["Enterprise Systems UI", "Healthcare UX", "Real-Time Sync", "Role-Based Access Control"],
    results: [
      { value: "99.9%", label: "Uptime & Reliability" },
      { value: "40%", label: "Faster Patient Intake" },
      { value: "10k+", label: "Daily Active Users" }
    ]
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
    challenge: "Standard static web menus failed to deliver memorable visual impact or convey fresh ingredient quality.",
    solution: "Built a scroll-driven canvas animation engine that unrolls burger layers, sauce drips, and ingredient freshness cards as the user scrolls.",
    services: ["Canvas Scroll Engine", "3D Frame Sequence", "GSAP ScrollTrigger", "Interactive Branding"],
    results: [
      { value: "60fps", label: "Smooth Scroll Rate" },
      { value: "5.0×", label: "Brand Recall Rate" },
      { value: "100%", label: "WebGL/Canvas Optimized" }
    ]
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

  const heroText = "Integrate Thought";

  const updateTargetProgress = (delta) => {
    targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
  };

  useEffect(() => {
    // Lock body scrolling so viewport is 100% fixed
    document.body.style.overflow = 'hidden';

    // Wheel event handler updating target progress (reduced for smooth slow scrolling)
    const handleWheel = (e) => {
      const sensitivity = 0.00015;
      updateTargetProgress(e.deltaY * sensitivity);
    };

    // Touch support for mobile & touchpad gestures
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 1.5;
      touchStartY = touchY;
      updateTargetProgress(deltaY * 0.0003);
    };

    // Keyboard arrow navigation
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        updateTargetProgress(0.03);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateTargetProgress(-0.03);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Silky Smooth requestAnimationFrame Physics Lerp Loop (0.05 lerp for weighted luxury feel)
    let animId;
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.05;
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      document.body.style.overflow = 'auto';
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

  // Phase 3: White Sheet Overlay for Services Cards Deck (0.22 -> 0.50)
  const whiteSheetP = Math.min(1, Math.max(0, (progress - 0.22) / 0.08));
  const deckProgress = Math.min(1, Math.max(0, (progress - 0.28) / 0.20));

  // Continuous page transitions between sections
  const phase4TransitionP = Math.min(1, Math.max(0, (progress - 0.44) / 0.08));
  const phase5TransitionP = Math.min(1, Math.max(0, (progress - 0.64) / 0.08));
  const phase6TransitionP = Math.min(1, Math.max(0, (progress - 0.84) / 0.08));

  // Natural document continuation translates (Section N pushes Section N-1 UP)
  const whiteSheetTranslateY = (1 - whiteSheetP) * 100 - phase4TransitionP * 100;
  const worksSheetTranslateY = (1 - phase4TransitionP) * 100 - phase5TransitionP * 100;
  const processSheetTranslateY = (1 - phase5TransitionP) * 100 - phase6TransitionP * 100;
  const contactSheetTranslateY = (1 - phase6TransitionP) * 100;

  // Phase 6 internal momentum scroll: disabled in favor of natural overflow-y-auto scrolling for 100% form accessibility
  const contactContentTranslateY = 0;

  // Wheel rotation animation phase: 0.44 -> 0.64
  const phase4Progress = Math.min(1, Math.max(0, (progress - 0.44) / 0.20));

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

  const handleShowAllWorks = () => {
    alert("Showing full case studies & client portfolio catalog.");
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
            className="w-44 sm:w-60 md:w-72 lg:w-[340px] h-auto object-contain"
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-opacity cursor-pointer z-20 pointer-events-auto"
          title="Scroll to Our Purpose"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>


      {/* ================================================================== */}
      {/* PHASE 2: OUR PURPOSE (PERFECTLY VERTICALLY CENTERED)              */}
      {/* ================================================================== */}
      <div
        style={{
          opacity: purposeOpacity,
          transform: `translate3d(0, ${purposeTranslateY}px, 0)`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 md:px-24 max-w-7xl mx-auto pointer-events-auto z-10 pt-20 sm:pt-24 pb-10"
      >
        {/* Top Tagline + Massive Bold Heading */}
        <div className="max-w-5xl">
          {/* Top Tagline Line */}
          <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-slate-400 uppercase mb-4 sm:mb-6">
            DIGITAL EXPERIENCE &bull; GROWTH &bull; AI & AUTOMATION &bull; TECHNOLOGY &bull; DATA
          </div>

          {/* Massive Uppercase 4-Line Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tight leading-[0.98] text-white uppercase font-sans">
            BUILDING DIGITAL <br />
            SYSTEMS THAT <br />
            MOVE BUSINESSES <br />
            <span className="text-[#00b4d8]">
              FORWARD.
            </span>
          </h2>
        </div>

        {/* Bottom Row: Subtext (Left) & Action Buttons (Right) */}
        <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Subtext Description */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-md font-sans">
            Digital experiences, AI and automation designed to help businesses attract customers, streamline operations and scale.
          </p>

          {/* Action Buttons on Bottom Right */}
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
        <div className="w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center pt-4 sm:pt-8 px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 shrink-0 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold tracking-widest text-slate-600 uppercase mb-2">
                03 / OUR SERVICES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                Architecting High-Impact Systems
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards Deck with Reduced Width & Increased Height */}
          <div className="relative w-full h-[460px] sm:h-[500px]">
            {SERVICES_DATA.map((service, index) => {
              let cardP = 1;
              if (index > 0) {
                // Card 2: 0.10 -> 0.32, Card 3: 0.32 -> 0.54, Card 4: 0.54 -> 0.76
                const cardStep = 0.22;
                const startP = (index - 1) * cardStep + 0.10;
                const endP = startP + cardStep;
                const rawP = Math.min(1, Math.max(0, (deckProgress - startP) / (endP - startP)));
                // Ultra-smooth cubic ease-out deceleration curve
                cardP = 1 - Math.pow(1 - rawP, 3);
              }

              const stackedTop = index * 24;
              const zIndex = 10 + index * 10;
              const translateY = index === 0 ? 0 : (1 - cardP) * 700;
              const scale = index === 0 ? 1 : 0.94 + cardP * 0.06;
              const opacity = index === 0 ? 1 : Math.min(1, cardP * 2.2);

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
                  className={`absolute inset-x-0 rounded-[32px] ${service.bgClass} ${service.shadowStyle} text-white p-6 sm:p-9 md:p-10 border border-white/20 transition-transform duration-75`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                    
                    {/* Left Text Column */}
                    <div className="md:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal max-w-xs sm:max-w-sm">
                        {service.description}
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => handleProposalClick(service.title)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-all backdrop-blur-md border border-white/30 cursor-pointer active:scale-95"
                        >
                          <span>Request Proposal</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Vector Icon Frame */}
                    {(() => {
                      const IconComponent = service.icon || Globe;
                      return (
                        <div className="md:col-span-5 flex items-center justify-center p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl aspect-square max-h-[170px] sm:max-h-[200px] mx-auto shadow-inner group-hover:scale-105 transition-transform">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-2xl ring-4 ring-white/30 group-hover:rotate-3 transition-transform">
                            <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.75} />
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>


      {/* ================================================================== */}
      {/* PHASE 4: FEATURED CLIENT WORKS SECTION (FULL SCREEN SPINNING WHEEL) */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${worksSheetTranslateY}vh, 0)`,
          pointerEvents: phase4TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f4f7fa] text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col justify-between p-4 sm:p-8 z-30 pointer-events-auto overflow-visible"
      >
        {/* Static Fixed Canvas Header Text */}
        <div className="w-full max-w-5xl mx-auto pt-12 sm:pt-14 shrink-0 z-40 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase mb-1.5">
              FEATURED WORK
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-2 font-sans">
              Work that moves <br className="hidden sm:inline" />
              the needle.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium tracking-normal max-w-md font-sans leading-relaxed">
              Long-term engagements where design, engineering and automation shipped together. Scroll to rotate through portfolio highlights.
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

        {/* RADIAL SCROLL GALLERY COMPONENT */}
        <div className="w-full flex-1 relative flex items-center justify-center my-auto overflow-visible">
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
                      {/* Top Row: Category Badge + Top Right Arrow Circle */}
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-slate-950 font-bold text-[9px] sm:text-[11px] tracking-tight shadow-md font-sans">
                          {work.cat}
                        </span>
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1e3a8a]/90 text-white flex items-center justify-center transition-all duration-300 shadow-lg ${isActive ? 'scale-110 bg-[#3b70b2]' : 'opacity-80'}`}>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Bottom Row: Large Title + Detailed Case Study Pill */}
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
      {/* PHASE 5: OUR PROCESS SECTION                                      */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${processSheetTranslateY}vh, 0)`,
          pointerEvents: phase5TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f5f3ec] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between p-6 sm:p-10 z-40 pointer-events-auto overflow-hidden"
      >
        <div className="w-full flex flex-col items-center justify-between min-h-full">
          {/* Header - Offset pt-24 sm:pt-28 to avoid Navbar overlap */}
          <div className="w-full max-w-5xl mx-auto text-center pt-24 sm:pt-28 shrink-0">
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

          {/* 4 PROCESS CARDS GRID (EXACT MATCH TO REFERENCE SCREENSHOTS) */}
          <div className="w-full max-w-6xl mx-auto my-auto py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center items-stretch">
              {PROCESS_STAGES_DATA.map((stage, idx) => (
                <ProcessStageCard
                  key={stage.id}
                  stage={stage}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ================================================================== */}
      {/* PHASE 6: CONTACT SECTION ("Ready to build what's next?") & FOOTER */}
      {/* ================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${contactSheetTranslateY}vh, 0)`,
          pointerEvents: phase6TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#050505] text-white shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col justify-between pt-20 sm:pt-28 px-4 sm:px-8 pb-0 z-50 pointer-events-auto overflow-y-auto"
      >
        {/* Dedicated KineticGrid Canvas inside Phase 6 to block wheel cards */}
        <div className="absolute inset-0 pointer-events-auto z-0">
          <KineticGrid
            spacing={64}
            dotSize={2}
            gridStroke={1}
            gridOpacity={0.22}
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
        </div>

        <div
          style={{
            transform: `translate3d(0, ${contactContentTranslateY}px, 0)`,
            willChange: 'transform',
          }}
          className="relative z-10 w-full flex flex-col items-center justify-between min-h-full transition-transform duration-75"
        >
          {/* Main 2-Column Contact Container */}
          <div className="w-full max-w-7xl mx-auto pt-2 sm:pt-4 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            
            {/* Left Column: Let's Talk Heading + Direct Contact Card */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-slate-300 font-mono text-[11px] font-semibold tracking-widest uppercase mb-4">
                  LET'S TALK
                </span>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-sans">
                  Ready to build <br />
                  what's next?
                </h2>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-md font-sans">
                  Tell us what you're trying to solve. We'll help you figure out what to build.
                </p>
              </div>

              {/* DIRECT CONTACT CARD */}
              <div className="rounded-2xl bg-[#080d1a]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-5 shadow-2xl">
                <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">
                  DIRECT CONTACT
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono font-semibold">EMAIL</div>
                  <a
                    href="mailto:integratethought24@gmail.com"
                    className="text-sm sm:text-base font-semibold text-white hover:text-slate-300 transition-colors block"
                  >
                    integratethought24@gmail.com
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono font-semibold">PHONE</div>
                  <div className="text-sm sm:text-base font-semibold text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <a href="tel:+916303148269" className="hover:text-slate-300 transition-colors">
                      +91 6303148269
                    </a>
                    <span className="hidden sm:inline text-slate-500">/</span>
                    <a href="tel:+919010221396" className="hover:text-slate-300 transition-colors">
                      +91 9010221396
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono font-semibold">LOCATION</div>
                  <a
                    href="https://maps.app.goo.gl/Tte7zY8BP4cEaBa79"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-white hover:text-blue-400 transition-colors leading-relaxed block"
                  >
                    Vijaylakshmi complex, 4-105/11/C, Sriramnagar Colony, Turkayamjal, Hyderabad, Telangana 501510 ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Glassmorphic Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#0a0d1a]/90 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-white border border-slate-800/80 backdrop-blur-xl">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const firstName = form.querySelector('input[placeholder="John"]')?.value || '';
                    const lastName = form.querySelector('input[placeholder="Doe"]')?.value || '';
                    const email = form.querySelector('input[type="email"]')?.value || '';
                    const topic = form.querySelector('select')?.value || 'General Inquiry';
                    const message = form.querySelector('textarea')?.value || '';

                    await submitInquiry({
                      type: 'Homepage Contact Form',
                      name: `${firstName} ${lastName}`.trim(),
                      email,
                      courseOrService: topic,
                      message,
                    });

                    alert("Thank you! Your message has been submitted to Integrate Thought. Our engineering lead will contact you shortly.");
                    form.reset();
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white bg-slate-900/90 placeholder-slate-500 transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white bg-slate-900/90 placeholder-slate-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Company Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      COMPANY EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white bg-slate-900/90 placeholder-slate-500 transition-all font-sans"
                    />
                  </div>

                  {/* Topic Select Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      TOPIC *
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white bg-slate-900 transition-all cursor-pointer font-sans"
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-400">Please select</option>
                      <option value="web-dev" className="bg-slate-900 text-white">Web Design & Development</option>
                      <option value="ai-automation" className="bg-slate-900 text-white">AI Automation & Workflows</option>
                      <option value="rag-systems" className="bg-slate-900 text-white">RAG Knowledge Systems</option>
                      <option value="ai-agents" className="bg-slate-900 text-white">Custom Autonomous AI Agents</option>
                      <option value="consulting" className="bg-slate-900 text-white">Consultation & Strategy</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe what you're trying to solve..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-white bg-slate-900/90 placeholder-slate-500 transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-xl active:scale-98 cursor-pointer mt-2 font-sans"
                  >
                    Submit
                  </button>

                  {/* Terms & Privacy disclaimer */}
                  <p className="text-xs text-slate-400 text-center font-sans pt-1">
                    By pressing submit you agree to the Integrate Thought <a href="#" className="underline hover:text-white">terms of service</a> and <a href="#" className="underline hover:text-white">privacy policy</a>
                  </p>
                </form>
              </div>
            </div>

          </div>

          {/* INFINITE SCROLLING COMPANY TEXT MARQUEE BANNER (ABOVE FOOTER) */}
          <div className="w-full shrink-0 z-30">
            <CompanyMarqueeBanner />
          </div>

          {/* NATURAL DOCUMENT TAIL FOOTER COMPONENT FLUSH AT BOTTOM */}
          <div className="w-full shrink-0 bg-white pb-6">
            <Footer onNavigate={onNavigate} />
          </div>
        </div>
      </div>

    </div>
  );
}
