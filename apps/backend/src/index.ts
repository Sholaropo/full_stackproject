import express from 'express';
import dotenv from 'dotenv';
import { prismaClient } from './lib/prisma';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json({
    message: 'ThoughtShare API',
    health: '/health',
    version: '0.0.1',
  });
});

app.get('/health', async (_req, res) => {
  try {
    await prismaClient.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('health check blew up', err);
    const message = err instanceof Error ? err.message : 'unknown crash';
    res.status(500).json({ status: 'broken', message });
  }
});

app.listen(port, () => {
  console.log(`backend kinda running on port ${port}`);
});

