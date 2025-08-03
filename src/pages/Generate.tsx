import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Video, 
  Sparkles, 
  Wand2, 
  Camera, 
  Film, 
  Palette,
  Clock,
  Download,
  Share2,
  Crown,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useGenerationLimits } from '@/hooks/useGenerationLimits';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/SeoHead';
import { toast } from 'sonner';

const imageStyles = [
  { value: 'realistic', label: 'Realistic', icon: Camera, description: 'Photorealistic images' },
  { value: 'artistic', label: 'Artistic', icon: Palette, description: 'Creative and stylized' },
  { value: 'cartoon', label: 'Cartoon', icon: Sparkles, description: 'Fun and animated' },
  { value: 'vintage', label: 'Vintage', icon: Clock, description: 'Classic retro look' }
];

const videoStyles = [
  { value: 'cinematic', label: 'Cinematic', icon: Film, description: 'Movie-like quality' },
  { value: 'documentary', label: 'Documentary', icon: Camera, description: 'Natural and authentic' },
  { value: 'artistic', label: 'Artistic', icon: Wand2, description: 'Creative expression' },
  { value: 'commercial', label: 'Commercial', icon: Sparkles, description: 'Professional advertising' }
];

const Generate = () => {
  const { user } = useAuth();
  const { limits, loading, checkLimits, requestGeneration } = useGenerationLimits();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);

  React.useEffect(() => {
    if (user) {
      checkLimits(activeTab);
    }
  }, [activeTab, user]);

  const handleGenerate = async () => {
    if (!user) {
      toast.error('Please sign in to generate media');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a prompt for generation');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await requestGeneration(activeTab, prompt, selectedStyle);
      
      if (result.success) {
        toast.success(`${activeTab === 'image' ? 'Image' : 'Video'} generation started!`);
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
    "description": "Generate stunning AI images and videos with advanced prompting",
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
          title="Generate AI Media"
          description="Create stunning images and videos with AI. Start generating with advanced prompting tools."
          structuredData={structuredData}
        />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center gap-2 justify-center">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                Authentication Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Please sign in to access the AI generation tools.
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
        title="Generate AI Media"
        description="Create stunning images and videos with AI. Start generating with advanced prompting tools."
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-pink-900/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-4">
              AI Media Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with our advanced AI technology
            </p>
          </motion.div>

          {/* Usage Limits Display */}
          {limits && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto mb-8"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-500" />
                      <span className="font-medium">{limits.planType} Plan</span>
                    </div>
                    <Badge variant={limits.remaining > 0 ? "default" : "destructive"}>
                      {limits.remaining} / {limits.maxCount} remaining
                    </Badge>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(limits.remaining / limits.maxCount) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tab Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-background rounded-xl p-1 shadow-lg border">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'image'
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Image className="w-5 h-5" />
                Image Generation
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Video className="w-5 h-5" />
                Video Generation
              </button>
            </div>
          </motion.div>

          {/* Generation Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {activeTab === 'image' ? <Image className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                  {activeTab === 'image' ? 'Image' : 'Video'} Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe what you want to create
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`Describe your ${activeTab} in detail... (e.g., "A majestic sunset over a calm ocean with sailing boats")`}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Be descriptive and specific for better results
                  </p>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Choose a style
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(activeTab === 'image' ? imageStyles : videoStyles).map((style) => {
                      const IconComponent = style.icon;
                      return (
                        <button
                          key={style.value}
                          onClick={() => setSelectedStyle(style.value)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedStyle === style.value
                              ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                              : 'border-border hover:border-violet-300'
                          }`}
                        >
                          <IconComponent className={`w-6 h-6 mb-2 ${
                            selectedStyle === style.value ? 'text-violet-600' : 'text-muted-foreground'
                          }`} />
                          <h3 className="font-medium">{style.label}</h3>
                          <p className="text-sm text-muted-foreground">{style.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim() || (limits && limits.remaining <= 0)}
                    size="lg"
                    className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white px-8"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 mr-2" />
                        Generate {activeTab === 'image' ? 'Image' : 'Video'}
                      </>
                    )}
                  </Button>
                </div>

                {limits && limits.remaining <= 0 && (
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      Daily generation limit reached
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Upgrade to Pro for unlimited generations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Generate;