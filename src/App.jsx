import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import IntegrateThoughtLoader from './components/IntegrateThoughtLoader';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p) return p.toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) return hash;
    }
    return 'home';
  });
  const [pageParams, setPageParams] = useState({});
  const [showInitialLoader, setShowInitialLoader] = useState(() => {
    if (typeof window !== 'undefined') {
      if (new URLSearchParams(window.location.search).get('loader') === 'false') return false;
    }
    return true;
  });
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationKey, setNavigationKey] = useState(0);
  const [isPageRevealed, setIsPageRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      if (new URLSearchParams(window.location.search).get('loader') === 'false') return true;
    }
    return false;
  });

  // Establish initial application readiness without exceeding sensible limits
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page, params = {}, options = {}) => {
    if (!page) return;
    const target = page.toLowerCase();

    // Check if navigation was triggered from Navbar
    const isFromNav = Boolean(options?.fromNav || params?.fromNav);

    // Normalize page identifiers to check if the page actually changed
    const normalizePage = (p) => {
      if (!p) return 'home';
      const s = p.toLowerCase();
      if (s === 'courses' || s === 'training' || s === 'it school' || s === 'itschool') return 'it school';
      return s;
    };

    const isPageSwitch = normalizePage(target) !== normalizePage(currentPage);

    setPageParams(params);
    setCurrentPage(target);

    // Trigger the reloader ONLY when pages are switched from the Navbar
    if (isFromNav && isPageSwitch) {
      setNavigationKey(Date.now());
      setIsNavigating(true);
      setIsPageRevealed(false);
    } else {
      // In-page button clicks switch pages smoothly without showing the reloader
      setIsNavigating(false);
      setIsPageRevealed(true);
    }

    if (typeof window !== 'undefined' && window.lenis?.scrollTo) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={handleNavigate} isPageRevealed={isPageRevealed} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} {...pageParams} />;
      case 'works':
        return <WorksPage onNavigate={handleNavigate} />;
      case 'courses':
      case 'training':
      case 'it school':
      case 'itschool':
        return <CoursesPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'process':
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* 1. INITIAL FULL-EXPERIENCE MULTILINGUAL BRAND LOADER */}
      {showInitialLoader && (
        <IntegrateThoughtLoader
          mode="initial"
          isReady={isInitialReady}
          onExiting={() => setIsPageRevealed(true)}
          onComplete={() => {
            setShowInitialLoader(false);
            setIsPageRevealed(true);
          }}
        />
      )}

      {/* 2. BRAND NAVIGATION TRANSITION ON TAB SWITCH */}
      {isNavigating && (
        <IntegrateThoughtLoader
          key={navigationKey}
          mode="navigation"
          isReady={true}
          onExiting={() => setIsPageRevealed(true)}
          onComplete={() => {
            setIsNavigating(false);
            setIsPageRevealed(true);
          }}
        />
      )}

      {/* 3. ACTIVE APPLICATION PAGE WITH CLEAN OPACITY TRANSITION */}
      <motion.div
        key={`page-wrapper-${currentPage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageRevealed ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full min-h-screen"
      >
        {renderPage()}
      </motion.div>
    </>
  );
}
