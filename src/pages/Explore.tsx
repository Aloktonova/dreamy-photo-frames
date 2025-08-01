import React, { useState } from 'react';
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
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavBar from '@/components/BottomNavBar';
import PageTransition from '@/components/PageTransition';

interface GeneratedItem {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  style: string;
  url: string;
  createdAt: Date;
  status: 'generating' | 'completed' | 'failed';
}

const Explore = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [selectedImageStyle, setSelectedImageStyle] = useState('realistic');
  const [selectedVideoStyle, setSelectedVideoStyle] = useState('cinematic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);

  const imageStyles = [
    { value: 'realistic', label: 'Realistic', icon: Image },
    { value: 'artistic', label: 'Artistic', icon: Palette },
    { value: 'cartoon', label: 'Cartoon', icon: Sparkles },
    { value: 'abstract', label: 'Abstract', icon: Wand2 }
  ];

  const videoStyles = [
    { value: 'cinematic', label: 'Cinematic', icon: Video },
    { value: 'vintage', label: 'Vintage', icon: Clock },
    { value: 'modern', label: 'Modern', icon: Play },
    { value: 'artistic', label: 'Artistic', icon: Palette }
  ];

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    const newItem: GeneratedItem = {
      id: Date.now().toString(),
      type: 'image',
      prompt: imagePrompt,
      style: selectedImageStyle,
      url: '/placeholder.svg', // Placeholder
      createdAt: new Date(),
      status: 'generating'
    };

    setGeneratedItems(prev => [newItem, ...prev]);
    
    // Simulate generation process
    setTimeout(() => {
      setGeneratedItems(prev => 
        prev.map(item => 
          item.id === newItem.id 
            ? { ...item, status: 'completed' as const }
            : item
        )
      );
      setIsGenerating(false);
    }, 3000);
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) return;
    
    setIsGenerating(true);
    const newItem: GeneratedItem = {
      id: Date.now().toString(),
      type: 'video',
      prompt: videoPrompt,
      style: selectedVideoStyle,
      url: '/placeholder.svg', // Placeholder
      createdAt: new Date(),
      status: 'generating'
    };

    setGeneratedItems(prev => [newItem, ...prev]);
    
    // Simulate generation process
    setTimeout(() => {
      setGeneratedItems(prev => 
        prev.map(item => 
          item.id === newItem.id 
            ? { ...item, status: 'completed' as const }
            : item
        )
      );
      setIsGenerating(false);
    }, 5000);
  };

  const handleDownload = (item: GeneratedItem) => {
    // Implement download functionality
    console.log('Downloading:', item);
  };

  const handleDelete = (itemId: string) => {
    setGeneratedItems(prev => prev.filter(item => item.id !== itemId));
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
              Explore Creative Tools
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Generate stunning images and videos with AI
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
              Generate Image
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
              Generate Video
            </button>
          </div>

          {/* Image Generation */}
          {activeTab === 'image' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate AI Image
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe your image
                  </label>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="A serene mountain landscape at sunset with golden clouds..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imageStyles.map((style) => {
                      const IconComponent = style.icon;
                      return (
                        <button
                          key={style.value}
                          onClick={() => setSelectedImageStyle(style.value)}
                          className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                            selectedImageStyle === style.value
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <IconComponent size={16} className="mr-2" />
                          <span className="text-sm font-medium">{style.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateImage}
                  disabled={!imagePrompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Video Generation */}
          {activeTab === 'video' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate AI Video
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe your video
                  </label>
                  <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="A flowing river through a lush forest with birds flying overhead..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {videoStyles.map((style) => {
                      const IconComponent = style.icon;
                      return (
                        <button
                          key={style.value}
                          onClick={() => setSelectedVideoStyle(style.value)}
                          className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
                            selectedVideoStyle === style.value
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          <IconComponent size={16} className="mr-2" />
                          <span className="text-sm font-medium">{style.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateVideo}
                  disabled={!videoPrompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Video
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Generated Items History */}
          {generatedItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generated Items
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        {item.type === 'image' ? (
                          <Image size={16} className="text-purple-600 mr-2" />
                        ) : (
                          <Video size={16} className="text-purple-600 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.status === 'completed' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(item)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Download size={14} />
                          </Button>
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
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="capitalize">{item.style}</span>
                      <span>{item.createdAt.toLocaleDateString()}</span>
                    </div>
                    
                    {item.status === 'generating' && (
                      <div className="mt-3 flex items-center text-purple-600">
                        <Sparkles size={14} className="animate-spin mr-2" />
                        <span className="text-sm">Generating...</span>
                      </div>
                    )}
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