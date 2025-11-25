import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import SharedCounter from './shared/SharedCounter';
import Auth from './components/Auth/Auth';  // ← ADD THIS
import './App.css';
import type { Thought } from './types';import './App.css';

const App: React.FC = () => {
  const teamName = "The page turners";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu",
    "Amandeep Kaur"
    
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  return (
    <div className="app">
      <Auth />  {/* ← ADD THIS ONE LINE */}
      
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
        <Navigation />
      </header>

      <SharedCounter />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ThoughtList />} />
          <Route path="/post" element={<PostThoughts />} />
          <Route path="/feed" element={<ThoughtsFeed />} />
        </Routes>
      </main>

      <Footer teamName={teamName} teamMembers={teamMembers} />
    </div>
  );
};

export default App;