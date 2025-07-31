import { User, IUser, Role } from '../models/user.model';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  create(email: string, hashedPassword: string, role: Role): Promise<IUser>;
  updateById(id: string, data: Partial<IUser>): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(email: string, hashedPassword: string, role: Role): Promise<IUser> {
    return User.create({ email, password: hashedPassword, role });
  }

  async updateById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  }
}

export const userRepository: IUserRepository = new UserRepository();
