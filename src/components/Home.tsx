
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Wand2, 
  Move3D, 
  Layers, 
  Scissors, 
  Grid3X3,
  Sparkles,
  ArrowRight,
  LogOut,
  Camera,
  Palette,
  Download,
  Share2,
  Star,
  CheckCircle,
  Play,
  Users,
  Zap,
  Plus,
  Sparkles as SparklesIcon,
  Heart,
  Zap as ZapIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// AuthBlock import removed - using auth context instead
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const { toast } = useToast();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const prevUserRef = React.useRef<any>(null);

  useEffect(() => {
    // Only show welcome if user just logged in (was not logged in before)
    if (user && !hasWelcomed && !prevUserRef.current) {
      const name = user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.given_name || user.email?.split('@')[0] || user.email;
      toast({
        title: `Welcome back, ${name}!`,
        duration: 2000,
        className: 'animate-fade-in-up', // custom animation class
      });
      setHasWelcomed(true);
    }
    prevUserRef.current = user;
  }, [user, toast, hasWelcomed]);

  const mainFeatures = [
    {
      icon: SparklesIcon,
      title: "AI Filters",
      description: "Apply stunning AI-powered filters to your photos for instant enhancement."
    },
    {
      icon: Plus,
      title: "Add Frame",
      description: "Choose from beautiful frames to enhance your photos."
    },
    {
      icon: Share2,
      title: "Share",
      description: "Share your creations directly to social media platforms."
    }
  ];

  const handleModeSelect = (mode: string) => {
    if (mode === 'collage' || mode === 'freestyle' || mode === 'multifit' || mode === 'stitch' || mode === 'templates') {
      navigate('/collage');
    } else if (mode === 'edit') {
      navigate('/edit');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/collage');
    } else {
      navigate('/collage'); // Allow users to access the app without login
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={logout} onLogin={login} />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Photos with
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> AI Magic</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
              Create stunning photo frames and collages with our AI-powered tools. 
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={login}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
            
            {user && (
              <Button 
                onClick={() => navigate('/collage')}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Features Section - Focus on Filters */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isFilter = feature.title.toLowerCase().includes('filter');
              return (
                <div
                  key={index}
                  className={`text-center group rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 transition-transform duration-300 ${isFilter ? 'bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 scale-105 border-pink-300' : 'bg-white dark:bg-gray-800'}`}
                  style={isFilter ? { boxShadow: '0 4px 32px 0 #ec489933' } : {}}
                >
                  <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full ${isFilter ? 'bg-gradient-to-br from-pink-500 to-purple-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                  {isFilter && (
                    <div className="mt-4">
                      <span className="inline-block bg-pink-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      {user && <BottomNavBar />}
    </>
  );
};

export default Home;
