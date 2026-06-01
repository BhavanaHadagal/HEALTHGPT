import dotenv from 'dotenv';
dotenv.config();

import app, { connectDB } from './app';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 HealthGPT API running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🤖 AI Provider: ${process.env.AI_PROVIDER || 'gemini'}`);
  });
};

startServer();
