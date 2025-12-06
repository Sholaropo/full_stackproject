import type { Thought } from '../types';
import * as thoughtRepo from '../repositories/thoughtRepository';
//import { ValidationServiceList } from './validationServiceList';
//import { FormatServiceList } from './formatServiceList';

export async function likeThought(id: string, token?: string): Promise<Thought> {
  return await thoughtRepo.updateThoughtLikes(id, token);
}

export async function createThought(content: string, author: string): Promise<Thought> {
  const thought = {
    author: author.trim(),
    content: content.trim(),
  };
  
  return await thoughtRepo.createThought(thought);
}

export async function createAndSaveThought(content: string, author: string): Promise<Thought> {
  const thought = {
    author: author.trim(),
    content: content.trim(),
  };
  
  return await thoughtRepo.createThought(thought);
}

export async function fetchAllThoughts(): Promise<Thought[]> {
  return await thoughtRepo.getAllThoughts();
}

export async function fetchMyThoughts(token: string): Promise<Thought[]> {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
  
  const response = await fetch(`${API_BASE_URL}/users/me/thoughts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized - Please sign in to view your thoughts');
    }
    throw new Error('Failed to fetch your thoughts');
  }

  const data = await response.json();
  
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
  
  return data.map((thought: any) => ({
    id: thought.id,
    author: thought.author,
    content: thought.content,
    likes: thought.likes || 0,
    timestamp: safeDate(thought.createdAt || thought.timestamp),
  }));
}

export function validateThought(content: string, author: string): Map<string, string> {
  const validationErrors = new Map<string, string>();

  if (!content?.trim()) validationErrors.set("content", "Content must not be empty");
  if (content.trim().length > 500) validationErrors.set("content", "Content must be 500 characters or less");
  if (!author?.trim()) validationErrors.set("author", "Author must be defined");

  return validationErrors;
}

export function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
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
  const term = searchTerm.trim().toLowerCase();
  if (!term) return thoughts;
  
  return thoughts.filter(thought => 
    thought.content.toLowerCase().includes(term) ||
    thought.author.toLowerCase().includes(term)
  );
}
