import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../entities/auth';

export const PrivateRoute = () => {
  const token = getAccessToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
