import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onNavigate, activePage = 'Home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Home', 'Services', 'Works', 'IT School', 'Contact'];

  // Match activeLink from activePage prop (case insensitive)
  const normalizedActive = activePage ? activePage.toLowerCase() : 'home';
  const activeLink = navLinks.find(link => link.toLowerCase() === normalizedActive) || ((normalizedActive === 'courses' || normalizedActive === 'training') ? 'IT School' : 'Home');

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 py-3 sm:py-3.5 shadow-xs text-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">

        {/* Left: Clean Logo & Sharp Dark Brand Name */}
        <div
          onClick={() => handleNavClick('Home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <img
            src="/logo.png"
            alt="Integrate Thought Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-base sm:text-lg tracking-tight text-slate-950 group-hover:text-slate-700 transition-colors font-sans">
            Integrate Thought
          </span>
        </div>

        {/* Center/Right: Desktop Nav Links with High-Contrast Floating Pill Dock */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer font-sans ${
                  isActive
                    ? 'text-white bg-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                }`}
              >
                {link}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('Contact')}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer bg-slate-950 hover:bg-slate-800 text-white font-sans"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border transition-colors text-slate-800 bg-white border-slate-200 shadow-xs cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b backdrop-blur-2xl px-6 py-6 space-y-2.5 transition-all bg-white/95 border-slate-200 text-slate-900 shadow-xl font-sans">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-800 hover:bg-slate-100 hover:text-slate-950 font-sans"
            >
              {link}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('Contact')}
              className="w-full py-2.5 rounded-xl font-bold text-sm transition-all bg-slate-950 text-white font-sans"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
