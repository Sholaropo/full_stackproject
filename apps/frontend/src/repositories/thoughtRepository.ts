import type { Thought } from '../types';
import { partnerPosts, communityPosts } from '../data/mockData';

let thoughtsDatabase: Thought[] = [...partnerPosts, ...communityPosts];

function safeDate(dateValue: any): Date {
  if (!dateValue) return new Date();
  
  if (dateValue instanceof Date) return dateValue;
  
  try {
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch {
    return new Date();
  }
}

export async function createThought(thought: Omit<Thought, 'id' | 'timestamp' | 'likes'>): Promise<Thought> {
  const response = await fetch(`${API_BASE_URL}/thoughts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: thought.author,
      content: thought.content,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create thought');
  }

  const data = await response.json();
  return {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes || 0,
    timestamp: safeDate(data.createdAt || data.timestamp),
  };
}

export async function getAllThoughts(): Promise<Thought[]> {
  const response = await fetch(`${API_BASE_URL}/thoughts`);

  if (!response.ok) {
    throw new Error('Failed to fetch thoughts');
  }

  const data = await response.json();
  return data.map((thought: any) => ({
    id: thought.id,
    author: thought.author,
    content: thought.content,
    likes: thought.likes || 0,
    timestamp: safeDate(thought.createdAt || thought.timestamp),
  }));
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

  const data = await response.json();
  return {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes || 0,
    timestamp: safeDate(data.createdAt || data.timestamp),
  };
  
  return foundThought;
}

export function updateThought(id: string, updatedThought: Partial<Thought>): Thought {
  const foundThoughtIndex = thoughtsDatabase.findIndex(thought => thought.id === id);
  
  if (foundThoughtIndex === -1) {
    throw new Error(`Failed to update thought with id: ${id}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes || 0,
    timestamp: safeDate(data.createdAt || data.timestamp),
  
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

export async function updateThoughtLikes(id: string, token?: string): Promise<Thought> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}/like`, {
    method: 'POST',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to like thought with id: ${id}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes || 0,
    timestamp: safeDate(data.createdAt || data.timestamp),
  };
export function updateThoughtLikes(id: string, likes: number): Thought {
  const foundThought = thoughtsDatabase.find(thought => thought.id === id);
  
  if (!foundThought) {
    throw new Error(`Failed to fetch thought with id: ${id}`);
  }
  
  foundThought.likes = likes;
  return foundThought;
}