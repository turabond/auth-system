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

export class AuthService implements IAuthService {
  constructor(
    private tokenService: ITokenService = tokenServiceInstance,
    private userRepository: IUserRepository = userRepositoryInstance,
  ) {}

  async register(email: string, password: string, role: Role = 'User'): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

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
      throw new Error('Invalid credentials');
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
    if (!refreshToken) throw new Error('No refresh token provided');

    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const storedToken = await this.tokenService.findToken(refreshToken);

    if (!userData || !storedToken) throw new Error('Unauthorized');

    const user = await this.userRepository.findById(userData.id);
    if (!user) throw new Error('User not found');

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
