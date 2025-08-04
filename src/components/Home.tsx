import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap as ZapIcon,
  ArrowUpRight,
  Clock,
  Shield,
  Smartphone,
  Globe,
  Award,
  TrendingUp,
  Lightbulb,
  Palette as PaletteIcon,
  Frame,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from './Layout';
import { SeoHead } from './SeoHead';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const { toast } = useToast();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const prevUserRef = React.useRef<any>(null);

  useEffect(() => {
    if (user && !hasWelcomed && !prevUserRef.current) {
      const name = user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.given_name || user.email?.split('@')[0] || user.email;
      toast({
        title: `Welcome back, ${name}!`,
        duration: 2000,
        className: 'animate-fade-in-up',
      });
      setHasWelcomed(true);
    }
    prevUserRef.current = user;
  }, [user, toast, hasWelcomed]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const mainFeatures = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Filters",
      description: "Transform your photos with intelligent AI filters that enhance colors, lighting, and composition automatically.",
      color: "from-pink-500 to-purple-600",
      bgColor: "from-pink-50 to-purple-50",
      darkBgColor: "from-pink-900/20 to-purple-900/20"
    },
    {
      icon: Frame,
      title: "Smart Frames",
      description: "Choose from hundreds of beautiful frames that automatically adapt to your photo's style and composition.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-900/20 to-cyan-900/20"
    },
    {
      icon: Share2,
      title: "One-Click Share",
      description: "Share your creations instantly to all major social media platforms with beautiful previews.",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-900/20 to-emerald-900/20"
    }
  ];

  const stats = [
    { number: "2M+", label: "Photos Enhanced", icon: ImageIcon },
    { number: "500K+", label: "Happy Users", icon: Users },
    { number: "50+", label: "AI Filters", icon: Sparkles },
    { number: "100+", label: "Frame Styles", icon: Frame }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Photographer",
      content: "The AI filters are incredible! My photos look professional in seconds.",
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      content: "Perfect for social media. The frames make my posts stand out.",
      avatar: "👨‍💻"
    },
    {
      name: "Emma Davis",
      role: "Designer",
      content: "Love the variety of styles. It's like having a professional editor.",
      avatar: "👩‍🎨"
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate('/collage');
    } else {
      navigate('/collage');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <Layout showSidebar={false}>
      <SeoHead 
        title="MediaGen AI - Advanced AI Media Generation & Analysis"
        description="Create stunning AI-generated images and videos. Analyze media content with Google Cloud Vision and Video Intelligence. Free daily generations included."
        keywords="AI media generation, image generation, video generation, photo frames, collages, AI filters, Google Cloud Vision"
      />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
          <motion.div 
            className="absolute top-20 left-20 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 4
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered Photo Enhancement</span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Transform Your
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Photos with AI
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8"
            variants={itemVariants}
          >
            Create stunning photo frames and collages with our advanced AI-powered tools. 
            Enhance, frame, and share your memories in seconds.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {!user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={login}
                  variant="outline"
                  size="lg" 
                  className="px-8 py-4 text-lg rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300"
                >
                  Sign In
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Creative Freedom</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to create stunning photo compositions with AI assistance
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = index === activeFeature;
              return (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  whileHover="hover"
                  className={`relative group cursor-pointer ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} dark:${feature.darkBgColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={isActive ? { opacity: 0.3 } : { opacity: 0 }}
                  />
                  <motion.div 
                    className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 ${
                      isActive ? 'shadow-2xl border-purple-200 dark:border-purple-700' : 'hover:shadow-xl'
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">{feature.description}</p>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          className="mt-6 flex justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((dot) => (
                              <motion.div
                                key={dot}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  dot === activeFeature ? 'bg-purple-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                animate={dot === activeFeature ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Loved by
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Creators</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our users are saying about their experience
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="text-4xl mr-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{testimonial.content}</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Photos?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators who are already using our AI-powered tools
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Creating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

    </Layout>
  );
};

export default Home;
