import { Link } from 'react-router-dom';
import { getRole } from '../entities/auth/model'; 

export default function DashboardPage() {
  const role = getRole();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4 text-lg">
        Welcome back! You are logged in as <strong>{role}</strong>.
      </p>

      <nav className="flex flex-wrap gap-4">
        {(role === 'Admin' || role === 'Manager') && (
          <Link
            to="/profile"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Profile
          </Link>
        )}

        {role === 'Admin' && (
          <Link
            to="/users"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Users List
          </Link>
        )}

        {(role === 'Admin' || role === 'Manager') && (
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Dashboard Home
          </Link>
        )}
      </nav>
    </main>
  );
}
