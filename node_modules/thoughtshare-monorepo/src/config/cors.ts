import { CorsOptions } from 'cors';

const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [
  'http://localhost:5173',
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};