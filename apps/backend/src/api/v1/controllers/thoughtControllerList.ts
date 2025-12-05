import { Request, Response, NextFunction } from 'express';
import thoughtServiceList from '../services/thoughtServiceList';

export class ThoughtControllerList {
  async getAllThoughts(req: Request, res: Response, next: NextFunction) {
    try {
      const thoughts = await thoughtServiceList.getAllThoughts();
      res.json(thoughts);
    } catch (error) {
      next(error);
    }
  }

  async getThoughtById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thought = await thoughtServiceList.getThoughtById(id);

      if (!thought) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Thought not found',
        });
      }

      res.json(thought);
    } catch (error) {
      next(error);
    }
  }

  async createThought(req: Request, res: Response, next: NextFunction) {
    try {
      const clerkUserId = req.auth?.userId;
      const thought = await thoughtServiceList.createThought(req.body);
      res.status(201).json(thought);
    } catch (error) {
      next(error);
    }
  }

  async updateThought(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clerkUserId = req.auth?.userId;
      const thought = await thoughtServiceList.updateThought(id, req.body);
      res.json(thought);
    } catch (error) {
      next(error);
    }
  }

  async deleteThought(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clerkUserId = req.auth?.userId;
      await thoughtServiceList.deleteThought(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const clerkUserId = req.auth?.userId;
      const thought = await thoughtServiceList.toggleLike(id);
      res.json(thought);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThoughtControllerList();