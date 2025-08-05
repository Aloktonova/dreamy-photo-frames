import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState } from '@/utils/validation';

/**
 * Custom hook for consistent sign-out logic across the app.
 * Handles Supabase sign-out, session cleanup, and optional redirect/reload.
 * @param onSignedOut Optional callback after sign-out
 */
export function useSignOut(onSignedOut?: () => void) {
  const signOut = useCallback(async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      if (onSignedOut) {
        onSignedOut();
      } else {
        // Force page reload for clean state
        window.location.href = '/';
      }
    } catch (error) {
      // Even if sign out fails, clean up and redirect
      console.error('Sign out error:', error);
      cleanupAuthState();
      window.location.href = '/';
    }
  }, [onSignedOut]);

  return signOut;
} 