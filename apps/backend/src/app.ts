import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/cors';
import apiRoutes from './api/v1/routes';
import { errorHandlerList } from './api/v1/middleware/errorHandlerList';

dotenv.config();

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'ThoughtShare API - Olusola Ropo, Amandeep Kaur, Vandana Bhangu',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      thoughts: '/api/v1/thoughts',
    },
  });
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