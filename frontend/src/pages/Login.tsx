import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';
import FormError from '../shared/ui/FormError';
import { authApi } from '../entities/auth/api';
import { useAuthStore } from '../entities/auth/model';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const [err, data] = await authApi.login({ email, password });

    if (err) {
      setError(err.message || 'Login failed');
    } else if (data) {
      setAuth(data);
      navigate('/dashboard', { replace: true });
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
        aria-label="Login form"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {error && <FormError message={error} />}

        <div className="mb-5">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" isLoading={loading} className="w-full">
          Log In
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}
