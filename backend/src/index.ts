import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import chatRoutes from './routes/chat';
import historyRoutes from './routes/history';
import reminderRoutes from './routes/reminders';
import hospitalRoutes from './routes/hospitals';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting — protect AI endpoint from abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/hospitals', hospitalRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HealthGPT API',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// MongoDB connection
const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthgpt';
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 HealthGPT API running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🤖 AI Provider: ${process.env.AI_PROVIDER || 'gemini'}`);
  });
};

startServer();

export default app;
