import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    if (!page) return;
    const target = page.toLowerCase();
    setCurrentPage(target);
    window.scrollTo(0, 0);
  };

  switch (currentPage) {
    case 'about':
      return <AboutPage onNavigate={handleNavigate} />;
    case 'services':
      return <ServicesPage onNavigate={handleNavigate} />;
    case 'works':
      return <WorksPage onNavigate={handleNavigate} />;
    case 'courses':
    case 'training':
      return <CoursesPage onNavigate={handleNavigate} />;
    case 'contact':
      return <ContactPage onNavigate={handleNavigate} />;
    case 'process':
    case 'home':
    default:
      return <HomePage onNavigate={handleNavigate} />;
  }
}
