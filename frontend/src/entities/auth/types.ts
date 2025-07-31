export type Role = 'Admin' | 'Manager' | 'User';

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}