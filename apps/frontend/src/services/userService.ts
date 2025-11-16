import type { User } from '../types';
import { 
  getAllUsers, 
  getUserByUsername, 
  searchUsers, 
  createUser, 
  updateUser,
  deleteUser
} from '../repositories/userRepository';

export class UserService {
  
  static getAllUsers(): User[] {
    const users = getAllUsers(); 
  
    return users;
  }

  static getUserByUsername(username: string): User | null {
    if (!username || username.trim() === '') {
      return null; 
    }
    
    const user = getUserByUsername(username); 
    return user || null;
  }


  static searchUsers(query: string): User[] {
    if (!query || query.trim().length < 2) {
      return []; 
    }
    
    const lowerQuery = query.toLowerCase();
  
    return searchUsers(lowerQuery); 
  }

  static createUser(userData: Omit<User, 'id'>): User {
    return createUser(userData); 
  }

  static updateUser(id: string, updates: Partial<User>): User | undefined {
    return updateUser(id, updates); 
  }

  static deleteUser(id: string): boolean {
    return deleteUser(id); 
  }
}
