import { Navigate, Outlet } from 'react-router-dom';
import { getRole } from '../../entities/auth/model';

type RoleGuardProps = {
  allowedRoles: Array<'Admin' | 'Manager' | 'User'>;
};

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const role = getRole();
  if (role && allowedRoles.includes(role)) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}
