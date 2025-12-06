import prisma from '../../../config/database';
import userService from './userService';

class ThoughtService {
  async getAllThoughts() {
    return prisma.thought.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getThoughtById(id: string) {
    return prisma.thought.findUnique({ where: { id } });
  }

  async createThought(data: { content: string; author: string; userId?: string; clerkUserId?: string }) {
    let userId: string | undefined = data.userId;
    
    // If clerkUserId is provided, find the user and link the thought
    if (data.clerkUserId && !userId) {
      const user = await userService.getUserByClerkId(data.clerkUserId);
      if (user) {
        userId = user.id;
      }
    }
    
    return prisma.thought.create({ 
      data: {
        content: data.content,
        author: data.author,
        userId: userId,
      }
    });
  }

  async likeThought(id: string) {
    return prisma.thought.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
  }

  async deleteThought(id: string) {
    return prisma.thought.delete({ where: { id } });
  }
}

export default new ThoughtService();
