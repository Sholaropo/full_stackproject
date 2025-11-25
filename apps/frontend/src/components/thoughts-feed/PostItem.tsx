// Import React for component functionality
import React from 'react';
// Import the Thought type definition for type safety
import { Thought } from '../../types';
// Import PostComments component for comment functionality
import PostComments from './PostComments';

// Define the props interface for PostItem component
interface PostItemProps {
  thought: Thought;
  userInfo: any; // User information from service layer
  likedPosts: Set<string>;
  bookmarkedPosts: Set<string>;
  expandedComments: Set<string>;
  hiddenPosts: Set<string>; // Added missing hiddenPosts prop
  userRatings: {[postId: string]: number};
  postRatings: {[postId: string]: number};
  comments: {[postId: string]: Array<{id: string, author: string, content: string}>};
  newComment: string;
  setNewComment: (value: string) => void;
  formatTime: (timestamp: Date) => string;
  calculateReadingTime: (content: string) => number;
  handleLike: (postId: string) => void;
  handleBookmark: (postId: string) => void;
  toggleComments: (postId: string) => void;
  addComment: (postId: string) => void;
  removeComment: (postId: string, commentId: string) => void;
  handleHidePost: (postId: string) => void;
  handleRatePost: (postId: string, rating: number) => void;
  handleShare: (content: string, author: string) => void;
}

// PostItem component for rendering individual posts
function PostItem({
  thought,
  userInfo,
  likedPosts,
  bookmarkedPosts,
  expandedComments,
  hiddenPosts,
  userRatings,
  postRatings,
  comments,
  newComment,
  setNewComment,
  formatTime,
  calculateReadingTime,
  handleLike,
  handleBookmark,
  toggleComments,
  addComment,
  removeComment,
  handleHidePost,
  handleRatePost,
  handleShare
}: PostItemProps) {
  return (
    <div className="feed-item">
      {/* Post header with author and timestamp */}
      <div className="item-header">
        <span className="author">@{thought.author}</span>
        {/* Show follower count if user info is available */}
        {userInfo && (
          <span style={{ fontSize: '12px', color: '#666' }}>
            ({userInfo.followerCount || 0} followers)
          </span>
        )}
        <span className="time">{formatTime(thought.timestamp)}</span>
      </div>

      {/* Post content and metadata */}
      <div className="content">
        <p>{thought.content}</p>
        <div className="post-meta">
          {/* Reading time estimate */}
          <span className="reading-time">📖 {calculateReadingTime(thought.content)} min read</span>
          {/* Star rating system */}
          <div className="rating-display">
            <span className="rating-label">Rating:</span>
            <div className="stars">
              {/* Render 5 clickable stars for rating */}
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (userRatings[thought.id] || postRatings[thought.id] || 0) ? 'filled' : ''}`}
                  onClick={() => handleRatePost(thought.id, star)}
                >
                  ⭐
                </span>
              ))}
              {/* Display current rating number */}
              <span className="rating-number">
                ({(userRatings[thought.id] || postRatings[thought.id] || 0).toFixed(1)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons for post interactions */}
      <div className="actions">
        {/* Left side actions */}
        <div className="left-actions">
          {/* Like/unlike button with dynamic heart icon */}
          <button
            className={`like-btn ${likedPosts.has(thought.id) ? 'liked' : ''}`}
            onClick={() => handleLike(thought.id)}
          >
            {likedPosts.has(thought.id) ? '❤️' : '🤍'} {thought.likes + (likedPosts.has(thought.id) ? 1 : 0)}
          </button>
          
          {/* Comments toggle button with count */}
          <button onClick={() => toggleComments(thought.id)}>
            💬 ({comments[thought.id]?.length || 0})
          </button>
          
          {/* Share button */}
          <button onClick={() => handleShare(thought.content, thought.author)}>Share</button>
        </div>
        
        {/* Right side actions */}
        <div className="right-actions">
          {/* Bookmark/unbookmark button */}
          <button onClick={() => handleBookmark(thought.id)}>
            {bookmarkedPosts.has(thought.id) ? 'Bookmarked' : 'Bookmark'}
          </button>
          
          {/* Hide/show post button */}
          <button onClick={() => handleHidePost(thought.id)}>
            {hiddenPosts.has(thought.id) ? 'Show' : 'Hide'}
          </button>
        </div>
      </div>

      {/* Comments section - only shown when expanded */}
      {expandedComments.has(thought.id) && (
        <PostComments
          postId={thought.id}
          comments={comments[thought.id] || []}
          newComment={newComment}
          setNewComment={setNewComment}
          addComment={addComment}
          removeComment={removeComment}
        />
      )}
    </div>
  );
}

export default PostItem;
