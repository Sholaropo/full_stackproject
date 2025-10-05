// src/components/thought-list/ThoughtList.tsx
import React from 'react';
import type { Thought } from '../../types';
import './ThoughtList.css';

interface Props {
  sharedCounter: number;
  setSharedCounter: (n: number) => void;
  sharedMessage: string;
  setSharedMessage: (s: string) => void;
}

const ThoughtList: React.FC<Props> = ({ sharedCounter, setSharedCounter, sharedMessage, setSharedMessage }) => {
  const thoughts: Thought[] = [
    {
      id: '1',
      content: 'Just had the most amazing coffee this morning! ☕ Nothing beats a good start to the day.',
      author: 'CoffeeLover23',
      timestamp: new Date('2025-09-05T08:30:00'),
      likes: 12
    },
    {
      id: '2',
      content: 'Working on a new React project today. TypeScript is making everything so much cleaner! 💻',
      author: 'DevMind',
      timestamp: new Date('2025-09-05T10:15:00'),
      likes: 8
    },
    {
      id: '3',
      content: 'Beautiful sunset today. Sometimes we need to stop and appreciate the simple things in life. 🌅',
      author: 'NatureLover',
      timestamp: new Date('2025-09-05T19:45:00'),
      likes: 25
    },
    {
      id: '4',
      content: 'Learning something new every day is the key to personal growth. What did you learn today?',
      author: 'WisdomSeeker',
      timestamp: new Date('2025-09-05T14:20:00'),
      likes: 15
    },
    {
      id: '5',
      content: 'Friday feeling! Looking forward to the weekend. Time to recharge and spend time with family.',
      author: 'WeekendWarrior',
      timestamp: new Date('2025-09-05T16:00:00'),
      likes: 18
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
    <section className="thought-list">
      <h2>Latest Thoughts</h2>
      
      {/* Shared state display and controls */}
      <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>Counter: {sharedCounter}</p>
        <button onClick={() => setSharedCounter(sharedCounter + 1)}>Increment</button>
        <button onClick={() => setSharedCounter(sharedCounter - 1)}>Decrement</button>
        <p>Message: {sharedMessage}</p>
      </div>

      <div className="thoughts-container">
        {thoughts.map((thought) => (
          <article key={thought.id} className="thought-card">
            <header className="thought-header">
              <h3 className="thought-author">@{thought.author}</h3>
              <time className="thought-timestamp" dateTime={thought.timestamp.toISOString()}>
                {formatTimestamp(thought.timestamp)}
              </time>
            </header>
            <div className="thought-content">
              <p>{thought.content}</p>
            </div>
            <footer className="thought-footer">
              <button className="like-button" type="button" aria-label={`Like thought by ${thought.author}`}>
                ❤️ {thought.likes}
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ThoughtList;