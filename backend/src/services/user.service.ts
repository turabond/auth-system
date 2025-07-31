import { User, IUser, Role } from '../models/user.model';

export interface IUserService {
  getAllUsers(): Promise<Omit<IUser, 'password'>[]>;
  getUserById(id: string): Promise<Omit<IUser, 'password'> | null>;
  createUser(email: string, hashedPassword: string, role?: Role): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}

export class UserService implements IUserService {
  async getAllUsers() {
    return User.find({}, '-password').exec();
  }

  async getUserById(id: string) {
    return User.findById(id, '-password').exec();
  }

  async createUser(email: string, hashedPassword: string, role: Role = 'User') {
    const user = new User({ email, password: hashedPassword, role });
    return user.save();
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).exec();
  }
}

export const userService: IUserService = new UserService();
