import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Only show bottom nav when user is authenticated
  if (!user) {
    return null;
  }

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
      active: location.pathname === '/'
    },
    {
      path: '/explore',
      label: 'Explore',
      icon: Compass,
      active: location.pathname === '/explore'
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Settings,
      active: location.pathname === '/settings'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                item.active
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <IconComponent 
                size={20} 
                className={`transition-transform duration-200 ${
                  item.active ? 'scale-110' : ''
                }`}
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar; 