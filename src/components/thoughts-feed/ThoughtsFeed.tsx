// src/components/thoughts-feed/ThoughtsFeed.tsx
import React from 'react';
import type { Thought } from '../../types';
import './ThoughtsFeed.css';

const ThoughtsFeed: React.FC = () => {
  // Initialize a list of data for the thoughts feed
  const thoughtsFeed: Thought[] = [
    {
      id: 'feed-1',
      content: 'Just finished reading an amazing book about productivity! The key takeaway: focus on systems, not goals. What are your favorite productivity tips?',
      author: 'BookWorm_2024',
      timestamp: new Date('2025-01-15T09:30:00'),
      likes: 24
    },
    {
      id: 'feed-2',
      content: 'Beautiful morning walk in the park today. Nature has a way of clearing the mind and bringing fresh perspectives. 🌳✨',
      author: 'NatureSeeker',
      timestamp: new Date('2025-01-15T08:15:00'),
      likes: 18
    },
    {
      id: 'feed-3',
      content: 'Working on a new coding project and learning so much! The best part about programming is that there\'s always something new to discover. #coding #learning',
      author: 'CodeExplorer',
      timestamp: new Date('2025-01-15T14:45:00'),
      likes: 31
    },
    {
      id: 'feed-4',
      content: 'Grateful for the small moments today - a good cup of coffee, a friendly conversation, and the sunset from my window. Sometimes the simple things matter most.',
      author: 'GratefulSoul',
      timestamp: new Date('2025-01-15T19:20:00'),
      likes: 42
    },
    {
      id: 'feed-5',
      content: 'Just tried a new recipe and it turned out amazing! Cooking is such a creative outlet. What\'s your go-to comfort food?',
      author: 'ChefInTraining',
      timestamp: new Date('2025-01-15T12:30:00'),
      likes: 15
    },
    {
      id: 'feed-6',
      content: 'Reflecting on the importance of work-life balance. Taking time for hobbies and personal interests makes us better professionals too. What do you do to unwind?',
      author: 'BalanceSeeker',
      timestamp: new Date('2025-01-15T16:10:00'),
      likes: 28
    }
  ];

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <section className="thoughts-feed">
      <header className="feed-header">
        <h2 className="feed-title">Community Thoughts</h2>
        <p className="feed-subtitle">Discover what's on everyone's mind</p>
      </header>
      
      <div className="feed-content">
        {thoughtsFeed.map((thought) => (
          <article key={thought.id} className="feed-item">
            <div className="item-header">
              <div className="author-info">
                <span className="author-name">@{thought.author}</span>
                <time className="post-time" dateTime={thought.timestamp.toISOString()}>
                  {formatTimestamp(thought.timestamp)}
                </time>
              </div>
            </div>
            
            <div className="item-content">
              <p className="thought-text">{thought.content}</p>
            </div>
            
            <div className="item-actions">
              <button 
                className="action-button like-btn" 
                type="button" 
                aria-label={`Like thought by ${thought.author}`}
              >
                <span className="action-icon">❤️</span>
                <span className="action-count">{thought.likes}</span>
              </button>
              
              <button 
                className="action-button share-btn" 
                type="button" 
                aria-label={`Share thought by ${thought.author}`}
              >
                <span className="action-icon">📤</span>
                <span className="action-text">Share</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <footer className="feed-footer">
        <p className="feed-info">Showing {thoughtsFeed.length} thoughts from the community</p>
      </footer>
    </section>
  );
};

export default ThoughtsFeed;
