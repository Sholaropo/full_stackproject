import React from 'react';
import type { Thought } from '../../types';
import * as thoughtService from '../../services/thoughtService';

interface Props {
  thought: Thought;
  isLiked: boolean;
  onLike: (id: string) => void;
}

const ThoughtCard: React.FC<Props> = ({ thought, isLiked, onLike }) => {
  // Safe timestamp conversion
  let timestamp: Date;
  try {
    if (thought.timestamp instanceof Date) {
      timestamp = thought.timestamp;
    } else if (typeof thought.timestamp === 'string' || typeof thought.timestamp === 'number') {
      timestamp = new Date(thought.timestamp);
      // Check if valid
      if (isNaN(timestamp.getTime())) {
        timestamp = new Date(); // Fallback to now
      }
    } else {
      timestamp = new Date(); // Fallback
    }
  } catch {
    timestamp = new Date(); // Fallback
  }

  return (
    <article className="thought-card">
      <header className="thought-header">
        <h3 className="thought-author">@{thought.author}</h3>
        <time className="thought-timestamp" dateTime={timestamp.toISOString()}>
          {thoughtService.formatTimestamp(timestamp)}
        </time>
      </header>
      <div className="thought-content">
        <p>{thought.content}</p>
      </div>
      <footer className="thought-footer">
        <button 
          className="like-button" 
          type="button" 
          aria-label={`Like thought by ${thought.author}`}
          onClick={() => onLike(thought.id)}
        >
          {isLiked ? '❤️' : '🤍'} {thought.likes}
        </button>
      </footer>
    </article>
  );
};

export default ThoughtCard;