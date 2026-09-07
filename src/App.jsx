import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import IntegrateThoughtLoader from './components/IntegrateThoughtLoader';

const normalizePage = (p) => {
  if (!p) return 'home';
  const s = p.toLowerCase();
  if (s === 'courses' || s === 'training' || s === 'it school' || s === 'itschool') return 'it school';
  return s;
};

const getPageFromUrl = () => {
  if (typeof window === 'undefined') return { page: 'home', params: {} };
  const searchParams = new URLSearchParams(window.location.search);
  const p = searchParams.get('page');
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const page = normalizePage(p || hash || 'home');

  const params = {};
  for (const [k, v] of searchParams.entries()) {
    if (k !== 'page' && k !== 'loader') {
      params[k] = v;
    }
  }
  return { page, params };
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return getPageFromUrl().page;
  });
  const [pageParams, setPageParams] = useState(() => {
    return getPageFromUrl().params;
  });
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

  // Keep initial history entry in sync with page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { page, params } = getPageFromUrl();
      window.history.replaceState({ page, params }, '', window.location.href);
    }
  }, []);

  // Listen for browser Back and Forward navigation events
  useEffect(() => {
    const handlePopState = (event) => {
      const { page: urlPage, params: urlParams } = getPageFromUrl();
      const state = event.state || {};
      const targetPage = normalizePage(state.page || urlPage);
      const targetParams = state.params || urlParams || {};

      setCurrentPage(targetPage);
      setPageParams(targetParams);
      setIsNavigating(false);
      setIsPageRevealed(true);

      if (typeof window !== 'undefined' && window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Establish initial application readiness without exceeding sensible limits
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page, params = {}, options = {}) => {
    if (!page) return;
    const target = normalizePage(page);

    // Check if navigation was triggered from Navbar
    const isFromNav = Boolean(options?.fromNav || params?.fromNav);
    const isPageSwitch = target !== normalizePage(currentPage);

    // Update browser URL and history state
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.origin + window.location.pathname);
      const currentSearchParams = new URLSearchParams(window.location.search);
      if (currentSearchParams.has('loader')) {
        url.searchParams.set('loader', currentSearchParams.get('loader'));
      }

      if (target !== 'home') {
        url.searchParams.set('page', target);
      }

      Object.keys(params).forEach((key) => {
        if (key !== 'fromNav' && params[key] !== undefined && params[key] !== null) {
          url.searchParams.set(key, params[key]);
        }
      });

      if (options?.replace) {
        window.history.replaceState({ page: target, params }, '', url.toString());
      } else if (isPageSwitch || Object.keys(params).length > 0) {
        window.history.pushState({ page: target, params }, '', url.toString());
      }
    }

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
