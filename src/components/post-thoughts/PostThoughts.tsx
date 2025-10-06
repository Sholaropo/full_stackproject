import React, { useState } from 'react';
import type { Thought } from '../../types';
import './PostThoughts.css';

interface PostThoughtsProps {
  thoughts: Thought[];
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>;
}

const PostThoughts: React.FC<PostThoughtsProps> = ({ thoughts, setThoughts }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newThought: Thought = {
      id: (thoughts.length + 1).toString(),
      content,
      author: 'You',
      timestamp: new Date(),
      likes: 0,
    };

    setThoughts([newThought, ...thoughts]);
    setContent('');
  };

  return (
    <section className="post-thoughts">
      <h2>Share Your Thoughts</h2>
      <form className="thought-form" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          aria-label="Write a new thought"
          rows={5}
        />
        <button type="submit">Post</button>
      </form>

      {thoughts.length > 0 && (
        <div className="posted-thoughts">
          <h3>Recent Thoughts</h3>
          {thoughts.map((thought) => (
            <div key={thought.id} className="thought-card">
              <div className="thought-header">
                <span className="thought-author">@{thought.author}</span>
                <span className="thought-timestamp">
                  {thought.timestamp.toLocaleString()}
                </span>
              </div>
              <div className="thought-content">
                <p>{thought.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostThoughts;
