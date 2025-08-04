import { to } from '../../../shared/api/to';
import { fetchWrapper } from '../../../shared/api/fetchWrapper';
import { type AuthResponse } from '../model';

interface LoginDto {
  email: string;
  password: string;
}

// API endpoints
export const authApi = {
  login: async (data: LoginDto) => {
    return await to<AuthResponse>(fetchWrapper.post('/login', data));
  },

  register: async (data: LoginDto) => {
    return await to<AuthResponse>(fetchWrapper.post('/register', data));
  },

  logout: async () => {
    return await to(fetchWrapper.post('/logout', {}));
  },

  refresh: async () => {
    return await to<AuthResponse>(fetchWrapper.post('/refresh', {}));
  },
};
