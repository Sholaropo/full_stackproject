import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import * as thoughtService from "../../services/PostThoughtservices";
import type { Thought } from "../../types";
import "./PostThoughts.css";

const PostThoughts: React.FC = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mapTimestamps = (data: Thought[]): Thought[] => {
    return data.map((t) => ({
      ...t,
      timestamp: new Date((t as any).createdAt), 
    }));
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setError("Failed to get authentication token");
          return;
        }
        const data = await thoughtService.fetchThoughts(token);
        setThoughts(mapTimestamps(data));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch thoughts");
      }
    };
    fetchAll();
  }, [getToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const token = await getToken();
      if (!token) {
        setError("Failed to get authentication token");
        return;
      }

      const author = user?.username || user?.fullName || "Anonymous";

      const newThought = await thoughtService.createThought(content, token, author);
      setThoughts([mapTimestamps([newThought])[0], ...thoughts]);
      setContent("");
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to post thought");
    }
  };

  const handleLike = async (id: string) => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Failed to get authentication token");
        return;
      }

      const updated = await thoughtService.likeThought(id, token);
      setThoughts(thoughts.map(t => (t.id === id ? { ...updated, timestamp: t.timestamp } : t)));
    } catch (err) {
      console.error(err);
      setError("Failed to like thought");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Failed to get authentication token");
        return;
      }

      await thoughtService.deleteThought(id, token);
      setThoughts(thoughts.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete thought");
    }
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
          rows={3}
        />
        <button type="submit">Post</button>
      </form>

      <div className="posted-thoughts">
        {thoughts.length > 0 && <h3>Your Posts</h3>}
        {thoughts.map((thought) => (
          <article key={thought.id} className="thought-card">
            <header>
              <h4>@{thought.author}</h4>
              <time>{thought.timestamp.toLocaleString()}</time>
            </header>
            <p>{thought.content}</p>
            <div className="actions">
              <button onClick={() => handleLike(thought.id)}>❤️ {thought.likes} Likes</button>
              <button onClick={() => handleDelete(thought.id)}>🗑 Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostThoughts;
