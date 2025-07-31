import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (payload: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const setAccessToken = (token: string) =>
  useAuthStore.setState({ accessToken: token });

export const getUser = () => useAuthStore.getState().user;
export const getRole = () => useAuthStore.getState().user?.role ?? null;
