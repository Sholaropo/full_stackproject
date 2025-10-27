import React, { useEffect, useState } from "react";
import { useThoughts } from "../../hooks/usePostThought";
import type { Thought } from "../../types";
import "./PostThoughts.css";

/**
 * PostThoughts Component
 *
 * Purpose:
 * - Allows users to post new thoughts.
 * - Uses `useThoughts` hook for all CRUD operations.
 * - Demonstrates separation of concerns: UI logic is separate from data logic.
 */
const PostThoughts: React.FC = () => {
  const { thoughts, addThought, like: likeThought, error } = useThoughts();
  const [content, setContent] = useState("");

useEffect(() => {
    console.log("Current thoughts:", thoughts);
  }, [thoughts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addThought(content, "You");
    setContent("");
  };

  return (
    <section className="post-thoughts">
      <h2>Share Your Thoughts</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
        {thoughts.map((thought: Thought) => (
          <article key={thought.id} className="thought-card">
            <header className="thought-header">
              <h4>@{thought.author}</h4>
              <time>{thought.timestamp.toLocaleString()}</time>
            </header>
            <p>{thought.content}</p>
            
      <button
         className="like-btn"
         onClick={() => likeThought(thought.id)}
         aria-label="Like this post"
        >
        ❤️ {thought.likes} Likes
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostThoughts;