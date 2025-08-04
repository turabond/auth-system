import { useEffect, useState } from 'react';
import { to } from '../shared/api/to';
import { fetchWrapper } from '../shared/api/fetchWrapper';

type User = {
  _id: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
};

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const [err, data] = await to<{ items: User[] }>(fetchWrapper.get('/users'));

    if (err) {
      setError(err.message || 'Failed to fetch users');
    } else if (data) {
      setUsers(data.items || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users List</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <div
          role="alert"
          className="mb-4 rounded bg-red-100 border border-red-400 px-4 py-3 text-red-700"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && <p>No users found.</p>}

      {!loading && users.length > 0 && (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b border-gray-300">Email</th>
              <th className="text-left px-4 py-2 border-b border-gray-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 focus-within:bg-gray-50" tabIndex={0}>
                <td className="px-4 py-2 border-b border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border-b border-gray-300 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};
