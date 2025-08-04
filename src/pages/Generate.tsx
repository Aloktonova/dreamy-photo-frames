import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Lock, 
  ChevronDown,
  Settings,
  ArrowRight,
  X,
  Crown,
  AlertCircle,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useGenerationLimits } from '@/hooks/useGenerationLimits';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/SeoHead';
import { toast } from 'sonner';

type GenerationMode = 'text-to-video' | 'frames-to-video' | 'ingredients-to-video';

const generationModes = [
  {
    id: 'text-to-video' as GenerationMode,
    label: 'Text to Video',
    icon: FileText,
    description: 'Generate video from text description',
    enabled: true
  },
  {
    id: 'frames-to-video' as GenerationMode,
    label: 'Frames to Video',
    icon: Image,
    description: 'Create video from image frames',
    enabled: true
  },
  {
    id: 'ingredients-to-video' as GenerationMode,
    label: 'Ingredients to Video',
    icon: Lock,
    description: 'Advanced video composition',
    enabled: false
  }
];

const Generate = () => {
  const { user } = useAuth();
  const { limits, loading, checkLimits, requestGeneration } = useGenerationLimits();
  const [selectedMode, setSelectedMode] = useState<GenerationMode>('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('veo-3-fast');
  const [isGenerating, setIsGenerating] = useState(false);

  React.useEffect(() => {
    if (user) {
      checkLimits('video');
    }
  }, [user]);

  const handleGenerate = async () => {
    if (!user) {
      toast.error('Please sign in to generate videos');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a prompt for generation');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await requestGeneration('video', prompt, selectedModel);
      
      if (result.success) {
        toast.success('Video generation started!');
        setPrompt('');
      } else {
        toast.error(result.error || 'Generation failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MediaGen AI - Generate",
    "description": "Generate stunning AI videos with advanced prompting using Veo technology",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "applicationCategory": "MediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  if (!user) {
    return (
      <Layout>
        <SeoHead 
          title="Generate AI Videos"
          description="Create stunning videos with AI. Advanced video generation with Veo technology."
          structuredData={structuredData}
        />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2 justify-center text-white">
                <AlertCircle className="w-6 h-6 text-amber-400" />
                Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white/80 mb-4">
                Please sign in to access the AI video generation tools.
              </p>
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SeoHead 
        title="Generate AI Videos"
        description="Create stunning videos with AI. Advanced video generation with Veo technology."
        structuredData={structuredData}
      />
      
      {/* Full-screen dark background */}
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 py-8 h-screen flex flex-col lg:flex-row gap-8">
          
          {/* Mode Selector - Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-80 w-full"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 h-fit">
              <h2 className="text-lg font-semibold mb-6 text-white/90">Choose Mode</h2>
              
              <div className="space-y-3">
                {generationModes.map((mode) => {
                  const IconComponent = mode.icon;
                  const isSelected = selectedMode === mode.id;
                  const isDisabled = !mode.enabled;
                  
                  return (
                    <motion.button
                      key={mode.id}
                      onClick={() => mode.enabled && setSelectedMode(mode.id)}
                      disabled={isDisabled}
                      whileHover={mode.enabled ? { scale: 1.02 } : {}}
                      whileTap={mode.enabled ? { scale: 0.98 } : {}}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden ${
                        isSelected && mode.enabled
                          ? 'bg-blue-500/30 border-blue-400/50 shadow-lg shadow-blue-500/20'
                          : mode.enabled
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Glassmorphism overlay for selected state */}
                      {isSelected && mode.enabled && (
                        <motion.div
                          layoutId="selectedMode"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className="relative z-10 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected && mode.enabled ? 'bg-blue-400/30' : 'bg-white/10'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            isDisabled ? 'text-white/40' : isSelected ? 'text-blue-300' : 'text-white/70'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              isDisabled ? 'text-white/40' : 'text-white'
                            }`}>
                              {mode.label}
                            </h3>
                            {isSelected && mode.enabled && (
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-sm ${
                            isDisabled ? 'text-white/30' : 'text-white/60'
                          }`}>
                            {mode.description}
                          </p>
                        </div>
                        
                        {isDisabled && (
                          <Lock className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Prompt Panel - Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 flex flex-col"
          >
            {/* Top Bar */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mode Chip */}
                  <div className="flex items-center gap-2 bg-blue-500/20 rounded-full px-4 py-2 border border-blue-400/30">
                    <span className="text-sm font-medium text-blue-300">
                      {generationModes.find(m => m.id === selectedMode)?.label}
                    </span>
                    <button 
                      onClick={() => setSelectedMode('text-to-video')}
                      className="text-blue-300 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Model Selector */}
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
                      <SelectValue />
                      <ChevronDown className="w-4 h-4" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="veo-3-fast" className="text-white hover:bg-white/10">
                        Veo 3 - Fast
                      </SelectItem>
                      <SelectItem value="veo-3-pro" className="text-white hover:bg-white/10">
                        Veo 3 - Pro
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Settings Button */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Main Prompt Area */}
            <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <div className="h-full flex flex-col">
                {/* Usage Limits */}
                {limits && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-amber-400" />
                        <span className="font-medium text-white">{limits.planType} Plan</span>
                      </div>
                      <Badge 
                        variant={limits.remaining > 0 ? "default" : "destructive"}
                        className="bg-white/10 text-white border-white/20"
                      >
                        {limits.remaining} / {limits.maxCount} remaining
                      </Badge>
                    </div>
                  </motion.div>
                )}

                {/* Prompt Input */}
                <div className="flex-1 flex flex-col">
                  <label className="text-sm text-white/70 mb-3">
                    Describe your video
                  </label>
                  
                  <div className="flex-1 flex">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Generate a video with text..."
                      className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 text-lg h-14 rounded-l-xl rounded-r-none focus:ring-2 focus:ring-blue-400/50"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleGenerate();
                        }
                      }}
                    />
                    
                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim() || (limits && limits.remaining <= 0)}
                      className="h-14 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-r-xl rounded-l-none border-l-0 transition-all duration-300 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Video className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Generation Status */}
                  {limits && limits.remaining <= 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-amber-500/20 rounded-xl border border-amber-400/30"
                    >
                      <p className="text-amber-300 font-medium text-center">
                        Daily generation limit reached
                      </p>
                      <p className="text-sm text-amber-200 text-center mt-1">
                        Upgrade to Pro for unlimited generations
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Generate;