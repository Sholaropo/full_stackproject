import { useEffect, useState } from "react";
import type { Thought } from "../types";
import * as ThoughtService from "../services/PostThoughtservices";

/**
 * Custom Hook: useThoughts
 *
 * Purpose:
 * - Manage thoughts state in components.
 * - Call service functions for CRUD operations.
 *
 * Why use this hook:
 * 
 * - Separates UI logic from data logic for cleaner components.
 * - Makes the code easier to maintain, test, and reuse.
 * - Ensures all data operations go through a single, consistent interface
 */
export function useThoughts(dependencies: unknown[] = []) {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllThoughts = async () => {
    try {
      const all = await ThoughtService.fetchThoughts();
      setThoughts(all);
    } catch (err) {
      setError(`Failed to fetch thoughts: ${err}`);
    }
  };

  const addThought = async (content: string, author: string) => {
    try {
      const newThought = await ThoughtService.createThought(content, author);
      setThoughts(prev => [newThought, ...prev]); 
      return newThought;
    } catch (err) {
      setError(`Failed to add thought: ${err}`);
    }
  };

  const like = async (id: string) => {
    try {
      const updated = await ThoughtService.likeThought(id);
      setThoughts(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      setError(`Failed to like thought: ${err}`);
    }
  };

  const removeThought = async (id: string) => {
    try {
      await ThoughtService.deleteThought(id);
      setThoughts(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(`Failed to delete thought: ${err}`);
    }
  };

  useEffect(() => {
    fetchAllThoughts();
  }, [...dependencies]);

  return {
    thoughts,
    error,
    fetchAllThoughts,
    addThought,
    like,
    removeThought,
    setThoughts,
  };
}