import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import prisma from './lib/prisma';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');

    app.listen(PORT, () => {
      console.log('=================================');
      console.log(` ThoughtShare API - Olusola Ropo, Amandeep Kaur, Vandana Bhangu `);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(` Server: http://localhost:${PORT}`);
      console.log(` API: http://localhost:${PORT}/api/v1`);
      console.log(` Health: http://localhost:${PORT}/api/v1/health`);
      console.log(` Thoughts: http://localhost:${PORT}/api/v1/thoughts`);
      console.log(` Users: http://localhost:${PORT}/api/v1/users`);
      console.log('=================================');
    });
  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();