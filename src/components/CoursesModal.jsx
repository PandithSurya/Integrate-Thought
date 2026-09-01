import React, { useState } from 'react';
import { X, Search, BookOpen, Clock, ArrowUpRight, CheckCircle2, ShieldCheck, Phone, Mail, User, Send } from 'lucide-react';

export const ACADEMY_COURSES = [
  {
    id: 1,
    title: 'Basic Computer Operations & Workplace Productivity',
    category: 'COMPUTER BASICS',
    badge: '45 DAYS DURATION',
    duration: '45 Days • Practical Labs',
    level: 'Beginner Level',
    description: 'Master essential computer fundamentals, Windows OS, MS Word, MS Excel, MS PowerPoint, internet security, and workplace digital tools.',
    modules: ['Windows OS Fundamentals', 'MS Excel & Word Mastery', 'PowerPoint & Presentations', 'Internet & Workplace Email']
  },
  {
    id: 2,
    title: 'Digital Marketing & Performance Growth',
    category: 'DIGITAL MARKETING',
    badge: '90 DAYS DURATION',
    duration: '90 Days • Live Campaigns',
    level: 'All Experience Levels',
    description: 'Comprehensive digital marketing course covering Search Engine Optimization (SEO), Social Media Ads, Google Marketing, Content Strategy, and Analytics.',
    modules: ['SEO & Organic Growth', 'Meta & Google Paid Ads', 'Social Media Branding', 'Analytics & ROI Tracking']
  },
  {
    id: 3,
    title: 'Python Programming with AI & Automation',
    category: 'AI & PROGRAMMING',
    badge: '90 DAYS DURATION',
    duration: '90 Days • Project Labs',
    level: 'Beginner to Intermediate',
    description: 'Build a solid foundation in Python core syntax, data handling, web scraping, task automation scripts, and LLM API integrations with OpenAI & Claude.',
    modules: ['Python Core Syntax', 'Automation & Web Scraping', 'Pandas & Data Analysis', 'OpenAI API & AI Scripts']
  },
  {
    id: 4,
    title: 'Full Stack Web Development (FSD)',
    category: 'SOFTWARE CODING',
    badge: '6 MONTHS DURATION',
    duration: '6 Months • Career Track',
    level: 'Career Track (Beginner to Pro)',
    description: 'Intensive 6-month full stack software engineering program covering HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, MongoDB/SQL databases, and cloud deployment.',
    modules: ['Frontend (React & Tailwind)', 'Backend (Node & Express)', 'Databases (MongoDB & SQL)', 'Production Capstone App']
  },
  {
    id: 5,
    title: 'Tally Prime with GST, Accounts & Taxation',
    category: 'FINANCE & BUSINESS',
    badge: '60 DAYS DURATION',
    duration: '60 Days • Practical Filing',
    level: 'Beginner to Intermediate',
    description: 'Practical hands-on training in Tally Prime software, GST returns, e-way bill generation, TDS calculation, inventory management, and corporate accounting.',
    modules: ['Tally Prime Essentials', 'GST Filing & E-Way Bills', 'TDS & Payroll Management', 'Balance Sheet & Ledgers']
  },
  {
    id: 6,
    title: 'Investment Banking & Financial Operations',
    category: 'FINANCE & BUSINESS',
    badge: '5 MONTHS DURATION',
    duration: '5 Months • Case Studies',
    level: 'Intermediate to Advanced',
    description: 'Professional training in investment banking operations, financial modeling, equity valuation, mergers & acquisitions (M&A), capital markets, and risk analysis.',
    modules: ['Financial Modeling & Excel', 'Company Valuation Methods', 'M&A Deal Execution', 'Capital Markets & Risk']
  },
  {
    id: 7,
    title: 'Graphic Designing & Visual Brand Architecture',
    category: 'DESIGN & MEDIA',
    badge: '3 MONTHS DURATION',
    duration: '3 Months • Design Studio',
    level: 'All Experience Levels',
    description: 'Master Adobe Photoshop, Illustrator, InDesign, visual layout composition, logo identity systems, social media creative design, and UI design fundamentals.',
    modules: ['Adobe Photoshop & Illustrator', 'Brand Identity & Logos', 'UI/UX Visual Principles', 'Creative Portfolio Build']
  },
  {
    id: 8,
    title: 'AI Systems & Autonomous Agents',
    category: 'AI & PROGRAMMING',
    badge: '90 DAYS DURATION',
    duration: '90 Days • Advanced Labs',
    level: 'Intermediate to Advanced',
    description: 'Architect multi-agent autonomous swarms, vector RAG database pipelines, tool calling integrations, and enterprise AI workflow automation systems.',
    modules: ['Autonomous Multi-Agents', 'Vector Databases & RAG', 'LangChain & LlamaIndex', 'Enterprise Deployment']
  }
];

export function CoursesModal({ isOpen, onClose, onSelectCourse }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const categories = ['ALL', 'SOFTWARE CODING', 'AI & PROGRAMMING', 'DIGITAL MARKETING', 'FINANCE & BUSINESS', 'DESIGN & MEDIA', 'COMPUTER BASICS'];

  const filteredCourses = ACADEMY_COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-fadeIn font-sans select-none">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-[#070a14] border border-white/10 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white">
        
        {/* MODAL HEADER */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#090e1c]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold tracking-widest uppercase mb-2">
              <span>INTEGRATE THOUGHT TRAINING ACADEMY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Practical Skill Programs &amp; Training
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-normal font-sans">
              Industry-aligned training programs led by expert practitioners. Inquire about batch schedules, syllabus, or online/offline modes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH & CATEGORY FILTERS BAR */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#090e1c]/60 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search training programs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* COURSES CATALOG LIST */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#0b1226]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all font-sans"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-wider uppercase border border-blue-500/20">
                    {course.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                  {course.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-sans">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-3 font-normal font-sans">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                  {course.modules.map((mod, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-[10px] text-slate-400"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-semibold">
                  <span>Admissions Open</span>
                </div>

                <button
                  onClick={() => {
                    setEnrolledCourse(course);
                    setIsSubmitted(false);
                    onSelectCourse?.(course);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer font-sans"
                >
                  <span>Inquire / Enroll</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL FOOTER SLA */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#090e1c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-sans shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Training Hotline: +91 6303148269 / +91 9010221396</span>
          </div>
          <div className="text-slate-500">
            Guaranteed response within 2 business hours
          </div>
        </div>

      </div>

      {/* INNER INQUIRY POPUP */}
      {enrolledCourse && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#0b1226] border border-white/15 rounded-3xl p-6 shadow-2xl text-white font-sans">
            <button
              onClick={() => setEnrolledCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-extrabold text-white">Inquiry Submitted!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, <strong>{studentInfo.name}</strong>! We have received your query for <strong>{enrolledCourse.title}</strong>. Our counselor will contact you shortly.
                </p>
                <button
                  onClick={() => setEnrolledCourse(null)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                    PROGRAM INQUIRY
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{enrolledCourse.title}</h3>
                  <p className="text-xs text-slate-400">Duration: {enrolledCourse.duration}</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Your Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={studentInfo.email}
                      onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                      placeholder="student@company.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={studentInfo.phone}
                      onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                      placeholder="+91 6303148269"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Submit Training Query</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
