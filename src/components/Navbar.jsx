import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CoursesModal } from './CoursesModal';

export default function Navbar({ progress = 0, onNavigate, activePage = 'Home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

  const navLinks = ['Home', 'Services', 'Works', 'IT School', 'Contact'];

  // Match activeLink from activePage prop (case insensitive)
  const normalizedActive = activePage ? activePage.toLowerCase() : 'home';
  const activeLink = navLinks.find(link => link.toLowerCase() === normalizedActive) || ((normalizedActive === 'courses' || normalizedActive === 'training') ? 'IT School' : 'Home');

  // Light theme over Services (0.22 -> 0.44), Works (0.44 -> 0.66), and Process (0.66 -> 0.84)
  const isLight = progress >= 0.22 && progress < 0.84;

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(link);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLight
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-md text-slate-900'
        : 'bg-transparent py-5 text-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">

        {/* Left: Clean Logo & Adaptive Color Brand Name */}
        <div
          onClick={() => handleNavClick('Home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <img
            src="/logo.png"
            alt="Integrate Thought Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform group-hover:scale-105"
          />
          <span
            className={`font-bold text-base sm:text-lg tracking-tight transition-colors ${isLight
              ? 'text-slate-950 group-hover:text-slate-700'
              : 'text-white group-hover:text-slate-300'
              }`}
          >
            Integrate Thought
          </span>
        </div>

        {/* Center/Right: Desktop Nav Links with High-Contrast Active Pill */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeLink === link;
            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${isActive
                  ? isLight
                    ? 'text-white bg-slate-950 shadow-md scale-105'
                    : 'text-slate-950 bg-white shadow-md scale-105'
                  : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
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
            className={`hidden sm:inline-flex items-center px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95 cursor-pointer ${isLight
              ? 'bg-slate-950 hover:bg-slate-800 text-white'
              : 'bg-white hover:bg-slate-200 text-slate-950'
              }`}
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${isLight
              ? 'text-slate-800 bg-slate-100 border-slate-300'
              : 'text-slate-300 hover:text-white bg-slate-900/60 border-slate-800'
              }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b backdrop-blur-2xl px-6 py-6 space-y-3 transition-all animate-fadeIn ${isLight
            ? 'bg-white/95 border-slate-200 text-slate-900'
            : 'bg-slate-950/95 border-slate-800 text-white'
            }`}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isLight
                ? 'text-slate-800 hover:bg-slate-100 hover:text-slate-950'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
            >
              {link}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('Contact')}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${isLight
                ? 'bg-slate-950 text-white'
                : 'bg-white text-slate-950'
                }`}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
