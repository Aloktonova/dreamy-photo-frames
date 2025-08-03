import { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const mainContentVariants = {
    expanded: {
      marginLeft: showSidebar && user ? 280 : 0,
      transition: { duration: 0.3 }
    },
    collapsed: {
      marginLeft: showSidebar && user ? 72 : 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {showSidebar && user && (
        <AppSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
      )}
      
      <motion.main
        variants={mainContentVariants}
        animate={sidebarCollapsed ? "collapsed" : "expanded"}
        className="min-h-screen"
      >
        {children}
      </motion.main>
      
      {/* Mobile overlay */}
      {showSidebar && user && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};