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
  }
};

export default userController;

