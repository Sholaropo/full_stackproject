import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'ThoughtShare API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      apiHealth: '/api/v1/health',
      users: '/api/users'
    }
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

app.get('/api/v1/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send('Backend and DB are healthy!');
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).send('Backend is running, but DB connection failed.');
  }
});

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

