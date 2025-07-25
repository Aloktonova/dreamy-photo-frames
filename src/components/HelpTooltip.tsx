
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const HelpTooltip = ({ content, position = 'top', size = 'md' }: HelpTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const sizeClasses = {
    sm: 'w-48 text-xs',
    md: 'w-64 text-sm',
    lg: 'w-80 text-base'
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-400 hover:text-gray-600 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        <HelpCircle size={16} />
      </button>
      
      {isVisible && (
        <div className={`
          absolute z-50 px-3 py-2 bg-gray-900 text-white rounded-lg shadow-lg
          ${positionClasses[position]} ${sizeClasses[size]}
        `}>
          <div className="text-left">{content}</div>
          <div className={`
            absolute w-2 h-2 bg-gray-900 transform rotate-45
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
              'right-full top-1/2 -translate-y-1/2 -mr-1'}
          `} />
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;
