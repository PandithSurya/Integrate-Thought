import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { submitInquiry } from '../utils/inquiryHandler';

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      await submitInquiry({
        type: 'Newsletter Subscription',
        email: email.trim(),
        name: 'Subscriber',
      });
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const handleLinkClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="w-full bg-white text-slate-900 pt-6 sm:pt-8 pb-16 sm:pb-20 font-sans select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* TOP 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 items-start">
          
          {/* LEFT COLUMN: BRAND & FOLLOW US (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <div
                onClick={(e) => handleLinkClick(e, 'home')}
                className="flex items-center gap-3 mb-1.5 cursor-pointer group"
              >
                <img
                  src="/logo.png"
                  alt="Integrate Thought Logo"
                  className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
                />
                <span className="text-xl font-black tracking-tight text-slate-900 uppercase font-sans">
                  INTEGRATE THOUGHT
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#3b70b2] font-sans">
                Engineering Intelligent Digital Systems &amp; AI Solutions
              </p>
            </div>

            {/* Follow Us */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 font-sans">
                Follow Us
              </h4>
              <div className="flex items-center gap-2.5">
                <a href="#facebook" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-[#3b70b2] text-white font-bold text-xs flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
                  F
                </a>
                <a href="#twitter" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">
                  T
                </a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">
                  L
                </a>
                <a href="#website" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">
                  W
                </a>
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors">
                  I
                </a>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: NAV & ABOUT US (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            {/* Top Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-bold font-sans">
              <button onClick={(e) => handleLinkClick(e, 'about')} className="text-[#3b70b2] hover:underline cursor-pointer">About</button>
              <button onClick={(e) => handleLinkClick(e, 'services')} className="text-slate-800 hover:text-[#3b70b2] transition-colors cursor-pointer">Services</button>
              <button onClick={(e) => handleLinkClick(e, 'IT School')} className="text-slate-800 hover:text-[#3b70b2] transition-colors cursor-pointer">IT School</button>
              <button onClick={(e) => handleLinkClick(e, 'works')} className="text-slate-800 hover:text-[#3b70b2] transition-colors cursor-pointer">Works</button>
              <button onClick={(e) => handleLinkClick(e, 'contact')} className="text-slate-800 hover:text-[#3b70b2] transition-colors cursor-pointer">Contact</button>
            </div>

            {/* About Us Paragraph */}
            <div className="space-y-2 max-w-lg">
              <h3 className="text-base font-extrabold text-slate-900 font-sans">
                About Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed font-sans">
                Integrate Thought is a modern digital engineering and AI agency specializing in custom web platforms, automated workflow architecture, RAG knowledge systems, and hands-on skill development programs.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT INFO & EMAIL INPUT (3 cols with left border) */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-900 font-sans">Call :</div>
              <div className="text-xs text-slate-600 font-semibold font-sans">+91 6303148269 / +91 9010221396</div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 font-sans">Email :</div>
              <a href="mailto:integratethought24@gmail.com" className="text-xs text-slate-600 hover:text-blue-600 font-semibold font-sans block">
                integratethought24@gmail.com
              </a>
            </div>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="pt-2 relative">
              <div className="flex items-center rounded-lg bg-[#f0f4f8] p-1 border border-slate-200/60">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Write Email..."
                  required
                  className="w-full px-3 py-1.5 text-xs text-slate-800 bg-transparent placeholder:text-slate-400 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded bg-[#3b70b2] hover:bg-[#2f5c94] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Subscribe"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-600 font-medium pt-1">
                  Subscribed &amp; recorded successfully!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-normal font-sans">
          <div>
            &copy; {new Date().getFullYear()} Integrate Thought. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</button>
            <span>&bull;</span>
            <button onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
