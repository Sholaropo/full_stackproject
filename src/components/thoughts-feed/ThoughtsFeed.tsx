// src/components/thoughts-feed/ThoughtsFeed.tsx
import React from 'react';
import type { Thought } from '../../types';
import './ThoughtsFeed.css';

const ThoughtsFeed = () => {
  // sample data for thoughts feed
  const thoughtsFeed = [
    {
      id: '1',
      content: 'Just finished reading a good book about productivity! Focus on systems not goals.',
      author: 'BookLover',
      timestamp: new Date('2025-01-15T09:30:00'),
      likes: 24
    },
    {
      id: '2',
      content: 'Nice walk in the park today. Nature is so peaceful 🌳',
      author: 'NatureFan',
      timestamp: new Date('2025-01-15T08:15:00'),
      likes: 18
    },
    {
      id: '3',
      content: 'Working on coding project. Learning new things every day!',
      author: 'Coder123',
      timestamp: new Date('2025-01-15T14:45:00'),
      likes: 31
    },
    {
      id: '4',
      content: 'Grateful for coffee and good conversations today',
      author: 'HappyPerson',
      timestamp: new Date('2025-01-15T19:20:00'),
      likes: 42
    }
  ];

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) {
      return minutes + 'm ago';
    } else {
      return Math.floor(minutes / 60) + 'h ago';
    }
  };

  return (
    <section className="thoughts-feed">
      <h2>Community Thoughts</h2>
      
      <div className="feed-content">
        {thoughtsFeed.map((thought) => (
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThoughtsFeed;
