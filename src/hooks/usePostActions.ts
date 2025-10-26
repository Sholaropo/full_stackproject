// src/hooks/usePostActions.ts
// Custom hook for managing post-related actions and interactions
// This hook handles all the event handlers for posts (like, bookmark, comment, etc.)
import { useState } from 'react';

// Hook for managing post actions
export function usePostActions() {
  // State for tracking user interactions with posts
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set()); // set of liked post IDs
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set()); // set of bookmarked post IDs
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set()); // set of expanded comment post IDs
  const [hiddenPosts, setHiddenPosts] = useState<Set<string>>(new Set()); // set of hidden post IDs
  const [userRatings, setUserRatings] = useState<{[postId: string]: number}>({}); // user ratings object
  const [comments, setComments] = useState<{[postId: string]: Array<{id: string, author: string, content: string}>}>({}); // comments object
  const [newComment, setNewComment] = useState(''); // new comment input value

  // like button handler - not optimized
  function handleLike(postId: string) {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  }

  // bookmark handler - duplicate code
  function handleBookmark(postId: string) {
    setBookmarkedPosts(prev => {
      const newBookmarkedPosts = new Set(prev);
      if (newBookmarkedPosts.has(postId)) {
        newBookmarkedPosts.delete(postId);
      } else {
        newBookmarkedPosts.add(postId);
      }
      return newBookmarkedPosts;
    });
  }

  // toggle comments - same pattern repeated
  function toggleComments(postId: string) {
    setExpandedComments(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(postId)) {
        newExpanded.delete(postId);
      } else {
        newExpanded.add(postId);
      }
      return newExpanded;
    });
  }

  // add comment
  function addComment(postId: string) {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        content: newComment.trim()
      };
      
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment]
      }));
      
      setNewComment(''); // forgot to clear input
    }
  }

  // remove comment - could be optimized
  function removeComment(postId: string, commentId: string) {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId]?.filter(comment => comment.id !== commentId) || []
    }));
  }

  // hide post - same pattern again
  function handleHidePost(postId: string) {
    setHiddenPosts(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(postId)) {
        newHidden.delete(postId);
      } else {
        newHidden.add(postId);
      }
      return newHidden;
    });
  }

  // rate post - simple implementation
  function handleRatePost(postId: string, rating: number) {
    setUserRatings(prev => ({
      ...prev,
      [postId]: rating
    }));
  }

  // share post - basic error handling
  function handleShare(content: string, author: string) {
    const shareText = `"${content}" - @${author}`;
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Post copied to clipboard!')) // basic alert
      .catch(() => alert('Unable to copy. Please try again.'));
  }

  // Return all the handlers and state
  return {
    // State
    likedPosts,
    bookmarkedPosts,
    expandedComments,
    hiddenPosts,
    userRatings,
    comments,
    newComment,
    
    // Setters
    setComments,
    setNewComment,
    
    // Handlers
    handleLike,
    handleBookmark,
    toggleComments,
    addComment,
    removeComment,
    handleHidePost,
    handleRatePost,
    handleShare
  };
}
