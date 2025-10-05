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
  
  // community posts data
  const posts = [
    {
      id: '1',
      content: 'Just discovered an amazing productivity technique! The Pomodoro method really works for coding sessions.',
      author: 'ProductivityPro',
      timestamp: new Date('2025-01-14T08:30:00'),
      likes: 45
    },
    {
      id: '2',
      content: 'Built my first full-stack application today! React frontend with Node.js backend. Feeling accomplished!',
      author: 'FullStackDev',
      timestamp: new Date('2025-01-13T15:45:00'),
      likes: 32
    },
    {
      id: '3',
      content: 'Git merge conflicts are the worst! But finally figured out how to resolve them properly.',
      author: 'GitLearner',
      timestamp: new Date('2025-01-12T11:20:00'),
      likes: 28
    },
    {
      id: '4',
      content: 'CSS Grid vs Flexbox - still learning when to use which. Both are powerful tools!',
      author: 'CSSExplorer',
      timestamp: new Date('2025-01-11T16:15:00'),
      likes: 19
    },
    {
      id: '5',
      content: 'Debugging JavaScript can be frustrating, but console.log is my best friend right now!',
      author: 'DebugMaster',
      timestamp: new Date('2025-01-10T13:45:00'),
      likes: 24
    },
    {
      id: '6',
      content: 'API integration is tricky but rewarding. Successfully connected my app to a weather API!',
      author: 'APINewbie',
      timestamp: new Date('2025-01-09T20:30:00'),
      likes: 31
    }
  ];

  function formatTime(timestamp: Date) {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return hours + 'hour' + minutes + 'min ago';
    } else {
      return minutes + 'min ago';
    }
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

  return (
    <section className="thoughts-feed">
      <div className="feed-header">
        <h2>Community Feed</h2>
        <div className="sort-controls">
          <label>Sort:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="recent">Recent</option>
          </select>
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
              <button className="like-btn">
                {thought.likes}
              </button>
              <button className="share-btn">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThoughtsFeed;