import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : 'An internal server error occurred. Please try again.';

  console.error(`[Error] ${statusCode} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // In development, surface the actual error message for easier debugging
  const displayMessage = process.env.NODE_ENV === 'development' ? err.message : message;

  res.status(statusCode).json({
    success: false,
    error: displayMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const createError = (message: string, statusCode = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
