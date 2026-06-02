import type { Request, Response } from 'express';
import app, { connectDB } from '../src/app';

// Cache the connection promise so concurrent requests on a warm instance don't reconnect
let dbReady: Promise<void> | null = null;

const handler = async (req: Request, res: Response): Promise<void> => {
  // Await DB connection before handling any request (safe for cold starts)
  if (!dbReady) {
    dbReady = connectDB().catch((err) => {
      console.error('DB connection failed:', err);
      dbReady = null; // allow retry on next request
      throw err;
    });
  }

  try {
    await dbReady;
  } catch {
    res.status(503).json({ success: false, error: 'Database unavailable. Please try again.' });
    return;
  }

  // Delegate to Express app
  app(req, res);
};

export default handler;
