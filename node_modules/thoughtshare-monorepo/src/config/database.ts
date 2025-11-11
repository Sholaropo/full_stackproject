/**
 * @file database.ts
 * @description Prisma Client initialization and export
 * @author Olusola Ropo
 * @team The Page Turners
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;