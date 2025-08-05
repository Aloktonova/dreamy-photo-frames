import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook for consistent sign-out logic across the app.
 * Handles Supabase sign-out, session cleanup, and optional redirect/reload.
 * @param onSignedOut Optional callback after sign-out
 */
export function useSignOut(onSignedOut?: () => void) {
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      if (onSignedOut) {
        onSignedOut();
      } else {
        // Default: reload the page to clear state
        window.location.reload();
      }
    } catch (error) {
      // Optionally handle error (e.g., show toast)
      console.error('Sign out error:', error);
    }
  }, [onSignedOut]);

  return signOut;
} 