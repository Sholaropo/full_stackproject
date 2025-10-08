// src/App.tsx
import React, { useState } from 'react';
import ThoughtList from './components/thought-list/ThoughtList';
import { Routes, Route, Link } from 'react-router-dom';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import './App.css'; // Import main styling

const App: React.FC = () => {
  // Team information displayed in the Footer
  const teamName = "The page turners";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu", 
    "Amandeep Kaur"
  ];

  //  Shared/global state
  const [sharedCounter, setSharedCounter] = useState(0);
  const [sharedMessage, setSharedMessage] = useState('Welcome!');
  const [thoughts, setThoughts] = useState<Thought[]>([]); 

  return (
    <div className="app">
      {/* App header section with title, subtitle, and navigation bar */}
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
        {/* Navigation bar for page links */}
        <Navigation />
      </header>

      {/* Define all app routes using React Router */}
      <Routes>
        {/* Home page showing list of thoughts */}
        <Route path="/" element={<ThoughtList />} />
        {/* Page for posting a new thought */}
        <Route path="/post" element={<PostThoughts />} />
        {/* Community feed page showing shared posts */}
        <Route path="/feed" element={<ThoughtsFeed />} />
      </Routes>

      {/* Footer displaying team name and members */}
      <Footer 
        teamName={teamName}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default App;
