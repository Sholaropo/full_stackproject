// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import './App.css';
import type { Thought } from './types';

const App: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]); 

  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/post">Post</Link> |{" "}
          <Link to="/feed">Feed</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route 
            path="/" 
            element={<ThoughtList thoughts={thoughts} />} 
          />
          <Route 
            path="/post" 
            element={<PostThoughts thoughts={thoughts} setThoughts={setThoughts} />} 
          />
          <Route 
            path="/feed" 
            element={<ThoughtsFeed thoughts={thoughts} />} 
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
