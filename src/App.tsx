// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import { Thought } from './types';
import './App.css';

const App: React.FC = () => {
  const teamName = "The page turners";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu", 
    "Amandeep Kaur"
  ];

  const [sharedCounter, setSharedCounter] = useState(0);
  const [sharedMessage, setSharedMessage] = useState('Welcome!');
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
        <Navigation />
      </header>
      <main className="app-main">
        <Routes>
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

      <Footer teamName={teamName} teamMembers={teamMembers} />
    </div>
  );
};

export default App;
