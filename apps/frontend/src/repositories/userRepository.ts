// user repository for managing user data
import type { User } from '../types';
import { sampleUsers } from '../data/userTestData';

// store users in memory (will use API later)
let usersDatabase: User[] = [...sampleUsers];

// create new user
export function createUser(user: Omit<User, 'id'>): User {
  const newId = (usersDatabase.length + 1).toString();
  const newUser: User = {
    id: newId,
    ...user
  };
  usersDatabase = [newUser, ...usersDatabase];
  return newUser;
}

// get all users
export function getAllUsers(): User[] {
  return [...usersDatabase];
}

// get user by id
export function getUserById(id: string): User | undefined {
  return usersDatabase.find(user => user.id === id);
}

// get user by username
export function getUserByUsername(username: string): User | undefined {
  return usersDatabase.find(user => user.username === username);
}

// search users
export function searchUsers(query: string): User[] {
  const lowercaseQuery = query.toLowerCase();
  return usersDatabase.filter(user => 
    user.displayName.toLowerCase().includes(lowercaseQuery) ||
    user.username.toLowerCase().includes(lowercaseQuery)
  );
}

// update user
export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const index = usersDatabase.findIndex(user => user.id === id);
  
  if (index === -1) {
    return undefined;
  }
  
  usersDatabase[index] = { 
    ...usersDatabase[index], 
    ...updates 
  };
  
  return usersDatabase[index];
}

// delete user
export function deleteUser(id: string): boolean {
  const initialLength = usersDatabase.length;
  usersDatabase = usersDatabase.filter(user => user.id !== id);
  return usersDatabase.length < initialLength;
}

// get user count
export function getUserCount(): number {
  return usersDatabase.length;
}
