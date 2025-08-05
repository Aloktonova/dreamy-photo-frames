-- Remove unauthorized PII data (IP addresses and country data)
-- This addresses the critical security issue of collecting personal data without consent

-- Clear existing IP addresses and country data from profiles table
UPDATE public.profiles 
SET 
  ip_address = NULL,
  country = NULL
WHERE ip_address IS NOT NULL OR country IS NOT NULL;

-- Create a trigger to prevent future unauthorized data collection
CREATE OR REPLACE FUNCTION public.prevent_unauthorized_pii()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent IP address and country from being set during profile creation/updates
  NEW.ip_address = NULL;
  NEW.country = NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically clean PII data
CREATE TRIGGER prevent_pii_collection
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_unauthorized_pii();