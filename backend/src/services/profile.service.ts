import { IUser } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';
import { ICacheService } from '../interfaces/cache.interface';
import { cacheService } from './cache.service';

export interface IProfileService {
  getProfile(userId: string): Promise<IUser | null>;
  updateProfile(userId: string, data: Partial<IUser>): Promise<IUser>;
}

class ProfileService implements IProfileService {
  constructor(private cache: ICacheService = cacheService) {}

  async getProfile(userId: string): Promise<IUser | null> {
    const key = `user:${userId}`;
    const cached = await this.cache.get<IUser>(key);
    if (cached) {
      return cached;
    }

    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    await this.cache.set(key, user);
    return user;
  }

  async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
    const updatedUser = await userRepository.updateById(userId, data);
    if (!updatedUser) throw new AppError('User not found', 404);

    await this.cache.del(`user:${userId}`);
    await this.cache.del('users:all');
    return updatedUser;
  }
}

export const profileService = new ProfileService();
