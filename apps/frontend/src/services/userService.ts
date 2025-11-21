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
  static async getAllUsers(): Promise<User[]> {
    return await getAllUsers(); // call repository
  }

  // Get user by username
  static async getUserByUsername(username: string): Promise<User | null> {
    if (!username || username.trim() === '') {
      return null; // invalid username
    }
    
    const user = await getUserByUsername(username); // call repository
    return user || null;
  }

  // Search users
  static async searchUsers(query: string): Promise<User[]> {
    if (!query || query.trim().length < 2) {
      return []; // minimum 2 characters to search
    }
    
    const lowerQuery = query.toLowerCase();
    return await searchUsers(lowerQuery); // call repository
  }

  // Create new user
  static createUser(userData: Omit<User, 'id'>): User {
    return createUser(userData); // call repository
  }

  // Update user
  static async updateUser(username: string, updates: Partial<User>): Promise<User | undefined> {
    return await updateUser(username, updates); // call repository
  }

  // Delete user
  static deleteUser(id: string): boolean {
    return deleteUser(id); // call repository
  }
}
