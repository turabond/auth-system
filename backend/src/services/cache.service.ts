import { getRedisClient } from '../config/redis';
import { ICacheService } from '../interfaces/cache.interface';

const DEFAULT_TTL = 60 * 5;

export class RedisCacheService implements ICacheService {
  async get<T>(key: string): Promise<T | null> {
    const client = getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: unknown, ttl = DEFAULT_TTL): Promise<void> {
    const client = getRedisClient();
    await client.set(key, JSON.stringify(value), { EX: ttl });
  }

  async del(key: string): Promise<void> {
    const client = getRedisClient();
    await client.del(key);
  }
}

export const cacheService: ICacheService = new RedisCacheService();
