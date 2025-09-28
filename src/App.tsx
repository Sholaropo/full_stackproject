import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import ThoughtList from './components/thought-list/ThoughtList';
import Footer from './components/footer/Footer';
import { SharedStateProvider } from './SharedStateContext';
import FeatureB from './pages/FeatureB';
import './App.css';

const Layout: React.FC = () => {
  const activeStyle = { fontWeight: 700, textDecoration: 'underline' } as React.CSSProperties;
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Multi-Page App</h1>
        <nav>
          <NavLink to="/feature-a" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Feature A</NavLink>
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
  const teamName = "The page turners";
  const teamMembers = [
    "Olusola Ropo",
    "Vandana Bhangu",
    "Amandeep Kaur"
  ];


  const [sharedCounter, setSharedCounter] = useState<number>(0);

  return (
    <SharedStateProvider value={{ sharedCounter, setSharedCounter }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ThoughtList />} />
            <Route path="feature-a" element={<ThoughtList />} />
            <Route path="feature-b" element={<FeatureB />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SharedStateProvider>
  );
};

export default App;