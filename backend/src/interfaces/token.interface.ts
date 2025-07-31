import { TokenPayload, Tokens } from '../types/auth.types';
import { TokenDocument } from '../models/token.model';

export interface ITokenService {
  generate(payload: TokenPayload): Tokens;
  validateAccessToken(token: string): TokenPayload | null;
  validateRefreshToken(token: string): TokenPayload | null;
  saveToken(userId: string, refreshToken: string): Promise<void>;
  removeToken(refreshToken: string): Promise<void>;
  findToken(refreshToken: string): Promise<TokenDocument | null>;
}
