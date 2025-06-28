
import { useState } from 'react';
import { toast } from 'sonner';

export interface AppError {
  type: 'file_upload' | 'file_size' | 'file_type' | 'network' | 'general';
  message: string;
  details?: string;
}

export const useErrorHandler = () => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const handleError = (error: AppError) => {
    console.error('App Error:', error);
    setErrors(prev => [...prev, error]);
    
    // Show user-friendly toast message
    toast.error(error.message, {
      description: error.details,
      duration: 5000,
    });
  };

  const clearErrors = () => setErrors([]);

  const validateImageFile = (file: File): AppError | null => {
    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        type: 'file_type',
        message: 'Invalid file type',
        details: 'Please upload a JPEG, PNG, GIF, or WebP image file.'
      };
    }

    // File size validation (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        type: 'file_size',
        message: 'File too large',
        details: 'Please upload an image smaller than 10MB.'
      };
    }

    return null;
  };

  return {
    errors,
    handleError,
    clearErrors,
    validateImageFile
  };
};
