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

// Security middleware
app.use(helmet());

// CORS — allow localhost dev + all Vercel deployments + configured frontend URL
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, Vercel edge proxy)
      if (!origin) return callback(null, true);

      const allowed =
        origin === (process.env.FRONTEND_URL || 'http://localhost:5173') ||
        origin === 'http://localhost:5173' ||
        origin === 'http://localhost:3000' ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/healthgpt/.test(origin);

      callback(null, allowed);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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

// Root route — friendly welcome
app.get('/', (_req, res) => {
  res.json({
    service: 'HealthGPT for Rural Areas — API',
    version: '1.0.0',
    status: 'running',
    endpoints: ['/api/health', '/api/chat', '/api/history', '/api/hospitals', '/api/reminders'],
    docs: 'https://github.com/your-repo/HealthGPT',
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'HealthGPT API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// MongoDB connection with serverless-friendly caching
let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthgpt';
  try {
    await mongoose.connect(uri, {
      // Optimized for serverless — reuse connections across invocations
      bufferCommands: false,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

export default app;
