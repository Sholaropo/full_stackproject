import React, { useState } from 'react';
import { Thought } from '../../types';
import './ThoughtsFeed.css';

interface Props {
  sharedCounter: number;
  setSharedCounter: (n: number) => void;
  sharedMessage: string;
  setSharedMessage: (s: string) => void;
}

function ThoughtsFeed({ sharedCounter, setSharedCounter, sharedMessage, setSharedMessage }: Props) {
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  
  // community posts data
  const posts = [
    {
      id: '1',
      content: 'Just discovered an amazing productivity technique! The Pomodoro method really works for coding sessions.',
      author: 'ProductivityPro',
      timestamp: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000), // Today
      likes: 45
    },
    {
      id: '2',
      content: 'Built my first full-stack application today! React frontend with Node.js backend. Feeling accomplished!',
      author: 'FullStackDev',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      likes: 32
    },
    {
      id: '3',
      content: 'Git merge conflicts are the worst! But finally figured out how to resolve them properly.',
      author: 'GitLearner',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      likes: 28
    },
    {
      id: '4',
      content: 'CSS Grid vs Flexbox - still learning when to use which. Both are powerful tools!',
      author: 'CSSExplorer',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      likes: 19
    },
    {
      id: '5',
      content: 'Debugging JavaScript can be frustrating, but console.log is my best friend right now!',
      author: 'DebugMaster',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      likes: 24
    },
    {
      id: '6',
      content: 'API integration is tricky but rewarding. Successfully connected my app to a weather API!',
      author: 'APINewbie',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      likes: 31
    }
  ];

  function formatTime(timestamp: Date) {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return '1 day ago';
    } else {
      return days + ' days ago';
    }
  }

  // filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = selectedAuthor === 'all' || post.author === selectedAuthor;
    return matchesSearch && matchesAuthor;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
  function handleLike(postId: string) {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  }

  function handleShare(content: string, author: string) {
    const shareText = `"${content}" - @${author}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Post copied to clipboard!');
    }).catch(() => {
      alert('Unable to copy. Please try again.');
    });
  }

  // sort posts
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    } else if (sortBy === 'recent') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
    return 0;
  });

  // get unique authors for filter dropdown
  const authors = ['all', ...new Set(posts.map(post => post.author))];

  return (
    <section className="thoughts-feed">
      <div className="feed-header">
        <h2>Community Feed</h2>
        
        <div className="search-filter-form">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label>Author:</label>
              <select 
                value={selectedAuthor} 
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="author-filter"
              >
                {authors.map(author => (
                  <option key={author} value={author}>
                    {author === 'all' ? 'All Authors' : author}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sort-group">
              <label>Sort:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>Counter: {sharedCounter} | Message: {sharedMessage}</p>
        <button onClick={() => setSharedCounter(sharedCounter + 1)}>+</button>
        <button onClick={() => setSharedCounter(sharedCounter - 1)}>-</button>
      </div>
      
      <div className="feed-content">
        {sortedPosts.map((thought) => (
          <div key={thought.id} className="feed-item">
            <div className="item-header">
              <span className="author">@{thought.author}</span>
              <span className="time">{formatTime(thought.timestamp)}</span>
            </div>
            
            <div className="content">
              <p>{thought.content}</p>
            </div>
            
            <div className="actions">
              <button 
                className={`like-btn ${likedPosts.has(thought.id) ? 'liked' : ''}`}
                onClick={() => handleLike(thought.id)}
              >
                <span className="heart-icon">{likedPosts.has(thought.id) ? '❤️' : '🤍'}</span>
                <span className="like-count">{thought.likes + (likedPosts.has(thought.id) ? 1 : 0)}</span>
              </button>
              <button 
                className="share-btn"
                onClick={() => handleShare(thought.content, thought.author)}
              >
                📤 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThoughtsFeed;