import prisma from '../../../lib/prisma';

const userService = {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      orderBy: {
        joinDate: 'desc'
      }
    });
    
    return users.map(user => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    }));
  },

  async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    
    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    };
  },

  async searchUsers(query: string) {
    const lowercaseQuery = query.toLowerCase();
    
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { displayName: { contains: lowercaseQuery, mode: 'insensitive' } },
          { username: { contains: lowercaseQuery, mode: 'insensitive' } }
        ]
      }
    });
    
    return users.map(user => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    }));
  },

  async updateUser(username: string, updates: { isVerified?: boolean; displayName?: string }) {
    try {
      const user = await prisma.user.update({
        where: { username },
        data: updates
      });
      
      return {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        joinDate: user.joinDate,
        isVerified: user.isVerified
      };
    } catch (error) {
      return null;
    }
  },

  async getUserThoughtsByClerkId(clerkUserId: string, userEmail?: string) {
    let user = null;
    
    try {
      user = await prisma.user.findUnique({
        where: { clerkUserId } as any
      });
    } catch (error) {
      // Fallback to email lookup if clerkUserId field doesn't exist
    }

    if (!user && userEmail) {
      user = await prisma.user.findFirst({
        where: { email: userEmail }
      });
    }

    if (!user) {
      return [];
    }

    const thoughts = await prisma.thought.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return thoughts;
  }
};

export default userService;

