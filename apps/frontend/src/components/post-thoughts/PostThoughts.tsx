import React, { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useThoughts } from "../../hooks/usePostThought";
import * as thoughtService from '../../services/thoughtService';
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

    const errors = thoughtService.validateThought(content, "Olusola");
    if (errors.size > 0) {
      alert(errors.get("content") || "Validation error!");
      return;
    }

    await addThought(content, "Olusola");
    setContent("");
  };

  return (
    <section className="post-thoughts">
      <h2>Share Your Thoughts</h2>

      <SignedOut>
        <div className="auth-message">
          <p>Please sign in to post thoughts</p>
          <SignInButton mode="modal">
            <button className="sign-in-to-post-button">
              Sign In to Post
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
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
                <time>{thoughtService.formatTimestamp(thought.timestamp)}</time>
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
      </SignedIn>
    </section>
  );
};

export default PostThoughts;