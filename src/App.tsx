import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, Navigate } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import PostThoughts from './components/post-thoughts/PostThoughts';
import ThoughtsFeed from './components/thoughts-feed/ThoughtsFeed';
import Footer from './components/footer/Footer';
import { SharedStateProvider } from './SharedStateContext';
import FeatureB from './pages/FeatureB';
import { AuthProvider } from './contexts/AuthContext';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { FeedPage } from './pages/FeedPage';
import './App.css';

const Layout: React.FC = () => {
  const activeStyle = { fontWeight: 700, textDecoration: 'underline' } as React.CSSProperties;
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>ThoughtShare</h1>
        <nav>
          <NavLink to="/thoughts" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Thoughts</NavLink>
          {' | '}
          <NavLink to="/post" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Post</NavLink>
          {' | '}
          <NavLink to="/feed" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Feed</NavLink>
          {' | '}
          <NavLink to="/feature-b" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Feature B</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [sharedCounter, setSharedCounter] = useState<number>(0);
  
  return (
    <AuthProvider>
      <SharedStateProvider value={{ sharedCounter, setSharedCounter }}>
        <BrowserRouter>
          <Routes>
            {/* Authentication routes - no layout */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            {/* Main app routes - with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/signin" replace />} />
              <Route path="thoughts" element={<ThoughtList />} />
              <Route path="post" element={<PostThoughts />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="thoughts-feed" element={<ThoughtsFeed />} />
              <Route path="feature-b" element={<FeatureB />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SharedStateProvider>
    </AuthProvider>
  );
};

export default App;