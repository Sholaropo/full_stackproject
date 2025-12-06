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
    // TODO: Once T.3 is merged, we can directly use clerkUserId
    // This method supports both scenarios: before and after T.3 merge
    
    let user = null;
    
    // Try to find user by clerkUserId first (will work after T.3 is merged)
    try {
      user = await prisma.user.findUnique({
        where: { clerkUserId } as any
      });
    } catch (error) {
      // If clerkUserId field doesn't exist in schema yet, fall back to email
    }

    // Temporary workaround: Find user by email if clerkUserId lookup failed
    // This works with current schema (User model has email field)
    if (!user && userEmail) {
      user = await prisma.user.findFirst({
        where: { email: userEmail }
      });
    }

    if (!user) {
      return [];
    }

    // Get all thoughts for this user by userId (most reliable method)
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

