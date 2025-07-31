import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';
import FormError from '../shared/ui/FormError';
import { authApi } from '../entities/auth/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (!email || !password) {
      setError('Please fill all fields');
      return false;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;
    setLoading(true);

    const [err, data] = await authApi.register({ email, password });

    if (err) {
      setError(err.message || 'Registration failed');
    } else if (data) {
      navigate('/login', { replace: true });
    }
    
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
        aria-label="Register form"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {error && <FormError message={error} />}

        <div className="mb-5">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      
        <div className="mb-5">
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          Sign Up
        </Button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
