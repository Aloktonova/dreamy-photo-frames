import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';

const Footer: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuKey: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const footerMenus = [
    {
      key: 'features',
      title: 'Features',
      items: [
        { name: 'Photo Frames', href: '#' },
        { name: 'AI Enhancement', href: '#' },
        { name: 'Collage Maker', href: '#' },
        { name: 'Templates', href: '#' }
      ]
    },
    {
      key: 'explore',
      title: 'Explore',
      items: [
        { name: 'Gallery', href: '#' },
        { name: 'Tutorials', href: '#' },
        { name: 'Blog', href: '/blog' },
        { name: 'Community', href: '#' }
      ]
    },
    {
      key: 'community',
      title: 'Community',
      items: [
        { name: 'Forums', href: '#' },
        { name: 'Discord', href: '#' },
        { name: 'Events', href: '#' },
        { name: 'Support', href: '#' }
      ]
    },
    {
      key: 'download',
      title: 'Download',
      items: [
        { name: 'Mobile App', href: '#' },
        { name: 'Desktop App', href: '#' },
        { name: 'Browser Extension', href: '#' },
        { name: 'API', href: '#' }
      ]
    },
    {
      key: 'company',
      title: 'Company',
      items: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 lg:sticky lg:bottom-0 lg:z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Mobile-friendly collapsible menus */}
          {footerMenus.map((menu) => (
            <div key={menu.key} className="lg:col-span-1">
              <button
                onClick={() => toggleMenu(menu.key)}
                className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white mb-4 lg:mb-2 transition-colors duration-200"
              >
                {menu.title}
                <ChevronDown 
                  size={16} 
                  className={`lg:hidden transition-transform ${openMenus[menu.key] ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`lg:block ${openMenus[menu.key] ? 'block' : 'hidden'}`}>
                <ul className="space-y-2">
                  {menu.items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.href} 
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <select className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-600 rounded px-3 py-1 dark:bg-gray-800 transition-colors duration-200">
                <option>English (India)</option>
                <option>English (US)</option>
                <option>हिंदी</option>
              </select>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                <Share2 size={20} />
              </Link>
              <Link to="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Legal Links and Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4 mb-4 sm:mb-0">
              <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Privacy policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Terms
              </Link>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 All Rights Reserved, Dreamy®
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 