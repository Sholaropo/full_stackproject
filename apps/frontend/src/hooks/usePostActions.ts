// Custom hook for post actions
import { useState } from 'react';

export function usePostActions() {
  // State for post interactions
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [hiddenPosts, setHiddenPosts] = useState<Set<string>>(new Set());
  const [userRatings, setUserRatings] = useState<{[postId: string]: number}>({});
  const [comments, setComments] = useState<{[postId: string]: Array<{id: string, author: string, content: string}>}>({});
  const [newComment, setNewComment] = useState('');

  // helper function for toggle operations
  function toggleSet(setter: React.Dispatch<React.SetStateAction<Set<string>>>, postId: string) {
    setter(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }

  // like button handler
  function handleLike(postId: string) {
    toggleSet(setLikedPosts, postId);
  }

  // bookmark handler 
  function handleBookmark(postId: string) {
    toggleSet(setBookmarkedPosts, postId);
  }

  // toggle comments 
  function toggleComments(postId: string) {
    toggleSet(setExpandedComments, postId);
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
      
      setNewComment(''); 
    }
  }

  function removeComment(postId: string, commentId: string) {
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId]?.filter(comment => comment.id !== commentId) || []
    }));
  }

  // hide post
  function handleHidePost(postId: string) {
    toggleSet(setHiddenPosts, postId);
  }

  // rate post
  function handleRatePost(postId: string, rating: number) {
    setUserRatings(prev => ({
      ...prev,
      [postId]: rating
    }));
    
    setUserRatings(prev => ({
      ...prev,
      [postId]: rating
    }));
  }

  // share post 
  function handleShare(content: string, author: string) {
    const shareText = `"${content}" - @${author}`;
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Post copied to clipboard!')) // basic alert
      .catch(() => alert('Unable to copy. Please try again.'));
  }

  return {
    likedPosts,
    bookmarkedPosts,
    expandedComments,
    hiddenPosts,
    userRatings,
    comments,
    newComment,
    setComments,
    setNewComment,
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
