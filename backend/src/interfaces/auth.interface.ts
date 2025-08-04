import { AuthResponse } from '../types/auth.types';
import { Roles } from '../config/constants';

export interface IAuthService {
  register(email: string, password: string, role: Roles): Promise<AuthResponse>;
  login(email: string, password: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
  logout(refreshToken: string): Promise<void>;
}
