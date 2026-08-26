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
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const SERVICES_CATALOG = [
  // SET 1 (Cards 1 - 4)
  [
    {
      id: 1,
      title: 'WEBSITE DESIGN & DEVELOPMENT',
      subtext: 'Custom, responsive websites that represent your brand and drive results.',
      icon: Code2,
      initialRotate: -3,
      bgClass: 'bg-[#c73827]'
    },
    {
      id: 2,
      title: 'DIGITAL MARKETING',
      subtext: 'SEO, PPC, social media marketing, and content to grow your online presence.',
      icon: TrendingUp,
      initialRotate: 2,
      bgClass: 'bg-[#1351d8]'
    },
    {
      id: 3,
      title: 'E-COMMERCE SOLUTIONS',
      subtext: 'Complete online store development and seamless order management solutions.',
      icon: ShoppingBag,
      initialRotate: -2,
      bgClass: 'bg-[#0e593c]'
    },
    {
      id: 4,
      title: 'CRM & CUSTOMER MANAGEMENT',
      subtext: 'Manage leads, customers, and relationships efficiently in one system.',
      icon: UserCheck,
      initialRotate: 4,
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
      initialRotate: -4,
      bgClass: 'bg-[#0284c7]'
    },
    {
      id: 6,
      title: 'RAG SYSTEMS FOR BUSINESS',
      subtext: 'Build intelligent AI systems that understand your custom data with precision.',
      icon: BrainCircuit,
      initialRotate: 3,
      bgClass: 'bg-[#a82828]'
    },
    {
      id: 7,
      title: 'CUSTOM AI AGENTS & CHATBOTS',
      subtext: 'AI-powered chatbots and agents to engage leads and automate support.',
      icon: Bot,
      initialRotate: -2,
      bgClass: 'bg-[#059669]'
    },
    {
      id: 8,
      title: 'BUSINESS AUTOMATION',
      subtext: 'End-to-end operational automation for approvals, alerts, and processes.',
      icon: Layers,
      initialRotate: 4,
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
      initialRotate: -3,
      bgClass: 'bg-[#00b4d8]'
    },
    {
      id: 10,
      title: 'IT SUPPORT & SECURITY',
      subtext: 'Network security, data protection, backups, and dependable IT support.',
      icon: ShieldCheck,
      initialRotate: 2,
      bgClass: 'bg-[#0f766e]'
    },
    {
      id: 11,
      title: 'DATA ANALYTICS & REPORTING',
      subtext: 'Turn raw metrics into visual insights with dashboards, reports, and analytics.',
      icon: PieChart,
      initialRotate: -4,
      bgClass: 'bg-[#8b5cf6]'
    },
    {
      id: 12,
      title: 'CONTENT CREATION',
      subtext: 'High-converting copy, multimedia graphics, promo videos, and ad creatives.',
      icon: PenTool,
      initialRotate: 3,
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
      initialRotate: -2,
      bgClass: 'bg-[#2563eb]'
    },
    {
      id: 14,
      title: 'SOCIAL MEDIA MANAGEMENT',
      subtext: 'Content calendars, scheduled posting, and engagement that grows community.',
      icon: Compass,
      initialRotate: 4,
      bgClass: 'bg-[#0369a1]'
    },
    {
      id: 15,
      title: 'MOBILE APP DEVELOPMENT',
      subtext: 'Custom Android and iOS apps with smooth, modern user experiences.',
      icon: AppWindow,
      initialRotate: -3,
      bgClass: 'bg-[#10b981]'
    },
    {
      id: 16,
      title: 'BRANDING & DESIGN',
      subtext: 'Logo design, visual identity guidelines, and UI/UX design systems.',
      icon: Palette,
      initialRotate: 3,
      bgClass: 'bg-[#9333ea]'
    }
  ]
];

export default function ServicesPage({ onNavigate }) {
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  // Minimal Quote Form State
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleCardClick = (title) => {
    setSelectedService(title);
    targetProgressRef.current = 0.95;
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

  const updateTargetProgress = (delta) => {
    targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
  };

  useEffect(() => {
    // Lock body scrolling so viewport is 100% frozen in place
    document.body.style.overflow = 'hidden';

    // Wheel event handler updating target progress
    const handleWheel = (e) => {
      const sensitivity = 0.00018;
      updateTargetProgress(e.deltaY * sensitivity);
    };

    // Touch support for mobile & touchpad gestures
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      updateTargetProgress(deltaY * 0.00020);
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

    // Silky Smooth requestAnimationFrame Physics Lerp Loop (0.09 lerp weight for fluid response)
    let animId;
    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00002) {
        currentProgressRef.current += diff * 0.09;
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
  // OVERLAPPING TIMELINE MATH (0.00 -> 1.00)
  // --------------------------------------------------------------------------

  // Hero Banner Opacity (0.00 -> 0.12)
  const heroOpacity = Math.max(0, 1 - progress / 0.10);
  const heroTranslateY = -progress * 120;

  // 4 Card Set Progress Windows:
  // Set 0 (Cards 1-4): 0.08 -> 0.28
  // Set 1 (Cards 5-8): 0.28 -> 0.48
  // Set 2 (Cards 9-12): 0.48 -> 0.68
  // Set 3 (Cards 13-16): 0.68 -> 0.88
  // Footer Tail Sheet: 0.84 -> 1.00

  const tailProgress = Math.min(1, Math.max(0, (progress - 0.84) / 0.16));
  const footerSheetTranslateY = (1 - tailProgress) * 100;

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-10 bg-[#f8fafc] text-slate-900 select-none font-sans">
      
      {/* Universal Fixed Adaptive Navbar */}
      <Navbar progress={0.32} onNavigate={onNavigate} activePage="Services" />

      {/* Interactive KineticGrid Canvas Background at z-0 (Lighter Grid Theme) */}
      <KineticGrid
        spacing={64}
        dotSize={2}
        gridStroke={1}
        gridOpacity={0.45}
        repulsion={5}
        radius={60}
        stiffness={1.0}
        damping={0.09}
        clickIntensity={30}
        trailIntensity={0.15}
        backgroundColor="#f8fafc"
        lineColor="#cbd5e1"
        dotColor="#94a3b8"
      />

      {/* HERO BANNER OVERLAY */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0)`,
          pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center max-w-5xl mx-auto z-20"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-700 text-[11px] font-mono font-semibold tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>OUR SERVICES CATALOG</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.05] font-sans">
          Comprehensive Digital &amp; <br />
          <span className="text-slate-900">
            AI Engineering Solutions
          </span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed font-sans">
          Scroll down to draw each set of service cards out of the stack.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2 text-slate-400 text-[11px] font-mono uppercase tracking-widest">
          <span>Scroll to draw cards</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-400 flex justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-slate-950 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4 CARD SETS CENTERED VIEWPORT                                         */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-20 px-4 sm:px-8">
        
        {/* CENTERED STACK VIEWPORT */}
        <div className="relative w-full max-w-7xl h-[380px] sm:h-[500px] flex items-center justify-center">
          {SERVICES_CATALOG.map((cardSet, setIdx) => {
            const windowStart = 0.08 + setIdx * 0.20;
            const windowEnd = windowStart + 0.20;

            const isActive = progress >= windowStart && (setIdx === 3 ? progress <= 1.0 : progress < windowEnd);

            if (!isActive) {
              return (
                <div
                  key={setIdx}
                  style={{ opacity: 0, pointerEvents: 'none' }}
                  className="absolute inset-x-0 w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6"
                />
              );
            }

            const p = Math.min(1, Math.max(0, (progress - windowStart) / 0.20));

            let scale = 0.85;
            let y = 140;
            let opacity = 1;
            let isSettled = false;

            if (setIdx === 3) {
              // Set 4 (Last Group): Draws up, settles, and fades out cleanly as footer sheet slides up
              if (p < 0.45) {
                const p1 = p / 0.45;
                const easeP1 = 1 - Math.pow(1 - p1, 2);
                scale = 0.85 + 0.15 * easeP1;
                y = 140 * (1 - easeP1);
                opacity = Math.min(1, p1 * 2);
              } else {
                scale = 1.0;
                y = 0;
                // Fade out cleanly as tailProgress (footer sheet) slides up
                opacity = Math.max(0, 1 - tailProgress * 2.0);
                isSettled = true;
              }
            } else {
              // Sets 1, 2, 3: Draw, hold, and exit upward
              if (p < 0.40) {
                const p1 = p / 0.40;
                const easeP1 = 1 - Math.pow(1 - p1, 2);
                scale = 0.85 + 0.15 * easeP1;
                y = 140 * (1 - easeP1);
                opacity = Math.min(1, p1 * 2);
              } else if (p <= 0.70) {
                scale = 1.0;
                y = 0;
                opacity = 1;
                isSettled = true;
              } else {
                const p3 = (p - 0.70) / 0.30;
                scale = 1.0 - p3 * 0.05;
                y = -180 * p3;
                opacity = Math.max(0, 1 - p3 * 1.5);
                isSettled = true;
              }
            }

            return (
              <div
                key={setIdx}
                style={{
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 20,
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-x-0 w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 pointer-events-auto max-h-[360px] sm:max-h-none"
              >
                {cardSet.map((service, cardIdx) => {
                  const IconComp = service.icon;
                  const rotateDeg = isSettled ? 0 : service.initialRotate;
                  const cardStaggerY = isSettled ? 0 : (1 - p) * ((cardIdx - 1.5) * 12);

                  return (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(service.title)}
                      style={{
                        transform: `translate3d(0, ${cardStaggerY}px, 0) rotate(${rotateDeg}deg)`,
                        transformOrigin: 'center center',
                        willChange: 'transform',
                      }}
                      className={`group relative ${service.bgClass} text-white rounded-[20px] sm:rounded-[28px] p-3 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/20 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1.5 cursor-pointer h-[170px] sm:h-auto overflow-hidden`}
                    >
                      {/* Top Centered Vector Icon Badge */}
                      <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-1.5 sm:mb-4 shadow-md ring-2 sm:ring-4 ring-white/25 group-hover:scale-110 transition-all duration-300 shrink-0">
                        <IconComp className="w-4 h-4 sm:w-7 sm:h-7" strokeWidth={1.75} />
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1 my-auto">
                        <h3 className="text-[11px] sm:text-base font-extrabold tracking-tight text-white uppercase leading-tight font-sans line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-[9px] sm:text-xs text-white/90 leading-tight font-normal font-sans line-clamp-2">
                          {service.subtext}
                        </p>
                      </div>

                      {/* Bottom Action Line */}
                      <div className="pt-1.5 mt-auto border-t border-white/20 w-full flex items-center justify-center shrink-0">
                        <span className="text-[9px] sm:text-[11px] font-bold text-white group-hover:text-white/80 transition-colors inline-flex items-center gap-1 font-mono uppercase">
                          <span>Get Quote</span>
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Set Indicator Dots */}
        <div className="absolute bottom-6 z-20 flex items-center gap-2">
          {SERVICES_CATALOG.map((_, idx) => {
            let activeIdx = 0;
            if (progress >= 0.28 && progress < 0.48) activeIdx = 1;
            else if (progress >= 0.48 && progress < 0.68) activeIdx = 2;
            else if (progress >= 0.68) activeIdx = 3;

            return (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIdx === idx ? 'w-8 bg-slate-950' : 'w-2 bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MINIMAL SERVICE QUOTE FORM & FOOTER TAIL SLIDING SHEET (0.84 -> 1.00)  */}
      {/* ==================================================================== */}
      <div
        style={{
          transform: `translate3d(0, ${footerSheetTranslateY}vh, 0)`,
          pointerEvents: tailProgress < 0.05 ? 'none' : 'auto',
          willChange: 'transform',
        }}
        className="absolute inset-0 w-full h-full bg-[#f8fafc] text-slate-900 shadow-[0_-30px_80px_rgba(0,0,0,0.12)] border-t border-slate-200 flex flex-col justify-between pt-12 px-4 sm:px-8 pb-0 z-40 pointer-events-auto overflow-y-auto"
      >
        <div className="max-w-2xl mx-auto w-full my-auto py-6 px-4 sm:px-6">
          
          {/* Section Badge & Title */}
          <div className="text-center mb-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-700 font-mono text-[11px] font-semibold tracking-widest uppercase mb-2">
              05 / GET A CUSTOM QUOTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Request a Service Quote
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-normal font-sans">
              Select your required service and enter basic details for a tailored project estimate.
            </p>
          </div>

          {/* Minimal Form Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            {quoteSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 font-sans">Quote Request Submitted!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. We've received your request for <span className="font-semibold text-slate-900">{selectedService || 'our services'}</span> and will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                
                {/* Select Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                    Select Service *
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all cursor-pointer"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name / Organization"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all"
                    />
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 font-mono">
                    Project Details &amp; Scope
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe your requirements or timeline..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-950 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 font-sans"
                >
                  <span>Submit Quote Request</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Tail Component Flush at Bottom */}
        <div className="w-full shrink-0 mt-auto">
          <Footer onNavigate={onNavigate} />
        </div>
      </div>

    </div>
  );
}
