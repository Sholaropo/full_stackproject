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
    return users.length;  
  };

  
  const getVerifiedUsers = (): User[] => {
    return users.filter(user => user.isVerified === true);  
  };

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