import React, { useState } from "react";
import type { Thought } from "../../types";
import "./PostThoughts.css";

interface Props {
  thoughts: Thought[];
  setThoughts: React.Dispatch<React.SetStateAction<Thought[]>>;
  sharedCounter: number;
  setSharedCounter: React.Dispatch<React.SetStateAction<number>>;
  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
}

const PostThoughts: React.FC<Props> = ({
  thoughts,
  setThoughts,
  sharedCounter,
  setSharedCounter,
  sharedMessage,
  setSharedMessage,
}) => {
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

    // update parent state
    setThoughts([newThought, ...thoughts]);
    setSharedCounter(sharedCounter + 1);
    setSharedMessage(content);

    setContent("");
  };

  return (
    <section className="post-thoughts">
      <h2>Share Your Thoughts</h2>

      {/* Shared area */}
      <div style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
        <p><strong>Shared Message:</strong> {sharedMessage}</p>
        <input
          value={sharedMessage}
          onChange={(e) => setSharedMessage(e.target.value)}
          placeholder="Update shared message"
        />
        <p><strong>Total Shared Posts:</strong> {sharedCounter}</p>
      </div>

      {/* Form */}
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

      {/* List */}
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
