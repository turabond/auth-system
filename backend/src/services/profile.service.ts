import { IUser } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';

export interface IProfileService {
  getProfile(userId: string): Promise<IUser | null>;
  updateProfile(userId: string, data: Partial<IUser>): Promise<IUser>;
}

class ProfileService implements IProfileService {
  async getProfile(userId: string): Promise<IUser | null> {
    return await userRepository.findById(userId);
  }

  async updateProfile(userId: string, data: Partial<IUser>): Promise<IUser> {
    const updatedUser = await userRepository.updateById(userId, data);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }
}

export const profileService = new ProfileService();
