import { Role } from '../models/user.model';
import { AuthResponse } from '../types/auth.types';

export interface IAuthService {
  register(email: string, password: string, role: Role): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
  logout(refreshToken: string): Promise<void>;
}
