import { useEffect, useState } from 'react';
import type { Thought } from '../types';
import * as thoughtService from '../services/thoughtService';

export function useThoughts() {

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadThoughts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await thoughtService.fetchAllThoughts();
      setThoughts(data);
    } catch (err) {
      setError('Failed to load thoughts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const likeThought = async (id: string) => {
    try {
      await thoughtService.likeThought(id);
      await loadThoughts();
    } catch (err) {
      console.error('Failed to like thought:', err);
      throw err;
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

  useEffect(() => {
    loadThoughts();
  }, []);

  return {
    thoughts,
    loading,
    error,
    refetch: loadThoughts,
    likeThought,
  };
}