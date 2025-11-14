import { Request, Response, NextFunction } from 'express';

export const errorHandlerList = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      error: 'Database Error',
      message: 'Invalid database operation',
    });
  }

  if (err.message.includes('Validation')) {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
};