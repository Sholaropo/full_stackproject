import app from '../src/app';
import prisma from '../src/lib/prisma';

prisma.$connect().catch(console.error);

export default app;