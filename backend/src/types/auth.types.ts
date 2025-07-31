import { Role } from '../models/user.model';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}
