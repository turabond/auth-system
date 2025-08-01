import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { getRedisClient } from '../config/redis';

export const createRateLimitMiddleware = () => {
  const redisClient = getRedisClient();

  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
      prefix: 'rate-limit:',
    }),
    handler: (_req, res) => {
      res.status(429).json({
        status: 'error',
        message: 'Too many requests, try again in a bit.',
      });
    },
  });
};
