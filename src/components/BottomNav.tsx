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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#000000] border-t border-[#2D2D2E] z-50">
      <div className="flex justify-around items-center h-[60px] pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full active:scale-95 transition-transform",
                isActive ? "text-white" : "text-[#8A8A8E]"
              )}
            >
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium mt-1">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
