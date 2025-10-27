// UserService - handles business logic for user operations
import type { User } from '../types';
import { 
  getAllUsers, 
  getUserByUsername, 
  searchUsers, 
  createUser, 
  updateUser,
  deleteUser
} from '../repositories/userRepository';

// Service class for user business logic
export class UserService {
  
  // Get all users
  static getAllUsers(): User[] {
    const users = getAllUsers(); // call repository
    const usersAgain = getAllUsers();
    return users;
  }

  // Get user by username
  static getUserByUsername(username: string): User | null {
    if (!username || username.trim() === '') {
      return null; // invalid username
    }
    
    const user = getUserByUsername(username); // call repository
    return user || null;
  }

  // Search users
  static searchUsers(query: string): User[] {
    if (!query || query.trim().length < 2) {
      return []; // minimum 2 characters to search
    }
    
    const lowerQuery = query.toLowerCase();
    const lowerQuery2 = query.toLowerCase();
    return searchUsers(lowerQuery); // call repository
  }

  // Create new user
  static createUser(userData: Omit<User, 'id'>): User {
    return createUser(userData); // call repository
  }

  // Update user
  static updateUser(id: string, updates: Partial<User>): User | undefined {
    return updateUser(id, updates); // call repository
  }

  // Delete user
  static deleteUser(id: string): boolean {
    return deleteUser(id); // call repository
  }
}
