import { TokenPayload, AuthResponse } from '../types/auth.types';
import { IAuthService } from '../interfaces/auth.interface';
import { ITokenService } from '../interfaces/token.interface';
import { hashPassword, comparePasswords } from '../utils/password';
import {
  IUserRepository,
  userRepository as userRepositoryInstance,
} from '../repositories/user.repository';
import { Role } from '../models/user.model';
import { tokenService as tokenServiceInstance } from './token.service';
import { AppError } from '../utils/AppError';

export class AuthService implements IAuthService {
  constructor(
    private tokenService: ITokenService = tokenServiceInstance,
    private userRepository: IUserRepository = userRepositoryInstance,
  ) {}

  async register(email: string, password: string, role: Role = 'User'): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    const hashedPassword = await hashPassword(password, 10);
    const user = await this.userRepository.create(email, hashedPassword, role);

    const payload: TokenPayload = { id: user._id.toString(), email: user.email, role: user.role };
    const tokens = this.tokenService.generate(payload);
    await this.tokenService.saveToken(user._id.toString(), tokens.refreshToken);

    return {
      user: { id: user._id.toString(), email: user.email, role: user.role },
      ...tokens,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload: TokenPayload = { id: user._id.toString(), email: user.email, role: user.role };
    const tokens = this.tokenService.generate(payload);
    await this.tokenService.saveToken(user._id.toString(), tokens.refreshToken);

    return {
      user: { id: user._id.toString(), email: user.email, role: user.role },
      ...tokens,
    };
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) throw new AppError('No refresh token provided', 401);

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const storedToken = await this.tokenService.findToken(refreshToken);

    if (!userData || !storedToken) throw new AppError('Unauthorized', 403);

    const user = await this.userRepository.findById(userData.id);
    if (!user) throw new AppError('User not found', 404);

    const payload: TokenPayload = { id: user._id.toString(), email: user.email, role: user.role };
    const tokens = this.tokenService.generate(payload);
    await this.tokenService.saveToken(user._id.toString(), tokens.refreshToken);

    return {
      user: { id: user._id.toString(), email: user.email, role: user.role },
      ...tokens,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeToken(refreshToken);
  }
}

export const authService: IAuthService = new AuthService();
