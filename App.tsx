
import React, { useState, useEffect } from 'react';
import DaVeenciLandingPage from './DaVeenciLandingPage';
import BriefingsPage from './BriefingsPage';
import BriefingDetailPage from './BriefingDetailPage';

export type Page = 'landing' | 'briefings' | 'briefing-detail';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('landing');
  const [selectedBriefingId, setSelectedBriefingId] = useState<string | null>(null);

  // Handle browser back/forward buttons loosely (optional enhancement)
  useEffect(() => {
    window.onpopstate = (e) => {
       if (e.state?.page) {
         setPage(e.state.page);
         if (e.state.briefingId) setSelectedBriefingId(e.state.briefingId);
       }
    };
  }, []);

  const handleNavigate = (targetPage: Page, hash?: string, id?: string) => {
    setPage(targetPage);
    if (id) setSelectedBriefingId(id);

    // Simple history push
    let path = '/';
    if (targetPage === 'briefings') path = '/briefings';
    if (targetPage === 'briefing-detail') path = `/briefings/${id}`;

    window.history.pushState({ page: targetPage, briefingId: id }, '', path);

    if (targetPage === 'landing' && hash) {
       // Allow time for render
       setTimeout(() => {
          const element = document.getElementById(hash.replace('#', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
       window.scrollTo(0,0);
    }
  };

  return (
    <main className="antialiased font-sans text-ink bg-base min-h-screen selection:bg-accent/20">
      {page === 'landing' && (
        <DaVeenciLandingPage onNavigate={handleNavigate} />
      )}
      {page === 'briefings' && (
        <BriefingsPage onNavigate={handleNavigate} />
      )}
      {page === 'briefing-detail' && (
        <BriefingDetailPage onNavigate={handleNavigate} id={selectedBriefingId} />
      )}
    </main>
  );
};

export default App;
