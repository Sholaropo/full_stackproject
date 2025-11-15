import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const prisma = await import('./lib/prisma');
    await prisma.default.$queryRaw`SELECT 1`;
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

