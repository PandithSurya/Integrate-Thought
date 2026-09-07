import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Universal Responsive Navigation Bar with Scroll Animation
 * Transitions smoothly from transparent (at scrollY <= 50)
 * to solid with backdrop blur (at scrollY > 50), inspired by DeepSeek.
 */
export default function Navbar({
  onNavigate,
  activePage = 'Home',
  progress = null,
  darkHero = false,
  theme = 'light', // 'light' | 'dark'
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Performance-optimized scroll detection with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 50);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On HomePage desktop, progress > 0.05 also triggers scrolled state
  const hasScrolled = isScrolled || (typeof progress === 'number' && progress > 0.05);

  const navLinks = ['Home', 'About', 'Services', 'Works', 'IT School', 'Contact'];

  // Match activeLink from activePage prop (case insensitive)
  const normalizedActive = activePage ? activePage.toLowerCase() : 'home';
  const activeLink =
    navLinks.find((link) => link.toLowerCase() === normalizedActive) ||
    (normalizedActive === 'courses' || normalizedActive === 'training'
      ? 'IT School'
      : 'Home');

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(link, { fromNav: true });
    }
  };

  const isDarkScrolled = theme === 'dark';
  const isLightText = darkHero && !hasScrolled;

  return (
    <>
      <header
        id="navbar"
        className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out font-sans ${
          hasScrolled ? 'scrolled' : 'default'
        } ${isDarkScrolled ? 'dark-scrolled' : ''}`}
        style={{
          height: hasScrolled ? '70px' : '76px',
          background: hasScrolled
            ? isDarkScrolled
              ? 'rgba(0, 0, 0, 0.85)'
              : 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: hasScrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: hasScrolled ? 'blur(10px)' : 'none',
          boxShadow: hasScrolled
            ? isDarkScrolled
              ? '0 2px 20px rgba(0, 0, 0, 0.4)'
              : '0 2px 20px rgba(0, 0, 0, 0.08)'
            : 'none',
          borderBottom: hasScrolled
            ? isDarkScrolled
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.05)'
            : '1px solid transparent',
        }}
      >
        <div className="nav-container max-w-7xl h-full mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('Home')}
            className="nav-logo flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
          >
            <img
              src="/logo.png"
              alt="Integrate Thought Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`brand-name font-bold text-base sm:text-lg tracking-tight font-sans transition-colors duration-300 ${
                isLightText
                  ? 'text-white'
                  : isDarkScrolled && hasScrolled
                  ? 'text-white'
                  : 'text-slate-950 group-hover:text-slate-700'
              }`}
            >
              Integrate Thought
            </span>
          </div>

          {/* Navigation Links - Center Menu */}
          <ul className="nav-menu hidden md:flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = activeLink === link;
              return (
                <li key={link} className="relative">
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`relative text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer font-sans py-1 ${
                      isActive
                        ? isLightText
                          ? 'text-white font-bold'
                          : isDarkScrolled && hasScrolled
                          ? 'text-white font-bold'
                          : 'text-slate-950 font-bold'
                        : isLightText
                        ? 'text-white/80 hover:text-white'
                        : isDarkScrolled && hasScrolled
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {link}
                    {/* Smooth Underline Active / Hover Bar */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${
                        isActive
                          ? isLightText
                            ? 'w-full bg-white'
                            : isDarkScrolled && hasScrolled
                            ? 'w-full bg-blue-400'
                            : 'w-full bg-slate-950'
                          : 'w-0 bg-current group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Side Actions */}
          <div className="nav-actions flex items-center gap-3">
            {/* Secondary / Outline Button */}
            <button
              onClick={() => handleNavClick('Works')}
              className={`btn-outline hidden lg:inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-all duration-300 active:scale-95 font-sans border ${
                isLightText
                  ? 'text-white border-white/30 hover:bg-white/10 hover:border-white'
                  : isDarkScrolled && hasScrolled
                  ? 'text-white border-white/20 hover:bg-white/10 hover:border-white'
                  : hasScrolled
                  ? 'text-slate-800 border-slate-300 hover:bg-slate-100 hover:border-slate-800'
                  : 'text-slate-750 border-slate-300/80 hover:bg-slate-100/70 hover:border-slate-800'
              }`}
            >
              Case Studies
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('Contact')}
              className={`btn-primary hidden sm:inline-flex items-center px-5 py-2 rounded-lg font-semibold text-xs tracking-wide cursor-pointer transition-all duration-300 shadow-sm active:scale-95 font-sans ${
                isLightText
                  ? 'bg-white text-slate-950 hover:bg-slate-100 hover:shadow-md'
                  : 'bg-slate-950 hover:bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(15,23,42,0.25)]'
              }`}
            >
              Get Started
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                isLightText
                  ? 'text-white bg-white/10 border-white/20'
                  : hasScrolled
                  ? 'text-slate-800 bg-white border-slate-200'
                  : 'text-slate-800 bg-white/80 border-slate-200/80'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b backdrop-blur-2xl px-6 py-6 space-y-2.5 transition-all bg-white/95 border-slate-200 text-slate-900 shadow-xl font-sans animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all font-sans cursor-pointer ${
                  activeLink === link
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link}
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('Works')}
                className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all border border-slate-300 text-slate-800 font-sans cursor-pointer hover:bg-slate-100"
              >
                Case Studies
              </button>
              <button
                onClick={() => handleNavClick('Contact')}
                className="w-full py-2.5 rounded-lg font-bold text-sm transition-all bg-slate-950 text-white font-sans cursor-pointer hover:bg-slate-800 shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
