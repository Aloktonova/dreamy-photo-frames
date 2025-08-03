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
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Analysis Results:</h4>
        <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-32">
          {JSON.stringify(analysis.results, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        {/* Header */}
        <div className="pt-6 pb-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Media Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Analyze images and videos with Google Cloud Vision and Video Intelligence
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-24">
          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'image'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Image className="w-5 h-5" />
                Image Analysis
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Video className="w-5 h-5" />
                Video Analysis
              </button>
            </div>
          </div>

          {/* Image Analysis Tab */}
          {activeTab === 'image' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Image Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Analysis Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {imageAnalysisTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() => setSelectedAnalysisType(type.value)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedAnalysisType === type.value
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                            }`}
                          >
                            <IconComponent className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                            <div className="text-xs font-medium">{type.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing || !imageUrl.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Video Analysis Tab */}
          {activeTab === 'video' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Video Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Video URL</label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Analysis Features</label>
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
                            className="mr-2"
                          />
                          {feature.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyzeVideo}
                    disabled={isAnalyzing || !videoUrl.trim() || videoFeatures.length === 0}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Analyze Video
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResults.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <h3 className="text-xl font-semibold mb-4">Analysis History</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {analysisResults.map((result) => (
                  <div key={result.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {result.type === 'image' ? (
                          <Image className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Video className="w-4 h-4 text-purple-600" />
                        )}
                        <span className="text-sm font-medium">{result.analysisType}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(result.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      {result.createdAt.toLocaleString()}
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 truncate">
                      {result.mediaUrl}
                    </div>
                    
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                      result.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      result.status === 'analyzing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.status}
                    </div>
                    
                    {renderAnalysisResults(result)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavBar />
    </PageTransition>
  );
};

export default Explore;