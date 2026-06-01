import app, { connectDB } from '../src/app';

// Connect to MongoDB on cold start (Vercel serverless)
connectDB().catch(console.error);

export default app;
