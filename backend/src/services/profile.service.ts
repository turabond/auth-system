import { IUser } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/AppError';

export interface IProfileService {
  getProfile(userId: string): Promise<IUser | null>;
  updateProfile(userId: string, data: Partial<IUser>): Promise<IUser>;
}

class ProfileService implements IProfileService {
  async getProfile(userId: string): Promise<IUser | null> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
    const updatedUser = await userRepository.updateById(userId, data);
    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }
    return updatedUser;
  }
}

export const profileService = new ProfileService();
