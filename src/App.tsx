import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CyberQuest from './components/CyberQuest';
import CyberScan from './components/CyberScan';
import CyberGuide from './components/CyberGuide';
import Header from './components/Header';

export type Page = 'home' | 'cyberquest' | 'cyberscan' | 'cyberguide';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
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