import React from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import ThoughtCard from '../thought-list/ThoughtCard';
import { useMyThoughts } from '../../hooks/useMyThoughts';
import { useThoughts } from '../../hooks/useThoughtsList';
import * as thoughtService from '../../services/thoughtService';
import './MyThoughts.css';

const MyThoughts: React.FC = () => {
  const { thoughts: myThoughts, loading, error, refetch } = useMyThoughts();
  const { likeThought } = useThoughts();

  const handleLike = async (id: string) => {
    try {
      await likeThought(id);
      refetch();
    } catch (error) {
      console.error('Failed to like thought:', error);
    }
  };

  if (loading) {
    return (
      <section className="my-thoughts">
        <h2>My Thoughts</h2>
        <p>Loading your thoughts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-thoughts">
        <h2>My Thoughts</h2>
        <p className="error-message">Error: {error}</p>
        <button onClick={refetch} className="retry-button">
          Try Again
        </button>
      </section>
    );
  }

  const sortedThoughts = thoughtService.sortByTimestamp(myThoughts);

  return (
    <section className="my-thoughts">
      <SignedIn>
        <h2>My Thoughts</h2>
        {sortedThoughts.length === 0 ? (
          <div className="empty-state">
            <p>You haven't posted any thoughts yet.</p>
            <p>Start sharing your thoughts with the community!</p>
          </div>
        ) : (
          <div className="thoughts-container">
            {sortedThoughts.map((thought) => (
              <ThoughtCard
                key={thought.id}
                thought={thought}
                isLiked={false}
                onLike={handleLike}
              />
            ))}
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="sign-in-prompt">
          <h2>My Thoughts</h2>
          <p>Please sign in to view your thoughts.</p>
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </section>
  );
};

export default MyThoughts;

