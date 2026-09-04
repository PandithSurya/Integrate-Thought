import React, { useState, useRef } from 'react';
import { submitInquiry } from '../utils/inquiryHandler';
import Navbar from '../components/Navbar';
import KineticGrid from '../components/KineticGrid';
import { Footer } from '../components/Footer';
import { LiquidHoverCard } from '../components/ui/liquid-hover-card';
import {
  CheckCircle2,
  X,
  Code2,
  Users,
  Award,
  Send,
  Phone,
  Check,
  Clock
} from 'lucide-react';

const COURSES_DATA = [
  {
    id: 1,
    title: 'Basic Computer Operations & Workplace Productivity',
    category: 'COMPUTER BASICS',
    duration: '45 Days',
    level: 'Beginner Level',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    description: 'Master essential computer fundamentals, Windows OS, MS Word, MS Excel, MS PowerPoint, internet security, and workplace digital tools.',
    modules: ['Windows OS Fundamentals', 'MS Excel & Word Mastery', 'PowerPoint & Presentations', 'Internet & Workplace Email'],
  },
  {
    id: 2,
    title: 'Digital Marketing & Performance Growth',
    category: 'DIGITAL & DESIGN',
    duration: '90 Days',
    level: 'All Experience Levels',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive digital marketing course covering Search Engine Optimization (SEO), Social Media Ads, Google Marketing, Content Strategy, and Analytics.',
    modules: ['SEO & Organic Growth', 'Meta & Google Paid Ads', 'Social Media Branding', 'Analytics & ROI Tracking'],
  },
  {
    id: 3,
    title: 'Python Programming with AI & Automation',
    category: 'AI & PROGRAMMING',
    duration: '90 Days',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Build a solid foundation in Python core syntax, data handling, web scraping, task automation scripts, and LLM API integrations with OpenAI & Claude.',
    modules: ['Python Core & Data Types', 'Web Scraping & Webhooks', 'Pandas & Data Analysis', 'OpenAI API & AI Scripts'],
  },
  {
    id: 4,
    title: 'Full Stack Web Development (FSD)',
    category: 'SOFTWARE & CODING',
    duration: '6 Months',
    level: 'Career Track (Beginner to Pro)',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Intensive 6-month full stack software engineering program covering HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, MongoDB/SQL databases, and cloud deployment.',
    modules: ['Frontend (React & Tailwind)', 'Backend (Node & Express)', 'Databases (MongoDB & SQL)', 'Production Capstone App'],
  },
  {
    id: 5,
    title: 'Tally Prime with GST, Accounts & Taxation',
    category: 'FINANCE & BUSINESS',
    duration: '60 Days',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    description: 'Practical hands-on training in Tally Prime software, GST returns, e-way bill generation, TDS calculation, inventory management, and corporate accounting.',
    modules: ['Tally Prime Essentials', 'GST Filing & E-Way Bills', 'TDS & Payroll Management', 'Balance Sheet & Ledgers'],
  },
  {
    id: 6,
    title: 'Investment Banking & Financial Operations',
    category: 'FINANCE & BUSINESS',
    duration: '5 Months',
    level: 'Intermediate to Advanced',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: 'Professional training in investment banking operations, financial modeling, equity valuation, mergers & acquisitions (M&A), capital markets, and risk analysis.',
    modules: ['Financial Modeling & Excel', 'Company Valuation Methods', 'M&A Deal Execution', 'Capital Markets & Risk'],
  },
  {
    id: 7,
    title: 'Graphic Designing & Visual Brand Architecture',
    category: 'DIGITAL & DESIGN',
    duration: '3 Months',
    level: 'All Experience Levels',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    description: 'Master Adobe Photoshop, Illustrator, InDesign, visual layout composition, logo identity systems, social media creative design, and UI design fundamentals.',
    modules: ['Adobe Photoshop & Illustrator', 'Brand Identity & Logos', 'UI/UX Visual Principles', 'Creative Portfolio Build'],
  },
  {
    id: 8,
    title: 'AI Systems & Autonomous Agents',
    category: 'AI & PROGRAMMING',
    duration: '90 Days',
    level: 'Intermediate to Advanced',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Architect multi-agent autonomous swarms, vector RAG database pipelines, tool calling integrations, and enterprise AI workflow automation systems.',
    modules: ['Autonomous Multi-Agents', 'Vector Databases & RAG', 'LangChain & LlamaIndex', 'Enterprise Deployment'],
  },
];

const QUERY_CHIPS = [
  'Upcoming Batch Timings',
  'Syllabus & Course Modules',
  'Offline / Online Mode Options',
  'Placement & Certification Support'
];

export default function CoursesPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [reservedCourse, setReservedCourse] = useState(null);
  const [isReservedSubmitted, setIsReservedSubmitted] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '', phone: '' });

  // Separate Contact Form state for bottom Training Contact Section
  const [trainingFormData, setTrainingFormData] = useState({
    course: 'General Training Query',
    name: '',
    email: '',
    phone: '',
    mode: 'Offline (Classroom)',
    message: ''
  });
  const [isTrainingFormSubmitting, setIsTrainingFormSubmitting] = useState(false);
  const [isTrainingFormSubmitted, setIsTrainingFormSubmitted] = useState(false);

  const formSectionRef = useRef(null);

  const categories = [
    'ALL',
    'SOFTWARE & CODING',
    'AI & PROGRAMMING',
    'DIGITAL & DESIGN',
    'FINANCE & BUSINESS',
    'COMPUTER BASICS'
  ];

  const filteredCourses = COURSES_DATA.filter((c) => {
    if (selectedCategory === 'ALL') return true;
    return c.category === selectedCategory;
  });

  const handleSelectCourse = (course) => {
    setReservedCourse(course);
    setIsReservedSubmitted(false);
    setTrainingFormData((prev) => ({ ...prev, course: course.title }));
  };

  const handleAddQueryPrompt = (promptText) => {
    setTrainingFormData((prev) => ({
      ...prev,
      message: prev.message
        ? `${prev.message}\n• ${promptText}`
        : `• ${promptText}`
    }));
  };

  const handleTrainingFormSubmit = async (e) => {
    e.preventDefault();
    setIsTrainingFormSubmitting(true);

    await submitInquiry({
      type: 'Training Admissions Inquiry',
      courseOrService: trainingFormData.course,
      name: trainingFormData.name,
      email: trainingFormData.email,
      phone: trainingFormData.phone,
      mode: trainingFormData.mode,
      message: trainingFormData.message,
    });

    setTimeout(() => {
      setIsTrainingFormSubmitting(false);
      setIsTrainingFormSubmitted(true);
    }, 800);
  };

  const scrollToTrainingForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
        hoverColor="#f59e0b"
      />

      <div className="relative z-10 font-sans flex-1 flex flex-col">
        {/* Navigation Header */}
        <Navbar progress={0.32} onNavigate={onNavigate} activePage="IT School" />

        {/* HERO SECTION */}
        <section className="pt-36 sm:pt-44 pb-12 px-6 max-w-5xl mx-auto text-center font-sans">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6 font-sans">
            Industry-Oriented Skill Programs for{' '}
            <span className="text-blue-700">
              Future Engineers &amp; Professionals
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal font-sans">
            Practical, hands-on training programs designed to accelerate careers across software engineering, AI, finance, digital marketing, and core computing.
          </p>

          {/* Stats Highlights Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left font-sans">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-950">100% Practical Training</h4>
                <p className="text-[11px] text-slate-500">Live projects &amp; assignments</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-950">Expert Instructors</h4>
                <p className="text-[11px] text-slate-500">Industry practitioner leads</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-950">Course Certification</h4>
                <p className="text-[11px] text-slate-500">Verified completion badge</p>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-10 flex justify-center font-sans">
            <div className="p-1.5 rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-center gap-1.5 max-w-4xl">
              {categories.map((cat) => {
                const count = cat === 'ALL'
                  ? COURSES_DATA.length
                  : COURSES_DATA.filter(c => c.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl sm:rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </section>

        {/* COURSES CATALOG GRID */}
        <section className="pb-20 px-6 max-w-6xl mx-auto w-full font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {filteredCourses.map((course) => (
              <LiquidHoverCard
                key={course.id}
                course={course}
                onSelect={(c) => handleSelectCourse(c)}
              />
            ))}
          </div>
        </section>

        {/* DEDICATED TRAINING & ADMISSION CONTACT FORM SECTION */}
        <section ref={formSectionRef} className="pb-24 px-6 max-w-5xl mx-auto w-full font-sans">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl space-y-7 font-sans">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                  <span>TRAINING ADMISSIONS &amp; QUERIES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                  Have Questions About IT School Programs?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                  Inquire about upcoming batch schedules, syllabus details, training mode (online/offline), or fees.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 shrink-0">
                <div className="font-bold text-slate-950 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Training Desk:</span>
                </div>
                <div className="text-slate-700 font-semibold">
                  +91 6303148269 / +91 9010221396
                </div>
              </div>
            </div>

            {isTrainingFormSubmitted ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-4 font-sans animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-emerald-950 font-sans">
                    Training Query Submitted!
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold">
                    Inquiry Ref: #TRN-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                  Thank you, <strong>{trainingFormData.name}</strong>! Our training coordinator will contact you via email at <strong>{trainingFormData.email}</strong> or WhatsApp/Call within <strong>2 business hours</strong> to assist with your batch schedule &amp; enrollment.
                </p>

                <button
                  onClick={() => {
                    setIsTrainingFormSubmitted(false);
                    setTrainingFormData({
                      course: 'General Training Query',
                      name: '',
                      email: '',
                      phone: '',
                      mode: 'Offline (Classroom)',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleTrainingFormSubmit} className="space-y-6 font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Course Dropdown */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      SELECT COURSE OF INTEREST *
                    </label>
                    <select
                      value={trainingFormData.course}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, course: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                    >
                      <option value="General Training Query">General Training &amp; Admission Inquiry</option>
                      {COURSES_DATA.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={trainingFormData.name}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  {/* Student Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={trainingFormData.email}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, email: e.target.value })}
                      placeholder="student@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  {/* Student Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      PHONE / WHATSAPP NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={trainingFormData.phone}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, phone: e.target.value })}
                      placeholder="+91 6303148269"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  {/* Preferred Mode */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      PREFERRED TRAINING MODE *
                    </label>
                    <select
                      value={trainingFormData.mode}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, mode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-sm font-semibold text-slate-900 bg-white"
                    >
                      <option value="Offline (Classroom)">Offline (Classroom Training)</option>
                      <option value="Online (Live Interactive)">Online (Live Interactive Classes)</option>
                      <option value="Self-Paced Hybrid">Self-Paced Hybrid Model</option>
                    </select>
                  </div>
                </div>

                {/* Query Message */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      YOUR QUERY OR SPECIFIC REQUIREMENTS *
                    </label>
                    <span className="text-[10px] text-slate-400">Click chip to add suggestion</span>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={trainingFormData.message}
                    onChange={(e) => setTrainingFormData({ ...trainingFormData, message: e.target.value })}
                    placeholder="Ask about batch timings, curriculum details, prerequisites, or corporate group training..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-sm text-slate-900 bg-white resize-none"
                  />

                  {/* Quick Helper Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {QUERY_CHIPS.map((chip, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleAddQueryPrompt(chip)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium border border-slate-200/70 transition-colors cursor-pointer"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isTrainingFormSubmitting}
                  className="w-full py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isTrainingFormSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Training Query...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Training Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </section>

        {/* COURSE DETAILS & INQUIRY MODAL */}
        {reservedCourse && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-sans">
            <div className="relative max-w-lg w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col text-slate-950 font-sans">
              
              {/* Close Button */}
              <button
                onClick={() => setReservedCourse(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {isReservedSubmitted ? (
                <div className="text-center py-6 space-y-4 font-sans">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-slate-950 font-sans">
                      Course Inquiry Submitted!
                    </h3>
                    <p className="text-xs text-emerald-800 font-bold">
                      Reference: #{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-sm mx-auto">
                    Thank you, <strong>{studentInfo.name || 'Student'}</strong>! We have received your query for <strong>{reservedCourse.title}</strong>. Our admissions team will email curriculum details to <strong>{studentInfo.email}</strong>.
                  </p>
                  <button
                    onClick={() => setReservedCourse(null)}
                    className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all shadow-md cursor-pointer font-sans mt-2"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div className="space-y-5 font-sans">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      {reservedCourse.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-950 tracking-tight leading-snug mt-2 font-sans">
                      {reservedCourse.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1 font-sans">
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {reservedCourse.duration}
                      </span>
                      <span>•</span>
                      <span>{reservedCourse.level}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 font-sans">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      CURRICULUM HIGHLIGHTS:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {reservedCourse.modules.map((m, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsReservedSubmitted(true);
                  }} className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentInfo.name}
                        onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-xs text-slate-900 bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={studentInfo.email}
                        onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                        placeholder="student@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-xs text-slate-900 bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        PHONE / WHATSAPP NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentInfo.phone}
                        onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                        placeholder="+91 6303148269"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-slate-950 text-xs text-slate-900 bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer font-sans flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Submit Course Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Universal Footer */}
        <div className="w-full relative z-20 mt-auto">
          <Footer onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
