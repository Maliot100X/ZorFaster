import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Rocket, User, Menu } from 'lucide-react';
import { clsx } from 'clsx';

const tabs = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Shop', path: '/shop', icon: ShoppingBag },
  { name: 'Launch', path: '/launch', icon: Rocket },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'More', path: '/more', icon: Menu },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1",
                isActive ? "text-blue-500" : "text-neutral-500"
              )}
            >
              <tab.icon size={24} />
              <span className="text-[10px] font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
