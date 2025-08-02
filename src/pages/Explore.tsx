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
<<<<<<< HEAD
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
=======
  Eye,
  Shield,
  FileText,
  Search
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavBar from '@/components/BottomNavBar';
import PageTransition from '@/components/PageTransition';
<<<<<<< HEAD
import { useGenerationLimits } from '@/hooks/useGenerationLimits';
import { GenerationLimitsDisplay } from '@/components/GenerationLimitsDisplay';
import { useToast } from '@/components/ui/use-toast';
=======
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844

interface AnalysisResult {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  analysisType: string;
  results: any;
  status: 'analyzing' | 'completed' | 'failed';
  createdAt: Date;
<<<<<<< HEAD
  status: 'generating' | 'completed' | 'failed';
  likes?: number;
  downloads?: number;
=======
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
}

const Explore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
<<<<<<< HEAD
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
=======
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('LABEL_DETECTION');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [videoFeatures, setVideoFeatures] = useState(['LABEL_DETECTION']);

  const imageAnalysisTypes = [
    { value: 'LABEL_DETECTION', label: 'Label Detection', icon: Eye },
    { value: 'SAFE_SEARCH_DETECTION', label: 'Safe Search', icon: Shield },
    { value: 'TEXT_DETECTION', label: 'Text Recognition', icon: FileText },
    { value: 'OBJECT_LOCALIZATION', label: 'Object Detection', icon: Search }
  ];

  const videoAnalysisFeatures = [
    { value: 'LABEL_DETECTION', label: 'Scene Labels' },
    { value: 'EXPLICIT_CONTENT_DETECTION', label: 'Safe Content' },
    { value: 'SPEECH_TRANSCRIPTION', label: 'Transcription' }
  ];

  // Load previous analysis results
  useEffect(() => {
    const loadAnalysisHistory = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('media_analysis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        const formattedResults = data.map(item => ({
          id: item.id,
          type: item.media_type as 'image' | 'video',
          mediaUrl: item.media_url || '',
          analysisType: item.analysis_type,
          results: item.results,
          status: 'completed' as const,
          createdAt: new Date(item.created_at)
        }));
        setAnalysisResults(formattedResults);
      }
    };

    loadAnalysisHistory();
  }, [user]);

  const handleAnalyzeImage = async () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }
    
    setIsAnalyzing(true);
    const newAnalysis: AnalysisResult = {
      id: Date.now().toString(),
      type: 'image',
      mediaUrl: imageUrl,
      analysisType: selectedAnalysisType,
      results: null,
      status: 'analyzing',
      createdAt: new Date()
    };

    setAnalysisResults(prev => [newAnalysis, ...prev]);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: {
          imageUrl,
          analysisType: selectedAnalysisType
        }
      });

      if (error) {
        throw error;
      }

      setAnalysisResults(prev => 
        prev.map(item => 
          item.id === newAnalysis.id 
            ? { ...item, status: 'completed', results: data }
            : item
        )
      );
      
      toast.success('Image analysis completed!');
      
    } catch (error: any) {
      console.error('Image analysis error:', error);
      toast.error(error.message || 'Failed to analyze image');
      
      setAnalysisResults(prev => 
        prev.map(item => 
          item.id === newAnalysis.id 
            ? { ...item, status: 'failed' }
            : item
        )
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeVideo = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }
    
    setIsAnalyzing(true);
    const newAnalysis: AnalysisResult = {
      id: Date.now().toString(),
      type: 'video',
      mediaUrl: videoUrl,
      analysisType: videoFeatures.join(','),
      results: null,
      status: 'analyzing',
      createdAt: new Date()
    };

    setAnalysisResults(prev => [newAnalysis, ...prev]);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-video', {
        body: {
          videoUrl,
          features: videoFeatures
        }
      });

      if (error) {
        throw error;
      }

      setAnalysisResults(prev => 
        prev.map(item => 
          item.id === newAnalysis.id 
            ? { ...item, status: 'analyzing', results: data }
            : item
        )
      );
      
      toast.success('Video analysis started! This may take several minutes.');
      
    } catch (error: any) {
      console.error('Video analysis error:', error);
      toast.error(error.message || 'Failed to analyze video');
      
      setAnalysisResults(prev => 
        prev.map(item => 
          item.id === newAnalysis.id 
            ? { ...item, status: 'failed' }
            : item
        )
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = (itemId: string) => {
    setAnalysisResults(prev => prev.filter(item => item.id !== itemId));
  };

  const renderAnalysisResults = (analysis: AnalysisResult) => {
    if (!analysis.results || analysis.status !== 'completed') return null;

    if (analysis.type === 'image') {
      const responses = analysis.results.responses?.[0];
      
      if (analysis.analysisType === 'LABEL_DETECTION' && responses?.labelAnnotations) {
        return (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Labels:</h4>
            <div className="flex flex-wrap gap-1">
              {responses.labelAnnotations.slice(0, 5).map((label: any, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs">
                  {label.description} ({Math.round(label.score * 100)}%)
                </span>
              ))}
            </div>
          </div>
        );
      }
      
      if (analysis.analysisType === 'TEXT_DETECTION' && responses?.textAnnotations) {
        return (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Detected Text:</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
              {responses.textAnnotations[0]?.description || 'No text detected'}
            </p>
          </div>
        );
      }
      
      if (analysis.analysisType === 'SAFE_SEARCH_DETECTION' && responses?.safeSearchAnnotation) {
        const safeSearch = responses.safeSearchAnnotation;
        return (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Safety Analysis:</h4>
            <div className="text-xs space-y-1">
              <div>Adult: {safeSearch.adult}</div>
              <div>Violence: {safeSearch.violence}</div>
              <div>Racy: {safeSearch.racy}</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="mt-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">Analysis completed</p>
      </div>
    );
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
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
<<<<<<< HEAD
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
=======
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Media Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Analyze images and videos with Google Cloud AI
            </p>
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
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
<<<<<<< HEAD
              <Image size={20} className="mr-3" />
              <span className="font-semibold">Generate Image</span>
=======
              <Image size={20} className="mr-2" />
              Analyze Image
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl transition-all duration-300 ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
<<<<<<< HEAD
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
=======
              <Video size={20} className="mr-2" />
              Analyze Video
            </button>
          </div>

          {/* Image Analysis */}
          {activeTab === 'image' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Analyze Image with AI
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Analysis Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imageAnalysisTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setSelectedAnalysisType(type.value)}
                          className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                            selectedAnalysisType === type.value
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <IconComponent size={16} className="mr-2" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyzeImage}
                  disabled={!imageUrl.trim() || isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-5 w-5" />
                      Analyze Image
                    </>
                  )}
                </Button>
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
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

<<<<<<< HEAD
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
=======
          {/* Video Analysis */}
          {activeTab === 'video' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Analyze Video with AI
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Video URL (Google Cloud Storage)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="gs://your-bucket/video.mp4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
                </div>
              </div>

<<<<<<< HEAD
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
=======
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Analysis Features
                  </label>
                  <div className="space-y-2">
                    {videoAnalysisFeatures.map((feature) => (
                      <label key={feature.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={videoFeatures.includes(feature.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setVideoFeatures(prev => [...prev, feature.value]);
                            } else {
                              setVideoFeatures(prev => prev.filter(f => f !== feature.value));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {feature.label}
                        </span>
                      </label>
                    ))}
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
                  </div>
                </div>
              )}

<<<<<<< HEAD
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
=======
                <Button
                  onClick={handleAnalyzeVideo}
                  disabled={!videoUrl.trim() || isAnalyzing || videoFeatures.length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-5 w-5" />
                      Analyze Video
                    </>
                  )}
                </Button>
              </div>
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
            </div>
          </div>

<<<<<<< HEAD
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
=======
          {/* Analysis Results History */}
          {analysisResults.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Analysis Results
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResults.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {analysis.type === 'image' ? (
                          <Image size={16} className="text-purple-600 mr-2" />
                        ) : (
                          <Video size={16} className="text-purple-600 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {analysis.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(analysis.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {analysis.mediaUrl}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="capitalize">{analysis.analysisType.replace('_', ' ')}</span>
                      <span>{analysis.createdAt.toLocaleDateString()}</span>
                    </div>
                    
                    {analysis.status === 'analyzing' && (
                      <div className="mt-3 flex items-center text-purple-600">
                        <Sparkles size={14} className="animate-spin mr-2" />
                        <span className="text-sm">Analyzing...</span>
                      </div>
                    )}

                    {analysis.status === 'failed' && (
                      <div className="mt-3 flex items-center text-red-600">
                        <span className="text-sm">Analysis failed</span>
                      </div>
                    )}

                    {renderAnalysisResults(analysis)}
>>>>>>> b0da8ffc3b0dc730d5cd49b1987c3e8b652ce844
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