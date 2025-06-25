
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
    small: 'w-32 h-40',
    medium: 'w-40 h-48',
    large: 'w-48 h-56'
  };

  const photoAreaSizes = {
    small: 'h-24',
    medium: 'h-32', 
    large: 'h-40'
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
      className={`absolute ${sizeClasses[size]} polaroid-frame group cursor-pointer z-10 transition-all duration-300`}
      style={{ 
        '--rotation': `${rotation}deg`,
        top: position.top,
        left: position.left,
        backgroundColor: theme?.colors.cardBackground || '#FFFFFF'
      } as React.CSSProperties}
    >
      {/* Photo area with fixed dimensions */}
      <div className={`relative w-full ${photoAreaSizes[size]} bg-gray-100 overflow-hidden rounded-sm`}>
        {imageSrc ? (
          <>
            <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${!imageLoaded ? 'animate-pulse' : ''}`}>
              <img 
                src={imageSrc} 
                alt="Uploaded photo" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-white hover:scale-110"
            >
              <X size={12} className="text-gray-600" />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 transition-all duration-200 rounded-sm">
            <Upload size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} className="text-gray-400 mb-1" />
            <span className={`${size === 'small' ? 'text-xs' : 'text-sm'} text-gray-500 text-center px-2 leading-tight`}>
              Click to add photo
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

      {/* Caption area with consistent spacing */}
      <div className="mt-2 px-1 h-8 flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={tempCaption}
            onChange={(e) => setTempCaption(e.target.value)}
            onBlur={handleCaptionSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleCaptionSubmit()}
            className={`w-full text-sm ${theme?.fonts.caption || 'font-handwritten'} bg-transparent border-none outline-none text-center leading-tight`}
            style={{ color: theme?.colors.primary || '#374151' }}
            placeholder="Add caption..."
            autoFocus
          />
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className={`w-full text-sm ${theme?.fonts.caption || 'font-handwritten'} text-center cursor-text hover:bg-gray-50/50 rounded px-1 py-1 transition-colors duration-200 leading-tight ${!caption ? 'text-gray-400' : ''}`}
            style={{ color: caption ? (theme?.colors.primary || '#374151') : '#9CA3AF' }}
          >
            {caption || "Add caption..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoFrame;
