import mongoose from 'mongoose';
import { User, IUser, Role } from '../models/user.model';
import { AppError } from '../utils/AppError';
import { ICacheService } from '../interfaces/cache.interface';
import { cacheService } from './cache.service';

const userProjection = '-password';

export interface IUserService {
  getAllUsers(): Promise<Omit<IUser, 'password'>[]>;
  getUserById(id: string): Promise<Omit<IUser, 'password'> | null>;
  createUser(email: string, hashedPassword: string, role?: Role): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}

export class UserService implements IUserService {
  constructor(private cache: ICacheService = cacheService) {}

  async getAllUsers() {
    const key = 'users:all';
    const cached = await this.cache.get<Omit<IUser, 'password'>[]>(key);

    if (cached) {
      return cached;
    }

    const users = await User.find({}, userProjection).exec();
    await this.cache.set(key, users);
    return users;
  }

  async getUserById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError('Invalid user ID', 400);
    }

    const user = await User.findById(id, userProjection).exec();
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async createUser(email: string, hashedPassword: string, role: Role = 'User') {
    try {
      const user = new User({ email, password: hashedPassword, role });
      await user.save();
      await this.cache.del('users:all');
      return user;
    } catch (err) {
      throw new AppError('User creation failed', 500);
    }
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).exec();
  }
}

export const userService: IUserService = new UserService();
