import { Token, TokenDocument } from '../models/token.model';

export interface ITokenRepository {
  findByUserId(userId: string): Promise<TokenDocument | null>;
  create(userId: string, refreshToken: string): Promise<void>;
  update(userId: string, refreshToken: string): Promise<void>;
  deleteByToken(refreshToken: string): Promise<void>;
  findByToken(refreshToken: string): Promise<TokenDocument | null>;
}

export class TokenRepository implements ITokenRepository {
  async findByUserId(userId: string): Promise<TokenDocument | null> {
    return Token.findOne({ user: userId });
  }

  async create(userId: string, refreshToken: string): Promise<void> {
    await Token.create({ user: userId, refreshToken });
  }

  async update(userId: string, refreshToken: string): Promise<void> {
    const existing = await Token.findOne({ user: userId });
    if (existing) {
      existing.refreshToken = refreshToken;
      await existing.save();
    }
  }

  async deleteByToken(refreshToken: string): Promise<void> {
    await Token.deleteOne({ refreshToken });
  }

  async findByToken(refreshToken: string): Promise<TokenDocument | null> {
    return Token.findOne({ refreshToken });
  }
}

export const tokenRepository: ITokenRepository = new TokenRepository();
