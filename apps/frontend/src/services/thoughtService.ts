import type { Thought } from '../types';
import * as thoughtRepo from '../repositories/thoughtRepository';
import { ValidationServiceList } from './validationServiceList';
import { FormatServiceList } from './formatServiceList';

export async function likeThought(id: string, token?: string): Promise<Thought> {
  return await thoughtRepo.updateThoughtLikes(id, token);
}

export async function createThought(content: string, author: string): Promise<Thought> {
  const thought = {
    author: author.trim(),
    content: content.trim(),
export function createThought(content: string, author: string, existingThoughts: Thought[]): Thought {
  return {
    id: (existingThoughts.length + 1).toString(),
    content: ValidationServiceList.sanitizeInput(content),
    author: ValidationServiceList.sanitizeInput(author),
    timestamp: new Date(),
    likes: 0
  };
}

export function createAndSaveThought(content: string, author: string): Thought {
  const validationErrors = ValidationServiceList.validateThought(content, author);
  if (!ValidationServiceList.isValid(validationErrors)) {
    const error = ValidationServiceList.getFirstError(validationErrors);
    throw new Error(error || 'Validation failed');
  }

  const newThought: Thought = {
    id: Date.now().toString(),
    content: ValidationServiceList.sanitizeInput(content),
    author: ValidationServiceList.sanitizeInput(author),
    timestamp: new Date(),
    likes: 0
  };
  
  return thoughtRepo.createThought(newThought);
}

export function fetchAllThoughts(): Thought[] {
  return thoughtRepo.getAllThoughts();
}

export function validateThought(content: string, author: string): Map<string, string> {
  return ValidationServiceList.validateThought(content, author);
}

export function formatTimestamp(timestamp: Date): string {
  return FormatServiceList.formatTimestamp(timestamp);
}

export function sortByPopularity(thoughts: Thought[]): Thought[] {
  return [...thoughts].sort((a, b) => b.likes - a.likes);
}

export function sortByTimestamp(thoughts: Thought[]): Thought[] {
  return [...thoughts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function searchThoughts(thoughts: Thought[], searchTerm: string): Thought[] {
  const term = ValidationServiceList.sanitizeInput(searchTerm).toLowerCase();
  if (!term) return thoughts;
  
  return thoughts.filter(thought => 
    thought.content.toLowerCase().includes(term) ||
    thought.author.toLowerCase().includes(term)
  );
}