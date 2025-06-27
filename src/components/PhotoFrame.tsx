
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Theme } from '@/types/styles';

interface PhotoFrameProps {
  id: string;
  rotation: number;
  position: {
    top: string;
    left: string;
  };
  size: 'small' | 'medium' | 'large';
  caption?: string;
  theme?: Theme;
  onImageUpload?: (id: string, file: File) => void;
  onCaptionChange?: (id: string, caption: string) => void;
}

const PhotoFrame = ({ 
  id, 
  rotation, 
  position, 
  size, 
  caption = "", 
  theme,
  onImageUpload,
  onCaptionChange 
}: PhotoFrameProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    small: 'w-28 h-36',
    medium: 'w-36 h-44',
    large: 'w-44 h-52'
  };

  const photoAreaSizes = {
    small: 'h-20',
    medium: 'h-28', 
    large: 'h-36'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        setImageLoaded(false);
      };
      reader.readAsDataURL(file);
      
      if (onImageUpload) {
        onImageUpload(id, file);
      }
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCaptionSubmit = () => {
    setIsEditing(false);
    if (onCaptionChange) {
      onCaptionChange(id, tempCaption);
    }
  };

  const removeImage = () => {
    setImageSrc(null);
    setImageLoaded(false);
  };

  return (
    <div 
      className={`absolute ${sizeClasses[size]} group cursor-pointer z-10 transition-all duration-500 hover:z-20`}
      style={{ 
        top: position.top,
        left: position.left,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center'
      }}
    >
      {/* Authentic polaroid frame */}
      <div 
        className="w-full h-full bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 p-3 pb-8"
        style={{ 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: theme?.colors.cardBackground || '#FFFFFF'
        }}
      >
        {/* Photo area */}
        <div className={`relative w-full ${photoAreaSizes[size]} bg-gray-50 overflow-hidden mb-2`}>
          {imageSrc ? (
            <>
              <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${!imageLoaded ? 'animate-pulse' : ''}`}>
                <img 
                  src={imageSrc} 
                  alt="Polaroid photo" 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-600 hover:scale-110"
              >
                <X size={10} />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors duration-300">
              <Upload size={size === 'small' ? 14 : size === 'medium' ? 18 : 22} className="text-gray-400 mb-1" />
              <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-500 text-center px-1 leading-tight`}>
                Add photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Caption area - authentic polaroid style */}
        <div className="px-1 flex items-center justify-center min-h-[20px]">
          {isEditing ? (
            <input
              type="text"
              value={tempCaption}
              onChange={(e) => setTempCaption(e.target.value)}
              onBlur={handleCaptionSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleCaptionSubmit()}
              className={`w-full text-xs ${theme?.fonts.caption || 'font-handwritten'} bg-transparent border-none outline-none text-center leading-tight`}
              style={{ color: theme?.colors.primary || '#374151' }}
              placeholder="Add caption..."
              autoFocus
            />
          ) : (
            <p 
              onClick={() => setIsEditing(true)}
              className={`w-full text-xs ${theme?.fonts.caption || 'font-handwritten'} text-center cursor-text hover:bg-gray-50 rounded px-1 py-1 transition-colors duration-200 leading-tight ${!caption ? 'text-gray-400' : ''}`}
              style={{ color: caption ? (theme?.colors.primary || '#374151') : '#9CA3AF' }}
            >
              {caption || "Add caption..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoFrame;
