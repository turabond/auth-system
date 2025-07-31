import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export const connectRedis = async () => {
  redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();
  console.log('Redis connected');
};

export const getRedisClient = () => {
  if (!redisClient) throw new Error('Redis client not initialized');
  return redisClient;
};
