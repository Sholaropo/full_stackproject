import prisma from '../../../config/database';

const userService = {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      orderBy: {
        joinDate: 'desc'
      }
    });
    
    return users.map(user => ({
      id: user.id,
      clerkUserId: user.clerkUserId,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    }));
  },

  async getUserByClerkId(clerkUserId: string) {
    const user = await prisma.user.findUnique({
      where: { clerkUserId }
    });
    
    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      clerkUserId: user.clerkUserId,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    };
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
      clerkUserId: user.clerkUserId,
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
      clerkUserId: user.clerkUserId,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      joinDate: user.joinDate,
      isVerified: user.isVerified
    }));
  },

  async createOrUpdateUserFromClerk(
    clerkUserId: string,
    email: string,
    username?: string,
    displayName?: string
  ) {
    // Try to find existing user by Clerk ID
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId }
    });

    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { clerkUserId },
        data: {
          email,
          ...(username && { username }),
          ...(displayName && { displayName })
        }
      });

      return {
        id: updatedUser.id,
        clerkUserId: updatedUser.clerkUserId,
        username: updatedUser.username,
        displayName: updatedUser.displayName,
        email: updatedUser.email,
        joinDate: updatedUser.joinDate,
        isVerified: updatedUser.isVerified
      };
    }

    // Create new user if doesn't exist
    // Generate username from email if not provided
    const generatedUsername = username || email.split('@')[0].toLowerCase();
    
    // Ensure username is unique by appending numbers if needed
    let finalUsername = generatedUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username: finalUsername } })) {
      finalUsername = `${generatedUsername}${counter}`;
      counter++;
    }

    const newUser = await prisma.user.create({
      data: {
        clerkUserId,
        email,
        username: finalUsername,
        displayName: displayName || finalUsername,
        isVerified: false
      }
    });

    return {
      id: newUser.id,
      clerkUserId: newUser.clerkUserId,
      username: newUser.username,
      displayName: newUser.displayName,
      email: newUser.email,
      joinDate: newUser.joinDate,
      isVerified: newUser.isVerified
    };
  },

  async updateUser(username: string, updates: { isVerified?: boolean; displayName?: string }) {
    try {
      const user = await prisma.user.update({
        where: { username },
        data: updates
      });
      
      return {
        id: user.id,
        clerkUserId: user.clerkUserId,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        joinDate: user.joinDate,
        isVerified: user.isVerified
      };
    } catch (error) {
      return null;
    }
  }
};

export default userService;

