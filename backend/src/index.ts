import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';
import { errorHandler } from './middleware/error.middleware';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: 'http://localhost:5173', // frontend origin
    origin: true, // allow credentials
    credentials: true,
  }),
);

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB();
    await connectRedis();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
