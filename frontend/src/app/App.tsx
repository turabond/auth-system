import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from '../shared/ui/PrivateRoute';
import { RoleGuard } from '../shared/ui/RoleGuard';

import { Header } from '../widgets/header/';

import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { HomePage } from '../pages/Home';
import { DashboardPage } from '../pages/Dashboard';
import { ProfilePage } from '../pages/Profile';
import { UsersPage } from '../pages/Users';

export const App = () => (
  <>
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />

        <Route element={<RoleGuard allowedRoles={['Admin', 'Manager']} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<RoleGuard allowedRoles={['Admin']} />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<div className="p-10 text-center text-xl">404 — Page Not Found</div>}
      />
    </Routes>
  </>
);
