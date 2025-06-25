
import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import StyleManager from './StyleManager';
import { Download, RefreshCw, Sparkles } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { aiLayoutGenerator } from './AILayoutGenerator';

const PhotoCollage = () => {
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [layout, setLayout] = useState(() => aiLayoutGenerator.generateLayout());

  const handleImageUpload = (frameId: string, file: File) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], file }
    }));
  };

  const handleCaptionChange = (frameId: string, caption: string) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], caption }
    }));
  };

  const generateNewLayout = () => {
    const newLayout = aiLayoutGenerator.generateLayout();
    setLayout(newLayout);
    setPhotos({});
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ background: currentTheme.colors.background }}
    >
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-8 pt-16 pb-12">
          <div className="text-center mb-12">
            <h1 className={`text-6xl ${currentTheme.fonts.heading} modern-title font-bold mb-4`}>
              ✨ Dreamy Collage Studio ✨
            </h1>
            <p className="text-xl elegant-subtitle max-w-2xl mx-auto leading-relaxed">
              Craft stunning photo memories with AI-powered layouts and beautiful aesthetic themes
            </p>
          </div>
          
          {/* Enhanced Style Manager */}
          <div className="glass-morphism rounded-3xl p-6 mb-8 modern-shadow">
            <StyleManager
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onGenerateLayout={generateNewLayout}
            />
          </div>
          
          {/* Modern Action Buttons */}
          <div className="flex justify-center gap-6 mb-12">
            <button 
              onClick={generateNewLayout}
              className="modern-button flex items-center gap-3 px-8 py-4 rounded-2xl text-gray-700 hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: currentTheme.colors.cardBackground }}
            >
              <RefreshCw size={20} />
              <span className="font-medium">New Layout</span>
            </button>
            
            <button className="modern-button flex items-center gap-3 px-8 py-4 rounded-2xl text-gray-700 hover:scale-105 transition-all duration-300">
              <Download size={20} />
              <span className="font-medium">Download</span>
            </button>

            <button className="modern-button flex items-center gap-3 px-8 py-4 rounded-2xl text-gray-700 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Sparkles size={20} />
              <span className="font-medium">AI Magic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Collage Area */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <div 
          className="relative rounded-3xl luxury-shadow p-16 modern-gradient backdrop-blur-sm" 
          style={{ 
            height: '800px',
            backgroundColor: currentTheme.colors.cardBackground 
          }}
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${currentTheme.colors.primary} 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Decorative elements */}
          {layout.decorativeElements.map((element, index) => (
            <DecorativeElement
              key={`decoration-${index}`}
              type={element.type}
              position={element.position}
              rotation={element.rotation}
              color={currentTheme.decorativeElements[`${element.type}Colors`][index % currentTheme.decorativeElements[`${element.type}Colors`].length]}
              size={element.size}
            />
          ))}

          {/* Photo frames */}
          {layout.frames.map((frame) => (
            <PhotoFrame
              key={frame.id}
              id={frame.id}
              rotation={frame.rotation}
              position={frame.position}
              size={frame.size}
              caption={photos[frame.id]?.caption || ""}
              onImageUpload={handleImageUpload}
              onCaptionChange={handleCaptionChange}
              theme={currentTheme}
            />
          ))}

          {/* Enhanced watermark */}
          <div className={`absolute bottom-6 right-8 ${currentTheme.fonts.caption} text-gray-400 text-sm font-light tracking-wide`}>
            Crafted with ♡ in Collage Studio
          </div>
        </div>
      </div>

      {/* Modern Tips Section */}
      <div className="max-w-5xl mx-auto px-8 pb-16">
        <div className="glass-morphism rounded-3xl p-8 text-center modern-shadow">
          <h3 className={`${currentTheme.fonts.heading} text-2xl font-semibold mb-4`} style={{ color: currentTheme.colors.primary }}>
            💡 Pro Tips
          </h3>
          <p className={`${currentTheme.fonts.caption} text-gray-600 text-lg leading-relaxed`}>
            Choose your perfect aesthetic theme • Click "AI Magic" for instant layouts • Upload photos and add captions • Download your masterpiece
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoCollage;
