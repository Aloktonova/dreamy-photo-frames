import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GenerationLimits {
  can_generate: boolean;
  daily_used: number;
  daily_limit: number;
  monthly_used: number;
  monthly_limit: number;
  plan_type: string;
  remaining_daily: number;
  remaining_monthly: number;
}

interface GenerationResponse {
  success: boolean;
  generation_id?: string;
  limits?: GenerationLimits;
  error?: string;
  message?: string;
}

export const useGenerationLimits = () => {
  const { user } = useAuth();
  const [limits, setLimits] = useState<GenerationLimits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current limits
  const fetchLimits = async (generationType: 'image' | 'video') => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .rpc('check_generation_limit', {
          p_user_id: user.id,
          p_generation_type: generationType
        });

      if (fetchError) {
        throw fetchError;
      }

      setLimits(data);
    } catch (err) {
      console.error('Error fetching limits:', err);
      setError('Failed to fetch generation limits');
    } finally {
      setLoading(false);
    }
  };

  // Request generation with rate limiting
  const requestGeneration = async (
    generationType: 'image' | 'video',
    prompt: string,
    style: string,
    metadata?: Record<string, any>
  ): Promise<GenerationResponse> => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      setLoading(true);
      setError(null);

      // Get session for authorization
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return { success: false, error: 'No active session' };
      }

      // Call Edge function for rate limiting
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-generation-limit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        },
        body: JSON.stringify({
          generation_type: generationType,
          prompt,
          style,
          metadata: metadata || {}
        })
      });

      const result: GenerationResponse = await response.json();

      if (response.ok && result.success) {
        setLimits(result.limits || null);
        return result;
      } else {
        setError(result.error || 'Generation request failed');
        return result;
      }
    } catch (err) {
      console.error('Error requesting generation:', err);
      const errorMessage = 'Failed to request generation';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update generation status
  const updateGenerationStatus = async (
    generationId: string,
    status: 'generating' | 'completed' | 'failed',
    url?: string
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('generation_limits')
        .update({ 
          status,
          metadata: url ? { url } : undefined
        })
        .eq('id', generationId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating generation status:', error);
      }
    } catch (err) {
      console.error('Error updating generation status:', err);
    }
  };

  // Get user subscription info
  const getUserSubscription = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error fetching subscription:', err);
      return null;
    }
  };

  // Check if user can generate
  const canGenerate = (type: 'image' | 'video') => {
    if (!limits) return false;
    return limits.can_generate;
  };

  // Get remaining generations
  const getRemaining = (type: 'image' | 'video') => {
    if (!limits) return { daily: 0, monthly: 0 };
    return {
      daily: limits.remaining_daily,
      monthly: limits.remaining_monthly
    };
  };

  return {
    limits,
    loading,
    error,
    fetchLimits,
    requestGeneration,
    updateGenerationStatus,
    getUserSubscription,
    canGenerate,
    getRemaining
  };
}; 