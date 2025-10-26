// src/services/userService.ts
// UserService - handles business logic for user operations
// This service sits between components and repository layer
import type { User } from '../types';
import { 
  getAllUsers, 
  getUserByUsername, 
  searchUsers, 
  createUser, 
  updateUser 
} from '../repositories/userRepository';

// Service class for user business logic
export class UserService {
  
  // Get all users with business rules applied
  static getAllUsers(): User[] {
    const users = getAllUsers(); // call repository
    return users; // could add filtering here
  }

  // Get user by username with validation
  static getUserByUsername(username: string): User | null {
    if (!username || username.trim() === '') {
      return null; // invalid username
    }
    
    const user = getUserByUsername(username); // call repository
    return user || null; // return null if not found
  }

  // Search users with business rules
  static searchUsers(query: string): User[] {
    if (!query || query.trim().length < 2) {
      return []; // minimum 2 characters to search
    }
    
    return searchUsers(query.toLowerCase()); // call repository
  }

  // Validate user data before creation
  static validateUser(userData: Partial<User>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required fields
    if (!userData.username || userData.username.trim() === '') {
      errors.push('Username is required');
    }
    
    if (!userData.displayName || userData.displayName.trim() === '') {
      errors.push('Display name is required');
    }
    
    if (!userData.email || userData.email.trim() === '') {
      errors.push('Email is required');
    }
    
    // Validate email format (basic check)
    if (userData.email && !userData.email.includes('@')) {
      errors.push('Email must be valid');
    }
    
    // Check username length
    if (userData.username && userData.username.length < 3) {
      errors.push('Username must be at least 3 characters');
    }
    
    // Check follower count is not negative
    if (userData.followerCount && userData.followerCount < 0) {
      errors.push('Follower count cannot be negative');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create new user with validation
  static createUser(userData: Omit<User, 'id'>): { success: boolean; user?: User; errors?: string[] } {
    const validation = this.validateUser(userData);
    
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }
    
    try {
      const newUser = createUser(userData); // call repository
      return {
        success: true,
        user: newUser
      };
    } catch (error) {
      return {
        success: false,
        errors: ['Failed to create user']
      };
    }
  }

  // Update user with validation
  static updateUser(id: string, updates: Partial<User>): { success: boolean; user?: User; errors?: string[] } {
    if (!id || id.trim() === '') {
      return {
        success: false,
        errors: ['User ID is required']
      };
    }
    
    const validation = this.validateUser(updates);
    
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors
      };
    }
    
    try {
      const updatedUser = updateUser(id, updates); // call repository
      
      if (!updatedUser) {
        return {
          success: false,
          errors: ['User not found']
        };
      }
      
      return {
        success: true,
        user: updatedUser
      };
    } catch (error) {
      return {
        success: false,
        errors: ['Failed to update user']
      };
    }
  }

  // Get users by follower count range
  static getUsersByFollowerRange(minFollowers: number, maxFollowers?: number): User[] {
    const users = getAllUsers(); // get all users
    
    return users.filter(user => {
      if (maxFollowers) {
        return user.followerCount >= minFollowers && user.followerCount <= maxFollowers;
      }
      return user.followerCount >= minFollowers;
    });
  }

  // Get verified users only
  static getVerifiedUsers(): User[] {
    const users = getAllUsers(); // get all users
    return users.filter(user => user.isVerified === true);
  }

  // Get user statistics
  static getUserStats(): { totalUsers: number; verifiedUsers: number; averageFollowers: number } {
    const users = getAllUsers(); // get all users
    
    const totalUsers = users.length;
    const verifiedUsers = users.filter(user => user.isVerified === true).length;
    const totalFollowers = users.reduce((sum, user) => sum + user.followerCount, 0);
    const averageFollowers = totalUsers > 0 ? Math.round(totalFollowers / totalUsers) : 0;
    
    return {
      totalUsers,
      verifiedUsers,
      averageFollowers
    };
  }
}
