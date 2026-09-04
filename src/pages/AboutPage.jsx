import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import KineticGrid from '../components/KineticGrid';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BorderBeam } from '@/registry/magicui/border-beam';
import { MagicCard } from '@/registry/magicui/magic-card';
import { NumberTicker } from '@/registry/magicui/number-ticker';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);

try {
  CustomEase.create('fadeUpEase', '0.16, 1, 0.3, 1');
} catch (e) {
  // ease already defined
}

import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Bot,
  GraduationCap,
  Users,
  Briefcase,
  TrendingUp,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Terminal,
  Compass,
  Zap,
  Building2,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function AboutPage({ onNavigate, isPageRevealed = true }) {
  const heroSectionRef = useRef(null);
  const headlineRef = useRef(null);
  const underlineRef = useRef(null);
  const cardRef = useRef(null);

  // Section 03 Origin refs
  const originSectionRef = useRef(null);
  const archHeadlineRef = useRef(null);
  const originCardsRef = useRef(null);
  const tracingBeamLineRef = useRef(null);
  const tracingBeamGlowRef = useRef(null);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);

  // Section 05 Focus Cards hover states
  const [hoveredLeader, setHoveredLeader] = useState(null);
  const [hoveredSpecialist, setHoveredSpecialist] = useState(null);

  useEffect(() => {
    document.title = 'About Us | Integrate Thought — Digital Engineering & Academy';
    window.scrollTo(0, 0);

    if (!isPageRevealed || !headlineRef.current) return;

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const underlineTarget =
      headlineRef.current.querySelector('.hero-system-underline') || underlineRef.current;

    if (isReduced) {
      if (underlineTarget) {
        gsap.set(underlineTarget, { scaleX: 1 });
      }
      if (archHeadlineRef.current) {
        gsap.set(archHeadlineRef.current.querySelectorAll('.arch-word'), { opacity: 1, y: 0, filter: 'none' });
      }
      if (tracingBeamLineRef.current) {
        gsap.set(tracingBeamLineRef.current, { scaleY: 1 });
      }
      if (dot1Ref.current) gsap.set(dot1Ref.current, { opacity: 1, scale: 1 });
      if (dot2Ref.current) gsap.set(dot2Ref.current, { opacity: 1, scale: 1 });
      if (dot3Ref.current) gsap.set(dot3Ref.current, { opacity: 1, scale: 1 });
      return;
    }

    let split;
    let tl;
    let scrollTriggerInstance;
    let archScrollTrigger;
    let beamScrollTrigger;

    try {
      split = new SplitText(headlineRef.current, {
        type: 'lines',
        linesClass: 'split-line',
      });

      tl = gsap.timeline({ delay: 0.05 });

      tl.from(split.lines, {
        y: 18,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: 'fadeUpEase',
      });

      const activeUnderline =
        headlineRef.current.querySelector('.hero-system-underline') || underlineTarget;

      if (activeUnderline) {
        gsap.set(activeUnderline, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(
          activeUnderline,
          {
            scaleX: 1,
            duration: 0.32,
            ease: 'fadeUpEase',
          },
          '+=0.08'
        );
      }
    } catch (err) {
      console.warn('SplitText animation error:', err);
    }

    // Parallax drift on the product mockup card
    if (cardRef.current && heroSectionRef.current) {
      const parallaxTween = gsap.to(cardRef.current, {
        y: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      scrollTriggerInstance = parallaxTween.scrollTrigger;

      if (window.lenis) {
        window.lenis.on('scroll', ScrollTrigger.update);
      }
    }

    // Section 03 Origin — Word-by-word reveal of "It's an architecture failure."
    if (archHeadlineRef.current) {
      const words = archHeadlineRef.current.querySelectorAll('.arch-word');
      const archTween = gsap.fromTo(
        words,
        { opacity: 0, y: 14, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          stagger: 0.12,
          ease: 'fadeUpEase',
          scrollTrigger: {
            trigger: archHeadlineRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      archScrollTrigger = archTween.scrollTrigger;
    }

    // Section 03 Origin — Tracing Beam scrubbed down the 3 cards & lighting dots
    if (originCardsRef.current && tracingBeamLineRef.current) {
      const beamTl = gsap.timeline({
        scrollTrigger: {
          trigger: originCardsRef.current,
          start: 'top 75%',
          end: 'bottom 65%',
          scrub: 0.5,
        },
      });

      // 1. Scrub the tracing beam line scaleY from 0 to 1
      beamTl.to(
        tracingBeamLineRef.current,
        {
          scaleY: 1,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 2. Move glowing tracer head down with the beam
      if (tracingBeamGlowRef.current) {
        beamTl.fromTo(
          tracingBeamGlowRef.current,
          { opacity: 0, top: '0%' },
          { opacity: 1, top: '100%', ease: 'none', duration: 1 },
          0
        );
      }

      // 3. Light up Card 1 dot (Red) when beam reaches Card 1
      if (dot1Ref.current) {
        beamTl.to(
          dot1Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(239, 68, 68, 0.95), 0 0 4px #ef4444',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.06
        );
      }

      // 4. Light up Card 2 dot (Sky Blue) when beam reaches Card 2
      if (dot2Ref.current) {
        beamTl.to(
          dot2Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(2, 132, 199, 0.95), 0 0 4px #0284c7',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.48
        );
      }

      // 5. Light up Card 3 dot (Emerald Green) when beam reaches Card 3
      if (dot3Ref.current) {
        beamTl.to(
          dot3Ref.current,
          {
            scale: 1.35,
            opacity: 1,
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.95), 0 0 4px #10b981',
            duration: 0.15,
            ease: 'power2.out',
          },
          0.86
        );
      }

      beamScrollTrigger = beamTl.scrollTrigger;
    }

    return () => {
      if (split) split.revert();
      if (tl) tl.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (archScrollTrigger) archScrollTrigger.kill();
      if (beamScrollTrigger) beamScrollTrigger.kill();
    };
  }, [isPageRevealed]);

  const [activePillar, setActivePillar] = useState('engineering');

  // Exact Team details provided by leadership
  const LEADERSHIP_TEAM = [
    {
      name: 'Aravind Kamoju',
      role: 'Chief Executive Officer',
      initials: 'AK',
      domain: 'Strategy & Brand Vision',
      badge: 'Executive',
      bio: 'Leading the overarching strategic trajectory of Integrate Thought, bridging commercial client partnerships with long-term technological vision.',
      accent: 'from-sky-500/20 to-blue-600/10 text-sky-600 border-sky-200/80',
    },
    {
      name: 'Venkatesh',
      role: 'Chief Technology Officer',
      initials: 'V',
      domain: 'Systems Architecture & AI',
      badge: 'Architecture',
      bio: 'Directing technical strategy, system reliability, RAG retrieval frameworks, and modern architectural standards across production deployments.',
      accent: 'from-violet-500/20 to-purple-600/10 text-violet-600 border-violet-200/80',
    },
    {
      name: 'Manohar',
      role: 'Operations Manager',
      initials: 'M',
      domain: 'Operational Logistics & Delivery',
      badge: 'Operations',
      bio: 'Orchestrating agile delivery workflows, client engagement pipelines, cross-functional sprint cadences, and internal operations.',
      accent: 'from-amber-500/20 to-orange-600/10 text-amber-600 border-amber-200/80',
    },
    {
      name: 'Ravi Teja',
      role: 'Development Head',
      initials: 'RT',
      domain: 'Engineering Execution & Standards',
      badge: 'Development',
      bio: 'Overseeing codebase health, multi-tier engineering pipelines, code reviews, and mentoring senior developer output.',
      accent: 'from-emerald-500/20 to-teal-600/10 text-emerald-600 border-emerald-200/80',
    },
  ];

  const ENGINEERING_SPECIALISTS = [
    {
      name: 'Aravindh',
      role: 'Full Stack Developer',
      initials: 'A',
      domain: 'Modern React & Web Platforms',
      badge: 'Frontend & API',
      bio: 'Crafting responsive user interfaces, state synchronization engines, and high-performance interactive web experiences.',
      accent: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      name: 'Surya Teja',
      role: 'Backend & AI Developer',
      initials: 'ST',
      domain: 'Autonomous Pipelines & RAG Systems',
      badge: 'AI & Data',
      bio: 'Architecting vector pipelines, LLM retrieval chains, secure microservices, and automated webhook event systems.',
      accent: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      name: 'Sai Krishna',
      role: 'Full Stack Developer',
      initials: 'SK',
      domain: 'Full-Stack Applications & Cloud',
      badge: 'End-to-End Build',
      bio: 'Engineering scalable database schemas, backend endpoints, containerized workflows, and resilient digital architectures.',
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
  ];

  const CORE_PRINCIPLES = [
    {
      id: '01',
      title: 'Architecture Precedes Code',
      category: 'ENGINEERING DISCIPLINE',
      description:
        'We never write code in search of a problem. Every system begins by mapping operational physics, data bottlenecks, and user intent to build resilient solutions on 5-year horizons.',
      icon: Compass,
    },
    {
      id: '02',
      title: 'Pragmatic AI & High Leverage',
      category: 'APPLIED INTELLIGENCE',
      description:
        'We steer clear of superficial "AI wrapper" hype. We engineer private vector databases, deterministic RAG retrieval, and autonomous background triggers that reliably eliminate manual labor.',
      icon: Cpu,
    },
    {
      id: '03',
      title: 'Apprenticeship Over Abstract Theory',
      category: 'ACADEMY PHILOSOPHY',
      description:
        'Software cannot be learned purely from slide decks. In our training programs and internships, students write live pull requests, debug production issues, and learn real industry engineering.',
      icon: GraduationCap,
    },
    {
      id: '04',
      title: 'Measurable Operational Leverage',
      category: 'BUSINESS IMPACT',
      description:
        'Technology is only valuable if it moves the needle. We track our impact by operational velocity, eliminated clerical errors, and tangible growth across our 20+ client engagements.',
      icon: TrendingUp,
    },
  ];

  const CONVENTIONAL_ITEMS = [
    {
      title: 'Generic Templates',
      description: 'Reusing off-the-shelf themes with brittle code and low performance.',
    },
    {
      title: 'Superficial "AI"',
      description: 'Slapping generic ChatGPT wrappers onto websites without private data grounding.',
    },
    {
      title: 'Disconnected Silos',
      description: 'Leaving the client with 15 disjointed tools requiring manual clerical sync.',
    },
    {
      title: 'Theoretical Education',
      description: 'Bootcamps teaching syntax memorization without staging environments or real PRs.',
    },
  ];

  const INTEGRATE_THOUGHT_ITEMS = [
    {
      title: 'First-Principles Architecture',
      description: 'Bespoke React, Node, and Python engines tailored specifically to business physics.',
    },
    {
      title: 'Pragmatic RAG & Agents',
      description: 'Vector retrieval over your private business data, driving real operational automation.',
    },
    {
      title: 'Unified Ecosystem',
      description: 'Connecting websites, CRMs, order management, and telemetry into one frictionless pipeline.',
    },
    {
      title: 'Living Production Mentorship',
      description: 'Interns and students learn on genuine staging codebases, building authentic engineering muscle.',
    },
  ];

  const leftColumnVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 0.95,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.08,
      },
    },
  };

  const rightColumnVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      boxShadow: 'inset 0 0 0 1px rgba(16, 185, 129, 0), 0 0 0px rgba(16, 185, 129, 0)',
    },
    visible: {
      opacity: 1,
      y: 0,
      boxShadow: 'inset 0 0 0 1.5px rgba(16, 185, 129, 0.38), 0 0 32px -4px rgba(16, 185, 129, 0.2)',
      transition: {
        duration: 0.65,
        delay: 0.1, // enters ~100ms later than left column
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.2,
      },
    },
  };

  const comparisonRowVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const redXIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      x: 0,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      scale: [0.6, 1.15, 1],
      x: [0, -3.5, 3.5, -2, 1.5, 0],
      rotate: [0, -7, 7, -4, 3, 0],
      transition: {
        duration: 0.48,
        ease: 'easeOut',
      },
    },
  };

  const greenCheckIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.35, 0.92, 1],
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };


  const REAL_PROJECTS = [
    {
      title: 'AVS Hospitals',
      category: 'Healthcare Infrastructure & Patient Experience',
      image: '/Hero-Images/avs-hospitals-hero.png',
      summary:
        'Engineered a modern, accessible digital presence and clinical workflow architecture for one of the region’s premier healthcare institutions.',
      deliverables: ['Custom Web Architecture', 'Fast Triage UX', 'Patient Portal'],
    },
    {
      title: 'Brim Burgers',
      category: 'Consumer Brand Platform & E-Commerce',
      image: '/Hero-Images/brim-burgers-hero.png',
      summary:
        'Delivered an ultra-responsive digital storefront with dynamic menus, localized routing, and conversion-optimized visual hierarchy.',
      deliverables: ['Brand Experience System', 'E-Commerce Flow', 'High-Performance UI'],
    },
    {
      title: 'AP Mohan',
      category: 'Corporate Enterprise Architecture',
      image: '/Hero-Images/ap-mohan-hero.png',
      summary:
        'Designed and deployed an authoritative digital presence highlighting multi-sector commercial operations with high-fidelity typography.',
      deliverables: ['Enterprise Platform', 'Content Engine', 'Scalable Cloud Hosting'],
    },
    {
      title: 'Dr. Rathod Clinic',
      category: 'Specialized Medical Services Portal',
      image: '/Hero-Images/dr-rathod-hero.png',
      summary:
        'Streamlined patient inquiry pathways, doctor credentials, and consultation booking interfaces for specialized medical practice.',
      deliverables: ['Responsive Web App', 'Direct Inquiry Logic', 'SEO Optimization'],
    },
  ];

  function CaseStudyCard({ project, index }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ['start end', 'center 58%'],
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0], { clamp: true });
    const y = useTransform(scrollYProgress, [0, 1], [28, 0], { clamp: true });
    const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.65, 0.9, 1], { clamp: true });

    const isCardInView = useInView(cardRef, { once: true, margin: '-50px' });

    return (
      <div
        ref={cardRef}
        style={{ perspective: '1200px' }}
        className="w-full h-full"
      >
        <motion.div
          style={{
            rotateX,
            y,
            opacity,
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full"
        >
          <motion.div
            whileHover={{ scale: 1.025, y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-slate-300/70 hover:border-slate-300 transition-shadow duration-300 group flex flex-col justify-between h-full cursor-pointer"
          >
            {/* Browser Viewport Frame for Genuine Screenshot */}
            <div className="bg-slate-100 border-b border-slate-200/80 p-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 truncate ml-2">
                {project.title.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>

            {/* Screenshot Container with strict aspect ratio */}
            <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} Interface`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-sky-600 uppercase">
                  {project.category}
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight font-sans">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>

              {/* Tag pills with staggered delayed fade-in after card settles */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.35,
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate={isCardInView ? 'visible' : 'hidden'}
                className="pt-4 border-t border-slate-100 flex flex-wrap gap-2"
              >
                {project.deliverables.map((item) => (
                  <motion.span
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 6, scale: 0.94 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#eef4fa] text-slate-900 font-sans select-none overflow-x-hidden flex flex-col justify-between">
      <div>
        {/* Universal Navbar */}
        <Navbar activePage="About" onNavigate={onNavigate} />

        {/* ============================================================ */}
        {/* 01 — HERO SECTION: THE ASYMMETRIC EDITORIAL THESIS */}
        {/* ============================================================ */}
        <section
          ref={heroSectionRef}
          className="relative overflow-hidden w-full pt-36 sm:pt-42 lg:pt-48 pb-20 sm:pb-28 border-b border-slate-200/80 bg-[#eef4fa]"
        >
          {/* Subtle Interactive KineticGrid Canvas Confined to the First Section */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <KineticGrid
              className="!absolute inset-0 w-full h-full"
              spacing={64}
              dotSize={2}
              gridStroke={1}
              gridOpacity={0.18}
              repulsion={5}
              radius={60}
              stiffness={1.0}
              damping={0.09}
              clickIntensity={30}
              trailIntensity={0.15}
              backgroundColor="#eef4fa"
              lineColor="#cbd5e1"
              dotColor="#94a3b8"
              hoverColor="#0284c7"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            {/* Top Minimalist Context Eyebrow Bar */}
            <div className="flex items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-slate-200/70 text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-slate-500 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                <span>About / Integrate Thought</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-slate-400">
                <span>Studio &amp; Academy</span>
                <span className="text-slate-300">/</span>
                <span>Hyderabad, India</span>
              </div>
            </div>

            {/* Asymmetric 12-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 sm:pt-14 items-start">
              {/* Left Column (7 cols): Dominant Conceptual Headline */}
              <div className="lg:col-span-7 space-y-8">
                <h1
                  ref={headlineRef}
                  className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem] font-extrabold text-slate-950 tracking-[-0.03em] leading-[1.08] font-sans"
                >
                  <div>We believe technology</div>
                  <div>is built twice.</div>
                  <div className="text-[#0284c7]">
                    <span className="relative inline-block">
                      First in the system.
                      <span
                        ref={underlineRef}
                        className="hero-system-underline absolute left-0 -bottom-1 sm:-bottom-1.5 h-[3.5px] w-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0284c7] rounded-full origin-left scale-x-0 pointer-events-none"
                      />
                    </span>
                  </div>
                  <div className="text-slate-950">Then in the people behind it.</div>
                </h1>

                {/* Understated Single Continuation Cue */}
                <div className="pt-2 sm:pt-4">
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('story');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284c7] transition-colors group cursor-pointer"
                  >
                    <span>Explore our story &amp; methodology</span>
                    <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-[#0284c7]" />
                  </a>
                </div>
              </div>

              {/* Right Column (5 cols): Visual Anchor + Supporting Copy */}
              <div className="lg:col-span-5 space-y-6 lg:pt-1">
                {/* System Visual Anchor Frame with Parallax and BorderBeam Glow */}
                <div
                  ref={cardRef}
                  className="relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                >
                  {/* Subtle animated border glow (border-beam / shine-border style) */}
                  <BorderBeam
                    duration={7}
                    size={140}
                    borderWidth={2}
                    colorFrom="#0284c7"
                    colorTo="#38bdf8"
                  />

                  {/* Subtle System Metadata Header */}
                  <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="font-bold text-slate-700">SYS_DEPLOY // 01</span>
                    <span className="text-slate-400">Production Architecture</span>
                  </div>

                  {/* Aspect-Locked Viewport (16/10) */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <img
                      src="/Hero-Images/avs-hospitals-hero.png"
                      alt="Integrate Thought Production System Architecture"
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                      loading="eager"
                    />
                  </div>

                  {/* Subtle System Status Footer */}
                  <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>AVS Clinical Portal Engine</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Deployment
                    </span>
                  </div>
                </div>

                {/* Supporting Explanation Narrative */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    The Model
                  </div>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal font-sans">
                    Integrate Thought operates as a dual-engine engineering studio and talent incubator.
                    We architect bespoke web platforms and autonomous AI systems for growing businesses—and
                    we run an applied academy cultivating the engineers capable of building them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 02 — THE DUAL ENGINE MODEL: SOLUTIONS & ACADEMY */}
        {/* ============================================================ */}
        <section id="story" className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
              Our Dual-Engine Architecture
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
              We operate two deeply intertwined pillars: high-caliber software solutions for enterprises,
              and intensive, industry-grade training for rising technical talent. One sharpens the other.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          >
            {/* PILLAR 1: DIGITAL ENGINEERING & AI SOLUTIONS */}
            <motion.div variants={fadeUp} className="h-full">
              <MagicCard
                glowFrom="rgba(2, 132, 199, 0.16)"
                glowTo="rgba(56, 189, 248, 0.04)"
                gradientSize={340}
                className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/80 hover:border-slate-300 cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 transition-transform duration-300 group-hover:scale-110 group-hover-icon-pulse">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-bold tracking-wider text-sky-600 uppercase">
                    Pillar 01 / Enterprise Solutions
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight font-sans">
                    Digital Engineering &amp; AI Systems
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We design, build, and deploy high-performance custom web applications, autonomous AI agents,
                    private RAG data systems, and automated operational pipelines. We solve the real workflow
                    friction holding businesses back.
                  </p>

                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Bespoke Web Applications &amp; Resilient Frontend Architecture</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Private Enterprise RAG Systems &amp; Autonomous AI Agents</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Cross-Tool API Integration &amp; Workflow Automations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">20+ Partner Brands</span>
                  <button
                    onClick={() => onNavigate('Services')}
                    className="text-xs font-bold font-sans text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer group/btn"
                  >
                    <span>Explore Engineering Services</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </MagicCard>
            </motion.div>

            {/* PILLAR 2: IT SCHOOL & TALENT UPSKILLING */}
            <motion.div variants={fadeUp} className="h-full">
              <MagicCard
                glowFrom="rgba(99, 102, 241, 0.16)"
                glowTo="rgba(168, 85, 247, 0.04)"
                gradientSize={340}
                className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/80 hover:border-slate-300 cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover-icon-pulse">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-bold tracking-wider text-indigo-600 uppercase">
                    Pillar 02 / Academy &amp; Upskilling
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight font-sans">
                    IT School &amp; Practical Internships
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We believe real engineering isn't learned from textbook slides. Our training programs and
                    internship tracks immerse students and early-career developers into production environments,
                    working directly on staging builds alongside our senior engineers.
                  </p>

                  <div className="pt-2 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Full-Stack Development, Node, React &amp; Cloud Frameworks</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Applied AI Automation, LLM Workflows &amp; Vector Databases</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Hands-On Internship Opportunities with Live Code Reviews</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">Live Project Cohorts</span>
                  <button
                    onClick={() => onNavigate('IT School')}
                    className="text-xs font-bold font-sans text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer group/btn"
                  >
                    <span>View IT School Programs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </MagicCard>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* 03 — THE STORY: ORIGIN & THE PROBLEM */}
        {/* ============================================================ */}
        <section ref={originSectionRef} className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Bold Stance */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                The Origin
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                Most business friction isn’t a software deficit. <br />
                <span ref={archHeadlineRef} className="text-[#0284c7] inline-block">
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">It’s</span>
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">an</span>
                  <span className="arch-word inline-block mr-[0.25em] opacity-0 translate-y-3 font-extrabold">architecture</span>
                  <span className="arch-word inline-block opacity-0 translate-y-3 font-extrabold">failure.</span>
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                Businesses do not suffer because technology is scarce. They struggle because their tools,
                data, workflows, and talent are fragmented into isolated silos.
              </p>
            </div>

            {/* Right Column: Editorial Narrative with Tracing Beam */}
            <div ref={originCardsRef} className="lg:col-span-7 relative pl-8 sm:pl-10 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {/* Vertical Tracing Beam Track running down the left edge */}
              <div className="absolute left-2 sm:left-3 top-5 bottom-5 w-[2px] pointer-events-none z-10">
                {/* Background Rail Line */}
                <div className="w-full h-full bg-slate-200/90 rounded-full" />

                {/* Animated Scrubbed Tracing Beam Line */}
                <div
                  ref={tracingBeamLineRef}
                  className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-[#ef4444] via-[#0284c7] to-[#10b981] rounded-full origin-top scale-y-0 shadow-[0_0_8px_rgba(2,132,199,0.5)]"
                  style={{ willChange: 'transform' }}
                />

                {/* Leading Glowing Tracer Head */}
                <div
                  ref={tracingBeamGlowRef}
                  className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8,0_0_4px_#0284c7] border-2 border-sky-400 opacity-0 -translate-y-1/2"
                  style={{ willChange: 'top, opacity' }}
                />
              </div>

              {/* Card 1: The Problem We Observed in the Industry */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-red-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot1Ref}
                    className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>The Problem We Observed in the Industry</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Companies were adopting dozens of disconnected SaaS subscriptions, cobbling together brittle
                  no-code patches, or buying superficial "AI wrappers" that crumbled as soon as real enterprise
                  complexity hit. Meanwhile, traditional academic courses were teaching outdated syntax completely
                  detached from modern full-stack workflows and production AI agents.
                </p>
              </div>

              {/* Card 2: The Decision to Integrate Thought with Execution */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-sky-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot2Ref}
                    className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>The Decision to Integrate Thought with Execution</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We founded <strong>Integrate Thought</strong> on a simple premise: to unite deep architectural thinking
                  with disciplined execution. Rather than building throwaway templates, we architect coherent digital
                  ecosystems. And rather than keeping our engineering knowledge behind closed doors, we turned our studio
                  into a living academy where aspiring developers learn real engineering by working on production code.
                </p>
              </div>

              {/* Card 3: Where We Stand Today */}
              <div
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-emerald-200/80 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-base font-bold text-slate-950 font-sans flex items-center gap-2.5">
                  <span
                    ref={dot3Ref}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 opacity-40 scale-90 transition-all duration-200"
                  />
                  <span>Where We Stand Today</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Today, we have partnered with over <strong>20+ brands</strong>, delivered major flagship digital platforms
                  in healthcare, enterprise services, and retail, and helped our client partners achieve an average of <strong>3x
                  visibility and business growth</strong>. Simultaneously, our IT School cohorts have mentored passionate
                  developers through immersive, live-project internships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 04 — CORE PRINCIPLES */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              How We Think &amp; Build
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
              Non-Negotiable Core Principles
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              These four tenets govern every line of code we write, every AI agent we deploy, and every student we mentor.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
          >
            {CORE_PRINCIPLES.map((principle) => {
              const IconComp = principle.icon;
              return (
                <motion.div key={principle.id} variants={fadeUp} className="h-full">
                  <MagicCard
                    glowFrom="rgba(2, 132, 199, 0.16)"
                    glowTo="rgba(56, 189, 248, 0.04)"
                    gradientSize={340}
                    className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/80 hover:border-slate-300 cursor-pointer h-full flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 transition-transform duration-300 group-hover:scale-110">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {principle.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-950 tracking-tight font-sans">
                        {principle.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, scale: 0.82 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: 0.22,
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                        }}
                        className="inline-block"
                      >
                        Principle {principle.id}
                      </motion.span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 group-hover:bg-[#0284c7] transition-colors" />
                    </div>
                  </MagicCard>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* 05 — THE PEOPLE: LEADERSHIP & ENGINEERING COLLECTIVE */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              The Collective Behind the Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
              Leadership &amp; Engineering Collective
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No generic stock photos. No inflated titles. Just an intentional group of builders,
              system architects, and educators dedicated to technical craft.
            </p>
          </div>

          {/* Core Leadership Row */}
          <div className="mb-10">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
              <span>Executive &amp; Operational Leadership</span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {LEADERSHIP_TEAM.map((member, index) => {
                const isHovered = hoveredLeader === index;
                const isSiblingHovered = hoveredLeader !== null && !isHovered;

                return (
                  <motion.div
                    key={member.name}
                    variants={fadeUp}
                    onMouseEnter={() => setHoveredLeader(index)}
                    onMouseLeave={() => setHoveredLeader(null)}
                    className={cn(
                      "bg-white border rounded-2xl p-6 flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300 ease-out",
                      isHovered && "scale-[1.02] shadow-xl shadow-slate-200/80 border-slate-300 z-10 opacity-100",
                      isSiblingHovered && "opacity-50 blur-[1.5px] scale-[0.98] shadow-none border-slate-200/60",
                      hoveredLeader === null && "border-slate-200/90 shadow-xs hover:shadow-md"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-mono font-extrabold text-base text-slate-900">
                          {member.initials}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {member.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-extrabold text-slate-950 tracking-tight font-sans">
                          {member.name}
                        </h3>
                        <div className="text-xs font-bold text-[#0284c7] font-sans mt-0.5">
                          {member.role}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">
                          {member.domain}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Engineering Specialists Row */}
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Core Engineering Specialists</span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {ENGINEERING_SPECIALISTS.map((dev, index) => {
                const isHovered = hoveredSpecialist === index;
                const isSiblingHovered = hoveredSpecialist !== null && !isHovered;

                return (
                  <motion.div
                    key={dev.name}
                    variants={fadeUp}
                    onMouseEnter={() => setHoveredSpecialist(index)}
                    onMouseLeave={() => setHoveredSpecialist(null)}
                    className={cn(
                      "bg-white border rounded-2xl p-6 flex flex-col justify-between space-y-4 cursor-pointer transition-all duration-300 ease-out",
                      isHovered && "scale-[1.02] shadow-xl shadow-slate-200/80 border-slate-300 z-10 opacity-100",
                      isSiblingHovered && "opacity-50 blur-[1.5px] scale-[0.98] shadow-none border-slate-200/60",
                      hoveredSpecialist === null && "border-slate-200/90 shadow-xs hover:shadow-md"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-mono font-extrabold text-sm text-slate-900">
                          {dev.initials}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {dev.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-slate-950 tracking-tight font-sans">
                          {dev.name}
                        </h3>
                        <div className="text-xs font-bold text-slate-700 font-sans mt-0.5">
                          {dev.role}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">
                          {dev.domain}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                        {dev.bio}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06 — PROVEN WORK & IMPACT: REAL CASE STUDIES */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                Tangible Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                Real Work. Real Businesses. Real Results.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We measure our engineering not by abstract promises, but by the tangible digital systems
                we have deployed for our 20+ partner brands.
              </p>
            </div>

            <button
              onClick={() => onNavigate('Works')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer font-sans shrink-0 self-start md:self-auto"
            >
              <span>Explore All Case Studies</span>
              <ArrowUpRight className="w-4 h-4 text-sky-600" />
            </button>
          </div>

          {/* Verified Performance Metrics Strip */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                <NumberTicker value={20} suffix="+" delay={0} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Brands Partnered
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                <NumberTicker value={5} suffix="+" delay={0.08} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Flagship Systems Built
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0284c7] tracking-tight font-sans">
                <NumberTicker value={3} suffix="x" delay={0.16} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Avg. Visibility &amp; Growth
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight font-sans">
                <NumberTicker value={100} suffix="%" delay={0.24} duration={1.2} />
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mt-1">
                Applied Live Training
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REAL_PROJECTS.map((project, index) => (
              <CaseStudyCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07 — ACADEMY FOCUS: TRAINING & INTERNSHIP OPPORTUNITIES */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-sky-300 font-bold tracking-wider uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>The Academy Wing</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
                Bridging the Gap Between Code Syntax and Production Engineering.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We believe the biggest tragedy in modern software education is teaching syntax without context.
                Through our <strong>IT School Training Programs</strong> and <strong>Practical Internship Tracks</strong>,
                we train students and graduates on the exact architectures, tools, and code standards used in our
                client systems.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Project-Driven Training</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build real-world Full-Stack, Python, and AI automation applications rather than toy exercises.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Hands-On Internships</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Work on live staging environments, git branch workflows, and PR reviews alongside senior engineers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="text-sm font-bold text-white font-sans">Career Acceleration</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Graduate with verifiable repositories, deployed applications, and real architectural competence.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('IT School')}
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                >
                  Explore IT School &amp; Internships
                </button>
                <button
                  onClick={() => onNavigate('Contact')}
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer font-sans"
                >
                  Inquire About Upcoming Cohorts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 08 — WHY INTEGRATE THOUGHT: THE CONTRAST MATRIX */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              The Fundamental Difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
              Why Integrate Thought Stands Apart
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A direct comparison between conventional vendors and our unified engineering studio &amp; academy model.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
              {/* Left Side: Traditional Vendors */}
              <motion.div
                variants={leftColumnVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="p-8 sm:p-10 space-y-6 bg-slate-50/60"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-red-500 uppercase">
                    The Conventional Route
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-sans">
                    Traditional Agencies &amp; Bootcamps
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                  {CONVENTIONAL_ITEMS.map((item) => (
                    <motion.li
                      key={item.title}
                      variants={comparisonRowVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        variants={redXIconVariants}
                        className="text-red-500 font-bold mt-0.5 inline-block shrink-0 select-none text-sm"
                      >
                        ✕
                      </motion.span>
                      <span className="leading-relaxed">
                        <strong className="text-slate-900">{item.title}:</strong> {item.description}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Side: Integrate Thought */}
              <motion.div
                variants={rightColumnVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="p-8 sm:p-10 space-y-6 bg-white relative rounded-2xl md:rounded-none transition-shadow"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-600 uppercase">
                    Our Operational Model
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950 font-sans">
                    Integrate Thought Studio &amp; Academy
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                  {INTEGRATE_THOUGHT_ITEMS.map((item) => (
                    <motion.li
                      key={item.title}
                      variants={comparisonRowVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        variants={greenCheckIconVariants}
                        className="text-emerald-600 font-bold mt-0.5 inline-block shrink-0 select-none text-sm"
                      >
                        ✓
                      </motion.span>
                      <span className="leading-relaxed">
                        <strong className="text-slate-950">{item.title}:</strong> {item.description}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 09 — PURPOSEFUL CLOSING CTA */}
        {/* ============================================================ */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-5xl mx-auto mb-20 text-center">
          <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6 relative overflow-hidden border border-slate-800/80">
            {/* Ambient Background Beams & Spotlights */}
            <BackgroundBeams className="pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
                Let’s Build a Resilient System <br className="hidden sm:inline" />
                or Accelerate Your Technical Career.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal font-sans leading-relaxed">
                Whether you are looking to architect custom web applications and AI automations for your business,
                or looking to master modern full-stack development through our IT School, we are ready.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                {/* Primary Button with Perimeter Shimmer and Specular Hover Sheen */}
                <ShimmerButton
                  onClick={() => onNavigate('Contact')}
                  shimmerColor="#38bdf8"
                  background="#ffffff"
                  borderRadius="9999px"
                  shimmerDuration="3s"
                >
                  START A CLIENT PROJECT
                </ShimmerButton>

                {/* Secondary Button: Simple hover state only (background/border shift), strictly no shimmer */}
                <button
                  onClick={() => onNavigate('IT School')}
                  className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
                >
                  APPLY FOR IT SCHOOL / INTERNSHIP
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
