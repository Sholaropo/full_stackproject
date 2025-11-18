import prisma from '../../../config/database';

class ThoughtService {
  async getAllThoughts() {
    return prisma.thought.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getThoughtById(id: string) {
    return prisma.thought.findUnique({ where: { id } });
  }

  async createThought(data: { content: string; author: string; userId?: string }) {
    return prisma.thought.create({ data });
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
