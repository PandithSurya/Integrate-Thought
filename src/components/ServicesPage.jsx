import React, { useEffect } from 'react';
import { ArrowLeft, Check, Sparkles, ArrowUpRight } from 'lucide-react';

const ALL_SERVICES = [
  {
    id: '01',
    category: 'WEB & APPS',
    tag: 'POPULAR',
    title: 'Website Design & Development',
    description: 'High-performance, responsive websites and web applications custom-built to represent your brand, engage users, and drive high conversion rates.',
    deliverables: [
      'Custom React & Next.js Web Architecture',
      'UI/UX Prototyping & Responsive Design',
      'SEO Optimization & Fast Page Speeds',
      'CMS & Admin Dashboard Integration',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind', 'Vite'],
    accentColor: '#00b4d8',
  },
  {
    id: '02',
    category: 'AUTOMATION',
    tag: 'ENTERPRISE AI',
    title: 'AI Automation & Integration',
    description: 'Seamlessly automate complex business workflows, replace manual data tasks, and integrate cutting-edge AI models into your software ecosystem.',
    deliverables: [
      'Workflow & API Process Automation',
      'OpenAI GPT-4 & Custom LLM Integration',
      'Document Data Extraction & Processing',
      'Automated Email & Notification Triggers',
    ],
    techStack: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'Zapier'],
    accentColor: '#8b5cf6',
  },
  {
    id: '03',
    category: 'KNOWLEDGE SYSTEMS',
    tag: 'ADVANCED AI',
    title: 'RAG Knowledge Systems',
    description: 'Retrieval-Augmented Generation (RAG) systems that connect AI to your proprietary business data, PDF documents, and internal databases accurately.',
    deliverables: [
      'Vector Database Setup & Embedding Pipeline',
      'Private Business Data Search & Indexing',
      'Context-Aware AI Fact-Checking',
      'Enterprise Knowledge Base Chat Interface',
    ],
    techStack: ['Pinecone', 'ChromaDB', 'Python', 'LlamaIndex'],
    accentColor: '#ec4899',
  },
  {
    id: '04',
    category: 'SUPPORT & AGENTS',
    tag: '24/7 SUPPORT',
    title: 'Custom AI Agents & Chatbots',
    description: 'Autonomous AI agents capable of engaging leads, answering complex customer support queries, booking appointments, and triggering backend actions.',
    deliverables: [
      'Custom Persona & Conversational Design',
      'Omnichannel Integration (Web, WhatsApp, Email)',
      'CRM & Database Syncing',
      'Real-Time Analytics & Handoff to Human Agents',
    ],
    techStack: ['Python', 'Webhooks', 'REST APIs', 'Node.js'],
    accentColor: '#10b981',
  },
];

export default function ServicesPage({ onBackToHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#08090e] text-white pt-28 pb-24 px-6 sm:px-12 md:px-20 z-30 select-none">
      
      {/* Top Header Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00b4d8]" />
          <span>Back to Home</span>
        </button>

        <span className="font-mono text-xs text-[#00b4d8] uppercase tracking-widest font-semibold">
          OUR SERVICES CATALOG
        </span>
      </div>

      {/* Page Title & Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/30 text-xs font-mono tracking-widest text-[#00b4d8] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EVERY CAPABILITY IN DETAIL</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Our Full Service Portfolio
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          From custom web applications to enterprise-grade AI automation and retrieval-augmented generation systems, explore our full spectrum of digital engineering services.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {ALL_SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl bg-slate-950 border border-slate-800/90 p-8 shadow-2xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  SERVICE {service.id} &bull; {service.category}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950"
                  style={{ backgroundColor: service.accentColor }}
                >
                  {service.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-900">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                  Scope & Deliverables:
                </h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {service.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => alert(`Initiating proposal request for ${service.title}`)}
                className="w-full py-3 rounded-xl font-semibold text-xs text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: service.accentColor }}
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-16 text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>

    </div>
  );
}
