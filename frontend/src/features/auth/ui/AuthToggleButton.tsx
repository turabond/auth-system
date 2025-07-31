import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import { useAuthStore } from '../../../entities/auth/model';
import { authApi } from '../../../entities/auth/api';

export default function AuthToggleButton() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    const [err] = await authApi.logout();
    if (!err) {
      logout();
      navigate('/login');
    }
  };
    

  const handleLogin = () => {
    navigate('/login');
  };

  return user ? (
    <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
      Logout
    </Button>
  ) : (
    <Button onClick={handleLogin} className="bg-green-600 hover:bg-green-700">
      Login
    </Button>
  );
}
