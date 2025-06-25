
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoFrameProps {
  id: string;
  rotation: number;
  position: {
    top: string;
    left: string;
  };
  size: 'small' | 'medium' | 'large';
  caption?: string;
  onImageUpload?: (id: string, file: File) => void;
  onCaptionChange?: (id: string, caption: string) => void;
}

const PhotoFrame = ({ 
  id, 
  rotation, 
  position, 
  size, 
  caption = "", 
  onImageUpload,
  onCaptionChange 
}: PhotoFrameProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  const sizeClasses = {
    small: 'w-32 h-40',
    medium: 'w-40 h-48',
    large: 'w-48 h-56'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      if (onImageUpload) {
        onImageUpload(id, file);
      }
    }
  };

  const handleCaptionSubmit = () => {
    setIsEditing(false);
    if (onCaptionChange) {
      onCaptionChange(id, tempCaption);
    }
  };

  const removeImage = () => {
    setImageSrc(null);
  };

  return (
    <div 
      className={`absolute ${sizeClasses[size]} polaroid-frame group cursor-pointer z-10`}
      style={{ 
        '--rotation': `${rotation}deg`,
        top: position.top,
        left: position.left
      } as React.CSSProperties}
    >
      {/* Photo area */}
      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
        {imageSrc ? (
          <>
            <img 
              src={imageSrc} 
              alt="Uploaded photo" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <X size={12} className="text-gray-600" />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload size={20} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 text-center px-2">Click to add photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Caption area */}
      <div className="mt-2 px-1">
        {isEditing ? (
          <input
            type="text"
            value={tempCaption}
            onChange={(e) => setTempCaption(e.target.value)}
            onBlur={handleCaptionSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleCaptionSubmit()}
            className="w-full text-sm font-handwritten text-gray-700 bg-transparent border-none outline-none text-center"
            placeholder="Add caption..."
            autoFocus
          />
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className="text-sm font-handwritten text-gray-700 text-center cursor-text min-h-[20px] hover:bg-gray-50 rounded px-1"
          >
            {caption || "Add caption..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoFrame;
