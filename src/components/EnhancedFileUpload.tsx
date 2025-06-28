
import React, { useState, useRef } from 'react';
import { Upload, Image, X, Check } from 'lucide-react';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface EnhancedFileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

const EnhancedFileUpload = ({ 
  onFileSelect, 
  accept = "image/*", 
  maxSize = 10, 
  className = "" 
}: EnhancedFileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleError, validateImageFile } = useErrorHandler();

  const handleFile = async (file: File) => {
    const error = validateImageFile(file);
    if (error) {
      handleError(error);
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      onFileSelect(file);
      setUploadComplete(true);
      setTimeout(() => setUploadComplete(false), 2000);
    } catch (err) {
      handleError({
        type: 'file_upload',
        message: 'Upload failed',
        details: 'There was an error processing your image. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div
      className={`relative transition-all duration-300 ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
    >
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50
          ${isDragOver ? 'border-blue-500 bg-blue-50 scale-102' : 'border-gray-300'}
          ${isUploading ? 'opacity-75 pointer-events-none' : ''}
          ${uploadComplete ? 'border-green-500 bg-green-50' : ''}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : uploadComplete ? (
            <Check size={32} className="text-green-500" />
          ) : (
            <div className={`p-2 rounded-full ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Image size={24} className={isDragOver ? 'text-blue-500' : 'text-gray-500'} />
            </div>
          )}
          
          <div>
            <p className="font-medium text-gray-700">
              {isUploading ? 'Processing...' : 
               uploadComplete ? 'Upload complete!' :
               isDragOver ? 'Drop your image here' : 'Click or drag to upload'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPEG, PNG, GIF, WebP up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFileUpload;
