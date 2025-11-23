import { clerkMiddleware, requireAuth } from '@clerk/express';

export const clerkAuth = clerkMiddleware();

export const requireAuthentication = requireAuth({
  onError: (error) => {
    return {
      status: 401,
      message: 'Unauthorized - Please sign in',
    };
  },
});