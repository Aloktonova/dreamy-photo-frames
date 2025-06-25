
import React from 'react';
import { Heart, Star, Smile } from 'lucide-react';

interface DecorativeElementProps {
  type: 'tape' | 'sticker' | 'doodle';
  position: {
    top: string;
    left: string;
  };
  rotation?: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const DecorativeElement = ({ 
  type, 
  position, 
  rotation = 0, 
  color = '#FFE5E5',
  size = 'medium' 
}: DecorativeElementProps) => {
  const sizeClasses = {
    small: { tape: 'w-8 h-16', sticker: 'w-6 h-6', doodle: 'w-4 h-4' },
    medium: { tape: 'w-12 h-20', sticker: 'w-8 h-8', doodle: 'w-6 h-6' },
    large: { tape: 'w-16 h-24', sticker: 'w-10 h-10', doodle: 'w-8 h-8' }
  };

  const renderElement = () => {
    switch (type) {
      case 'tape':
        return (
          <div 
            className={`tape ${sizeClasses[size].tape} animate-gentle-bounce`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.7) 100%)'
            }}
          />
        );
      
      case 'sticker':
        const icons = [Heart, Star, Smile];
        const IconComponent = icons[Math.floor(Math.random() * icons.length)];
        return (
          <div 
            className={`sticker ${sizeClasses[size].sticker} flex items-center justify-center animate-float`}
            style={{ 
              '--sticker-color': color,
              transform: `rotate(${rotation}deg)`
            } as React.CSSProperties}
          >
            <IconComponent size={size === 'small' ? 12 : size === 'medium' ? 16 : 20} className="text-white" />
          </div>
        );
      
      case 'doodle':
        return (
          <div 
            className={`${sizeClasses[size].doodle} animate-gentle-bounce`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path 
                d="M3 12c0 0 4-8 9-8s9 8 9 8-4 8-9 8-9-8-9-8z" 
                stroke={color} 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none"
              />
            </svg>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="absolute z-5"
      style={{
        top: position.top,
        left: position.left
      }}
    >
      {renderElement()}
    </div>
  );
};

export default DecorativeElement;
