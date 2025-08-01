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
import { createRateLimitMiddleware } from './middleware/rateLimit.middleware';
import { logger } from './utils/logger';

dotenv.config();

const app = express();

const setupApp = async () => {
  await connectDB();
  await connectRedis();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  app.use(createRateLimitMiddleware());

  app.use('/api', authRoutes);
  app.use('/api', userRoutes);
  app.use('/api', profileRoutes);

  app.use(errorHandler);
};

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await setupApp();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
