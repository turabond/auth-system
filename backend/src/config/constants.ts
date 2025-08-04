export enum Roles {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  USER = 'User',
}

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 100;
export const USER_CACHE_KEY = 'users:all';
export const PROFILE_CACHE_KEY = 'profile';
export const AUTH_COOKIE_NAME = 'auth_token';
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 24 * 60 * 60, // 1 day in seconds
};
