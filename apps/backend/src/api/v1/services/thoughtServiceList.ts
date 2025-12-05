import prisma from '../../../config/database';
import userService from './userService';

interface CreateThoughtDto {
  author: string;
  content: string;
  clerkUserId?: string;
}

interface UpdateThoughtDto {
  content?: string;
  likes?: number;
}

export class ThoughtServiceList {
  async getAllThoughts() {
    return await prisma.thought.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getThoughtById(id: string) {
    return await prisma.thought.findUnique({
      where: { id },
    });
  }

  async createThought(data: CreateThoughtDto) {
    let userId: string | undefined;
    
    // If clerkUserId is provided, find the user and link the thought
    if (data.clerkUserId) {
      const user = await userService.getUserByClerkId(data.clerkUserId);
      if (user) {
        userId = user.id;
      }
    }
    
    return await prisma.thought.create({
      data: {
        author: data.author,
        content: data.content,
        likes: 0,
        userId: userId,
      },
    });
  }

  async updateThought(id: string, data: UpdateThoughtDto) {
    return await prisma.thought.update({
      where: { id },
      data,
    });
  }

  async deleteThought(id: string) {
    await prisma.thought.delete({
      where: { id },
    });
  }

  async toggleLike(id: string) {
    const thought = await prisma.thought.findUnique({
      where: { id },
    });

    if (!thought) {
      throw new Error('Thought not found');
    }

    return await prisma.thought.update({
      where: { id },
      data: {
        likes: thought.likes + 1,
      },
    });
  }
}

export default new ThoughtServiceList();