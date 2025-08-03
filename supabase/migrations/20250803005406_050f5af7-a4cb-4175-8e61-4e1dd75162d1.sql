-- Create media_generated table for storing generated content
CREATE TABLE public.media_generated (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed' CHECK (status IN ('generating', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create generation_limits table for tracking usage
CREATE TABLE public.generation_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_count INTEGER DEFAULT 0,
  video_count INTEGER DEFAULT 0,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create user_subscriptions table for plan management
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.media_generated ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_generated
CREATE POLICY "Users can view public media or their own" 
ON public.media_generated 
FOR SELECT 
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own media" 
ON public.media_generated 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own media" 
ON public.media_generated 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own media" 
ON public.media_generated 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for generation_limits
CREATE POLICY "Users can view their own limits" 
ON public.generation_limits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own limits" 
ON public.generation_limits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own limits" 
ON public.generation_limits 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscription" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_media_generated_user_id ON public.media_generated(user_id);
CREATE INDEX idx_media_generated_public ON public.media_generated(is_public) WHERE is_public = true;
CREATE INDEX idx_media_generated_type ON public.media_generated(media_type);
CREATE INDEX idx_generation_limits_user_date ON public.generation_limits(user_id, date);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_media_generated_updated_at
BEFORE UPDATE ON public.media_generated
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_generation_limits_updated_at
BEFORE UPDATE ON public.generation_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();