
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
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
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import AuthBlock from './AuthBlock';
import Navbar from './Navbar';
import Footer from './Footer';
import { useToast } from '@/components/ui/use-toast';
import { useSignOut } from '@/hooks/useSignOut';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const signOut = useSignOut(() => setUser(null));

  const handleAuthenticated = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  const handleSignOut = signOut;

  useEffect(() => {
    if (user) {
      const name = user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.given_name || user.email?.split('@')[0] || user.email;
      toast({
        title: `Welcome back, ${name}!`,
        duration: 1500,
      });
    }
  }, [user, toast]);

  const features = [
    {
      icon: LayoutGrid,
      title: "Photo Collages",
      description: "Create stunning multi-photo layouts with our intuitive drag-and-drop editor"
    },
    {
      icon: Wand2,
      title: "AI Enhancement",
      description: "Automatically improve photo quality, remove backgrounds, and apply smart filters"
    },
    {
      icon: Palette,
      title: "Custom Frames",
      description: "Choose from hundreds of beautiful frames or create your own custom designs"
    },
    {
      icon: Download,
      title: "High-Quality Export",
      description: "Download your creations in high resolution for printing or sharing"
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
      <Navbar user={user} onLogout={handleSignOut} />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 text-sm text-gray-700 mb-6">
              <Sparkles size={16} className="text-purple-500" />
              Transform Your Photos with AI-Powered Tools
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Dreamy Photo Frames
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Create stunning photo collages, apply beautiful frames, and enhance your images with professional-grade tools. 
              Perfect for social media, printing, or preserving memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg rounded-full border-2 hover:bg-white/50"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">50K+</div>
                <div className="text-gray-600">Photos Enhanced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Frame Templates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Amazing Photos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple collages to professional photo editing, we've got all the tools you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Photos</h3>
              <p className="text-gray-600">Drag and drop your photos or click to browse from your device</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customize & Edit</h3>
              <p className="text-gray-600">Choose layouts, add frames, and enhance with our powerful tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Download & Share</h3>
              <p className="text-gray-600">Export in high quality and share directly to social media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Modes Section - Only show if user is logged in */}
      {user && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Quick Start Modes
              </h2>
              <p className="text-xl text-gray-600">
                Jump straight into your preferred editing style
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickModes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeSelect(mode.id)}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 text-left"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{mode.name}</h4>
                    <p className="text-sm text-gray-600">{mode.description}</p>
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
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Photographers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Dreamy Photo Frames
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Amazing tool! I use it for all my social media content. The AI enhancement features are incredible."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-500">Photographer</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The collage templates are perfect for creating family photo albums. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Mike R.</div>
                  <div className="text-sm text-gray-500">Designer</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Fast, intuitive, and the results are professional quality. Best photo editor I've used!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                  L
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">Lisa K.</div>
                  <div className="text-sm text-gray-500">Content Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already creating stunning photos with Dreamy Photo Frames
          </p>
          
          {!user ? (
            <div id="auth-section" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Get Started Today</h3>
              <AuthBlock onAuthenticated={handleAuthenticated} />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleModeSelect('collage')}
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg"
              >
                <LayoutGrid className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
