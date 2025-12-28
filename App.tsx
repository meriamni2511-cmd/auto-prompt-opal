
import React, { useState, useEffect } from 'react';
import { View } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simple routing simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'dashboard' && isAuthenticated) {
        setCurrentView(View.DASHBOARD);
      } else if (Object.values(View).includes(hash as View)) {
        setCurrentView(hash as View);
      } else {
        setCurrentView(View.LANDING);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    window.location.hash = View.DASHBOARD;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.hash = View.LANDING;
  };

  if (currentView === View.LANDING) {
    return <LandingPage onStart={handleLogin} />;
  }

  return (
    <Dashboard 
      initialView={currentView} 
      onLogout={handleLogout} 
      onChangeView={(v) => {
        window.location.hash = v;
        setCurrentView(v);
      }} 
    />
  );
};

export default App;
