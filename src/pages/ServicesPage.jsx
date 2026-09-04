import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import KineticGrid from '../components/KineticGrid';
import { Footer } from '../components/Footer';
import {
  Code2,
  TrendingUp,
  ShoppingBag,
  UserCheck,
  Workflow,
  BrainCircuit,
  Bot,
  Layers,
  Server,
  ShieldCheck,
  PieChart,
  PenTool,
  Send,
  Compass,
  AppWindow,
  Palette,
  ArrowUpRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SERVICES_CATALOG = [
  // SET 1 (Cards 1 - 4)
  [
    {
      id: 1,
      title: 'WEBSITE DESIGN & DEVELOPMENT',
      subtext: 'Custom, responsive websites that represent your brand and drive results.',
      icon: Code2,
      cat: 'WEB ENGINEERING',
      bgClass: 'bg-[#c73827]'
    },
    {
      id: 2,
      title: 'DIGITAL MARKETING',
      subtext: 'SEO, PPC, social media marketing, and content to grow your online presence.',
      icon: TrendingUp,
      cat: 'GROWTH & MARKETING',
      bgClass: 'bg-[#1351d8]'
    },
    {
      id: 3,
      title: 'E-COMMERCE SOLUTIONS',
      subtext: 'Complete online store development and seamless order management solutions.',
      icon: ShoppingBag,
      cat: 'COMMERCE SYSTEMS',
      bgClass: 'bg-[#0e593c]'
    },
    {
      id: 4,
      title: 'CRM & CUSTOMER MANAGEMENT',
      subtext: 'Manage leads, customers, and relationships efficiently in one system.',
      icon: UserCheck,
      cat: 'ENTERPRISE CRM',
      bgClass: 'bg-[#7c3aed]'
    }
  ],
  // SET 2 (Cards 5 - 8)
  [
    {
      id: 5,
      title: 'AI AUTOMATION & INTEGRATION',
      subtext: 'Automate workflows, save valuable time, and reduce manual tasks with tailored AI.',
      icon: Workflow,
      cat: 'AI AUTOMATION',
      bgClass: 'bg-[#0284c7]'
    },
    {
      id: 6,
      title: 'RAG SYSTEMS FOR BUSINESS',
      subtext: 'Build intelligent AI systems that understand your custom data with precision.',
      icon: BrainCircuit,
      cat: 'KNOWLEDGE RAG',
      bgClass: 'bg-[#a82828]'
    },
    {
      id: 7,
      title: 'CUSTOM AI AGENTS & CHATBOTS',
      subtext: 'AI-powered chatbots and agents to engage leads and automate support.',
      icon: Bot,
      cat: 'AUTONOMOUS AGENTS',
      bgClass: 'bg-[#059669]'
    },
    {
      id: 8,
      title: 'BUSINESS AUTOMATION',
      subtext: 'End-to-end operational automation for approvals, alerts, and processes.',
      icon: Layers,
      cat: 'OPERATIONS',
      bgClass: 'bg-[#4f46e5]'
    }
  ],
  // SET 3 (Cards 9 - 12)
  [
    {
      id: 9,
      title: 'CLOUD SERVICES',
      subtext: 'Cloud storage, high-speed hosting, deployments, and scalable infrastructure.',
      icon: Server,
      cat: 'CLOUD & DEVOPS',
      bgClass: 'bg-[#00b4d8]'
    },
    {
      id: 10,
      title: 'IT SUPPORT & SECURITY',
      subtext: 'Network security, data protection, backups, and dependable IT support.',
      icon: ShieldCheck,
      cat: 'SECURITY & INFRA',
      bgClass: 'bg-[#0f766e]'
    },
    {
      id: 11,
      title: 'DATA ANALYTICS & REPORTING',
      subtext: 'Turn raw metrics into visual insights with dashboards, reports, and analytics.',
      icon: PieChart,
      cat: 'DATA ANALYTICS',
      bgClass: 'bg-[#8b5cf6]'
    },
    {
      id: 12,
      title: 'CONTENT CREATION',
      subtext: 'High-converting copy, multimedia graphics, promo videos, and ad creatives.',
      icon: PenTool,
      cat: 'CREATIVE MEDIA',
      bgClass: 'bg-[#dc2626]'
    }
  ],
  // SET 4 (Cards 13 - 16)
  [
    {
      id: 13,
      title: 'EMAIL MARKETING & AUTOMATION',
      subtext: 'Build campaigns, trigger workflows, and nurture leads that convert.',
      icon: Send,
      cat: 'EMAIL AUTOMATION',
      bgClass: 'bg-[#2563eb]'
    },
    {
      id: 14,
      title: 'SOCIAL MEDIA MANAGEMENT',
      subtext: 'Content calendars, scheduled posting, and engagement that grows community.',
      icon: Compass,
      cat: 'SOCIAL MEDIA',
      bgClass: 'bg-[#0369a1]'
    },
    {
      id: 15,
      title: 'MOBILE APP DEVELOPMENT',
      subtext: 'Custom Android and iOS apps with smooth, modern user experiences.',
      icon: AppWindow,
      cat: 'MOBILE APPS',
      bgClass: 'bg-[#10b981]'
    },
    {
      id: 16,
      title: 'BRANDING & DESIGN',
      subtext: 'Logo design, visual identity guidelines, and UI/UX design systems.',
      icon: Palette,
      cat: 'BRAND IDENTITY',
      bgClass: 'bg-[#9333ea]'
    }
  ]
];

export default function ServicesPage({ onNavigate, initialStep = 0, initialService = '' }) {
  // Step Index State (0: Set 1, 1: Set 2, 2: Set 3, 3: Set 4, 4: Tail Section)
  const [activeStep, setActiveStep] = useState(initialStep);
  const [selectedService, setSelectedService] = useState(initialService);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const totalSteps = 5; // 4 Card Sets + 1 Tail Form & Footer

  useEffect(() => {
    if (initialStep !== undefined && initialStep !== null) {
      setActiveStep(initialStep);
    }
    if (initialService) {
      const allServices = SERVICES_CATALOG.flat();
      const match = allServices.find((s) =>
        s.title.toLowerCase() === initialService.toLowerCase() ||
        s.title.toLowerCase().includes(initialService.toLowerCase()) ||
        initialService.toLowerCase().includes(s.title.toLowerCase())
      );
      setSelectedService(match ? match.title : initialService);
    }
  }, [initialStep, initialService]);

  const handleCardClick = (title) => {
    setSelectedService(title);
    setActiveStep(4); // Jump to Quote Form
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setFormData({ name: '', email: '', details: '' });
      setSelectedService('');
    }, 4500);
  };

  const nextStep = () => {
    setActiveStep((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    // Pin body overflow for smooth GPU step transitions
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    let isCooldown = false;

    const handleWheel = (e) => {
      if (isCooldown) return;
      if (Math.abs(e.deltaY) < 15) return;

      isCooldown = true;
      if (e.deltaY > 0) {
        setActiveStep((prev) => Math.min(totalSteps - 1, prev + 1));
      } else {
        setActiveStep((prev) => Math.max(0, prev - 1));
      }

      setTimeout(() => {
        isCooldown = false;
      }, 500); // 500ms smooth debounce interval
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 35) {
        if (diffY > 0) {
          setActiveStep((prev) => Math.min(totalSteps - 1, prev + 1));
        } else {
          setActiveStep((prev) => Math.max(0, prev - 1));
        }
      }
    };

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        nextStep();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        prevStep();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      document.documentElement.style.overscrollBehavior = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 bg-[#f8fafc] text-slate-900 select-none font-sans">
      
      {/* Universal Fixed Adaptive Navbar */}
      <Navbar progress={0.32} onNavigate={onNavigate} activePage="Services" />

      {/* Interactive KineticGrid Canvas Background */}
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
        hoverColor="#6366f1"
      />

      {/* ==================================================================== */}
      {/* CENTERED VIEWPORT: HEADER & CARDS STACKED PERFECTLY TOGETHER         */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-16 sm:pt-20 pb-6 px-3 sm:px-8 z-20">
        
        {/* HERO TITLE HEADER POSITIONED DIRECTLY ABOVE THE CARDS */}
        <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-6 pointer-events-none z-10 shrink-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight font-sans">
            Comprehensive Digital &amp; AI Engineering Solutions
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1.5 leading-relaxed max-w-lg mx-auto font-sans">
            Four specialized disciplines designed to build, scale, and automate modern enterprise operations.
          </p>
        </div>

        {/* CENTERED STACK VIEWPORT */}
        <div className="relative w-full max-w-7xl h-[340px] sm:h-[480px] flex items-center justify-center">
          {SERVICES_CATALOG.map((cardSet, setIdx) => {
            const isCurrent = activeStep === setIdx;
            const isBefore = activeStep > setIdx;

            return (
              <div
                key={setIdx}
                className={`absolute inset-x-0 w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : isBefore
                    ? 'opacity-0 -translate-y-24 scale-95 pointer-events-none'
                    : 'opacity-0 translate-y-24 scale-95 pointer-events-none'
                }`}
              >
                {cardSet.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.title)}
                    className={`group relative h-[165px] sm:h-[370px] rounded-2xl sm:rounded-3xl ${card.bgClass} text-white p-3.5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.28)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 flex flex-col justify-between border border-white/20 overflow-hidden cursor-pointer`}
                  >
                    {/* Subtle Glass Glow Highlight */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="flex justify-between items-start z-10">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:bg-white group-hover:text-slate-950">
                        <card.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-white/80">
                        #{card.id}
                      </span>
                    </div>

                    <div className="space-y-1 sm:space-y-2 mt-auto z-10">
                      <div className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider">
                        {card.cat}
                      </div>
                      <h3 className="text-xs sm:text-lg font-bold text-white leading-snug group-hover:text-white/90 transition-colors line-clamp-2 font-sans">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-[10px] sm:text-xs leading-tight sm:leading-relaxed font-normal line-clamp-2 font-sans">
                        {card.subtext}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-xs font-bold text-white z-10">
                      <span>Request Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* HARDWARE-ACCELERATED TAIL SECTION: QUOTE FORM & FOOTER (STEP 4)       */}
      {/* ==================================================================== */}
      <div
        className={`absolute inset-0 w-full h-full bg-[#f8fafc] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.12)] border-t border-slate-200 flex flex-col justify-between pt-10 sm:pt-14 px-4 sm:px-12 pb-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
          activeStep === 4 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-2xl mx-auto w-full my-auto py-4 sm:py-6 px-4 sm:px-6">
          
          {/* Section Badge & Title */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight font-sans leading-tight">
              Request a Service Quote
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-normal font-sans leading-relaxed">
              Select your required service and enter basic details for a tailored project estimate.
            </p>
          </div>

          {/* Minimal Form Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
            {quoteSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 font-sans">Quote Request Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. We've received your request for <span className="font-semibold text-slate-900">{selectedService || 'our services'}</span> and will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5 sm:space-y-4">
                
                {/* Select Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 font-mono">
                    Select Service *
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all cursor-pointer"
                  >
                    <option value="">-- Choose a Service --</option>
                    {SERVICES_CATALOG.flat().map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                    <option value="Custom / Full-Stack Enterprise Solution">
                      Custom / Full-Stack Enterprise Solution
                    </option>
                  </select>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name / Organization"
                      className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                    />
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 font-mono">
                    Project Details &amp; Scope
                  </label>
                  <textarea
                    rows={2}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe your requirements or timeline..."
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 font-sans"
                >
                  <span>Submit Quote Request</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Component Flush at Bottom */}
        <div className="w-full shrink-0 mt-auto">
          <Footer onNavigate={onNavigate} />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* ULTRA-CLEAN STEP NAVIGATION DOTS & ARROWS                            */}
      {/* ==================================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 p-2 rounded-full shadow-2xl text-white">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Previous Batch"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === idx ? 'w-6 bg-[#00b4d8]' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              title={idx === 4 ? "Get Quote & Footer" : `Services Set ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={activeStep === totalSteps - 1}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Next Batch"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
