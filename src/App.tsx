// src/App.tsx
import React from 'react';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
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
</header>
 
      <main className="app-main">
<ThoughtList />
<PostThoughts /> 
<ThoughtsFeed />
</main>
 
      <Footer 
        teamName={teamName}
        teamMembers={teamMembers}
      />
</div>
  );
};
 
export default App;