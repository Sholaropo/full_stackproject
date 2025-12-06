import { Request, Response } from 'express';
import userService from '../services/userService';

const userController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  async searchUsers(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const query = typeof q === 'string' ? q : '';
      
      if (!query.trim()) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const users = await userService.searchUsers(query);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Failed to search users' });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const updates = req.body;
      
      const user = await userService.updateUser(username, updates);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  async getMyThoughts(req: Request, res: Response) {
    try {
      const clerkUserId = req.auth?.userId;
      
      if (!clerkUserId) {
        return res.status(401).json({ error: 'Unauthorized - No user ID found in session' });
      }

      const userEmail = (req.auth as any)?.sessionClaims?.email as string | undefined;
      const thoughts = await userService.getUserThoughtsByClerkId(clerkUserId, userEmail);

      res.status(200).json(thoughts);
    } catch (error) {
      console.error('Error fetching user thoughts:', error);
      res.status(500).json({ error: 'Failed to fetch user thoughts' });
    }
  }
};

export default userController;

