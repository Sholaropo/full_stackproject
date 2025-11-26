import type { Thought } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

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
}

export async function getThoughtById(id: string): Promise<Thought> {
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}`);

  if (!response.ok) {
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
}

export async function updateThought(id: string, updatedThought: Partial<Thought>): Promise<Thought> {
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: updatedThought.content,
      likes: updatedThought.likes,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update thought with id: ${id}`);
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

export async function deleteThought(id: string): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete thought with id: ${id}`);
  }

  return true;
}

export async function updateThoughtLikes(id: string): Promise<Thought> {
  console.log('🌐 Fetching like for ID:', id);
  console.log('🌐 URL:', `${API_BASE_URL}/thoughts/${id}/like`);
  
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}/like`, {
    method: 'POST',
  });

  console.log('📨 Response status:', response.status);
  
  if (!response.ok) {
    throw new Error(`Failed to like thought with id: ${id}`);
  }

  const data = await response.json();
  console.log('📦 Raw backend response:', data);
  console.log('📦 data.id:', data.id);
  console.log('📦 data.author:', data.author);
  console.log('📦 data.content:', data.content);
  console.log('📦 data.likes:', data.likes);
  console.log('📦 data.createdAt:', data.createdAt);
  
  const mappedThought = {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes || 0,
    timestamp: safeDate(data.createdAt || data.timestamp),
  };
  
  console.log('✨ Mapped thought:', mappedThought);
  
  return mappedThought;
}