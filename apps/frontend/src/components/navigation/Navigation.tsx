import { Link, useLocation } from 'react-router-dom';
import { SignedIn } from '@clerk/clerk-react';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Latest Thoughts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/post" 
            className={location.pathname === '/post' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">✍️</span>
            <span className="nav-label">Post Thoughts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/feed" 
            className={location.pathname === '/feed' ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">🌐</span>
            <span className="nav-label">Community Feed</span>
          </Link>
        </li>
        <SignedIn>
          <li className="nav-item">
            <Link 
              to="/my-thoughts" 
              className={location.pathname === '/my-thoughts' ? 'nav-link active' : 'nav-link'}
            >
              <span className="nav-icon">💭</span>
              <span className="nav-label">My Thoughts</span>
            </Link>
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
};

export default Navigation;
