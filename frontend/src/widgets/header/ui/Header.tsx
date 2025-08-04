import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthToggleButton } from '../../../features/auth';

const hideOn = ['/login', '/register'];

export const Header = () => {
  const { pathname } = useLocation();
  const isVisible = useMemo(() => !hideOn.includes(pathname), [pathname]);

  return (
    <header className="w-full flex justify-between items-center p-4 border-b border-gray-200 bg-white">
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      {isVisible && <AuthToggleButton />}
    </header>
  );
};
