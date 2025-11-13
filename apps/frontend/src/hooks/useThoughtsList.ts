import { useState, useEffect } from 'react';
import type { Thought } from '../types';
import * as thoughtService from '../services/thoughtService';

export function useThoughts() {

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      const fetchedThoughts = thoughtService.fetchAllThoughts();
      
      setThoughts(fetchedThoughts);
      setError(null);
    } catch (err) {
      setError('Failed to load thoughts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    thoughts,
    loading,
    error,
  };
}