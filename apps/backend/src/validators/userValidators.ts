import { z } from 'zod';

export const searchUsersSchema = z.object({
  q: z.string().min(1, 'Search query is required').max(100, 'Search query too long')
});

export const usernameParamSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username too long')
});

