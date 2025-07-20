import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="w-full py-6 bg-gray-50 border-t text-center text-sm text-gray-600 mt-auto">
    <nav className="space-x-4">
      <Link to="/about" className="hover:underline">About</Link>
      <Link to="/faq" className="hover:underline">FAQ</Link>
      <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
      <Link to="/terms" className="hover:underline">Terms of Service</Link>
    </nav>
    <div className="mt-2">© {new Date().getFullYear()} Dreamy Photo Frames</div>
  </footer>
);

export default Footer; 