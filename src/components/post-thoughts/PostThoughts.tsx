import React, { useState } from "react";
import type { Thought } from "../../types";
import "./PostThoughts.css";

interface Props {
  sharedCounter: number;
  setSharedCounter: (n: number) => void;
  sharedMessage: string;
  setSharedMessage: (s: string) => void;
}

const PostThoughts: React.FC<Props> = ({ sharedCounter, setSharedCounter, sharedMessage, setSharedMessage }) => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newThought: Thought = {
      id: (thoughts.length + 1).toString(),
      content,
      author: "You", 
      timestamp: new Date(),
      likes: 0,
    };

    setThoughts([newThought, ...thoughts]);
    setContent("");
  };

  return (
    <section className="post-thoughts">
      <h2>Share Your Thoughts</h2>

      <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>Message: {sharedMessage}</p>
        <input 
          value={sharedMessage} 
          onChange={(e) => setSharedMessage(e.target.value)} 
          placeholder="Update shared message"
        />
      </div>

      <form className="thought-form" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          aria-label="Write a new thought"
          rows={3}
        />
        <button type="submit">Post</button>
      </form>

      <div className="posted-thoughts">
        {thoughts.length > 0 && <h3>Your Posts</h3>}
        {thoughts.map((thought) => (
          <article key={thought.id} className="thought-card">
            <header className="thought-header">
              <h4>@{thought.author}</h4>
              <time>{thought.timestamp.toLocaleString()}</time>
            </header>
            <p>{thought.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostThoughts;