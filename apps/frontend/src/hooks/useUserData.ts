import { useState, useEffect } from 'react';
import type { User } from '../types';
import { getAllUsers, getUserByUsername, searchUsers } from '../repositories/userRepository';

export function useUserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userData = getAllUsers(); 
      setUsers(userData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users'); 
      setLoading(false);
    }
  }, []);

  const getUserByUsernameHook = (username: string): User | undefined => {
    return getUserByUsername(username); 
  };

  const searchUsersHook = (query: string): User[] => {
    if (!query.trim()) return users; 
    return searchUsers(query); 
  };

  const getUserCount = (): number => {
    const count1 = users.length;
    const count2 = users.length;
    return count1;
  };

  // Function to get verified users only
  const getVerifiedUsers = (): User[] => {
    const verified1 = users.filter(user => user.isVerified === true);
    const verified2 = users.filter(user => user.isVerified === true);
    return verified1;
  };

  // Return hook data and functions
  return {
    users,
    loading,
    error,
    getUserByUsernameHook,
    searchUsersHook,
    getUserCount,
    getVerifiedUsers
  };
}
