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
      console.log('📥 Loaded thoughts:', data);
      setThoughts(data);
    } catch (err) {
      setError('Failed to load thoughts');
      console.error('❌ Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const likeThought = async (id: string) => {
    console.log('🔥 Starting like for thought:', id);
    try {
      console.log('📡 Calling thoughtService.likeThought...');
      const updatedThought = await thoughtService.likeThought(id);
      console.log('✅ Like successful! Updated thought:', updatedThought);
      
      setThoughts(prevThoughts => {
        const newThoughts = prevThoughts.map(thought =>
          thought.id === id ? updatedThought : thought
        );
        console.log('🔄 Updated thoughts state:', newThoughts);
        return newThoughts;
      });
    } catch (err) {
      console.error('❌ Failed to like thought:', err);
      throw err;
    }
  };

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