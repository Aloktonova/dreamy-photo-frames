import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Chrome, Mail, Lock, UserPlus } from 'lucide-react';

interface AuthBlockProps {
  onAuthenticated: (user: User) => void;
}

const AuthBlock: React.FC<AuthBlockProps> = ({ onAuthenticated }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleUserProfile = async (user: User) => {
    try {
      // Fetch IP and country data
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();
      
      // Upsert user profile data
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          country: locationData.country_name || null,
          ip_address: locationData.ip || null,
        });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Handle profile update in background
          setTimeout(() => {
            handleUserProfile(session.user);
          }, 0);
          onAuthenticated(session.user);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Handle profile update in background
        setTimeout(() => {
          handleUserProfile(session.user);
        }, 0);
        onAuthenticated(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [onAuthenticated]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast({
          title: "Sign-in Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Sign-in Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        
        if (error) {
          toast({
            title: "Sign-up Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Check your email",
            description: "We sent you a confirmation link",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) {
          toast({
            title: "Sign-in Error", 
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Email auth error:', error);
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Hide auth block when user is authenticated
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {mode === 'signin' ? 'Welcome Back' : 'Join Dreamy Frames'}
        </h3>
        <p className="text-gray-600">
          {mode === 'signin' 
            ? 'Sign in to access your photo projects' 
            : 'Create an account to get started'
          }
        </p>
      </div>

      {/* Google Sign-In Button */}
      <Button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full mb-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
        size="lg"
      >
        <Chrome className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          size="lg"
        >
          {mode === 'signin' ? (
            <Mail className="mr-2 h-5 w-5" />
          ) : (
            <UserPlus className="mr-2 h-5 w-5" />
          )}
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      {/* Toggle between sign-in and sign-up */}
      <div className="text-center mt-6">
        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"
          }
        </button>
      </div>
    </div>
  );
};

export default AuthBlock;