import { CorsOptions } from 'cors';

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [
  'http://localhost:5173',
];

export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};