import { getAccessToken, setAccessToken } from '../../entities/auth';

const BASE_URL = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const request = async <T>(url: string, options: RequestInit = {}, retry = true): Promise<T> => {
  const token = getAccessToken();
  const headers = {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (res.status === 401 && retry) {
    try {
      const data = await fetch(`${BASE_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!data.ok) {
        throw new Error('Failed to refresh access token');
      }

      const jsonData = await data.json();
      setAccessToken(jsonData.accessToken);

      return await request<T>(url, options, false);
    } catch {
      throw new Error('Unauthorized');
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
};

export const fetchWrapper = {
  get: <T>(url: string) => request<T>(url, { method: 'GET' }),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: <T>(url: string, body: unknown) =>
    request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: <T>(url: string) =>
    request<T>(url, {
      method: 'DELETE',
    }),
};
