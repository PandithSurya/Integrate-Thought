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
  const [isMobile, setIsMobile] = useState(false);

  const heroText = "Integrate Thought";

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        document.body.style.overflow = 'auto';
        document.body.style.overscrollBehavior = 'auto';
        document.documentElement.style.overscrollBehavior = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      document.documentElement.style.overscrollBehavior = 'auto';
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const [mobileScrollY, setMobileScrollY] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    const handleMobileScroll = () => {
      setMobileScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    handleMobileScroll();

    return () => {
      window.removeEventListener('scroll', handleMobileScroll);
    };
  }, [isMobile]);

  const updateTargetProgress = (delta) => {
    targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
  };

  useEffect(() => {
    if (isMobile) return; // Free flow document scrolling on mobile

    const handleWheel = (e) => {
      const sensitivity = e.deltaY < 0 ? 0.00045 : 0.00035;
      updateTargetProgress(e.deltaY * sensitivity);
    };

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        updateTargetProgress(0.04);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateTargetProgress(-0.04);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    let animId;
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00003) {
        currentProgressRef.current += diff * 0.14;
        setProgress(currentProgressRef.current);
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  const handleNavClick = (link) => {
    if (link === 'Home') {
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        targetProgressRef.current = 0;
      }
      return;
    }
    if (onNavigate) {
      onNavigate(link);
    }
  };

  const handleScrollPrompt = () => {
    if (isMobile) {
      const purposeEl = document.getElementById('purpose-section-mobile');
      if (purposeEl) purposeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      targetProgressRef.current = 0.18;
    }
  };

  const handleProposalClick = (title) => {
    alert(`Initiated project proposal request for "${title}".`);
  };

  // --------------------------------------------------------------------------
  // DESKTOP OVERLAPPING TIMELINE MATH (0.00 -> 1.00)
  // --------------------------------------------------------------------------
  const heroOpacity = Math.max(0, 1 - progress / 0.14);
  const heroScale = 1 - progress * 0.15;
  const heroTranslateY = -progress * 90;

  let purposeOpacity = 0;
  if (progress >= 0.10 && progress <= 0.18) {
    purposeOpacity = Math.min(1, (progress - 0.10) / 0.08);
  } else if (progress > 0.18 && progress <= 0.28) {
    purposeOpacity = Math.max(0, 1 - (progress - 0.18) / 0.10);
  }
  const purposeTranslateY = progress < 0.18 ? Math.max(0, (0.18 - progress) * 120) : 0;

  const whiteSheetP = Math.min(1, Math.max(0, (progress - 0.20) / 0.08));
  const deckProgress = Math.min(1, Math.max(0, (progress - 0.26) / 0.24));

  const phase4TransitionP = Math.min(1, Math.max(0, (progress - 0.46) / 0.08));
  const phase5TransitionP = Math.min(1, Math.max(0, (progress - 0.60) / 0.08));
  const phase6TransitionP = Math.min(1, Math.max(0, (progress - 0.72) / 0.10));
  const tailProgress = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));

  const whiteSheetTranslateY = (1 - whiteSheetP) * 100 - phase4TransitionP * 100;
  const worksSheetTranslateY = (1 - phase4TransitionP) * 100 - phase5TransitionP * 100;
  const processSheetTranslateY = (1 - phase5TransitionP) * 100 - phase6TransitionP * 100;
  const tailSheetTranslateY = (1 - phase6TransitionP) * 100;
  const tailInnerTranslateY = -tailProgress * 16;
  const phase4Progress = Math.min(1, Math.max(0, (progress - 0.46) / 0.20));

  // --------------------------------------------------------------------------
  // MOBILE SCROLL ANIMATIONS MATH FOR FIRST 2 SECTIONS (HERO & PURPOSE)
  // --------------------------------------------------------------------------
  // Driven by mobileScrollY over a 220vh scroll container (~1500px)
  const heroFadeP = Math.min(1, Math.max(0, mobileScrollY / 500));
  const mobileHeroOpacity = Math.max(0, 1 - heroFadeP * 1.3);
  const mobileHeroScale = 1 - heroFadeP * 0.15;
  const mobileHeroTranslateY = -heroFadeP * 90;

  let mobilePurposeOpacity = 0;
  let mobilePurposeTranslateY = 0;

  if (mobileScrollY < 450) {
    mobilePurposeOpacity = Math.min(1, Math.max(0, (mobileScrollY - 200) / 250));
    mobilePurposeTranslateY = Math.max(0, (450 - mobileScrollY) * 0.4);
  } else if (mobileScrollY >= 450 && mobileScrollY <= 1050) {
    mobilePurposeOpacity = 1;
    mobilePurposeTranslateY = 0;
  } else {
    mobilePurposeOpacity = Math.max(0, 1 - (mobileScrollY - 1050) / 300);
    mobilePurposeTranslateY = -(mobileScrollY - 1050) * 0.3;
  }

  // Mobile Services Track Fixed Viewport Scroll Range (350px -> 1450px)
  const isServicesActive = mobileScrollY >= 350 && mobileScrollY < 1450;
  const isServicesPast = mobileScrollY >= 1450;

  const servicesP = Math.min(1, Math.max(0, (mobileScrollY - 350) / 1100));
  const mobileServicesTranslateX = servicesP * 920;

  // ==========================================================================
  // MOBILE VIEW: 100% SEAMLESS CONTINUOUS DOCUMENT FLOW (OUR PURPOSE HERO)
  // ==========================================================================
  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00b4d8] selection:text-black">
        {/* Universal Adaptive Navbar Header */}
        <Navbar progress={0.5} onNavigate={handleNavClick} activePage="Home" />

        {/* Interactive Background Grid Canvas at z-0 */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <KineticGrid
            spacing={80}
            dotSize={2}
            gridStroke={1}
            gridOpacity={0.15}
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

        {/* 1. MAIN HERO / PURPOSE SECTION FOR MOBILE */}
        <section id="purpose-section-mobile" className="relative z-10 w-full pt-28 pb-16 px-6 max-w-5xl mx-auto flex flex-col items-start justify-center min-h-[75vh]">
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="Integrate Thought Logo"
              className="w-40 h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase mb-3">
            DIGITAL EXPERIENCE &bull; GROWTH &bull; AI & AUTOMATION
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white uppercase font-sans mb-4">
            BUILDING DIGITAL <br />
            SYSTEMS THAT <br />
            MOVE BUSINESSES <br />
            <span className="text-[#00b4d8]">FORWARD.</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-8 font-sans max-w-xl">
            Digital experiences, AI and automation designed to help businesses attract customers, streamline operations and scale.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert("Initiating project consultation with Integrate Thought.")}
              className="px-5 py-2.5 rounded-md bg-[#48a9dc] text-white font-bold text-xs tracking-wide shadow-md active:scale-95 font-sans"
            >
              Start a Project
            </button>
            <button
              onClick={() => {
                const worksEl = document.getElementById('works-section-mobile');
                if (worksEl) worksEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-md bg-white/10 border border-white/20 text-white font-semibold text-xs tracking-wide active:scale-95 font-sans"
            >
              Explore Our Work
            </button>
          </div>
        </section>

        {/* 3. SERVICES SECTION (100% PINNED FIXED VIEWPORT UNTIL ALL 4 CARDS ARE SCROLLED) */}
        <div className="relative w-full h-[1100px] z-20">
          <div
            className={
              isServicesActive
                ? "fixed inset-0 w-full h-screen bg-white text-slate-950 flex flex-col justify-center px-4 overflow-hidden z-20 shadow-2xl"
                : isServicesPast
                ? "absolute bottom-0 w-full h-screen bg-white text-slate-950 flex flex-col justify-center px-4 overflow-hidden z-20 shadow-2xl"
                : "absolute top-0 w-full h-screen bg-white text-slate-950 flex flex-col justify-center px-4 overflow-hidden z-20 shadow-2xl"
            }
          >
            <div className="max-w-xl mx-auto w-full mb-6">
              <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-semibold tracking-widest text-slate-600 uppercase self-start mb-2">
                03 / OUR SERVICES
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Architecting High-Impact Systems
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Scroll down to explore all services &rarr;
              </p>
            </div>

            {/* Horizontal Track driven by scroll towards left */}
            <div className="w-full overflow-hidden">
              <div
                style={{
                  transform: `translate3d(-${mobileServicesTranslateX}px, 0, 0)`,
                  willChange: 'transform',
                }}
                className="flex items-center gap-4 transition-transform duration-75 ease-out"
              >
                {SERVICES_DATA.map((service, index) => (
                  <div
                    key={service.id}
                    className={`shrink-0 w-[280px] sm:w-[320px] h-[330px] rounded-3xl ${service.bgClass} text-white p-6 shadow-xl border border-white/20 flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold uppercase">
                        {service.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-white/80">
                        0{index + 1} / 04
                      </span>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <h3 className="text-lg font-extrabold text-white leading-snug font-sans">
                        {service.title}
                      </h3>
                      <p className="text-white/90 text-xs leading-relaxed font-normal font-sans line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                      <button
                        onClick={() => handleProposalClick(service.title)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 cursor-pointer active:scale-95 transition-all"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. FEATURED WORKS SECTION (FREE FLOW - ZERO FULLSCREEN LOCKING) */}
        <section id="works-section-mobile" className="relative z-30 w-full py-12 px-4 bg-[#f4f7fa] text-slate-950 shadow-2xl">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                FEATURED WORK
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Work that moves the needle.
              </h2>
              <p className="text-slate-600 text-xs font-medium">
                Long-term engagements where design, engineering and automation shipped together.
              </p>
            </div>

            {/* Horizontal Touch Track */}
            <div className="w-full flex overflow-x-auto gap-4 py-2 snap-x snap-mandatory no-scrollbar touch-pan-x">
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
          </div>
        </section>

        {/* 5. OUR PROCESS SECTION (2 ROWS x 2 COLUMNS MOBILE GRID) */}
        <section className="relative z-40 w-full py-12 px-4 bg-[#f5f3ec] text-slate-900 shadow-2xl">
          <div className="max-w-6xl mx-auto text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-700 text-[10px] font-mono font-semibold uppercase mb-2">
              05 / OUR PROCESS
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-1">
              Our Operating Standards
            </h2>
            <p className="text-slate-600 text-xs font-medium max-w-sm mx-auto">
              Frameworks designed to align operations and validate benchmarks.
            </p>
          </div>

          {/* 2 Rows x 2 Columns Grid Layout for Mobile Screens */}
          <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-2.5 sm:gap-6 justify-items-center">
            {PROCESS_STAGES_DATA.map((stage, idx) => (
              <ProcessStageCard
                key={stage.id}
                stage={stage}
                index={idx}
                onSelect={(stg) => setSelectedStageModal(stg)}
              />
            ))}
          </div>
        </section>

        {/* 6. TESTIMONIALS, MARQUEE & FOOTER SECTION */}
        <section className="relative z-50 w-full bg-white text-slate-900 pt-10">
          <StackedTestimonials />
          <CompanyMarqueeBanner />
          <Footer onNavigate={onNavigate} />
        </section>

        {/* Modal */}
        {selectedStageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 text-slate-900 shadow-2xl border border-slate-200">
              <button
                onClick={() => setSelectedStageModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs"
              >
                ✕
              </button>
              <div className="text-[10px] font-mono font-bold text-blue-600 uppercase mb-1">
                OPERATING STANDARD 0{selectedStageModal.id}
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-2">
                {selectedStageModal.title}
              </h3>
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-3">
                <img
                  src={selectedStageModal.image}
                  alt={selectedStageModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                {selectedStageModal.description}
              </p>
              <button
                onClick={() => setSelectedStageModal(null)}
                className="w-full py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs shadow-md"
              >
                Close Operating Standard
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // DESKTOP VIEW: INTERACTIVE OVERLAPPING SLIDE DECK & ROTATING WHEEL
  // ==========================================================================
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

      {/* PHASE 1: HERO LOGO & TITLE */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto"
      >
        <div className="mb-6 sm:mb-8 pointer-events-none">
          <img
            src="/logo.png"
            alt="Integrate Thought Logo"
            className="w-40 sm:w-56 md:w-64 lg:w-[340px] h-auto object-contain drop-shadow-2xl"
          />
        </div>

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

      {/* PHASE 2: OUR PURPOSE */}
      <div
        style={{
          opacity: purposeOpacity,
          transform: `translate3d(0, ${purposeTranslateY}px, 0)`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-16 md:px-24 max-w-7xl mx-auto pointer-events-auto z-10 pt-20 sm:pt-24 pb-10"
      >
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

      {/* PHASE 3: DESKTOP STACKED SERVICES CARDS DECK */}
      <div
        style={{
          transform: `translate3d(0, ${whiteSheetTranslateY}vh, 0)`,
          pointerEvents: whiteSheetP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between z-20 pointer-events-auto overflow-hidden"
      >
        <div className="w-full max-w-lg sm:max-w-xl mx-auto flex flex-col items-center pt-6 sm:pt-8 px-4 sm:px-8 my-auto">
          
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 shrink-0 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-mono font-semibold tracking-widest text-slate-600 uppercase mb-2">
                03 / OUR SERVICES
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
                Architecting High-Impact Systems
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                <span>View All Services</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-[400px] sm:h-[480px]">
            {SERVICES_DATA.map((service, index) => {
              let cardP = 1;
              if (index > 0) {
                const cardStep = 0.22;
                const startP = (index - 1) * cardStep + 0.10;
                const endP = startP + cardStep;
                const rawP = Math.min(1, Math.max(0, (deckProgress - startP) / (endP - startP)));
                cardP = 1 - Math.pow(1 - rawP, 3);
              }

              const stackedTop = index * 24;
              const zIndex = 10 + index * 10;
              const translateY = index === 0 ? 0 : (1 - cardP) * 700;
              const scale = index === 0 ? 1 : 0.94 + cardP * 0.06;
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
                  className={`absolute inset-x-0 rounded-[32px] ${service.bgClass} ${service.shadowStyle} text-white p-6 sm:p-9 md:p-10 border border-white/20 transition-transform duration-75`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                    
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

                    <div className="md:col-span-5 flex items-center justify-center p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl aspect-square max-h-[170px] sm:max-h-[200px] mx-auto shadow-inner">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-2xl ring-4 ring-white/30">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.75} />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* PHASE 4: DESKTOP FEATURED CLIENT WORKS (RADIAL WHEEL) */}
      <div
        style={{
          transform: `translate3d(0, ${worksSheetTranslateY}vh, 0)`,
          pointerEvents: phase4TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f4f7fa] text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col justify-between p-4 sm:p-8 z-30 pointer-events-auto overflow-visible"
      >
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

      {/* PHASE 5: DESKTOP OUR PROCESS */}
      <div
        style={{
          transform: `translate3d(0, ${processSheetTranslateY}vh, 0)`,
          pointerEvents: phase5TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f5f3ec] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center p-4 sm:p-8 z-40 pointer-events-auto overflow-hidden select-none"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-full py-8 sm:py-12 my-auto">
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

          <div className="w-full max-w-6xl mx-auto py-2 sm:py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center items-stretch">
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

      {/* PHASE 6: DESKTOP TESTIMONIALS & FOOTER */}
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
          <div className="w-full pt-4 sm:pt-8 pb-2">
            <StackedTestimonials />
          </div>

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
