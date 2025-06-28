import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { Theme } from '@/types/styles';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';
import { optimizeImage } from '@/utils/imageOptimization';
import EnhancedFileUpload from './EnhancedFileUpload';
import HelpTooltip from './HelpTooltip';
import FramePositionControl from './FramePositionControl';

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
  onPositionChange?: (id: string, position: { top: string; left: string }) => void;
  onRotationChange?: (id: string, rotation: number) => void;
  onSizeChange?: (id: string, size: 'small' | 'medium' | 'large') => void;
  editMode?: boolean;
}

const PhotoFrame = ({ 
  id, 
  rotation, 
  position, 
  size, 
  caption = "", 
  theme,
  onImageUpload,
  onCaptionChange,
  onPositionChange,
  onRotationChange,
  onSizeChange,
  editMode = false
}: PhotoFrameProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  const { handleError } = useErrorHandler();
  const { loadingState, startLoading, stopLoading } = useLoadingState();

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

  const getFrameStyle = () => {
    if (!theme) return {};
    
    const baseStyles = {
      backgroundColor: theme.colors.cardBackground,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
    };

    switch (theme.id) {
      case 'minimalist':
        return {
          ...baseStyles,
          border: '2px solid #F8F9FA',
          borderRadius: '2px'
        };
      case 'scrapbook':
        return {
          ...baseStyles,
          border: '3px solid #8B4513',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)'
        };
      case 'retro':
        return {
          ...baseStyles,
          border: '4px solid #CD853F',
          borderRadius: '0px',
          boxShadow: '0 8px 32px rgba(205, 133, 63, 0.3), inset 0 2px 4px rgba(139, 69, 19, 0.1)',
          background: 'linear-gradient(135deg, #FFF8DC 0%, #F4E4BC 100%)'
        };
      case 'romantic':
        return {
          ...baseStyles,
          border: '2px solid #FFB6C1',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(255, 182, 193, 0.3), 0 2px 8px rgba(199, 21, 133, 0.1)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F5 100%)'
        };
      case 'travel':
        return {
          ...baseStyles,
          border: '3px solid #4682B4',
          borderRadius: '4px',
          boxShadow: '0 8px 32px rgba(70, 130, 180, 0.2), 0 2px 8px rgba(46, 139, 87, 0.1)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)',
          position: 'relative'
        };
      default:
        return baseStyles;
    }
  };

  const handleFileSelect = async (file: File) => {
    try {
      startLoading('Optimizing image...');
      
      const optimizedImageSrc = await optimizeImage(file, {
        maxWidth: size === 'large' ? 800 : size === 'medium' ? 600 : 400,
        maxHeight: size === 'large' ? 800 : size === 'medium' ? 600 : 400,
        quality: 0.85
      });
      
      setImageSrc(optimizedImageSrc);
      setImageLoaded(false);
      
      if (onImageUpload) {
        onImageUpload(id, file);
      }
    } catch (error) {
      handleError({
        type: 'file_upload',
        message: 'Failed to process image',
        details: 'There was an error optimizing your image. Please try again.'
      });
    } finally {
      stopLoading();
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
    <>
      <div 
        className={`absolute ${sizeClasses[size]} group cursor-pointer z-10 transition-all duration-500 hover:z-20`}
        style={{ 
          top: position.top,
          left: position.left,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center'
        }}
        onMouseEnter={() => editMode && setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Themed frame with authentic style */}
        <div 
          className="w-full h-full rounded-sm hover:shadow-2xl transition-all duration-500 hover:scale-110 p-3 pb-8 relative"
          style={getFrameStyle()}
        >
          {/* Edit mode control button */}
          {editMode && (
            <button
              onClick={() => setShowControls(!showControls)}
              className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-blue-600 hover:scale-110 download-ignore z-50"
            >
              <Settings size={10} />
            </button>
          )}

          {/* Travel theme stamp effect */}
          {theme?.id === 'travel' && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-80">
              ✈
            </div>
          )}

          {/* Scrapbook theme corner decorations */}
          {theme?.id === 'scrapbook' && (
            <>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full opacity-70"></div>
            </>
          )}

          {/* Photo area with theme-appropriate background */}
          <div className={`relative w-full ${photoAreaSizes[size]} overflow-hidden mb-2`} 
               style={{ 
                 backgroundColor: theme?.id === 'retro' ? '#F5F5DC' : '#F9FAFB',
                 borderRadius: theme?.id === 'romantic' ? '6px' : '2px'
               }}>
            {imageSrc ? (
              <>
                <div className={`w-full h-full bg-gray-200 flex items-center justify-center ${!imageLoaded ? 'animate-pulse' : ''}`}>
                  <img 
                    src={imageSrc} 
                    alt="Themed photo" 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleImageLoad}
                    style={{ 
                      filter: theme?.id === 'retro' ? 'sepia(0.3) saturate(0.8)' : 
                             theme?.id === 'romantic' ? 'saturate(1.1) brightness(1.05)' : 'none'
                    }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-600 hover:scale-110 download-ignore"
                >
                  <X size={10} />
                </button>
              </>
            ) : (
              <EnhancedFileUpload
                onFileSelect={handleFileSelect}
                className="w-full h-full"
                maxSize={10}
              />
            )}
          </div>

          {/* Enhanced caption area with help tooltip */}
          <div className="px-1 flex items-center justify-center min-h-[20px] gap-1">
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
                maxLength={50}
              />
            ) : (
              <div className="flex items-center gap-1 w-full">
                <p 
                  onClick={() => setIsEditing(true)}
                  className={`flex-1 text-xs ${theme?.fonts.caption || 'font-handwritten'} text-center cursor-text hover:bg-gray-50 rounded px-1 py-1 transition-colors duration-200 leading-tight ${!caption ? 'text-gray-400' : ''}`}
                  style={{ color: caption ? (theme?.colors.primary || '#374151') : '#9CA3AF' }}
                >
                  {caption || "Add caption..."}
                </p>
                {!caption && (
                  <HelpTooltip 
                    content="Click here to add a caption to your photo. Keep it short and sweet!"
                    position="top"
                    size="sm"
                  />
                )}
              </div>
            )}
          </div>

          {/* Loading overlay */}
          {loadingState.isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-gray-600">{loadingState.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Position Control Component */}
      {editMode && (
        <FramePositionControl
          frameId={id}
          position={position}
          rotation={rotation}
          size={size}
          onPositionChange={onPositionChange || (() => {})}
          onRotationChange={onRotationChange || (() => {})}
          onSizeChange={onSizeChange || (() => {})}
          isVisible={showControls}
        />
      )}
    </>
  );
};

export default PhotoFrame;
