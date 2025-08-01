
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

  useEffect(() => {
    if (user) {
      const name = user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.given_name || user.email?.split('@')[0] || user.email;
      toast({
        title: `Welcome back, ${name}!`,
        duration: 1500,
      });
    }
  }, [user, toast]);

  const mainFeatures = [
    {
      icon: Plus,
      title: "Add Frame",
      description: "Choose from hundreds of beautiful frames to enhance your photos"
    },
    {
      icon: SparklesIcon,
      title: "AI Suggestions",
      description: "Get intelligent recommendations for the perfect frame and style"
    },
    {
      icon: Share2,
      title: "Share",
      description: "Share your creations directly to social media platforms"
    }
  ];

  const quickModes = [
    {
      id: 'freestyle',
      name: 'Freestyle',
      description: 'Free drag & resize canvas',
      icon: Move3D,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'multifit',
      name: 'Multi-fit',
      description: 'Adjust photos to different frame sizes',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'stitch',
      name: 'Stitch',
      description: 'Vertical or horizontal long photo stitching',
      icon: Scissors,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'templates',
      name: 'Templates',
      description: 'Pre-made frame or collage templates',
      icon: Grid3X3,
      color: 'from-orange-500 to-red-500'
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
      // Scroll to auth section
      document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
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
              From simple enhancements to complex designs, Dreamy makes it effortless.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => navigate('/collage')}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={login}
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
                >
                  Sign In
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

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Heart size={32} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Dreamy
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Dreamy Photo Frames is an AI-powered tool that empowers users to create, customize, and share stunning photo frames in seconds. Whether you're celebrating a special moment or designing social media visuals, Dreamy gives you creative freedom with ease.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ZapIcon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">Create beautiful frames in seconds with our intuitive AI</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
              <p className="text-gray-600 dark:text-gray-400">Smart suggestions and automatic enhancements</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Share2 size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400">Share your creations directly to social media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Dreamy's Templates and AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover powerful tools to transform your photos into stunning creations
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Modes Section - Only show if user is logged in */}
          {user && (
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 transition-colors duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Quick Start Modes</h3>
                <p className="text-gray-600 dark:text-gray-300">Jump straight into your preferred editing style</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickModes.map((mode) => {
                  const IconComponent = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleModeSelect(mode.id)}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 text-left"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{mode.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{mode.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Main Action Buttons for logged in users */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <button
                  onClick={() => handleModeSelect('collage')}
                  className="group relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LayoutGrid size={32} className="text-white" />
                    </div>
                    <ArrowRight size={24} className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Collage Maker</h2>
                  <p className="text-white/90">
                    Create beautiful photo collages with grid layouts, freestyle arrangements, and creative templates
                  </p>
                </button>

                <button
                  onClick={() => handleModeSelect('edit')}
                  className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wand2 size={32} className="text-white" />
                    </div>
                    <ArrowRight size={24} className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Photo Editor</h2>
                  <p className="text-white/90">
                    Enhance your photos with advanced editing tools, filters, and AI-powered features
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Authentication Section - Only show if user is not logged in */}
      {!user && (
        <section id="auth-section" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of users who are already creating stunning photos with Dreamy
            </p>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get Started Today</h3>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Sign in to access all features and save your creations
                </p>
                <Button 
                  onClick={login}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
                >
                  Sign In to Continue
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
      {user && <BottomNavBar />}
    </>
  );
};

export default Home;
