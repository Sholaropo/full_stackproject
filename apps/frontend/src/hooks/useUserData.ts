// Custom hook for managing user data and operations
import { useState, useEffect } from 'react';
import type { User } from '../types';
import { getAllUsers, getUserByUsername, searchUsers, updateUser } from '../repositories/userRepository';

// Hook for managing user data
export function useUserData() {
  // State for storing users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users when component mounts
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const userData = await getAllUsers(); // get from repository
        setUsers(userData);
        setError(null);
      } catch (err) {
        setError('Failed to load users'); // error handling
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  // Function to get user by username
  const getUserByUsernameHook = async (username: string): Promise<User | undefined> => {
    try {
      return await getUserByUsername(username); // call repository method
    } catch (err) {
      console.error('Error fetching user by username:', err);
      return undefined;
    }
  };

  // Function to search users
  const searchUsersHook = async (query: string): Promise<User[]> => {
    if (!query.trim()) return users; // return all if empty
    try {
      return await searchUsers(query); // call repository method
    } catch (err) {
      console.error('Error searching users:', err);
      return [];
    }
  };

  // Function to get user count
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

  const toggleUserVerification = async (username: string, currentStatus: boolean) => {
    try {
      const updatedUser = await updateUser(username, { isVerified: !currentStatus });
      if (updatedUser) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.username === username ? updatedUser : user
          )
        );
      }
    } catch (err) {
      console.error('Error toggling verification:', err);
    }
  };

  return {
    users,
    loading,
    error,
    getUserByUsernameHook,
    searchUsersHook,
    getUserCount,
    getVerifiedUsers,
    toggleUserVerification
  };
}
