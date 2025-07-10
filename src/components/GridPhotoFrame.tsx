import React, { useState } from 'react';
import { Theme } from '@/types/styles';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';
import { optimizeImage } from '@/utils/imageOptimization';
import EnhancedFileUpload from './EnhancedFileUpload';

interface GridPhotoFrameProps {
  id: string;
  gridColumn: number;
  gridRow: number;
  gridColumnSpan: number;
  gridRowSpan: number;
  caption?: string;
  theme?: Theme;
  onImageUpload?: (id: string, file: File) => void;
  onCaptionChange?: (id: string, caption: string) => void;
  editMode?: boolean;
}

const GridPhotoFrame = ({ 
  id, 
  gridColumn,
  gridRow,
  gridColumnSpan,
  gridRowSpan,
  caption = "", 
  theme,
  onImageUpload,
  onCaptionChange,
  editMode = false
}: GridPhotoFrameProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { handleError } = useErrorHandler();
  const { loadingState, startLoading, stopLoading } = useLoadingState();

  const handleFileSelect = async (file: File) => {
    try {
      startLoading('Optimizing image...');
      
      const optimizedImageSrc = await optimizeImage(file, {
        maxWidth: 800,
        maxHeight: 800,
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

  return (
    <div 
      className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors overflow-hidden"
      style={{ 
        gridColumn: `${gridColumn} / span ${gridColumnSpan}`,
        gridRow: `${gridRow} / span ${gridRowSpan}`
      }}
    >
      <div className="h-full flex flex-col">
        {/* Image area */}
        <div className="flex-1 relative min-h-[120px]">
          {imageSrc ? (
            <div className="h-full relative">
              <img 
                src={imageSrc} 
                alt="Grid photo" 
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          ) : (
            <EnhancedFileUpload
              onFileSelect={handleFileSelect}
              className="w-full h-full flex items-center justify-center"
              maxSize={10}
            />
          )}
          
          {/* Loading overlay */}
          {loadingState.isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-gray-600">{loadingState.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Caption area */}
        {editMode && (
          <div className="p-2 border-t border-gray-200">
            {isEditing ? (
              <input
                type="text"
                value={tempCaption}
                onChange={(e) => setTempCaption(e.target.value)}
                onBlur={handleCaptionSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handleCaptionSubmit()}
                className="w-full text-xs bg-transparent border-none outline-none text-center"
                placeholder="Add caption..."
                autoFocus
                maxLength={50}
              />
            ) : (
              <p 
                onClick={() => setIsEditing(true)}
                className="text-xs text-center cursor-text hover:bg-gray-50 rounded px-1 py-1 transition-colors duration-200 text-gray-500"
              >
                {caption || "Add caption..."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GridPhotoFrame;