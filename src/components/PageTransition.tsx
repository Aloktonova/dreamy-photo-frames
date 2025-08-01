import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      {children}
    </div>
  );
};

export default PageTransition; 