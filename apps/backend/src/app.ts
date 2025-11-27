import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { corsOptions } from './config/cors';
import apiRoutes from './api/v1/routes';
import { errorHandlerList } from './api/v1/middleware/errorHandlerList';
import prisma from './lib/prisma';

dotenv.config();

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.json({
    message: 'ThoughtShare API - Olusola Ropo, Amandeep Kaur, Vandana Bhangu',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      apiHealth: '/api/v1/health',
      thoughts: '/api/v1/thoughts',
      users: '/api/v1/users',
    },
  });
});

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send('Backend and DB are healthy!');
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).send('Backend is running, but DB connection failed.');
  }
});

app.use('/api/v1', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

app.use(errorHandlerList);

export default app;