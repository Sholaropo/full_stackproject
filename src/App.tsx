import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
 
  const [sharedCounter, setSharedCounter] = useState(0);
  const [sharedMessage, setSharedMessage] = useState('Welcome!');
 
  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <p>Share your thoughts with the world</p>
 
        {/* Navigation links */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/post">Post</Link> |{" "}
          <Link to="/feed">Feed</Link>
        </nav>
      </header>
 
      {/*  Define the routes */}
      <main className="app-main">
        <Routes>
          <Route
            path="/"
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
 
      <Footer
        teamName={teamName}
        teamMembers={teamMembers}
      />
    </div>
  );
};
 
export default App;