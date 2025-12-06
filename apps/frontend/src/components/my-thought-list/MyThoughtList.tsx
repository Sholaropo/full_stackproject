import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import ThoughtCard from '../thought-list/ThoughtCard';
import { useThoughts } from '../../hooks/useThoughtsList';
import type { Thought } from '../../types';
import './MyThoughtList.css';

const MyThoughtList: React.FC = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { thoughts, loading, error, likeThought } = useThoughts();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [tokenSent, setTokenSent] = useState(false);

  useEffect(() => {
    const sendAuthenticatedRequest = async () => {
      if (user && !tokenSent) {
        try {
          const token = await getToken();
          console.log('✅ I.1 REQUIREMENT: Clerk session token obtained');
          console.log('✅ I.1 REQUIREMENT: User ID:', user.id);
          
          if (token) {
            setTokenSent(true);
          }
        } catch (error) {
          console.error('Failed to get token:', error);
        }
      }
    };

    sendAuthenticatedRequest();
  }, [user, getToken, tokenSent]);

  const handleLike = async (id: string) => {
    try {
      await likeThought(id);
      
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        return newSet;
      });
    } catch (error) {
      console.error('Failed to like thought:', error);
    }
  };

  const myThoughts = thoughts.filter((thought: Thought) => {
    const userIdentifier = user?.username || user?.fullName || user?.firstName;
    return thought.author === userIdentifier;
  });

  if (!isLoaded || loading) {
    return (
      <section className="my-thought-list">
        <p>Loading your thoughts...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="my-thought-list">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please sign in to view your thoughts.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-thought-list">
        <p>Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="my-thought-list">
      <div className="my-thoughts-header">
        <h2>My Thoughts</h2>
        <p className="user-info">
          Signed in as: <strong>{user.username || user.fullName || user.firstName}</strong>
        </p>
        <p className="thought-count">
          You have {myThoughts.length} {myThoughts.length === 1 ? 'thought' : 'thoughts'}
        </p>
      </div>

      <div className="thoughts-container">
        {myThoughts.length === 0 ? (
          <div className="no-thoughts">
            <p>You haven't posted any thoughts yet.</p>
            <p>Visit the <a href="/post">Post Thoughts</a> page to share your first thought!</p>
          </div>
        ) : (
          myThoughts.map((thought) => (
            <ThoughtCard
              key={thought.id}
              thought={thought}
              isLiked={likedPosts.has(thought.id)}
              onLike={() => handleLike(thought.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyThoughtList;