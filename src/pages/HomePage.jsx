import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import KineticGrid from '../components/KineticGrid';
import { RadialScrollGallery } from '../components/ui/portfolio-and-image-gallery';
import { ProcessStageCard } from '../components/ui/process-stage-card';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';
import CompanyMarqueeBanner from '../components/CompanyMarqueeBanner';
import { StackedTestimonials } from '../components/StackedTestimonials';
import PhoneReelPlayer from '../components/PhoneReelPlayer';
import BrandsTrustUsSection from '../components/BrandsTrustUsSection';

const SERVICES_DATA = [
  {
    id: '01',
    tag: 'POPULAR',
    title: 'Web Design & Development',
    serviceTitle: 'WEBSITE DESIGN & DEVELOPMENT',
    description: 'High-performance, responsive websites and web applications custom-built to elevate your brand, engage users, and drive measurable business growth.',
    bgClass: 'bg-[#059669]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(5,150,105,0.35)]',
    image: '/services/service_web_dev.jpg',
    accentColor: '#10b981',
  },
  {
    id: '02',
    tag: 'ENTERPRISE AI',
    title: 'AI Automation & Workflows',
    serviceTitle: 'AI AUTOMATION & INTEGRATION',
    description: 'Streamline complex business processes, eliminate manual data entry, and integrate intelligent AI models directly into your enterprise software stack.',
    bgClass: 'bg-[#2563eb]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(37,99,235,0.35)]',
    image: '/services/service_ai_auto.jpg',
    accentColor: '#3b82f6',
  },
  {
    id: '03',
    tag: 'ADVANCED AI',
    title: 'RAG Knowledge Systems',
    serviceTitle: 'RAG SYSTEMS FOR BUSINESS',
    description: 'Connect AI models securely to your private company data, documents, and internal databases for fast, accurate, context-aware intelligence.',
    bgClass: 'bg-[#d97706]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(217,119,6,0.35)]',
    image: '/services/service_rag_sys.jpg',
    accentColor: '#f59e0b',
  },
  {
    id: '04',
    tag: '24/7 SUPPORT',
    title: 'Custom Autonomous AI Agents',
    serviceTitle: 'CUSTOM AI AGENTS & CHATBOTS',
    description: 'Deploy 24/7 intelligent AI agents capable of handling customer support, qualifying leads, booking appointments, and triggering backend actions.',
    bgClass: 'bg-[#e11d48]',
    shadowStyle: 'shadow-[0_25px_60px_rgba(225,29,72,0.35)]',
    image: '/services/service_ai_agents.jpg',
    accentColor: '#f43f5e',
  },
];

const getServiceTextAnimation = (index, deckProgress) => {
  const centers = [0.06, 0.28, 0.50, 0.74];
  const center = centers[index];
  const dist = Math.abs(deckProgress - center);
  const windowRadius = 0.14;

  if (dist > windowRadius) {
    return {
      opacity: 0,
      translateY: deckProgress > center ? -24 : 24,
    };
  }

  const rawP = 1 - dist / windowRadius;
  const easeP = Math.sin((rawP * Math.PI) / 2);
  const translateY = (1 - easeP) * (deckProgress > center ? -20 : 20);

  return {
    opacity: Math.max(0, Math.min(1, easeP * 1.25)),
    translateY,
  };
};

const WORKS_DATA = [
  {
    id: 1,
    title: "WNB Barber",
    client: "WNB TURKISH BARBER",
    cat: "Grooming & Lifestyle",
    tagline: "Mastering Traditional Craft & Modern Grooming Artistry",
    img: "/Hero-Images/wnbturkish-hero.png",
    url: "https://wnbturkishbarber.netlify.app/",
    description: "A luxury digital experience designed for WNB Turkish Barber, offering seamless service selection, instant appointment bookings, and an interactive grooming portfolio.",
  },
  {
    id: 3,
    title: "Mayavi Media",
    client: "MAYAVI MEDIA CREATIONS",
    cat: "Cinematic Media",
    tagline: "Next-Gen Vertical Video & Cinematic Storytelling Agency",
    img: "/Hero-Images/mayavi-mc-hero.png",
    url: "https://mayavi-mc.vercel.app/",
    description: "Next-gen creative media agency producing viral short-form video campaigns, cinematic brand commercials, and high-retention social content.",
  },
  {
    id: 4,
    title: "AP Mohan Sai Dental",
    client: "AP MOHAN CLINIC",
    cat: "Clinical Architecture",
    tagline: "Scroll-Driven Architectural Precision & Clinical Excellence",
    img: "/Hero-Images/ap-mohan-hero.png",
    url: "https://ap-mohan.vercel.app/",
    description: "An interactive scroll-driven digital architectural showcase celebrating contemporary design, structural precision, and modern healthcare environments.",
  },
  {
    id: 5,
    title: "Old Glen Landscapes",
    client: "OLD GLEN LANDSCAPES",
    cat: "Exterior Studio",
    tagline: "Premium Landscape Architecture & Estate Project Hub",
    img: "/Hero-Images/old-glen-hero.png",
    url: "https://old-glen-landscapes.vercel.app/",
    description: "An elegant digital portfolio showcasing luxury residential landscaping, garden designs, stone masonry, and exterior living architectural projects.",
  },
  {
    id: 6,
    title: "AVS Hospitals",
    client: "AVS HOSPITALS HMSS",
    cat: "Enterprise Healthcare",
    tagline: "Hospital Management & Integrated Patient Record System",
    img: "/Hero-Images/avs-hospitals-hero.png",
    url: "https://avs-hospitals-hmss.vercel.app/",
    description: "An enterprise-grade Healthcare Management System Interface for hospital networks, simplifying doctor scheduling, bed tracking, and online diagnostic booking.",
  },
  {
    id: 7,
    title: "VAMP Roofing",
    client: "VAMP ROOFING & SYSTEMS",
    cat: "Commercial Roofing",
    tagline: "Industrial & Residential Commercial Roofing Engine",
    img: "/Hero-Images/roof-nu-hero.png",
    url: "https://roof-nu.vercel.app/",
    description: "A high-converting roofing contractor platform engineered for instant quote estimates, storm damage inspection booking, and warranty tracking.",
  },
  {
    id: 8,
    title: "Dr. Rathod Dental",
    client: "DR. RATHOD DENTAL",
    cat: "Aesthetic Dental",
    tagline: "Swiss-Grade Implantology, Aesthetic Dentistry & Patient Care",
    img: "/Hero-Images/dr-rathod-hero.png",
    url: "https://jazzy-pastelito-855f86.netlify.app/",
    description: "A modern, empathetic dental platform facilitating patient onboarding, Swiss-grade surgical implantology, and virtual appointment scheduling.",
  },
  {
    id: 9,
    title: "Usy'z Blizers",
    client: "USY'Z BLIZERS",
    cat: "Streetwear & Luxury",
    tagline: "Urban Streetwear Flagship, Apparel Drops & Shettleston Vault",
    img: "/Hero-Images/usy'z-blizers-hero.png",
    url: "https://fancy-lokum-dfbfba.netlify.app/",
    description: "A visually striking streetwear and luxury essentials platform featuring dynamic product interaction, collection drops, and Glasgow flagship showcase.",
  },
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
  const tailInnerRef = useRef(null);
  const [maxTailScroll, setMaxTailScroll] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.max(100, Math.round(window.innerHeight * 0.44));
    }
    return 360;
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
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

  // Dynamically compute exact scroll needed for Phase 6 footer to land flush at bottom with zero gap
  useEffect(() => {
    if (isMobile) return;
    const el = tailInnerRef.current;
    if (!el) return;

    const measure = () => {
      // Sum child heights to get true unconstrained content height
      const childrenH = Array.from(el.children).reduce((acc, child) => acc + (child.offsetHeight || 0), 0);
      const contentH = Math.max(el.scrollHeight, childrenH);
      const viewH = window.innerHeight;
      const needed = contentH - viewH;
      const fallback = Math.round(viewH * 0.44);
      setMaxTailScroll(needed > 50 ? needed : fallback);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    window.addEventListener('resize', measure);

    const timer = setTimeout(measure, 350);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', measure);
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
    if (onNavigate) {
      onNavigate('services', { initialStep: 4, initialService: title });
    }
  };

  // --------------------------------------------------------------------------
  // DESKTOP OVERLAPPING TIMELINE MATH (0.00 -> 1.00)
  // --------------------------------------------------------------------------
  // Starts directly with Core Mission text section at progress 0.00
  const purposeOpacity = Math.max(0, 1 - progress / 0.16);
  const purposeScale = 1 - progress * 0.08;
  const purposeTranslateY = -progress * 80;

  const whiteSheetP = Math.min(1, Math.max(0, (progress - 0.06) / 0.12));
  const deckProgress = Math.min(1, Math.max(0, (progress - 0.18) / 0.26));

  const phase4TransitionP = Math.min(1, Math.max(0, (progress - 0.40) / 0.10));
  const phase5TransitionP = Math.min(1, Math.max(0, (progress - 0.52) / 0.10));
  const phase6TransitionP = Math.min(1, Math.max(0, (progress - 0.64) / 0.10));
  const tailProgress = Math.min(1, Math.max(0, (progress - 0.74) / 0.26));

  const whiteSheetTranslateY = (1 - whiteSheetP) * 100 - phase4TransitionP * 100;
  const worksSheetTranslateY = (1 - phase4TransitionP) * 100 - phase5TransitionP * 100;
  const processSheetTranslateY = (1 - phase5TransitionP) * 100 - phase6TransitionP * 100;
  const tailSheetTranslateY = (1 - phase6TransitionP) * 100;
  const tailInnerTranslateY = -tailProgress * maxTailScroll;
  const phase4Progress = Math.min(1, Math.max(0, (progress - 0.40) / 0.20));

  // ==========================================================================
  // MOBILE VIEW: 100% SEAMLESS CONTINUOUS DOCUMENT FLOW
  // ==========================================================================
  if (isMobile) {
    return (
      <div className="relative w-full min-h-screen bg-[#f8fafc] text-slate-950 font-sans selection:bg-[#00b4d8] selection:text-black">
        {/* Universal Adaptive Navbar Header */}
        <Navbar progress={0.5} onNavigate={onNavigate} activePage="Home" />

        {/* Interactive Background Grid Canvas at z-0 (Light Theme) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <KineticGrid
            spacing={80}
            dotSize={2}
            gridStroke={1}
            gridOpacity={0.35}
            repulsion={5}
            radius={60}
            stiffness={1.0}
            damping={0.09}
            clickIntensity={30}
            trailIntensity={0.15}
            backgroundColor="#f8fafc"
            lineColor="#cbd5e1"
            dotColor="#94a3b8"
            hoverColor="#00b4d8"
          />
        </div>

        {/* 1. MAIN HERO / PURPOSE SECTION FOR MOBILE */}
        <section id="purpose-section-mobile" className="relative z-10 w-full pt-28 pb-12 px-6 sm:px-8 max-w-2xl mx-auto flex flex-col items-start text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] text-slate-950 uppercase font-sans mb-3 text-left">
            Building Digital <br />
            Systems That <br />
            Move Businesses <br />
            <span className="text-[#00b4d8]">Forward.</span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed font-normal mb-6 font-sans text-left">
            Digital experiences, AI engineering, and automation designed to help businesses attract customers, streamline operations, and scale.
          </p>

          {/* Interactive Smartphone Instagram Reel Player for Mobile */}
          <div className="w-full flex justify-center mb-6">
            <PhoneReelPlayer />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleProposalClick()}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-md active:scale-95 transition-all font-sans cursor-pointer"
            >
              Start a Project
            </button>
            <button
              onClick={() => {
                const worksEl = document.getElementById('works-section-mobile');
                if (worksEl) worksEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs tracking-wide active:scale-95 transition-all font-sans cursor-pointer shadow-xs"
            >
              Explore Our Work
            </button>
          </div>
        </section>

        {/* 2. OUR SERVICES SECTION FOR MOBILE (CLEAN VERTICAL STACK WITH NATURAL SMOOTH SCROLL) */}
        <section className="relative z-20 w-full py-12 px-6 sm:px-8 bg-white text-slate-950 border-t border-slate-100 shadow-sm">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-6 text-left items-start">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight text-left">
                Architecting High-Impact Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed text-left">
                Tailored engineering, AI automation, and knowledge architectures built for enterprise scale.
              </p>
            </div>

            {/* Services Cards: One after another as the user scrolls */}
            <div className="w-full flex flex-col gap-8">
              {SERVICES_DATA.map((service, index) => (
                <div key={service.id} className="w-full flex flex-col gap-3">
                  {/* Countdown Above Service */}
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shadow-xs"
                      style={{ backgroundColor: service.accentColor }}
                    />
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                      0{index + 1} / 04
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug font-sans text-left">
                    {service.title}
                  </h3>

                  {/* Card with Full-Bleed Image (No Borders, No Countdown) */}
                  <div
                    className={`w-full rounded-3xl ${service.bgClass} ${service.shadowStyle} relative overflow-hidden h-[280px] sm:h-[340px] shadow-xl`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Centered Request Proposal Button */}
                    <div className="absolute bottom-5 inset-x-0 flex justify-center z-20">
                      <button
                        onClick={() => handleProposalClick(service.serviceTitle || service.title)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition-all font-sans cursor-pointer border border-black/10"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description without any box, in darker color with comfortable font */}
                  <p className="text-slate-900 text-sm sm:text-base leading-relaxed font-medium font-sans text-left">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Explore All Services Button (Same as PC View) */}
            <div className="mt-8 flex justify-center w-full">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer font-sans"
              >
                <span>Explore All Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. FEATURED SELECTED WORKS SECTION FOR MOBILE */}
        <section id="works-section-mobile" className="relative z-30 w-full py-12 px-6 sm:px-8 bg-[#f4f7fa] text-slate-950 border-t border-slate-100 shadow-sm">
          <div className="max-w-2xl mx-auto w-full">
            <div className="mb-6 text-left items-start">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight text-left">
                Work That Moves the Needle
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1 leading-relaxed text-left">
                Long-term engagements where design, engineering and automation shipped together. Swipe to explore &rarr;
              </p>
            </div>

            {/* Native Touch-Friendly Horizontal Works Track */}
            <div className="w-full overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 flex gap-4 snap-x snap-mandatory no-scrollbar touch-pan-x">
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
                  className="shrink-0 snap-center w-[260px] sm:w-[300px] h-[340px] relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/50 shadow-xl active:scale-95 transition-transform cursor-pointer"
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

                    <div className="space-y-1 text-left">
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

            {/* Explore All Works Button */}
            <div className="mt-8 flex justify-center w-full">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Works');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer font-sans"
              >
                <span>Explore All Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. OPERATING STANDARDS SECTION FOR MOBILE */}
        <section className="relative z-40 w-full py-12 px-6 sm:px-8 bg-[#f5f3ec] text-slate-900 border-t border-slate-200/60 shadow-sm">
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-left items-start mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans leading-tight mb-1.5 text-left">
                Our Operating Standards
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-md leading-relaxed text-left">
                Battle-tested frameworks designed to align operations, validate technical benchmarks, and drive measurable impact.
              </p>
            </div>

            {/* 2 Rows x 2 Columns Grid Layout for Mobile Screens */}
            <div className="w-full grid grid-cols-2 gap-3 sm:gap-6 justify-items-center">
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
        </section>

        {/* 5. BRANDS THAT TRUST US SECTION FOR MOBILE */}
        <div className="relative z-45 w-full bg-white text-slate-950 border-t border-slate-100">
          <BrandsTrustUsSection isMobile={true} />
        </div>

        {/* 6. TESTIMONIALS, MARQUEE & FOOTER SECTION */}
        <section className="relative z-50 w-full bg-white text-slate-900 pt-8 border-t border-slate-100">
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
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 bg-[#f8fafc] text-slate-950 select-none font-sans">
      
      {/* Universal Fixed Adaptive Navbar Header */}
      <Navbar progress={progress} onNavigate={onNavigate} activePage="Home" />

      {/* Interactive Kinetic Grid Canvas at z-0 (Light Theme) */}
      <KineticGrid
        spacing={64}
        dotSize={2}
        gridStroke={1}
        gridOpacity={0.4}
        repulsion={5}
        radius={60}
        stiffness={1.0}
        damping={0.09}
        clickIntensity={30}
        trailIntensity={0.15}
        backgroundColor="#f8fafc"
        lineColor="#cbd5e1"
        dotColor="#94a3b8"
        hoverColor="#00b4d8"
      />

      {/* PHASE 1: CORE MISSION (STARTS DIRECTLY WITH TEXT - ZERO PRE-LOGO PHASE) */}
      <div
        style={{
          opacity: purposeOpacity,
          transform: `translate3d(0, ${purposeTranslateY}px, 0) scale(${purposeScale})`,
          pointerEvents: purposeOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto pointer-events-auto z-10 pt-20 sm:pt-24 pb-10"
      >
        {/* HERO CONTENT: TWO EQUAL PARTS (LEFT: TEXT BLOCK | RIGHT: MOBILE BLOCK) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          
          {/* Part 1: Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-tight leading-[1.04] text-slate-950 uppercase font-sans text-left">
              Building Digital <br />
              Systems That <br />
              Move Businesses <br />
              <span className="text-[#00b4d8]">
                Forward.
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-md font-sans text-left">
              Digital experiences, AI and automation designed to help businesses attract customers, streamline operations and scale.
            </p>

            <div className="mt-7 sm:mt-8 flex items-center justify-start gap-3.5 w-full">
              <button
                onClick={() => handleProposalClick()}
                className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
              >
                Start a Project
              </button>

              <button
                onClick={() => {
                  targetProgressRef.current = 0.44;
                }}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer font-sans"
              >
                Explore Our Work
              </button>
            </div>
          </div>

          {/* Part 2: Mobile Block */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <PhoneReelPlayer />
          </div>

        </div>

        {/* Subtle Bottom Scroll Cue */}
        <button
          onClick={() => {
            targetProgressRef.current = 0.18;
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer z-20 pointer-events-auto active:scale-95"
          title="Scroll to Explore Services"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">Scroll</span>
          <svg className="w-4 h-4 text-[#00b4d8] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* PHASE 3: DESKTOP STACKED SERVICES CARDS DECK */}
      <div
        style={{
          transform: `translate3d(0, ${whiteSheetTranslateY}vh, 0)`,
          pointerEvents: whiteSheetP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-white text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.5)] flex flex-col z-20 pointer-events-auto overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 flex flex-col flex-1 pb-6 justify-between">
          
          {/* Header Row */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 shrink-0 text-left items-start">
            <div className="text-left items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 font-sans leading-tight text-left">
                Architecting High-Impact Systems
              </h2>
            </div>
            <div>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('Services');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0 font-sans"
              >
                <span>Explore All Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3-COLUMN STAGE AS IN USER SKETCH */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 my-auto min-h-[420px] lg:min-h-[460px] relative">
            
            {/* LEFT COLUMN: ANIMATING SERVICE TITLE */}
            <div className="lg:col-span-3 hidden lg:block relative h-[260px]">
              {SERVICES_DATA.map((service, index) => {
                const anim = getServiceTextAnimation(index, deckProgress);
                return (
                  <div
                    key={`title-${service.id}`}
                    style={{
                      opacity: anim.opacity,
                      transform: `translate3d(0, ${anim.translateY}px, 0)`,
                      pointerEvents: anim.opacity > 0.5 ? 'auto' : 'none',
                      willChange: 'transform, opacity',
                    }}
                    className="absolute inset-0 flex flex-col justify-center text-left pl-2"
                  >
                    {/* Countdown above service */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-xs"
                        style={{ backgroundColor: service.accentColor }}
                      />
                      <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-500 uppercase">
                        0{index + 1} / 04
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl xl:text-[40px] font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                      {service.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* CENTER COLUMN: STACKED CARDS DECK WITH FULL-BLEED IMAGES & PROPOSAL BUTTON */}
            <div className="lg:col-span-6 w-full max-w-md sm:max-w-lg mx-auto relative h-[380px] sm:h-[420px]">
              {SERVICES_DATA.map((service, index) => {
                let cardP = 1;
                if (index > 0) {
                  const cardStep = 0.22;
                  const startP = (index - 1) * cardStep + 0.10;
                  const endP = startP + cardStep;
                  const rawP = Math.min(1, Math.max(0, (deckProgress - startP) / (endP - startP)));
                  cardP = 1 - Math.pow(1 - rawP, 3);
                }

                const stackedTop = index * 20;
                const zIndex = 10 + index * 10;
                const translateY = index === 0 ? 0 : (1 - cardP) * 650;
                const scale = index === 0 ? 1 : 0.95 + cardP * 0.05;
                const opacity = index === 0 ? 1 : Math.min(1, cardP * 2.5);

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
                    className={`absolute inset-x-0 rounded-[28px] ${service.bgClass} ${service.shadowStyle} shadow-2xl overflow-hidden h-[330px] sm:h-[360px]`}
                  >
                    {/* Full-bleed edge-to-edge image without any borders */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Ambient gradient overlay for button prominence */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Centered Request Proposal Button at bottom */}
                    <div className="absolute bottom-6 inset-x-0 flex justify-center z-20 pointer-events-auto">
                      <button
                        onClick={() => handleProposalClick(service.serviceTitle || service.title)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-xl active:scale-95 cursor-pointer font-sans group border border-black/10"
                      >
                        <span>Request Proposal</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: ANIMATING SERVICE DESCRIPTION (NO BOX, DARKER COLOR, LARGER FONT) */}
            <div className="lg:col-span-3 hidden lg:block relative h-[260px]">
              {SERVICES_DATA.map((service, index) => {
                const anim = getServiceTextAnimation(index, deckProgress);
                return (
                  <div
                    key={`desc-${service.id}`}
                    style={{
                      opacity: anim.opacity,
                      transform: `translate3d(0, ${anim.translateY}px, 0)`,
                      pointerEvents: anim.opacity > 0.5 ? 'auto' : 'none',
                      willChange: 'transform, opacity',
                    }}
                    className="absolute inset-0 flex flex-col justify-center text-left pr-4"
                  >
                    <p className="text-slate-900 text-base sm:text-lg lg:text-xl leading-relaxed font-semibold font-sans">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* PHASE 4: DESKTOP WORKS */}
      <div
        style={{
          transform: `translate3d(0, ${worksSheetTranslateY}vh, 0)`,
          pointerEvents: phase4TransitionP < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f4f7fa] text-slate-950 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col z-30 pointer-events-auto overflow-visible"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 shrink-0 z-40 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left items-start mb-4">
          <div className="text-left items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-2 font-sans leading-tight text-left">
              Work That Moves the Needle
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-lg font-sans leading-relaxed text-left">
              Long-term engagements where design, engineering and automation shipped together.
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('Works');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer shrink-0 font-sans"
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
        className="absolute inset-0 w-full h-full bg-[#f5f3ec] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.3)] flex flex-col z-40 pointer-events-auto overflow-hidden select-none"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 flex flex-col flex-1 pb-6">
          <div className="w-full text-left items-start shrink-0 mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 font-sans leading-tight text-left">
              Our Operating Standards
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xl font-sans leading-relaxed text-left">
              Battle-tested frameworks designed to align operations, validate technical benchmarks, and drive measurable impact.
            </p>
          </div>

          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center items-stretch my-auto">
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
        className="absolute inset-0 w-full h-full bg-white text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.15)] z-50 pointer-events-auto select-none overflow-hidden"
      >
        <div
          ref={tailInnerRef}
          style={{
            transform: `translate3d(0, ${tailInnerTranslateY}px, 0)`,
            willChange: 'transform',
          }}
          className="w-full flex flex-col justify-between min-h-full"
        >
          {/* BRANDS THAT TRUST US SECTION */}
          <div className="w-full pt-16 sm:pt-20 bg-white">
            <BrandsTrustUsSection progress={progress} isMobile={false} />
          </div>

          <div className="w-full py-8">
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
