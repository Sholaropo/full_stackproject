// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import React from "react";
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ThoughtList from './components/thought-list/ThoughtList';
import { Routes, Route } from 'react-router-dom'; // Import routing tools
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import './App.css';
import type { Thought } from './types';

const App: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]); 

  const [sharedCounter, setSharedCounter] = useState(0);
  const [sharedMessage, setSharedMessage] = useState('Welcome!');

  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>

        <Navigation />
      </header>

      <Routes>
          <Route path="/" element={<ThoughtList />} />
          <Route path="/post" element={<PostThoughts />} />
          <Route path="/feed" element={<ThoughtsFeed />} />
        </Routes>

        {/* Navigation links */}
      
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
            element={
              <ThoughtList 
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
                sharedCounter={sharedCounter}
                setSharedCounter={setSharedCounter}
                sharedMessage={sharedMessage}
                setSharedMessage={setSharedMessage}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;