import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import { useDarkMode } from "@/hooks/useDarkMode";

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onLogin?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleLoginClick = async () => {
    if (onLogin) {
      setIsLoginLoading(true);
      try {
        await onLogin();
      } finally {
        setIsLoginLoading(false);
      }
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      {/* Logo - Now clickable and links to home */}
      <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
        Dreamy
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        {user ? (
          <UserDropdown
            userName={user?.user_metadata?.name || user?.email || "User"}
            userEmail={user?.email}
            avatarUrl={user?.user_metadata?.avatar_url}
            onProfile={() => {}}
            onSettings={() => {}}
            onLogout={onLogout}
          />
        ) : (
          <Button 
            variant="outline" 
            className="rounded-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={handleLoginClick}
            disabled={isLoginLoading}
          >
            {isLoginLoading ? "Loading..." : "Log in"}
          </Button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        {/* Dark Mode Toggle for Mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 dark:text-gray-300"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 md:hidden">
          <div className="px-6 py-4">
            {user ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                <Button 
                  variant="ghost" 
                  onClick={onLogout}
                  className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full rounded-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleLoginClick}
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Loading..." : "Log in"}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 