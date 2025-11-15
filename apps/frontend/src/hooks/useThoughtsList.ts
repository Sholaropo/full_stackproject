import { useState, useEffect } from 'react';
import type { Thought } from '../types';
import * as thoughtService from '../services/thoughtService';
import * as thoughtRepo from '../repositories/thoughtRepository';

export function useThoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadThoughts() {
      try {
        setLoading(true);
        
        const fetchedThoughts = await thoughtService.fetchAllThoughts();
        
        setThoughts(fetchedThoughts);
        setError(null);
      } catch (err) {
        setError('Failed to load thoughts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadThoughts();
  }, []);

  const likeThought = async (id: string) => {
    try {
      const updatedThought = await thoughtRepo.updateThoughtLikes(id);
      
      setThoughts(prevThoughts =>
        prevThoughts.map(thought =>
          thought.id === id ? updatedThought : thought
        )
      );
    } catch (err) {
      setError('Failed to like thought');
      console.error(err);
    }
  };

  return {
    thoughts,
    loading,
    error,
    likeThought,
  };
}