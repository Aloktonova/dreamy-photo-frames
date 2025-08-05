import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Video, 
  Upload, 
  Sparkles, 
  Palette, 
  Clock, 
  Download,
  Trash2,
  Play,
  Settings,
  Wand2,
  ArrowRight,
  Zap,
  Star,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  List,
  Search,
  TrendingUp,
  Award,
  Lightbulb,
  Camera,
  Film,
  Brush,
  Layers,
  AlertCircle,
  Crown,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavBar from '@/components/BottomNavBar';
import PageTransition from '@/components/PageTransition';
import { useGenerationLimits } from '@/hooks/useGenerationLimits';
import { GenerationLimitsDisplay } from '@/components/GenerationLimitsDisplay';
import { useToast } from '@/components/ui/use-toast';

interface GeneratedItem {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  style: string;
  url: string;
  createdAt: Date;
  status: 'generating' | 'completed' | 'failed';
  likes?: number;
  downloads?: number;
}

const Explore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [selectedImageStyle, setSelectedImageStyle] = useState('realistic');
  const [selectedVideoStyle, setSelectedVideoStyle] = useState('cinematic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLimits, setShowLimits] = useState(false);

  const { 
    limits, 
    loading: limitsLoading, 
    requestGeneration, 
    updateGenerationStatus,
    canGenerate,
    getRemaining
  } = useGenerationLimits();

  const imageStyles = [
    { value: 'realistic', label: 'Realistic', icon: Camera, color: 'from-blue-500 to-cyan-500' },
    { value: 'artistic', label: 'Artistic', icon: Palette, color: 'from-purple-500 to-pink-500' },
    { value: 'cartoon', label: 'Cartoon', icon: Sparkles, color: 'from-yellow-500 to-orange-500' },
    { value: 'abstract', label: 'Abstract', icon: Wand2, color: 'from-green-500 to-emerald-500' },
    { value: 'vintage', label: 'Vintage', icon: Clock, color: 'from-amber-500 to-yellow-500' },
    { value: 'modern', label: 'Modern', icon: Zap, color: 'from-indigo-500 to-purple-500' }
  ];

  const videoStyles = [
    { value: 'cinematic', label: 'Cinematic', icon: Film, color: 'from-red-500 to-pink-500' },
    { value: 'vintage', label: 'Vintage', icon: Clock, color: 'from-amber-500 to-yellow-500' },
    { value: 'modern', label: 'Modern', icon: Play, color: 'from-blue-500 to-cyan-500' },
    { value: 'artistic', label: 'Artistic', icon: Brush, color: 'from-purple-500 to-pink-500' },
    { value: 'documentary', label: 'Documentary', icon: Camera, color: 'from-gray-500 to-slate-500' },
    { value: 'experimental', label: 'Experimental', icon: Lightbulb, color: 'from-green-500 to-emerald-500' }
  ];

  // Check limits when tab changes
  useEffect(() => {
    if (user) {
      // This will be handled by the hook
    }
  }, [activeTab, user]);

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your image.",
        variant: "destructive"
      });
      return;
    }

    // Check if user can generate
    if (!canGenerate('image')) {
      toast({
        title: "Daily Limit Reached",
        description: "You've reached your daily image generation limit. Upgrade to Pro for unlimited generations.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await requestGeneration('image', imagePrompt, selectedImageStyle);
      
      if (result.success && result.generation_id) {
        const newItem: GeneratedItem = {
          id: result.generation_id,
          type: 'image',
          prompt: imagePrompt,
          style: selectedImageStyle,
          url: '/placeholder.svg',
          createdAt: new Date(),
          status: 'generating',
          likes: Math.floor(Math.random() * 50),
          downloads: Math.floor(Math.random() * 20)
        };

        setGeneratedItems(prev => [newItem, ...prev]);
        
        // Simulate generation process
        setTimeout(async () => {
          await updateGenerationStatus(result.generation_id!, 'completed', '/placeholder.svg');
          setGeneratedItems(prev => 
            prev.map(item => 
              item.id === result.generation_id 
                ? { ...item, status: 'completed' as const }
                : item
            )
          );
          setIsGenerating(false);
          
          toast({
            title: "Image Generated!",
            description: "Your AI-generated image is ready.",
          });
        }, 3000);
      } else {
        toast({
          title: "Generation Failed",
          description: result.error || "Failed to start generation.",
          variant: "destructive"
        });
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your video.",
        variant: "destructive"
      });
      return;
    }

    // Check if user can generate
    if (!canGenerate('video')) {
      toast({
        title: "Daily Limit Reached",
        description: "You've reached your daily video generation limit. Upgrade to Pro for unlimited generations.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await requestGeneration('video', videoPrompt, selectedVideoStyle);
      
      if (result.success && result.generation_id) {
        const newItem: GeneratedItem = {
          id: result.generation_id,
          type: 'video',
          prompt: videoPrompt,
          style: selectedVideoStyle,
          url: '/placeholder.svg',
          createdAt: new Date(),
          status: 'generating',
          likes: Math.floor(Math.random() * 50),
          downloads: Math.floor(Math.random() * 20)
        };

        setGeneratedItems(prev => [newItem, ...prev]);
        
        // Simulate generation process
        setTimeout(async () => {
          await updateGenerationStatus(result.generation_id!, 'completed', '/placeholder.svg');
          setGeneratedItems(prev => 
            prev.map(item => 
              item.id === result.generation_id 
                ? { ...item, status: 'completed' as const }
                : item
            )
          );
          setIsGenerating(false);
          
          toast({
            title: "Video Generated!",
            description: "Your AI-generated video is ready.",
          });
        }, 5000);
      } else {
        toast({
          title: "Generation Failed",
          description: result.error || "Failed to start generation.",
          variant: "destructive"
        });
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      setIsGenerating(false);
    }
  };

  const handleDownload = (item: GeneratedItem) => {
    console.log('Downloading:', item);
    toast({
      title: "Download Started",
      description: "Your file is being prepared for download.",
    });
  };

  const handleDelete = (itemId: string) => {
    setGeneratedItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Deleted",
      description: "The item has been removed from your history.",
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to Pro",
      description: "Redirecting to upgrade page...",
    });
    // Add upgrade logic here
  };

  const filteredItems = generatedItems.filter(item =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.style.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Please sign in to access AI-powered generation tools
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full">
            Sign In to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 pb-20">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Creative Studio
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Generate stunning images and videos with AI
                </p>
              </div>
              
              {/* Search and View Controls */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search creations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list' 
                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Limits Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLimits(!showLimits)}
                  className="flex items-center space-x-2"
                >
                  <Crown className="w-4 h-4" />
                  <span>Limits</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Limits Display */}
          {showLimits && (
            <div className="mb-8">
              <GenerationLimitsDisplay 
                generationType={activeTab} 
                onUpgrade={handleUpgrade}
              />
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-2xl p-2 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl transition-all duration-300 ${
                activeTab === 'image'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Image size={20} className="mr-3" />
              <span className="font-semibold">Generate Image</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl transition-all duration-300 ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Video size={20} className="mr-3" />
              <span className="font-semibold">Generate Video</span>
            </button>
          </div>

          {/* Generation Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                {activeTab === 'image' ? <Image className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generate AI {activeTab === 'image' ? 'Image' : 'Video'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Describe what you want to create and choose your style
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Describe your {activeTab === 'image' ? 'image' : 'video'}
                </label>
                <textarea
                  value={activeTab === 'image' ? imagePrompt : videoPrompt}
                  onChange={(e) => activeTab === 'image' ? setImagePrompt(e.target.value) : setVideoPrompt(e.target.value)}
                  placeholder={activeTab === 'image' 
                    ? "A serene mountain landscape at sunset with golden clouds and a flowing river..." 
                    : "A flowing river through a lush forest with birds flying overhead and gentle camera movement..."
                  }
                  className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Choose style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {(activeTab === 'image' ? imageStyles : videoStyles).map((style) => {
                    const IconComponent = style.icon;
                    const isSelected = activeTab === 'image' 
                      ? selectedImageStyle === style.value 
                      : selectedVideoStyle === style.value;
                    return (
                      <button
                        key={style.value}
                        onClick={() => activeTab === 'image' 
                          ? setSelectedImageStyle(style.value) 
                          : setSelectedVideoStyle(style.value)
                        }
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? `border-purple-500 bg-gradient-to-br ${style.color} text-white shadow-lg transform scale-105`
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md'
                        }`}
                      >
                        <IconComponent size={20} className="mb-2" />
                        <span className="text-sm font-medium">{style.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generation Limits Warning */}
              {!canGenerate(activeTab) && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">
                      Daily Limit Reached
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      You've used all your daily {activeTab} generations. Upgrade to Pro for unlimited access.
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={activeTab === 'image' ? handleGenerateImage : handleGenerateVideo}
                disabled={!((activeTab === 'image' ? imagePrompt : videoPrompt).trim()) || isGenerating || !canGenerate(activeTab)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-3 h-6 w-6 animate-spin" />
                    Generating {activeTab === 'image' ? 'Image' : 'Video'}...
                  </>
                ) : !canGenerate(activeTab) ? (
                  <>
                    <Lock className="mr-3 h-6 w-6" />
                    Limit Reached
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-6 w-6" />
                    Generate {activeTab === 'image' ? 'Image' : 'Video'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Generated Items History */}
          {filteredItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Creations
                  </h2>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'flex items-center space-x-4' : ''
                    }`}
                  >
                    <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                      <div className="relative">
                        <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center">
                          {item.type === 'image' ? (
                            <Image className="w-8 h-8 text-purple-600" />
                          ) : (
                            <Video className="w-8 h-8 text-purple-600" />
                          )}
                        </div>
                        {item.status === 'generating' && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex-1 ${viewMode === 'list' ? 'min-w-0' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {item.type === 'image' ? (
                            <Image size={16} className="text-purple-600 mr-2" />
                          ) : (
                            <Video size={16} className="text-purple-600 mr-2" />
                          )}
                          <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.status === 'completed' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownload(item)}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              >
                                <Download size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              >
                                <Share2 size={14} />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 font-medium">
                          {item.prompt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="capitalize font-medium">{item.style}</span>
                        <span>{item.createdAt.toLocaleDateString()}</span>
                      </div>
                      
                      {item.status === 'completed' && (
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Heart size={12} className="mr-1" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <Download size={12} className="mr-1" />
                              <span>{item.downloads}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {item.status === 'generating' && (
                        <div className="flex items-center text-purple-600">
                          <Sparkles size={14} className="animate-spin mr-2" />
                          <span className="text-sm font-medium">Generating...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && generatedItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Start Creating
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Generate your first AI-powered {activeTab === 'image' ? 'image' : 'video'} and see it appear here
              </p>
            </div>
          )}
        </div>

        <BottomNavBar />
      </div>
    </PageTransition>
  );
};

export default Explore; 