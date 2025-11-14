import { useState } from "react";
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
