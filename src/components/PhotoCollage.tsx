
import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import StyleManager from './StyleManager';
import { Download, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { aiLayoutGenerator } from './AILayoutGenerator';

const PhotoCollage = () => {
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[1]); // Start with scrapbook theme
  const [layout, setLayout] = useState(() => aiLayoutGenerator.generateCollageLayout());

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
    const newLayout = aiLayoutGenerator.generateCollageLayout();
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
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-8 pt-12 pb-8">
          <div className="text-center mb-8">
            <h1 className={`text-5xl ${currentTheme.fonts.heading} font-bold mb-3`} style={{ color: currentTheme.colors.primary }}>
              📸 Memory Collage Maker
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Create beautiful photo collages with authentic polaroid style
            </p>
          </div>
          
          {/* Style Manager */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/50">
            <StyleManager
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onGenerateLayout={generateNewLayout}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={generateNewLayout}
              className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <RefreshCw size={18} />
              <span className="font-medium text-gray-700">New Layout</span>
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50">
              <Download size={18} />
              <span className="font-medium text-gray-700">Download</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50">
              <Sparkles size={18} />
              <span className="font-medium text-gray-700">Magic Layout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Collage Area */}
      <div className="max-w-5xl mx-auto px-8 pb-16">
        <div 
          className="relative rounded-3xl p-12 shadow-2xl" 
          style={{ 
            height: '700px',
            background: currentTheme.colors.cardBackground,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Central decorative heart (like in reference images) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Heart 
              size={48} 
              className="text-pink-300 fill-pink-200" 
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            />
          </div>

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

          {/* Subtle corner decorations */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-pink-200 rounded-full opacity-50"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-200 rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-4xl mx-auto px-8 pb-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
          <p className={`${currentTheme.fonts.caption} text-gray-700 text-lg`}>
            💡 Click on frames to add photos • Add captions by clicking below images • Try different themes for various moods
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoCollage;
