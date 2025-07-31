import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../entities/auth/model';

export default function PrivateRoute() {
  const token = getAccessToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
