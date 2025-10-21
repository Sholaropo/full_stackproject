import type { Thought } from '../types';

export function createThought(content: string, author: string, existingThoughts: Thought[]): Thought {
  return {
    id: (existingThoughts.length + 1).toString(),
    content: content.trim(),
    author: author.trim(),
    timestamp: new Date(),
    likes: 0
  };
}
export function validateThought(content: string, author: string) {
  const validationErrors = new Map<string, string>();

  if (!content?.trim()) validationErrors.set("content", "Content must not be empty");
  if (content.trim().length > 500) validationErrors.set("content", "Content must be 500 characters or less");
  if (!author?.trim()) validationErrors.set("author", "Author must be defined");

  return validationErrors;
}

export function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

export function sortByPopularity(thoughts: Thought[]): Thought[] {
  return [...thoughts].sort((a, b) => b.likes - a.likes);
}

export function sortByTimestamp(thoughts: Thought[]): Thought[] {
  return [...thoughts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function searchThoughts(thoughts: Thought[], searchTerm: string): Thought[] {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return thoughts;
  
  return thoughts.filter(thought => 
    thought.content.toLowerCase().includes(term) ||
    thought.author.toLowerCase().includes(term)
  );
}