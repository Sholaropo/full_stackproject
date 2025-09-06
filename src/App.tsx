// src/App.tsx
import React from 'react';
import ThoughtList from './components/thought-list/ThoughtList';
import Footer from './components/footer/Footer';
import './App.css';

const App: React.FC = () => {
  // You can customize these values for your team
  const teamName = "ThoughtShare Team";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu", 
    "Amandeep Kaur"
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
      </header>

      <main className="app-main">
        <ThoughtList />
      </main>

      <Footer 
        teamName={teamName}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default App;