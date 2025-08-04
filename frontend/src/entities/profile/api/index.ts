import { to } from '../../../shared/api/to';
import { fetchWrapper } from '../../../shared/api/fetchWrapper';

export type ProfileResponse = {
  id: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
};

export const profileApi = {
  getProfile: async () => await to<ProfileResponse>(fetchWrapper.get('/profile')),
};

// export const getProfile = async () => await to<ProfileResponse>(fetchWrapper.get('/profile'));
