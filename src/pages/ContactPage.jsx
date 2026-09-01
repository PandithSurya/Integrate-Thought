import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import KineticGrid from '../components/KineticGrid';
import { Footer } from '../components/Footer';
import { StackedTestimonials } from '../components/StackedTestimonials';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  Send,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Check
} from 'lucide-react';
import { submitInquiry } from '../utils/inquiryHandler';

const SERVICE_OPTIONS = [
  { id: 'web', label: 'Web Design & Development' },
  { id: 'ai-auto', label: 'AI Automation & Workflows' },
  { id: 'rag', label: 'RAG Knowledge Systems' },
  { id: 'agents', label: 'Custom Autonomous AI Agents' },
  { id: 'strategy', label: 'Consultation & Strategy' }
];

const TRAINING_COURSES = [
  'General Training & Admission Query',
  'Basic Computer Operations & Workplace Productivity (45 Days)',
  'Digital Marketing & Performance Growth (90 Days)',
  'Python Programming with AI & Automation (90 Days)',
  'Full Stack Web Development - FSD (6 Months)',
  'Tally Prime with GST, Accounts & Taxation (60 Days)',
  'Investment Banking & Financial Operations (5 Months)',
  'Graphic Designing & Visual Brand Architecture (3 Months)',
  'AI Systems & Autonomous Agents (90 Days)'
];

const SERVICE_PROMPT_CHIPS = [
  'Target launch in 4-6 weeks',
  'Custom AI / RAG integration',
  'Rebuilding existing application',
  'Full-stack design & engineering'
];

const TRAINING_PROMPT_CHIPS = [
  'Upcoming Batch Timings',
  'Syllabus & Course Modules',
  'Offline / Online Mode Options',
  'Placement & Certification Support'
];

const FAQS = [
  {
    q: 'How fast can a new project engagement start?',
    a: 'Typically within 3 to 5 business days after our initial discovery call and scope alignment.'
  },
  {
    q: 'Do you provide ongoing support and system maintenance?',
    a: 'Yes, all our enterprise builds include post-launch monitoring, security patches, and optional continuous telemetry retainer options.'
  },
  {
    q: 'Can we schedule a discovery call directly?',
    a: 'Absolutely. Send your project details via the form or email us directly, and our lead engineer will reply within 4 business hours with a direct calendar link.'
  },
  {
    q: 'What information should we prepare for the initial discovery call?',
    a: 'Sharing your target timeline, key technical goals, or existing platform references is super helpful. We take care of the technical discovery and architecture scoping during our first call.'
  }
];

export default function ContactPage({ onNavigate }) {
  // Form Type state: 'services' (default / primary) or 'training'
  const [formType, setFormType] = useState('services');

  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0].label);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Client Services Form Data
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Training Admissions Form Data
  const [trainingFormData, setTrainingFormData] = useState({
    course: TRAINING_COURSES[0],
    name: '',
    email: '',
    phone: '',
    mode: 'Offline (Classroom)',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('integratethought24@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleAddPrompt = (promptText) => {
    if (formType === 'services') {
      setServiceFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n• ${promptText}` : `• ${promptText}`
      }));
    } else {
      setTrainingFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n• ${promptText}` : `• ${promptText}`
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = formType === 'services' ? {
      type: 'Client Project Inquiry',
      courseOrService: selectedService,
      name: serviceFormData.name,
      email: serviceFormData.email,
      phone: serviceFormData.phone,
      message: serviceFormData.message,
    } : {
      type: 'Training Admissions Inquiry',
      courseOrService: trainingFormData.course,
      name: trainingFormData.name,
      email: trainingFormData.email,
      phone: trainingFormData.phone,
      mode: trainingFormData.mode,
      message: trainingFormData.message,
    };

    await submitInquiry(payload);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#eef4fa] text-slate-900 font-sans flex flex-col justify-between select-none overflow-x-hidden">
      
      {/* Interactive KineticGrid Background */}
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
        backgroundColor="#eef4fa"
        lineColor="#cbd5e1"
        dotColor="#94a3b8"
      />

      <div className="relative z-10 font-sans flex-1 flex flex-col">
        {/* Navigation Header */}
        <Navbar progress={0.32} onNavigate={onNavigate} activePage="Contact" />

        {/* HERO SECTION */}
        <section className="pt-36 sm:pt-44 pb-12 px-6 max-w-5xl mx-auto text-center font-sans">
          
          {/* Live Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 text-slate-800 text-xs font-semibold tracking-wide mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-medium">Available for Client Projects &amp; Training Inquiries</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-bold">2026</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 font-sans">
            Let's build something{' '}
            <span className="text-blue-700">
              extraordinary together.
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal font-sans">
            Reach out for custom software engineering projects, AI automation, or inquire about our specialized training skill programs.
          </p>
        </section>

        {/* MAIN CONTACT LAYOUT */}
        <section className="max-w-6xl mx-auto px-4 sm:px-10 lg:px-12 pb-24 font-sans w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: DIRECT CONTACT CHANNELS & HQ */}
            <div className="lg:col-span-5 space-y-5 font-sans">
              
              {/* Direct Email Card */}
              <div className="group bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-blue-400/60 rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold transition-transform group-hover:scale-105">
                    <Mail className="w-5 h-5" />
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-sans font-semibold transition-all active:scale-95 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    EMAIL INQUIRIES
                  </span>
                  <a
                    href="mailto:integratethought24@gmail.com"
                    className="text-base sm:text-lg font-bold text-slate-950 hover:text-blue-600 transition-colors tracking-tight font-sans block"
                  >
                    integratethought24@gmail.com
                  </a>
                </div>
              </div>

              {/* Direct Call & WhatsApp Card */}
              <div className="group bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-emerald-400/60 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold transition-transform group-hover:scale-105">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href="https://wa.me/916303148269"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-sans font-semibold transition-all active:scale-95"
                    >
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href="tel:+916303148269"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-sans font-semibold transition-all active:scale-95"
                    >
                      <span>Call 1</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href="tel:+919010221396"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-sans font-semibold transition-all active:scale-95"
                    >
                      <span>Call 2</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    DIRECT CALL / WHATSAPP
                  </span>
                  <div className="text-base sm:text-lg font-bold text-slate-950 tracking-tight font-sans flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <a href="tel:+916303148269" className="hover:text-emerald-700 transition-colors">
                      +91 6303148269
                    </a>
                    <span className="hidden sm:inline text-slate-300">/</span>
                    <a href="tel:+919010221396" className="hover:text-emerald-700 transition-colors">
                      +91 9010221396
                    </a>
                  </div>
                </div>
              </div>

              {/* Location & Timezone Card */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 font-sans">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-widest">
                          STUDIO LOCATION
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-900 text-[10px] font-bold">
                          IST (UTC+5:30)
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                        Vijaylakshmi complex, 4-105/11/C, Sriramnagar Colony, Turkayamjal, Hyderabad, Telangana 501510
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-500 font-sans">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Guaranteed response &lt; 4 business hours</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/Tte7zY8BP4cEaBa79"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-0.5 text-[11px]"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* SLA & Commitment Badge */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-md space-y-3 font-sans">
                <div className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                  <span>Integrate Thought Commitment</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Direct communication with principal engineers &amp; training leads, zero sales fluff, clear scope, and quick response times.
                </p>
              </div>

            </div>

            {/* RIGHT COLUMN: DUAL-MODE INQUIRY FORM (SERVICES & TRAINING SWITCHER) */}
            <div className="lg:col-span-7 font-sans">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-xl space-y-6 font-sans">
                
                {/* PRIMARY/SECONDARY CATEGORY SWITCHER TABS */}
                <div className="p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('services');
                      setIsSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      formType === 'services'
                        ? 'bg-slate-950 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>Client Services &amp; Projects</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormType('training');
                      setIsSubmitted(false);
                    }}
                    className={`flex-1 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      formType === 'training'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>Training &amp; Admissions</span>
                  </button>
                </div>

                {/* HEADER TITLES BASED ON FORM TYPE */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 tracking-wide">
                    <span>
                      {formType === 'services' ? 'CLIENT SERVICES INQUIRY' : 'ACADEMY TRAINING INQUIRY'}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans mb-1">
                    {formType === 'services' ? 'Project Scope & Architecture Inquiry' : 'Training & Program Admissions'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                    {formType === 'services'
                      ? 'Share your project objectives below. Our technical leads will review your specs and send a tailored project roadmap.'
                      : 'Inquire about batch schedules, course modules, offline/online training modes, or certification details.'
                    }
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4 font-sans animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-extrabold text-emerald-950 font-sans">
                        {formType === 'services' ? 'Project Inquiry Received!' : 'Training Inquiry Submitted!'}
                      </h4>
                      <p className="text-xs text-emerald-800 font-medium">
                        Reference: #{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans pt-2">
                      {formType === 'services'
                        ? <>Thank you for reaching out to <strong>Integrate Thought</strong>. Our engineering leads are analyzing your specs and will reply within <strong>4 business hours</strong>.</>
                        : <>Thank you for reaching out to <strong>Integrate Thought Training Academy</strong>. Our admissions lead will contact you within <strong>2 business hours</strong>.</>
                      }
                    </p>

                    <div className="pt-4 border-t border-emerald-200/60 max-w-sm mx-auto flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setServiceFormData({ name: '', email: '', phone: '', message: '' });
                          setTrainingFormData({ course: TRAINING_COURSES[0], name: '', email: '', phone: '', mode: 'Offline (Classroom)', message: '' });
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : formType === 'services' ? (
                  
                  /* CLIENT SERVICES FORM (PRIMARY) */
                  <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                    
                    {/* Service Selection Pills */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                        I'M INTERESTED IN *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_OPTIONS.map((srv) => {
                          const isSelected = selectedService === srv.label;
                          return (
                            <button
                              type="button"
                              key={srv.id}
                              onClick={() => setSelectedService(srv.label)}
                              className={`inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-slate-950 text-white shadow-md scale-[1.02]'
                                  : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80'
                              }`}
                            >
                              <span>{srv.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceFormData.name}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={serviceFormData.email}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                        />
                      </div>

                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-1.5 font-sans">
                      <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                        PHONE / WHATSAPP NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={serviceFormData.phone}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, phone: e.target.value })}
                        placeholder="+91 6303148269"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                      />
                    </div>

                    {/* Project Overview Textarea with Interactive Quick Prompt Helpers */}
                    <div className="space-y-2 font-sans">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          PROJECT OVERVIEW &amp; REQUIREMENTS *
                        </label>
                        <span className="text-[10px] text-slate-400 font-medium">Click chip to add text</span>
                      </div>

                      <textarea
                        required
                        rows={4}
                        value={serviceFormData.message}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, message: e.target.value })}
                        placeholder="Tell us what you're looking to build, key goals, timeline, or tech stack requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 text-sm text-slate-900 bg-white transition-all resize-none font-sans placeholder:text-slate-400 leading-relaxed"
                      />

                      {/* Quick Prompt Helper Chips */}
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          QUICK SUGGESTIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {SERVICE_PROMPT_CHIPS.map((chip, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => handleAddPrompt(chip)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors border border-slate-200/70 cursor-pointer"
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer font-sans flex items-center justify-center gap-2 group disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                ) : (

                  /* TRAINING ADMISSIONS FORM (SWITCHABLE TAB) */
                  <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                    
                    {/* Course Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                        SELECT TRAINING PROGRAM *
                      </label>
                      <select
                        value={trainingFormData.course}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                      >
                        {TRAINING_COURSES.map((course, idx) => (
                          <option key={idx} value={course}>
                            {course}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          YOUR FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={trainingFormData.name}
                          onChange={(e) => setTrainingFormData({ ...trainingFormData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={trainingFormData.email}
                          onChange={(e) => setTrainingFormData({ ...trainingFormData, email: e.target.value })}
                          placeholder="student@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                        />
                      </div>

                    </div>

                    {/* Phone & Mode Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      
                      {/* Phone Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          PHONE / WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={trainingFormData.phone}
                          onChange={(e) => setTrainingFormData({ ...trainingFormData, phone: e.target.value })}
                          placeholder="+91 6303148269"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white transition-all font-sans placeholder:text-slate-400"
                        />
                      </div>

                      {/* Training Mode Field */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          PREFERRED TRAINING MODE *
                        </label>
                        <select
                          value={trainingFormData.mode}
                          onChange={(e) => setTrainingFormData({ ...trainingFormData, mode: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 text-sm font-semibold text-slate-900 bg-white"
                        >
                          <option value="Offline (Classroom)">Offline (Classroom Training)</option>
                          <option value="Online (Live Interactive)">Online (Live Interactive Classes)</option>
                          <option value="Self-Paced Hybrid">Self-Paced Hybrid Model</option>
                        </select>
                      </div>

                    </div>

                    {/* Training Query Overview */}
                    <div className="space-y-2 font-sans">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-sans font-bold text-slate-500 uppercase tracking-widest">
                          YOUR TRAINING QUERY / SPECIFIC QUESTIONS *
                        </label>
                        <span className="text-[10px] text-slate-400 font-medium">Click chip to add text</span>
                      </div>

                      <textarea
                        required
                        rows={3}
                        value={trainingFormData.message}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, message: e.target.value })}
                        placeholder="Ask about batch start dates, course syllabus, prerequisites, or corporate group training..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200/90 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 text-sm text-slate-900 bg-white transition-all resize-none font-sans placeholder:text-slate-400 leading-relaxed"
                      />

                      {/* Quick Prompt Helper Chips */}
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          QUICK SUGGESTIONS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {TRAINING_PROMPT_CHIPS.map((chip, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => handleAddPrompt(chip)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors border border-slate-200/70 cursor-pointer"
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Action */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer font-sans flex items-center justify-center gap-2 group disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Query...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Training Inquiry</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                )}

              </div>
            </div>

          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="max-w-4xl mx-auto px-6 pb-20 border-t border-slate-200/80 pt-16 font-sans w-full">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-sans font-bold tracking-widest text-slate-500 uppercase">
              TRANSPARENT PROCESS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3 font-sans">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-sm font-sans"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-slate-950 font-bold text-sm sm:text-base font-sans cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-slate-950' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100/80 pt-3 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Direct Call Callout */}
          <div className="mt-12 p-6 rounded-3xl bg-blue-50/80 border border-blue-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="text-left space-y-1">
              <h4 className="text-sm font-bold text-slate-950 font-sans">
                Need to speak immediately?
              </h4>
              <p className="text-xs text-slate-600">
                Call our direct engineering lines at +91 6303148269 / +91 9010221396 or email integratethought24@gmail.com
              </p>
            </div>
            <a
              href="tel:+916303148269"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide transition-all shadow-sm shrink-0"
            >
              Call Us Now
            </a>
          </div>
        </section>

        {/* Verified Feedback / Stacked Testimonials Section */}
        <section className="w-full bg-white py-12 sm:py-16 border-t border-slate-200/80 my-12">
          <StackedTestimonials />
        </section>

        {/* Universal Footer */}
        <div className="w-full relative z-20 mt-auto">
          <Footer onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
