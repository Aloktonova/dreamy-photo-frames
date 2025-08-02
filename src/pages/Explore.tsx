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
  Eye,
  Shield,
  FileText,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavBar from '@/components/BottomNavBar';
import PageTransition from '@/components/PageTransition';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AnalysisResult {
  id: string;
  type: 'image' | 'video';
  mediaUrl: string;
  analysisType: string;
  results: any;
  status: 'analyzing' | 'completed' | 'failed';
  createdAt: Date;
}

const Explore = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
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
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to access creative tools
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our AI-powered image and video generation tools
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Media Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Analyze images and videos with Google Cloud AI
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 mb-8 shadow-sm">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'image'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Image size={20} className="mr-2" />
              Analyze Image
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
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
              </div>
            </div>
          )}

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
                </div>

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
                  </div>
                </div>

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
            </div>
          )}

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
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <BottomNavBar />
      </div>
    </PageTransition>
  );
};

export default Explore; 