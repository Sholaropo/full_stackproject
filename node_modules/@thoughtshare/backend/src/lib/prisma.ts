import { PrismaClient } from '@prisma/client';

// not doing any fancy singleton stuff yet, this is good enough
const prisma = new PrismaClient();

export const prismaClient = prisma;
export default prisma;

