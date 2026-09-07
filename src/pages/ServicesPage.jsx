import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import KineticGrid from '../components/KineticGrid';
import { Footer } from '../components/Footer';
import {
  Bot,
  BrainCircuit,
  Code2,
  Server,
  UserCheck,
  ShieldCheck,
  PieChart,
  Smartphone,
  ShoppingBag,
  TrendingUp,
  Layout,
  Share2,
  Palette,
  Mail,
  PenTool,
  Headphones,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Sparkles,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';

// ====================================================================
// 1. DATA: 4 FEATURED FLAGSHIP SERVICES
// ====================================================================
const FEATURED_SERVICES = [
  {
    id: 'feat-ai-agents',
    tag: 'FLAGSHIP // 01',
    category: 'AI & Automation',
    title: 'Autonomous AI Agents',
    headline: 'Autonomous AI Agents',
    punchline: 'AI that works while you sleep.',
    description:
      'Deploy self-governing multi-agent systems that autonomously reason, plan workflows, and execute complex enterprise operations with human-in-the-loop safeguards.',
    outcomeNumber: 73,
    outcomeSuffix: '%',
    outcomeDecimals: 0,
    outcomeDescriptor: 'reduction in manual processing',
    icon: Bot,
    gradientFrom: '#0284c7',
    gradientTo: '#0369a1',
  },
  {
    id: 'feat-rag-systems',
    tag: 'FLAGSHIP // 02',
    category: 'AI & Automation',
    title: 'Enterprise RAG Systems',
    headline: 'Enterprise RAG Systems',
    punchline: 'Private vector databases for your proprietary data.',
    description:
      'Empower teams with contextual knowledge engines. Secure vector embeddings and semantic search ensure zero hallucination and verifiable document citations.',
    outcomeNumber: 99.2,
    outcomeSuffix: '%',
    outcomeDecimals: 1,
    outcomeDescriptor: 'retrieval accuracy across datasets',
    icon: BrainCircuit,
    gradientFrom: '#2563eb',
    gradientTo: '#1d4ed8',
  },
  {
    id: 'feat-custom-web',
    tag: 'FLAGSHIP // 03',
    category: 'Web & Mobile',
    title: 'Custom Web Applications',
    headline: 'Custom Web Applications',
    punchline: 'High-performance apps built for scale.',
    description:
      'Engineered for mission-critical throughput, sub-second latency, and fluid interaction design. Zero bloat, modular full-stack architecture built to outlast trends.',
    outcomeNumber: 1.4,
    outcomeSuffix: 'M/day',
    outcomeDecimals: 1,
    outcomeDescriptor: 'requests handled reliably',
    icon: Code2,
    gradientFrom: '#0ea5e9',
    gradientTo: '#0284c7',
  },
  {
    id: 'feat-cloud-devops',
    tag: 'FLAGSHIP // 04',
    category: 'Cloud & DevOps',
    title: 'Cloud & DevOps',
    headline: 'Cloud & DevOps',
    punchline: 'Scalable infrastructure, zero downtime.',
    description:
      'Immutable infrastructure-as-code, automated multi-stage CI/CD pipelines, and high-availability Kubernetes clusters with self-healing failover.',
    outcomeNumber: 99.98,
    outcomeSuffix: '%',
    outcomeDecimals: 2,
    outcomeDescriptor: 'uptime guaranteed',
    icon: Server,
    gradientFrom: '#0284c7',
    gradientTo: '#1e293b',
  },
];

// ====================================================================
// 2. DATA: 12 SUPPORTING COMPACT SERVICES
// ====================================================================
const SUPPORTING_SERVICES = [
  {
    id: 'supp-crm',
    title: 'CRM & Sales',
    category: 'AI & Automation',
    micro: 'Streamlined pipelines, automated conversions',
    icon: UserCheck,
    fullDescription:
      'Intelligent customer relationship management with automated lead qualification, smart pipeline tracking, and CRM integrations that turn raw inquiries into closed enterprise accounts.',
    deliverables: [
      'Custom CRM pipeline architecture',
      'Automated lead routing & scoring',
      'Two-way email & calendar synchronization',
      'Real-time deal velocity analytics',
    ],
    techStack: ['HubSpot API', 'Salesforce', 'PostgreSQL', 'Temporal'],
    timeline: '2–4 Weeks',
  },
  {
    id: 'supp-security',
    title: 'Security & Infra',
    category: 'Cloud & DevOps',
    micro: 'Zero-trust hardened infrastructure',
    icon: ShieldCheck,
    fullDescription:
      'Comprehensive cybersecurity audits, automated perimeter defense, automated vulnerability scans, and encrypted secrets management protecting proprietary digital assets.',
    deliverables: [
      'Zero-trust network architecture',
      'Automated penetration & vulnerability scans',
      'Air-gapped disaster recovery & backups',
      'SOC2 / HIPAA compliance enablement',
    ],
    techStack: ['Cloudflare', 'HashiCorp Vault', 'AWS GuardDuty', 'WAF'],
    timeline: '3–5 Weeks',
  },
  {
    id: 'supp-data-analytics',
    title: 'Data Analytics',
    category: 'AI & Automation',
    micro: 'Actionable real-time intelligence',
    icon: PieChart,
    fullDescription:
      'Transform siloed databases and raw event streams into centralized, real-time analytics platforms with predictive forecasting and executive telemetry.',
    deliverables: [
      'Centralized event ingest pipelines',
      'Executive KPI & Cohort dashboards',
      'Predictive customer churn models',
      'Automated scheduled report distribution',
    ],
    techStack: ['Apache Kafka', 'Snowflake', 'ClickHouse', 'Metabase'],
    timeline: '2–4 Weeks',
  },
  {
    id: 'supp-mobile-apps',
    title: 'Mobile Apps',
    category: 'Web & Mobile',
    micro: 'Native iOS & Android performance',
    icon: Smartphone,
    fullDescription:
      'Cross-platform and native mobile applications crafted with 60fps gesture fluidities, offline-first local synchronization, and secure biometric authentication.',
    deliverables: [
      'Dual-platform iOS & Android deployment',
      'Offline-first SQLite/Realm sync engine',
      'Biometric authentication & push notifications',
      'App Store & Play Store publication management',
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    timeline: '4–8 Weeks',
  },
  {
    id: 'supp-ecommerce',
    title: 'E-Commerce',
    category: 'Web & Mobile',
    micro: 'High-conversion commerce systems',
    icon: ShoppingBag,
    fullDescription:
      'Headless commerce storefronts engineered for blazing sub-second checkout velocities, international multi-currency settlement, and automated inventory sync.',
    deliverables: [
      'Headless Next.js commerce storefront',
      'Frictionless multi-currency checkout',
      'ERP & inventory automation hooks',
      'Custom cart abandonment recovery flows',
    ],
    techStack: ['Shopify Plus', 'MedusaJS', 'Stripe', 'Next.js'],
    timeline: '3–6 Weeks',
  },
  {
    id: 'supp-digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing & Branding',
    micro: 'Targeted multi-channel growth',
    icon: TrendingUp,
    fullDescription:
      'Data-driven acquisition campaigns combining algorithmic search engine optimization, programmatic paid acquisition, and behavioral remarketing funnels.',
    deliverables: [
      'Technical on-page & schema SEO architecture',
      'High-ROI paid search & social campaigns',
      'Continuous conversion rate optimization (CRO)',
      'Multi-touch revenue attribution tracking',
    ],
    techStack: ['Google Ads', 'Meta Business Suite', 'GA4', 'Ahrefs'],
    timeline: 'Sprint-based / Retainer',
  },
  {
    id: 'supp-website-design',
    title: 'Website Design',
    category: 'Web & Mobile',
    micro: 'Modern, high-impact web presence',
    icon: Layout,
    fullDescription:
      'Editorial-grade website designs built around typographic hierarchy, purposeful micro-interactions, responsive grid systems, and distinct brand positioning.',
    deliverables: [
      'High-fidelity Figma prototypes',
      'Responsive design system library',
      'Accessible contrast & WCAG 2.1 compliance',
      'Interactive micro-animations & scroll states',
    ],
    techStack: ['Figma', 'TailwindCSS', 'GSAP', 'Framer Motion'],
    timeline: '2–4 Weeks',
  },
  {
    id: 'supp-social-media',
    title: 'Social Media',
    category: 'Marketing & Branding',
    micro: 'Community engagement & reach',
    icon: Share2,
    fullDescription:
      'Strategic brand narrative publishing, viral community building, and automated cross-channel distribution designed for enterprise credibility and organic reach.',
    deliverables: [
      'Technical content calendars & copywriting',
      'Custom graphic templates & carousels',
      'Active community triage & engagement',
      'Monthly reach & sentiment reporting',
    ],
    techStack: ['Buffer', 'Figma', 'Typefully', 'LinkedIn Ads'],
    timeline: 'Monthly Retainer',
  },
  {
    id: 'supp-brand-identity',
    title: 'Brand Identity',
    category: 'Marketing & Branding',
    micro: 'Distinctive design system language',
    icon: Palette,
    fullDescription:
      'Memorable visual identities that anchor market authority: custom vector logomarks, proprietary color tokens, typography scales, and brand identity manuals.',
    deliverables: [
      'Primary & secondary brand marks',
      'Color palette & typographic token systems',
      'Comprehensive Brand Guidelines manual',
      'Digital collateral & presentation templates',
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Fontshare', 'Glyphs'],
    timeline: '3–5 Weeks',
  },
  {
    id: 'supp-email-automation',
    title: 'Email Automation',
    category: 'Marketing & Branding',
    micro: 'Behavioral campaigns that retain',
    icon: Mail,
    fullDescription:
      'Event-triggered email automation journeys, lead nurturing drips, customer onboarding sequences, and programmatic newsletters that drive repeat conversions.',
    deliverables: [
      'Dynamic behavior-triggered lifecycle drips',
      'Responsive HTML email templates',
      'Domain deliverability & warm-up protocols',
      'Continuous A/B subject & layout testing',
    ],
    techStack: ['Klaviyo', 'Customer.io', 'Resend', 'Postmark'],
    timeline: '2–3 Weeks',
  },
  {
    id: 'supp-content-creation',
    title: 'Content Creation',
    category: 'Marketing & Branding',
    micro: 'Engaging multimedia storytelling',
    icon: PenTool,
    fullDescription:
      'Technical documentation, architectural deep dives, whitepapers, motion graphics, and video production crafted by engineering-fluent storytellers.',
    deliverables: [
      'Technical whitepapers & architectural articles',
      'Motion graphics & 3D product visuals',
      'Video walkthroughs & executive decks',
      'Editorial customer case studies',
    ],
    techStack: ['After Effects', 'Markdown', 'Blender', 'Notion'],
    timeline: 'Sprint-based',
  },
  {
    id: 'supp-it-support',
    title: 'IT Support',
    category: 'Cloud & DevOps',
    micro: 'Reliable 24/7 technical monitoring',
    icon: Headphones,
    fullDescription:
      'Continuous 24/7 infrastructure observability, automated anomaly detection, incident response runbooks, and strict uptime SLAs to keep your operations running.',
    deliverables: [
      '24/7 automated alert & heartbeat monitoring',
      'Guaranteed SLA response windows',
      'Dedicated incident response runbooks',
      'Monthly infrastructure health & cost audits',
    ],
    techStack: ['PagerDuty', 'Datadog', 'Zendesk', 'Opsgenie'],
    timeline: 'Continuous Support',
  },
];

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Web & Mobile',
  'Cloud & DevOps',
  'Marketing & Branding',
];

// ====================================================================
// 3. COMPONENT: TELEMETRY COUNT-UP ANIMATION (IntersectionObserver)
// ====================================================================
function TelemetryOutcome({ target, decimals = 0, suffix = '', duration = 1500 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth easeOutCubic: 1 - (1 - t)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            setDisplayValue(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={containerRef} className="tabular-nums font-extrabold text-[#0284c7]">
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}

// ====================================================================
// 4. MAIN PAGE COMPONENT
// ====================================================================
export default function ServicesPage({ onNavigate, initialService = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedModal, setSelectedModal] = useState(null);

  useEffect(() => {
    document.title = '16 Disciplines // Services | Integrate Thought';
    window.scrollTo(0, 0);

    // If an initial service was passed, open its modal automatically
    if (initialService) {
      const match = SUPPORTING_SERVICES.find((s) =>
        s.title.toLowerCase().includes(initialService.toLowerCase())
      );
      if (match) setSelectedModal(match);
    }
  }, [initialService]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter logic
  const filteredFeatured = FEATURED_SERVICES.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const filteredSupporting = SUPPORTING_SERVICES.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const handleSeeCaseStudy = (serviceTitle) => {
    if (typeof onNavigate === 'function') {
      onNavigate('Works');
    } else {
      window.location.href = '/works';
    }
  };

  const handleConsultation = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('Contact');
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 select-none font-sans overflow-x-hidden">
      
      {/* Scoped CSS for Editorial Typography, Shimmer Sweeps, Entrance & Border Glow */}
      <style>{`
        .font-fraunces {
          font-family: 'Fraunces', Georgia, 'Times New Roman', serif !important;
          font-feature-settings: "liga" 1, "calt" 1;
        }

        .font-satoshi {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        .font-jetbrains {
          font-family: 'JetBrains Mono', 'Courier New', monospace !important;
        }

        /* 1. Page Load Entrance Keyframes (cubic-bezier(0.22, 1, 0.36, 1)) */
        @keyframes entranceSlideLeft {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes entranceScaleFade {
          0% {
            opacity: 0;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes entranceSlideUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes entranceFilterUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-eyebrow {
          animation: entranceSlideLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .anim-headline {
          animation: entranceScaleFade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .anim-subhead {
          animation: entranceSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
          opacity: 0;
        }

        .anim-filter {
          animation: entranceFilterUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
          opacity: 0;
        }

        /* 2. Featured Card Scroll Entrance Keyframe */
        @keyframes cardFadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-card-enter {
          animation: cardFadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* 3. Continuous 4s Shimmer Light Sweep on Gradient Header */
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-150%);
          }
          50%, 100% {
            transform: translateX(150%);
          }
        }

        .shimmer-light-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          animation: shimmerSweep 4s ease-in-out infinite;
          pointer-events: none;
        }

        /* 4. Continuous 3s Border Glow Pulse on Featured Cards */
        @keyframes borderGlowPulse {
          0%, 100% {
            border-color: rgba(2, 132, 199, 0.22);
            box-shadow: 0 4px 20px -2px rgba(2, 132, 199, 0.06);
          }
          50% {
            border-color: rgba(2, 132, 199, 0.65);
            box-shadow: 0 12px 32px -4px rgba(2, 132, 199, 0.22);
          }
        }

        .featured-card-glow {
          animation: borderGlowPulse 3s ease-in-out infinite;
        }

        /* 5. Featured Card Hover: Scale (1 -> 1.03) + Lift (-8px) + Deep Shadow */
        .featured-card-hover {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .featured-card-hover:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 0 24px 48px -12px rgba(2, 132, 199, 0.28), 0 8px 24px -4px rgba(0, 0, 0, 0.08);
          border-color: rgba(2, 132, 199, 0.85);
        }

        /* 6. Supporting Card Smooth Hover */
        .supporting-card-hover {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .supporting-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -6px rgba(2, 132, 199, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.05);
          border-color: rgba(2, 132, 199, 0.45);
        }

        /* 7. CTA Signature Button */
        .studio-primary-cta {
          position: relative;
          overflow: hidden;
          background-color: #020617;
          color: #ffffff;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .studio-primary-cta:hover {
          background-color: #0f172a;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -6px rgba(2, 132, 199, 0.35);
        }
      `}</style>

      {/* Universal Fixed Adaptive Navbar */}
      <Navbar onNavigate={onNavigate} activePage="Services" />

      {/* Interactive KineticGrid Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
          backgroundColor="#f8fafc"
          lineColor="#cbd5e1"
          dotColor="#94a3b8"
          hoverColor="#0284c7"
        />
      </div>

      {/* Main Content Flow */}
      <main className="relative z-10 w-full pt-36 sm:pt-42 lg:pt-48 pb-16 sm:pb-20">
        
        {/* ============================================================ */}
        {/* SECTION 1: INTRODUCTION & CATEGORY FILTER BAR                */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          
          {/* Eyebrow: Small, monospace, accent color */}
          <div className="anim-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 font-jetbrains text-xs font-semibold tracking-[0.18em] uppercase text-[#0284c7] shadow-2xs backdrop-blur-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
            <span>SERVICES // INTEGRATE THOUGHT</span>
          </div>

          {/* Headline: Serif, large, warm black */}
          <h1 className="anim-headline font-fraunces text-4xl sm:text-5xl lg:text-6xl xl:text-[4.1rem] font-bold text-[#1A1816] tracking-tight leading-[1.08] max-w-4xl mx-auto">
            16 Disciplines.{' '}
            <span className="block text-slate-950">
              One Unified Engine.
            </span>
          </h1>

          {/* Subheadline: Clean Satoshi font */}
          <p className="anim-subhead font-satoshi text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-5">
            From autonomous AI agents to cloud infrastructure – we build, scale, and automate modern enterprise operations.
          </p>

          {/* Category Filter Bar: Smooth transition between disciplines */}
          <div className="anim-filter mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto p-1.5 rounded-2xl bg-slate-200/60 backdrop-blur-md border border-slate-300/60 shadow-inner">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              // Count matching services
              const count =
                category === 'All'
                  ? 16
                  : FEATURED_SERVICES.filter((s) => s.category === category).length +
                    SUPPORTING_SERVICES.filter((s) => s.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-satoshi text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-sm shadow-slate-950/5 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-300/70 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: THE 4 FEATURED SERVICES (HERO CARDS)             */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-20 sm:mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-[#0284c7]">
                CORE CAPABILITIES // 01 – 04
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-slate-950">
                Flagship Systems
              </h2>
            </div>
            <span className="hidden sm:inline-block font-satoshi text-xs text-slate-500 font-medium">
              High-impact enterprise foundations
            </span>
          </div>

          {/* 2x2 Grid of Featured Hero Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8">
            {filteredFeatured.map((card, idx) => {
              const IconComponent = card.icon;

              return (
                <div
                  key={card.id}
                  style={{ animationDelay: `${idx * 150}ms` }}
                  className="anim-card-enter featured-card-hover featured-card-glow relative rounded-3xl bg-white border border-slate-200/90 shadow-md overflow-hidden flex flex-col justify-between group"
                >
                  {/* Large Gradient Visual Header with 4s Continuous Shimmer Sweep */}
                  <div
                    className="relative w-full h-28 sm:h-32 px-6 sm:px-8 py-5 flex items-center justify-between overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
                    }}
                  >
                    {/* Shimmer Light Sweep Layer */}
                    <div className="shimmer-light-sweep" />

                    {/* Header Left: Tag & Category */}
                    <div className="relative z-10 space-y-1">
                      <span className="font-jetbrains text-[11px] font-bold tracking-widest text-white/80 uppercase">
                        {card.tag}
                      </span>
                      <div className="font-satoshi text-xs font-semibold text-white/90 tracking-wide">
                        {card.category}
                      </div>
                    </div>

                    {/* Header Right: Icon with Glowing Backing */}
                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {/* Bold 3-4 Word Headline */}
                      <h3 className="font-fraunces text-2xl sm:text-[1.75rem] font-bold text-slate-950 tracking-tight leading-snug">
                        {card.headline}
                      </h3>

                      {/* Punchline */}
                      <p className="font-satoshi text-sm sm:text-base font-medium text-slate-700">
                        {card.punchline}
                      </p>

                      {/* Descriptive Context */}
                      <p className="font-satoshi text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Outcome Metric Row (Bold in Brand Accent) & CTA */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Live Telemetry Outcome Metric */}
                      <div className="flex flex-col">
                        <span className="text-[11px] font-jetbrains uppercase tracking-wider text-slate-400 font-medium">
                          Verified Impact Metric
                        </span>
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-950 flex items-baseline gap-1 mt-0.5">
                          <TelemetryOutcome
                            target={card.outcomeNumber}
                            decimals={card.outcomeDecimals}
                            suffix={card.outcomeSuffix}
                            duration={1500}
                          />
                          <span className="text-xs font-satoshi font-normal text-slate-500 ml-1.5">
                            {card.outcomeDescriptor}
                          </span>
                        </div>
                      </div>

                      {/* CTA: Text link with arrow (navigates to Works) */}
                      <button
                        onClick={() => handleSeeCaseStudy(card.title)}
                        className="group/btn inline-flex items-center gap-1.5 font-satoshi font-semibold text-xs sm:text-sm text-[#0284c7] hover:text-[#0369a1] transition-colors cursor-pointer self-start sm:self-auto py-1"
                      >
                        <span>See Case Study</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: THE 12 SUPPORTING SERVICES (COMPACT GRID)         */}
        {/* ============================================================ */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div className="space-y-1">
              <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-slate-500">
                SPECIALIZED DISCIPLINES // 05 – 16
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-slate-950">
                Supporting Disciplines
              </h2>
            </div>
            <p className="font-satoshi text-xs sm:text-sm text-slate-500 font-normal">
              Click any card to inspect full deliverables &amp; stack
            </p>
          </div>

          {/* 3-Column x 4-Row Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSupporting.map((service) => {
              const ServiceIcon = service.icon;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedModal(service)}
                  className="supporting-card-hover group relative p-5 sm:p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-[#0284c7]/60 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: SVG Symbol Icon (NOT a number) & Category Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
                        <ServiceIcon className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
                      </div>
                      <span className="font-jetbrains text-[10px] font-semibold text-slate-400 group-hover:text-[#0284c7] tracking-wider uppercase transition-colors">
                        {service.category}
                      </span>
                    </div>

                    {/* Short Title: 2-3 words */}
                    <h3 className="font-satoshi text-base sm:text-lg font-bold text-slate-950 group-hover:text-[#0284c7] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    {/* Micro Description: 4-5 words */}
                    <p className="font-satoshi text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                      {service.micro}
                    </p>
                  </div>

                  {/* Micro-Footer Indicator (Inspect details hint) */}
                  <div className="pt-4 mt-4 border-t border-slate-100/90 flex items-center justify-between text-slate-400 group-hover:text-[#0284c7] text-xs font-semibold transition-colors">
                    <span className="font-satoshi text-[11px] font-medium">
                      Inspect Specs &amp; Stack
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: HIGH-CONVERSION CONSULTATION CTA SECTION         */}
        {/* ============================================================ */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 mt-28 sm:mt-36">
          <div className="relative rounded-3xl bg-gradient-to-b from-white to-[#f1f5f9] border border-slate-200/90 p-8 sm:p-14 lg:p-16 text-center shadow-lg overflow-hidden">
            
            {/* Ambient Background Decorative Grid Dots */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#0284c7 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              {/* Monospace Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284c7]/10 border border-[#0284c7]/20 font-jetbrains text-xs font-semibold tracking-wider text-[#0284c7] uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Zero-Obligation Architecture Review</span>
              </div>

              {/* Headline */}
              <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
                Not sure which service fits your needs?
              </h2>

              {/* Subheadline */}
              <p className="font-satoshi text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
                We'll map your challenges to the right solution in 30 minutes.
              </p>

              {/* Primary CTA Button styled like 'Get Started' */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleConsultation}
                  className="studio-primary-cta inline-flex items-center gap-3 px-8 py-4 rounded-full font-satoshi font-semibold text-sm sm:text-base tracking-wide cursor-pointer shadow-md"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => handleSeeCaseStudy('Enterprise')}
                  className="font-satoshi text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 tracking-wide inline-flex items-center gap-1.5 transition-colors cursor-pointer py-3 px-4"
                >
                  <span>Browse Recent Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/* MODAL: SUPPORTING DISCIPLINE DETAILED SPECS MODAL           */}
      {/* ============================================================ */}
      {selectedModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6 animate-scale-up"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0284c7]/10 text-[#0284c7] flex items-center justify-center">
                  <selectedModal.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-[#0284c7]">
                    {selectedModal.category}
                  </div>
                  <h3 className="font-fraunces text-2xl sm:text-3xl font-bold text-slate-950">
                    {selectedModal.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedModal(null)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Architectural Overview */}
            <div className="space-y-2">
              <span className="font-jetbrains text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Overview &amp; Scope
              </span>
              <p className="font-satoshi text-sm sm:text-base text-slate-700 leading-relaxed">
                {selectedModal.fullDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-3">
              <span className="font-jetbrains text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Core Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedModal.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-satoshi text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Typical Velocity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-2">
                <span className="font-jetbrains text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Standard Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModal.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-jetbrains text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-jetbrains text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Average Velocity
                </span>
                <div className="flex items-center gap-2 text-slate-800 font-satoshi text-sm font-semibold">
                  <Clock className="w-4 h-4 text-[#0284c7]" />
                  <span>{selectedModal.timeline}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-satoshi font-semibold text-xs sm:text-sm hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedModal(null);
                  handleConsultation();
                }}
                className="studio-primary-cta w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-satoshi font-semibold text-xs sm:text-sm tracking-wide cursor-pointer"
              >
                <span>Discuss This Discipline</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
