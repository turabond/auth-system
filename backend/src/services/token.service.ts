import jwt from 'jsonwebtoken';
import { TokenPayload, Tokens } from '../types/auth.types';
import {
  tokenRepository as tokenRepositoryInstance,
  ITokenRepository,
} from '../repositories/token.repository';
import { ITokenService } from '../interfaces/token.interface';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const ACCESS_EXPIRES_IN = '1m';
const REFRESH_EXPIRES_IN = '30d';

export class TokenService implements ITokenService {
  constructor(private tokenRepository: ITokenRepository = tokenRepositoryInstance) {}

  generate(payload: TokenPayload): Tokens {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  validateRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    const existing = await this.tokenRepository.findByUserId(userId);
    if (existing) {
      await this.tokenRepository.update(userId, refreshToken);
    } else {
      await this.tokenRepository.create(userId, refreshToken);
    }
  }

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRepository.deleteByToken(refreshToken);
  }

  async findToken(refreshToken: string) {
    return this.tokenRepository.findByToken(refreshToken);
  }
}

export const tokenService: ITokenService = new TokenService();
