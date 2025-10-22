import type { Thought } from '../types';
import { partnerPosts, communityPosts } from '../data/mockData';

let thoughtsDatabase: Thought[] = [...partnerPosts, ...communityPosts];

export function createThought(thought: Thought): Thought {
  thoughtsDatabase = [thought, ...thoughtsDatabase];
  return thought;
}

export function getAllThoughts(): Thought[] {
  return [...thoughtsDatabase];
}

export function getThoughtById(id: string): Thought | undefined {
  return thoughtsDatabase.find(thought => thought.id === id);
}

export function updateThought(id: string, updatedThought: Partial<Thought>): Thought | undefined {
  const index = thoughtsDatabase.findIndex(thought => thought.id === id);
  
  if (index === -1) return undefined;
  
  thoughtsDatabase[index] = { 
    ...thoughtsDatabase[index], 
    ...updatedThought 
  };
  
  return thoughtsDatabase[index];
}

export function deleteThought(id: string): boolean {
  const initialLength = thoughtsDatabase.length;
  thoughtsDatabase = thoughtsDatabase.filter(thought => thought.id !== id);
  return thoughtsDatabase.length < initialLength;
}