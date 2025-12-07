import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import type { Thought } from '../types';
import * as thoughtService from '../services/thoughtService';

export function useMyThoughts() {
  const { getToken, isSignedIn } = useAuth();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMyThoughts = async () => {
    if (!isSignedIn) {
      setLoading(false);
      setThoughts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      
      if (!token) {
        throw new Error('No authentication token available');
      }

      const data = await thoughtService.fetchMyThoughts(token);
      setThoughts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load your thoughts';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      loadMyThoughts();
    } else {
      setLoading(false);
      setThoughts([]);
      setError(null);
    }
  }, [isSignedIn]);

  return {
    thoughts,
    loading,
    error,
    refetch: loadMyThoughts,
  };
}

