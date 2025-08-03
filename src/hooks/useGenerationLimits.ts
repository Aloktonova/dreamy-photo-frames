import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GenerationLimits {
  canGenerate: boolean;
  remaining: number;
  currentCount: number;
  maxCount: number;
  planType: 'free' | 'pro';
  mediaType: 'image' | 'video';
}

interface UseGenerationLimitsReturn {
  limits: GenerationLimits | null;
  loading: boolean;
  checkLimits: (mediaType: 'image' | 'video') => Promise<GenerationLimits | null>;
  requestGeneration: (mediaType: 'image' | 'video', prompt: string, style?: string) => Promise<{ success: boolean; error?: string; data?: any }>;
}

export const useGenerationLimits = (): UseGenerationLimitsReturn => {
  const { user } = useAuth();
  const [limits, setLimits] = useState<GenerationLimits | null>(null);
  const [loading, setLoading] = useState(false);

  const checkLimits = async (mediaType: 'image' | 'video'): Promise<GenerationLimits | null> => {
    if (!user) return null;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-generation-limit', {
        body: { mediaType }
      });

      if (error) {
        console.error('Error checking limits:', error);
        toast.error('Failed to check generation limits');
        return null;
      }

      const limitsData = data as GenerationLimits;
      setLimits(limitsData);
      return limitsData;
    } catch (error) {
      console.error('Error checking limits:', error);
      toast.error('Failed to check generation limits');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const requestGeneration = async (
    mediaType: 'image' | 'video',
    prompt: string,
    style?: string
  ): Promise<{ success: boolean; error?: string; data?: any }> => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-generation-limit', {
        body: { mediaType, prompt, style }
      });

      if (error) {
        console.error('Generation request failed:', error);
        return { success: false, error: error.message || 'Generation failed' };
      }

      if (!data.success) {
        return { success: false, error: data.error || 'Generation limit reached' };
      }

      // Update local limits state
      setLimits(data);

      return { success: true, data };
    } catch (error: any) {
      console.error('Error requesting generation:', error);
      return { success: false, error: error.message || 'Failed to request generation' };
    }
  };

  useEffect(() => {
    if (user && limits) {
      // Auto-refresh limits every minute
      const interval = setInterval(() => {
        checkLimits(limits.mediaType);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [user, limits?.mediaType]);

  return {
    limits,
    loading,
    checkLimits,
    requestGeneration
  };
};