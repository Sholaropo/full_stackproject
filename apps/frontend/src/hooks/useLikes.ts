import { useState } from "react";

/**
 * useLikes Hook
 *
 * Purpose:
 * - Manage liked state for posts or items in the UI.
 *
 * Returns:
 * - likedItems: Set of liked item IDs
 * - toggleLike: function to like/unlike an item by ID
 *
 * Usage:
 * - Can be used in multiple components to handle likes consistently.
 */
export function useLikes(initialLikes: string[] = []) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set(initialLikes));

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return { likedItems, toggleLike };
}
