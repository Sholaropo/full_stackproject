import React from 'react';
import type { Thought } from '../../types';
import * as thoughtService from '../../services/thoughtService';

interface Props {
  thought: Thought;
  isLiked: boolean;
  onLike: (id: string) => void;
}

const ThoughtCard: React.FC<Props> = ({ thought, isLiked, onLike }) => {
  return (
    <article className="thought-card">
      <header className="thought-header">
        <h3 className="thought-author">@{thought.author}</h3>
        <time className="thought-timestamp" dateTime={thought.timestamp.toISOString()}>
          {thoughtService.formatTimestamp(thought.timestamp)}
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