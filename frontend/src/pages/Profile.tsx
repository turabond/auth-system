import { Navigate } from 'react-router-dom';
import { getUser } from '../entities/auth/model';

export default function ProfilePage() {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow rounded-xl p-4 space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
