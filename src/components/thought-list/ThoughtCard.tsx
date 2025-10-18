import React from 'react';
import * as thoughtService from '../../services/thoughtService';
import type { Thought } from '../../types';

interface Props {
  thought: Thought;
  isLiked: boolean;
  onLike: (id: string) => void;
}

const ThoughtCard: React.FC<Props> = ({ thought, isLiked, onLike }) => {
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
    <article className="thought-card">
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
        <button 
          className="like-button" 
          type="button" 
          aria-label={`Like thought by ${thought.author}`}
          onClick={() => onLike(thought.id + thought.author)}
        >
          {isLiked ? '❤️' : '🤍'} {thought.likes + (isLiked ? 1 : 0)}
        </button>
      </footer>
    </article>
  );
};

export default ThoughtCard;