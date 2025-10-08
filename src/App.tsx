// src/App.tsx
import React, { useState } from 'react';
import ThoughtList from './components/thought-list/ThoughtList';
import { Routes, Route } from 'react-router-dom';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import { Thought } from './types';
import './App.css';

const App: React.FC = () => {
  // Team information displayed in the Footer
  const teamName = "The page turners";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu", 
    "Amandeep Kaur"
  ];

  // Shared/global state
  const [sharedCounter, setSharedCounter] = useState(0);
  const [sharedMessage, setSharedMessage] = useState('Welcome!');
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  return (
    <div className="app">
      {/* App header section with title, subtitle, and navigation bar */}
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
        <Navigation />
      </header>

      {/* Define all app routes using React Router */}
      <main className="app-main">
        <Routes>
          {/* Home page showing list of thoughts */}
          <Route 
            path="/" 
            element={
              <ThoughtList 
                thoughts={thoughts}                 
                sharedCounter={sharedCounter}
                setSharedCounter={setSharedCounter}
                sharedMessage={sharedMessage}
                setSharedMessage={setSharedMessage}
              />
            } 
          />
          {/* Page for posting a new thought */}
          <Route 
            path="/post" 
            element={
              <PostThoughts 
                thoughts={thoughts}              
                setThoughts={setThoughts}           
                sharedCounter={sharedCounter}
                setSharedCounter={setSharedCounter}
                sharedMessage={sharedMessage}
                setSharedMessage={setSharedMessage}
              />
            } 
          />
          {/* Community feed page showing shared posts */}
          <Route 
            path="/feed" 
            element={
              <ThoughtsFeed 
                thoughts={thoughts}  
                setThoughts={setThoughts}               
                sharedCounter={sharedCounter}
                setSharedCounter={setSharedCounter}
                sharedMessage={sharedMessage}
                setSharedMessage={setSharedMessage}
              />
            } 
          />
        </Routes>
      </main>

      {/* Footer displaying team name and members */}
      <Footer 
        teamName={teamName}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default App;