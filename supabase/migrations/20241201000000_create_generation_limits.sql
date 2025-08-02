-- Create generation_limits table to track user usage
CREATE TABLE IF NOT EXISTS generation_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  generation_type TEXT NOT NULL CHECK (generation_type IN ('image', 'video')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('generating', 'completed', 'failed')),
  prompt TEXT,
  style TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_generation_limits_user_date ON generation_limits(user_id, DATE(created_at));
CREATE INDEX IF NOT EXISTS idx_generation_limits_type ON generation_limits(generation_type);

-- Create user_subscriptions table for different plans
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
  daily_image_limit INTEGER DEFAULT 1,
  daily_video_limit INTEGER DEFAULT 0,
  monthly_image_limit INTEGER DEFAULT 30,
  monthly_video_limit INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for user subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);

-- Insert default subscription for existing users
INSERT INTO user_subscriptions (user_id, plan_type, daily_image_limit, daily_video_limit, monthly_image_limit, monthly_video_limit)
SELECT 
  id as user_id,
  'free' as plan_type,
  1 as daily_image_limit,
  0 as daily_video_limit,
  30 as monthly_image_limit,
  0 as monthly_video_limit
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- Enable RLS
ALTER TABLE generation_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for generation_limits
CREATE POLICY "Users can view their own generation limits" ON generation_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generation limits" ON generation_limits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generation limits" ON generation_limits
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to check user generation limits
CREATE OR REPLACE FUNCTION check_generation_limit(
  p_user_id UUID,
  p_generation_type TEXT
) RETURNS JSONB AS $$
DECLARE
  user_sub user_subscriptions%ROWTYPE;
  daily_count INTEGER;
  monthly_count INTEGER;
  daily_limit INTEGER;
  monthly_limit INTEGER;
  result JSONB;
BEGIN
  -- Get user subscription
  SELECT * INTO user_sub FROM user_subscriptions WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    -- Create default subscription for new users
    INSERT INTO user_subscriptions (user_id, plan_type, daily_image_limit, daily_video_limit, monthly_image_limit, monthly_video_limit)
    VALUES (p_user_id, 'free', 1, 0, 30, 0);
    
    SELECT * INTO user_sub FROM user_subscriptions WHERE user_id = p_user_id;
  END IF;
  
  -- Set limits based on generation type
  IF p_generation_type = 'image' THEN
    daily_limit := user_sub.daily_image_limit;
    monthly_limit := user_sub.monthly_image_limit;
  ELSE
    daily_limit := user_sub.daily_video_limit;
    monthly_limit := user_sub.monthly_video_limit;
  END IF;
  
  -- Count daily generations
  SELECT COUNT(*) INTO daily_count 
  FROM generation_limits 
  WHERE user_id = p_user_id 
    AND generation_type = p_generation_type 
    AND DATE(created_at) = CURRENT_DATE;
  
  -- Count monthly generations
  SELECT COUNT(*) INTO monthly_count 
  FROM generation_limits 
  WHERE user_id = p_user_id 
    AND generation_type = p_generation_type 
    AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE);
  
  -- Build result
  result := jsonb_build_object(
    'can_generate', daily_count < daily_limit AND monthly_count < monthly_limit,
    'daily_used', daily_count,
    'daily_limit', daily_limit,
    'monthly_used', monthly_count,
    'monthly_limit', monthly_limit,
    'plan_type', user_sub.plan_type,
    'remaining_daily', GREATEST(0, daily_limit - daily_count),
    'remaining_monthly', GREATEST(0, monthly_limit - monthly_count)
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record generation
CREATE OR REPLACE FUNCTION record_generation(
  p_user_id UUID,
  p_generation_type TEXT,
  p_prompt TEXT DEFAULT NULL,
  p_style TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS UUID AS $$
DECLARE
  generation_id UUID;
BEGIN
  INSERT INTO generation_limits (user_id, generation_type, prompt, style, metadata)
  VALUES (p_user_id, p_generation_type, p_prompt, p_style, p_metadata)
  RETURNING id INTO generation_id;
  
  RETURN generation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 