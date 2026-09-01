import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import IntegrateThoughtLoader from './components/IntegrateThoughtLoader';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationKey, setNavigationKey] = useState(0);

  // Establish initial application readiness without exceeding sensible limits
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page, params = {}) => {
    if (!page) return;
    const target = page.toLowerCase();

    // Trigger the 3-5 second brand transition when switching tabs
    setNavigationKey(Date.now());
    setIsNavigating(true);
    setPageParams(params);
    setCurrentPage(target);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
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
          onComplete={() => setShowInitialLoader(false)}
        />
      )}

      {/* 2. 3-5 SECOND BRAND NAVIGATION TRANSITION ON TAB SWITCH */}
      {isNavigating && (
        <IntegrateThoughtLoader
          key={navigationKey}
          mode="navigation"
          isReady={true}
          onComplete={() => setIsNavigating(false)}
        />
      )}

      {/* 3. ACTIVE APPLICATION PAGE */}
      {renderPage()}
    </>
  );
}
