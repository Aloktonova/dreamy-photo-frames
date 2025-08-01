import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NavigationTest: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Navigation Test</h1>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
              Home
            </Link>
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 underline">
              Blog
            </Link>
            <Link to="/collage" className="text-blue-600 hover:text-blue-800 underline">
              Photo Collage
            </Link>
            <Link to="/edit" className="text-blue-600 hover:text-blue-800 underline">
              Edit Page
            </Link>
            {user && (
              <>
                <Link to="/profile" className="text-blue-600 hover:text-blue-800 underline">
                  Profile
                </Link>
                <Link to="/settings" className="text-blue-600 hover:text-blue-800 underline">
                  Settings
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
            <p><strong>Authenticated:</strong> {user ? 'Yes' : 'No'}</p>
            {user ? (
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            ) : (
              <Button onClick={login} variant="outline">
                Login
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Navigation</h2>
          <div className="space-y-2">
            <p>Click the links above to test navigation between pages.</p>
            <p>Verify that:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Logo in navbar links to home page</li>
              <li>Blog page has "Back to Home" button</li>
              <li>Login button works on all pages</li>
              <li>Navigation is smooth (no page reloads)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTest; 