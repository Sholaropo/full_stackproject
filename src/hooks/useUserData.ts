// src/hooks/useUserData.ts
// Custom hook for managing user data and operations
// This hook provides reusable user logic for components
import { useState, useEffect } from 'react';
import type { User } from '../types';
import { getAllUsers, getUserByUsername, searchUsers } from '../repositories/userRepository';

// Hook for managing user data
export function useUserData() {
  // State for storing users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users when component mounts
  useEffect(() => {
    try {
      const userData = getAllUsers(); // get from repository
      setUsers(userData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users'); // basic error handling
      setLoading(false);
    }
  }, []); // missing dependencies warning

  // Function to get user by username
  const getUserByUsernameHook = (username: string): User | undefined => {
    return getUserByUsername(username); // call repository method
  };

  // Function to search users
  const searchUsersHook = (query: string): User[] => {
    if (!query.trim()) return users; // return all if empty
    return searchUsers(query); // call repository method
  };

  // Function to get user count
  const getUserCount = (): number => {
    return users.length;
  };

  // Function to get verified users only
  const getVerifiedUsers = (): User[] => {
    return users.filter(user => user.isVerified === true);
  };

  // Function to get users by follower range
  const getUsersByFollowers = (minFollowers: number): User[] => {
    return users.filter(user => user.followerCount >= minFollowers);
  };

  // Return hook data and functions
  return {
    users,
    loading,
    error,
    getUserByUsernameHook,
    searchUsersHook,
    getUserCount,
    getVerifiedUsers,
    getUsersByFollowers
  };
}
