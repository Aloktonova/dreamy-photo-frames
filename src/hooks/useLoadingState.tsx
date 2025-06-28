
import { useState } from 'react';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export const useLoadingState = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false
  });

  const startLoading = (message?: string) => {
    setLoadingState({ isLoading: true, message, progress: 0 });
  };

  const updateProgress = (progress: number, message?: string) => {
    setLoadingState(prev => ({ 
      ...prev, 
      progress: Math.min(100, Math.max(0, progress)),
      message: message || prev.message
    }));
  };

  const stopLoading = () => {
    setLoadingState({ isLoading: false });
  };

  const setLoadingMessage = (message: string) => {
    setLoadingState(prev => ({ ...prev, message }));
  };

  return {
    loadingState,
    startLoading,
    updateProgress,
    stopLoading,
    setLoadingMessage
  };
};
