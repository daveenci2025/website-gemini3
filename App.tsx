import React from 'react';
import DaVeenciLandingPage from './DaVeenciLandingPage';

const App: React.FC = () => {
  return (
    <main className="antialiased font-sans text-ink bg-base min-h-screen selection:bg-accent/20">
      <DaVeenciLandingPage />
    </main>
  );
};

export default App;