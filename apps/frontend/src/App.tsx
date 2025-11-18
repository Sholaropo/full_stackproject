import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import Navigation from './components/navigation/Navigation';
import SharedCounter from './shared/SharedCounter';
import './App.css';

const App: React.FC = () => {
  const teamName = "The page turners";
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
        <Navigation />
      </header>

      {/* Add SharedCounter here to display on all pages */}
      <SharedCounter />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <ThoughtList />
            }
          />
          <Route
            path="/post"
            element={<PostThoughts />} 
          />
          <Route
            path="/feed"
            element={
              <ThoughtsFeed />
            }
          />
        </Routes>
      </main>

      <Footer teamName={teamName} teamMembers={teamMembers} />
    </div>
  );
};

export default App;

