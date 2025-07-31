import { useLocation, Link } from 'react-router-dom';
import AuthToggleButton from '../../../features/auth/ui/AuthToggleButton.tsx';

export const Header = () => {
  const location = useLocation();
  const hideOn = ['/login', '/register'];
  const isVisible = !hideOn.includes(location.pathname);

  return (
    <header className="w-full flex justify-between items-center p-4 border-b border-gray-200 bg-white">
      <Link to="/" className="text-xl font-bold">MyApp</Link>
      
      {isVisible && <AuthToggleButton />}
    </header>
  );
};
