import type { Thought } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

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
    likes: data.likes,
    timestamp: new Date(data.createdAt),
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
    likes: thought.likes,
    timestamp: new Date(thought.createdAt),
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
    likes: data.likes,
    timestamp: new Date(data.createdAt),
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
    likes: data.likes,
    timestamp: new Date(data.createdAt),
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
  const response = await fetch(`${API_BASE_URL}/thoughts/${id}/like`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to like thought with id: ${id}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    author: data.author,
    content: data.content,
    likes: data.likes,
    timestamp: new Date(data.createdAt),
  };
}
