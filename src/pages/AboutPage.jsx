import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  ArrowRight,
  ShieldCheck,
  Workflow,
  Layers,
  BarChart3,
  Code2,
  Bot,
  Server,
  TrendingUp,
  ShoppingBag,
  UserCheck,
  BrainCircuit,
  PenTool,
  AppWindow,
  Palette,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

const STORY_STEPS = [
  {
    id: 1,
    stepNum: '01',
    label: '01 / THE PROBLEM',
    shortTitle: 'The Problem',
    title: 'Business problems are rarely just one problem.',
    description: 'Disconnected tools, repetitive manual processes, poor digital experiences, and fragmented data create friction across your entire operation.',
    badgeBg: 'bg-red-100 text-red-700 border-red-200',
    cardBg: 'bg-[#c73827]',
    accentColor: '#c73827',
    visualTitle: 'FRAGMENTATION & FRICTION',
    visualContent: (
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span>OPERATIONAL BOTTLENECKS</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">3 SILOS</span>
        </div>
        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-xs font-mono text-white flex items-center justify-between">
            <span>Isolated Lead Data</span>
            <span className="text-red-200 font-bold">Manual Sync Needed</span>
          </div>
          <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-xs font-mono text-white flex items-center justify-between">
            <span>Repetitive Task Overhead</span>
            <span className="text-red-200 font-bold">15+ Hours/Wk Wasted</span>
          </div>
          <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-xs font-mono text-white flex items-center justify-between">
            <span>Legacy User Experience</span>
            <span className="text-red-200 font-bold">High Drop-off Rate</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    stepNum: '02',
    label: '02 / THE STRATEGY',
    shortTitle: 'The Strategy',
    title: 'Understand the system before building it.',
    description: 'We map your entire operational architecture, identify friction points, and determine precisely where digital systems create maximum leverage.',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    cardBg: 'bg-[#d97706]',
    accentColor: '#d97706',
    visualTitle: 'ARCHITECTURE BLUEPRINT',
    visualContent: (
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span>SYSTEM MAP &amp; LEVERAGE</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">STRATEGY READY</span>
        </div>
        <div className="p-4 rounded-xl bg-white/15 border border-white/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white">
            <span>1. User Touchpoint</span>
            <span className="text-amber-200 font-bold">→</span>
            <span>2. RAG AI Engine</span>
          </div>
          <div className="h-0.5 bg-white/20 w-full" />
          <div className="flex items-center justify-between text-xs font-mono text-white">
            <span>3. Automated Pipeline</span>
            <span className="text-amber-200 font-bold">→</span>
            <span>4. Scalable Growth</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    stepNum: '03',
    label: '03 / THE BUILD',
    shortTitle: 'The Build',
    title: 'Turning ideas into working systems.',
    description: 'From websites and web applications to AI agents, RAG engines, and custom APIs — we build the technology that makes the strategy real.',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    cardBg: 'bg-[#0284c7]',
    accentColor: '#0284c7',
    visualTitle: 'FULL-STACK ENGINEERING',
    visualContent: (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span>ACTIVE API &amp; CODE STACK</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">200 OK</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950 border border-white/20 font-mono text-xs text-blue-300 space-y-1.5 shadow-inner">
          <div className="text-slate-400">// Deploying custom web application</div>
          <div>const system = await integrateAI.deploy();</div>
          <div className="text-emerald-400">✓ RAG Vector Index Synced</div>
          <div className="text-amber-300">✓ Production Deployment Verified</div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    stepNum: '04',
    label: '04 / THE AUTOMATION',
    shortTitle: 'The Automation',
    title: 'Less manual work. More leverage.',
    description: 'We connect isolated tools and automate repetitive operations so your team spends less time managing processes and more time driving growth.',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cardBg: 'bg-[#0e593c]',
    accentColor: '#0e593c',
    visualTitle: 'WORKFLOW PIPELINES',
    visualContent: (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span>AUTOMATED TRIGGER LOGIC</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-xs font-mono text-white">
            <div className="text-emerald-200 font-bold mb-1">Webhook Trigger</div>
            <div>0ms Latency Loop</div>
          </div>
          <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-xs font-mono text-white">
            <div className="text-emerald-200 font-bold mb-1">Auto Follow-up</div>
            <div>100% Executed</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    stepNum: '05',
    label: '05 / THE OUTCOME',
    shortTitle: 'The Outcome',
    title: 'Technology that actually moves the business.',
    description: 'Better customer experiences. Faster team operations. Smarter data decisions. Scalable architecture. Measurable bottom-line growth.',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    cardBg: 'bg-[#7c3aed]',
    accentColor: '#7c3aed',
    visualTitle: 'MEASURABLE RESULTS',
    visualContent: (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-white/90">
          <span>ENTERPRISE PERFORMANCE</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">SCALED</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-white/15 border border-white/20">
            <div className="text-xl font-black text-white">+300%</div>
            <div className="text-[10px] text-white/80 font-mono">Velocity</div>
          </div>
          <div className="p-3 rounded-xl bg-white/15 border border-white/20">
            <div className="text-xl font-black text-white">99.9%</div>
            <div className="text-[10px] text-white/80 font-mono">Accuracy</div>
          </div>
          <div className="p-3 rounded-xl bg-white/15 border border-white/20">
            <div className="text-xl font-black text-white">0</div>
            <div className="text-[10px] text-white/80 font-mono">Friction</div>
          </div>
        </div>
      </div>
    ),
  },
];

const BELIEFS = [
  {
    id: '01',
    title: 'BUILD WITH PURPOSE',
    text: 'Technology should solve a measurable business problem. We build intentional digital architecture that delivers concrete, verifiable outcomes.',
  },
  {
    id: '02',
    title: 'AUTOMATE THE REPETITIVE',
    text: 'People should spend their time on decisions, creativity, and relationship growth — not manual data transfer and repetitive administrative tasks.',
  },
  {
    id: '03',
    title: 'DESIGN FOR THE REAL WORLD',
    text: 'Beautiful interfaces mean nothing if the underlying backend system breaks. We balance high-end aesthetic design with resilient engineering.',
  },
  {
    id: '04',
    title: 'THINK LONG TERM',
    text: 'We build modular systems designed to evolve and scale seamlessly as your business expands, preventing costly architectural rebuilds.',
  },
];

const WORKFLOW_STAGES = [
  {
    num: '01',
    name: 'DISCOVER',
    sub: 'Technical audit & strategy.',
    desc: 'We analyze your workflows, customer journeys, data structures, and pain points to identify high-leverage opportunities.',
  },
  {
    num: '02',
    name: 'DESIGN',
    sub: 'Architecture & UX blueprint.',
    desc: 'We map the system blueprint, API integrations, data schemas, and high-converting visual user experience.',
  },
  {
    num: '03',
    name: 'BUILD',
    sub: 'Full-stack development.',
    desc: 'We develop your custom web applications, AI agents, RAG databases, and backend infrastructure with clean code.',
  },
  {
    num: '04',
    name: 'AUTOMATE',
    sub: 'Workflow & pipeline sync.',
    desc: 'We connect your tech stack, setup webhooks, automate notifications, and eliminate manual data entry bottlenecks.',
  },
  {
    num: '05',
    name: 'OPTIMIZE',
    sub: 'Continuous refinement.',
    desc: 'We monitor analytics, track system performance, refine AI query accuracy, and scale infrastructure as you grow.',
  },
];

const CAPABILITIES = [
  { name: 'Web Development', icon: Code2, desc: 'Bespoke web applications & high-speed digital platforms' },
  { name: 'Digital Marketing', icon: TrendingUp, desc: 'PPC, SEO, and growth analytics data engines' },
  { name: 'E-Commerce', icon: ShoppingBag, desc: 'Seamless storefronts & automated order fulfillment' },
  { name: 'CRM Integration', icon: UserCheck, desc: 'Unified customer data & pipeline management' },
  { name: 'AI Automation', icon: Workflow, desc: 'Operational workflow connection & event triggers' },
  { name: 'RAG Systems', icon: BrainCircuit, desc: 'Secure AI retrieval over private company databases' },
  { name: 'Custom AI Agents', icon: Bot, desc: '24/7 autonomous support & lead qualification agents' },
  { name: 'Business Automation', icon: Layers, desc: 'End-to-end approval, billing & alert automation' },
  { name: 'Cloud Services', icon: Server, desc: 'High-availability cloud hosting & serverless pipelines' },
  { name: 'IT & Security', icon: ShieldCheck, desc: 'Enterprise data protection, backups & access security' },
  { name: 'Data Analytics', icon: BarChart3, desc: 'Real-time telemetry dashboards & business metrics' },
  { name: 'Content Creation', icon: PenTool, desc: 'Copywriting, design systems & digital assets' },
  { name: 'Mobile Apps', icon: AppWindow, desc: 'Native iOS & Android cross-platform applications' },
  { name: 'Branding & Design', icon: Palette, desc: 'Brand identity, UI/UX systems & design guidelines' },
];

export default function AboutPage({ onNavigate }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <div className="min-h-screen w-full bg-[#eef4fa] text-slate-900 font-sans select-none overflow-x-hidden flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Navbar progress={0.32} onNavigate={onNavigate} activePage="About" />

        {/* HERO SECTION */}
        <section className="pt-40 sm:pt-48 pb-16 px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-900 text-[11px] font-mono font-semibold tracking-widest uppercase mb-6 shadow-sm">
            <span>ABOUT US</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-4xl mx-auto mb-6 font-sans">
            WE BUILD DIGITAL SYSTEMS THAT MOVE BUSINESSES FORWARD.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal font-sans">
            We combine design, automation, AI, data, and technology to build digital experiences and systems that solve real business problems.
          </p>
        </section>

        {/* COMPANY INTRODUCTION SECTION */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center border-t border-slate-200/80">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block mb-2">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 font-sans">
            NOT JUST DIGITAL. BUILT FOR RESULTS.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal font-sans mb-6">
            We don't build technology for the sake of technology. We build websites, AI systems, automations, digital products, and data-driven solutions designed around how a business actually operates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono font-bold text-slate-700">
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">Strategy</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">Design</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">Technology</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm">Automation</span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-full bg-slate-950 text-white shadow-sm">Growth</span>
          </div>
        </section>

        {/* 3D STACKED STORY EXPERIENCE CENTERPIECE */}
        <section className="py-20 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 font-mono text-[11px] font-semibold tracking-widest uppercase mb-3">
              03 / FROM IDEAS → SYSTEMS → GROWTH
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
              Our 5-Stage Story Experience
            </h2>
          </div>

          {/* Interactive Step Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {STORY_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-slate-950 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {s.shortTitle}
              </button>
            ))}
          </div>

          {/* 2-COLUMN STORY & 3D STACK CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Active Step Info */}
            <div className="lg:col-span-6 space-y-5 bg-white border border-slate-200/90 p-8 rounded-3xl shadow-xl">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${STORY_STEPS[activeStepIndex].badgeBg}`}>
                {STORY_STEPS[activeStepIndex].label}
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-sans">
                {STORY_STEPS[activeStepIndex].title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal font-sans">
                {STORY_STEPS[activeStepIndex].description}
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs font-mono text-slate-500">
                <span>Stage {activeStepIndex + 1} of 5</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={activeStepIndex === 4}
                    onClick={() => setActiveStepIndex((prev) => Math.min(4, prev + 1))}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Stacked Deck of Cards */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-md h-[380px] sm:h-[400px] [perspective:1200px]">
                {STORY_STEPS.map((step, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  const isAhead = idx > activeStepIndex;
                  const offset = idx - activeStepIndex;

                  let transformStyle = '';
                  let opacity = 0;
                  let zIndex = 10;

                  if (isCurrent) {
                    transformStyle = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
                    opacity = 1;
                    zIndex = 30;
                  } else if (isAhead) {
                    transformStyle = `translate3d(${offset * 14}px, ${-offset * 12}px, ${-offset * 60}px) rotateY(${offset * 4}deg) scale(${1 - offset * 0.05})`;
                    opacity = Math.max(0.2, 1 - offset * 0.3);
                    zIndex = 30 - offset;
                  } else {
                    transformStyle = `translate3d(${-offset * 18}px, ${offset * 14}px, ${offset * 60}px) rotateY(${offset * 6}deg) scale(${1 + offset * 0.05})`;
                    opacity = 0;
                    zIndex = 10;
                  }

                  return (
                    <div
                      key={step.id}
                      style={{
                        transform: transformStyle,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                      className={`absolute inset-0 rounded-3xl ${step.cardBg} text-white p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 flex flex-col justify-between transition-all duration-500 ease-out`}
                    >
                      {/* Top Card Header */}
                      <div className="flex items-center justify-between border-b border-white/20 pb-3">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase">
                          {step.visualTitle}
                        </span>
                        <span className="text-xs font-mono font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full">
                          {step.stepNum}
                        </span>
                      </div>

                      {/* Middle Dynamic Content */}
                      <div className="my-auto">
                        {step.visualContent}
                      </div>

                      {/* Bottom Footer */}
                      <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs font-mono text-white/90">
                        <span>{step.title.slice(0, 32)}...</span>
                        <span className="font-bold flex items-center gap-1">
                          <span>Active</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* WHAT WE BELIEVE SECTION */}
        <section className="py-24 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
              PRINCIPLES &amp; CORE VALUES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
              WHAT WE BELIEVE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {BELIEFS.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200/90 p-7 rounded-3xl space-y-3 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {b.id}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight font-sans">
                  {b.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal font-sans">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW WE WORK SECTION */}
        <section className="py-24 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
              HOW WE WORK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {WORKFLOW_STAGES.map((stg) => (
              <div
                key={stg.num}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <span className="text-xl font-black text-slate-950 font-mono">
                    {stg.num}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-950 tracking-tight font-sans">
                    {stg.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    {stg.sub}
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans pt-2 border-t border-slate-100">
                  {stg.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNOLOGY / CAPABILITIES SECTION */}
        <section className="py-24 px-6 sm:px-10 lg:px-12 max-w-6xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
              ENGINEERING DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-sans">
              TECHNOLOGY &amp; CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 hover:border-slate-400 transition-colors shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                    <IconComp className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 font-sans tracking-tight mb-1">
                      {cap.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-24 px-6 max-w-5xl mx-auto mb-20 text-center">
          <div className="bg-slate-950 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-slate-300 text-[11px] font-mono font-semibold tracking-widest uppercase">
              LET'S TALK
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
              LET'S BUILD SOMETHING THAT MATTERS.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal font-sans leading-relaxed">
              Have a business problem that technology could solve? Let's turn it into a system that works.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('Contact')}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer font-sans"
              >
                START A PROJECT
              </button>

              <button
                onClick={() => onNavigate('Services')}
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer font-sans"
              >
                EXPLORE OUR SERVICES
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
