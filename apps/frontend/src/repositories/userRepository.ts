// user repository for managing user data
import type { User } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

// get all users
export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const users = await response.json();
    return users.map((user: any) => ({
      ...user,
      joinDate: new Date(user.joinDate)
    }));
  } catch (error) {
    console.error('Error fetching users from API:', error);
    throw error;
  }
}

// get user by username
export async function getUserByUsername(username: string): Promise<User | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    const user = await response.json();
    return {
      ...user,
      joinDate: new Date(user.joinDate)
    };
  } catch (error) {
    console.error('Error fetching user from API:', error);
    throw error;
  }
}

// search users
export async function searchUsers(query: string): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Failed to search users: ${response.statusText}`);
    }
    const users = await response.json();
    return users.map((user: any) => ({
      ...user,
      joinDate: new Date(user.joinDate)
    }));
  } catch (error) {
    console.error('Error searching users from API:', error);
    throw error;
  }
}

// create new user
export function createUser(_user: Omit<User, 'id'>): User {
  throw new Error('not implemented');
}

// get user by id
export function getUserById(_id: string): User | undefined {
  throw new Error('not implemented');
}

// update user
export function updateUser(_id: string, _updates: Partial<User>): User | undefined {
  throw new Error('not implemented');
}

// delete user
export function deleteUser(_id: string): boolean {
  throw new Error('not implemented');
}

// get user count
export function getUserCount(): number {
  throw new Error('use getAllUsers().length instead');
}
