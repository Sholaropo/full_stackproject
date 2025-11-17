import { Request, Response, NextFunction } from 'express';
import thoughtService from '../services/postthoughtService';

export class ThoughtController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const thoughts = await thoughtService.getAllThoughts();
      res.json(thoughts);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thought = await thoughtService.getThoughtById(id);
      if (!thought) return res.status(404).json({ error: 'Thought not found' });
      res.json(thought);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const thought = await thoughtService.createThought(req.body);
      res.status(201).json(thought);
    } catch (error) {
      next(error);
    }
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thought = await thoughtService.likeThought(id);
      res.json(thought);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await thoughtService.deleteThought(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ThoughtController();
