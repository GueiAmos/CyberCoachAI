import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ModuleDescription from './components/ModuleDescription';
import CyberQuest from './components/CyberQuest';
import CyberScan from './components/CyberScan';
import CyberGuide from './components/CyberGuide';
import Header from './components/Header';

export type Page = 'home' | 'cyberquest' | 'cyberscan' | 'cyberguide' | 'cyberquest-desc' | 'cyberscan-desc' | 'cyberguide-desc';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'cyberquest-desc':
        return (
          <ModuleDescription 
            module="cyberquest" 
            onBack={() => setCurrentPage('home')} 
            onStart={() => setCurrentPage('cyberquest')}
          />
        );
      case 'cyberscan-desc':
        return (
          <ModuleDescription 
            module="cyberscan" 
            onBack={() => setCurrentPage('home')} 
            onStart={() => setCurrentPage('cyberscan')}
          />
        );
      case 'cyberguide-desc':
        return (
          <ModuleDescription 
            module="cyberguide" 
            onBack={() => setCurrentPage('home')} 
            onStart={() => setCurrentPage('cyberguide')}
          />
        );
      case 'cyberquest':
        return <CyberQuest onBack={() => setCurrentPage('home')} />;
      case 'cyberscan':
        return <CyberScan onBack={() => setCurrentPage('home')} />;
      case 'cyberguide':
        return <CyberGuide onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto py-4 sm:py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;