
import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import StyleManager from './StyleManager';
import { Download, RefreshCw } from 'lucide-react';
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
    // Clear photos when generating new layout
    setPhotos({});
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ background: currentTheme.colors.background }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className={`text-4xl ${currentTheme.fonts.heading} text-center mb-2`} style={{ color: currentTheme.colors.primary }}>
          ✨ Dreamy Photo Collage ✨
        </h1>
        <p className="text-lg font-clean text-gray-600 text-center mb-6">
          Create your perfect aesthetic photo collection with AI-powered styles
        </p>
        
        {/* Style Manager */}
        <StyleManager
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onGenerateLayout={generateNewLayout}
        />
        
        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={generateNewLayout}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 text-gray-700 hover:scale-105"
            style={{ backgroundColor: currentTheme.colors.cardBackground }}
          >
            <RefreshCw size={18} />
            <span className="font-clean text-sm">New Layout</span>
          </button>
          
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 text-gray-700 hover:scale-105">
            <Download size={18} />
            <span className="font-clean text-sm">Download</span>
          </button>
        </div>
      </div>

      {/* Collage Area */}
      <div 
        className="max-w-5xl mx-auto relative rounded-3xl shadow-soft p-12" 
        style={{ 
          height: '700px',
          backgroundColor: currentTheme.colors.cardBackground 
        }}
      >
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

        {/* Watermark */}
        <div className={`absolute bottom-4 right-6 ${currentTheme.fonts.caption} text-gray-400 text-sm`}>
          Made with ♡
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className={`${currentTheme.fonts.caption} text-gray-600 text-lg`}>
          💡 Tip: Choose a style theme, then click "AI Generate" for automatic layouts, or upload photos manually
        </p>
      </div>
    </div>
  );
};

export default PhotoCollage;
