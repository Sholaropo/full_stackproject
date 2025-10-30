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

export function getThoughtById(id: string): Thought {
  const foundThought = thoughtsDatabase.find(thought => thought.id === id);
  
  if (!foundThought) {
    throw new Error(`Failed to fetch thought with id: ${id}`);
  }
  
  return foundThought;
}

export function updateThought(id: string, updatedThought: Partial<Thought>): Thought {
  const foundThoughtIndex = thoughtsDatabase.findIndex(thought => thought.id === id);
  
  if (foundThoughtIndex === -1) {
    throw new Error(`Failed to update thought with id: ${id}`);
  }
  
  thoughtsDatabase[foundThoughtIndex] = { 
    ...thoughtsDatabase[foundThoughtIndex], 
    ...updatedThought 
  };
  
  return thoughtsDatabase[foundThoughtIndex];
}

export function deleteThought(id: string): boolean {
  const initialLength = thoughtsDatabase.length;
  thoughtsDatabase = thoughtsDatabase.filter(thought => thought.id !== id);
  
  if (thoughtsDatabase.length === initialLength) {
    throw new Error(`Failed to delete thought with id: ${id}`);
  }
  
  return true;
}

export function updateThoughtLikes(id: string, likes: number): Thought {
  const foundThought = thoughtsDatabase.find(thought => thought.id === id);
  
  if (!foundThought) {
    throw new Error(`Failed to fetch thought with id: ${id}`);
  }
  
  foundThought.likes = likes;
  return foundThought;
}