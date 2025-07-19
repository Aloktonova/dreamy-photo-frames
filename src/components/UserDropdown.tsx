import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';

interface UserDropdownProps {
  userName?: string;
  userEmail?: string;
  onViewProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  className?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userName = 'User',
  userEmail = 'user@example.com',
  onViewProfile,
  onSettings,
  onLogout,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleViewProfile = () => {
    onViewProfile?.();
    setIsOpen(false);
  };

  const handleSettings = () => {
    onSettings?.();
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <User className="w-5 h-5 mr-2" />
        {userName}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 font-medium">{userName}</p>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
          
          <div className="py-1">
            <button
              onClick={handleViewProfile}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <User className="w-4 h-4 mr-3" />
              View Profile
            </button>
            
            <button
              onClick={handleSettings}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>
          </div>
          
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 