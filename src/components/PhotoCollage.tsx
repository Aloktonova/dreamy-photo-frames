import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import StyleManager from './StyleManager';
import FrameCustomizationPanel from './FrameCustomizationPanel';
import BackgroundCustomizationPanel from './BackgroundCustomizationPanel';
import InteractiveStickerPanel from './InteractiveStickerPanel';
import { Download, RefreshCw, Sparkles, Heart, Settings, Image, Undo, Redo } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { aiLayoutGenerator } from './AILayoutGenerator';

const PhotoCollage = () => {
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[1]);
  const [layout, setLayout] = useState(() => aiLayoutGenerator.generateCollageLayout());
  const [customBackground, setCustomBackground] = useState<string>(currentTheme.colors.background);
  const [frameCustomizationOpen, setFrameCustomizationOpen] = useState(false);
  const [backgroundCustomizationOpen, setBackgroundCustomizationOpen] = useState(false);
  const [stickerPanelOpen, setStickerPanelOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [customStickers, setCustomStickers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const generateNewLayout = () => {
    const newLayout = aiLayoutGenerator.generateCollageLayout();
    setLayout(newLayout);
    setPhotos({});
    saveToHistory();
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    setCustomBackground(theme.colors.background);
    saveToHistory();
  };

  const saveToHistory = () => {
    const currentState = {
      photos,
      layout,
      customBackground,
      customStickers,
      currentTheme
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setPhotos(previousState.photos);
      setLayout(previousState.layout);
      setCustomBackground(previousState.customBackground);
      setCustomStickers(previousState.customStickers);
      setCurrentTheme(previousState.currentTheme);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setPhotos(nextState.photos);
      setLayout(nextState.layout);
      setCustomBackground(nextState.customBackground);
      setCustomStickers(nextState.customStickers);
      setCurrentTheme(nextState.currentTheme);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleFrameCustomization = (frameId: string) => {
    setSelectedFrame(frameId);
    setFrameCustomizationOpen(true);
  };

  const handleAddSticker = (sticker: any) => {
    setCustomStickers(prev => [...prev, { ...sticker, id: Date.now() }]);
    setStickerPanelOpen(false);
    saveToHistory();
  };

  const handleImageUpload = (frameId: string, file: File) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], file }
    }));
    saveToHistory();
  };

  const handleCaptionChange = (frameId: string, caption: string) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], caption }
    }));
    saveToHistory();
  };

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ background: customBackground }}
    >
      {/* Enhanced Header */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className={`text-3xl sm:text-5xl ${currentTheme.fonts.heading} font-bold mb-3`} style={{ color: currentTheme.colors.primary }}>
              ✨ Turn Memories Into Magic
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Dreamy Frames for Every Story — Create beautiful photo collages with authentic polaroid style
            </p>
          </div>
          
          {/* Style Manager */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg border border-white/50">
            <StyleManager
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onGenerateLayout={generateNewLayout}
            />
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            {/* Undo/Redo */}
            <button 
              onClick={undo}
              disabled={historyIndex <= 0}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Undo size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">Undo</span>
            </button>
            
            <button 
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Redo size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">Redo</span>
            </button>

            {/* Existing buttons */}
            <button 
              onClick={generateNewLayout}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">New Layout</span>
            </button>
            
            {/* Background Customization */}
            <button 
              onClick={() => setBackgroundCustomizationOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <Image size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">Background</span>
            </button>

            {/* Stickers */}
            <button 
              onClick={() => setStickerPanelOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">Stickers</span>
            </button>

            <button className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50">
              <Download size={16} />
              <span className="hidden sm:inline font-medium text-gray-700">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Collage Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        <div 
          className="relative rounded-3xl p-6 sm:p-12 shadow-2xl" 
          style={{ 
            height: '600px',
            background: currentTheme.colors.cardBackground,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Central decorative heart */}
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

          {/* Custom Stickers */}
          {customStickers.map((sticker) => {
            const IconComponent = sticker.icon;
            return (
              <div
                key={sticker.id}
                className="absolute z-20 animate-float"
                style={{
                  top: sticker.position.top,
                  left: sticker.position.left,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`
                }}
              >
                <div
                  className={`rounded-full shadow-lg ${
                    sticker.size === 'small' ? 'w-6 h-6' : 
                    sticker.size === 'medium' ? 'w-8 h-8' : 'w-12 h-12'
                  } flex items-center justify-center`}
                  style={{ backgroundColor: sticker.color }}
                >
                  <IconComponent 
                    size={sticker.size === 'small' ? 12 : sticker.size === 'medium' ? 16 : 24} 
                    className="text-white" 
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                  />
                </div>
              </div>
            );
          })}

          {/* Photo frames */}
          {layout.frames.map((frame) => (
            <div key={frame.id} className="group">
              <PhotoFrame
                id={frame.id}
                rotation={frame.rotation}
                position={frame.position}
                size={frame.size}
                caption={photos[frame.id]?.caption || ""}
                onImageUpload={handleImageUpload}
                onCaptionChange={handleCaptionChange}
                theme={currentTheme}
              />
              {/* Frame customization button */}
              <button
                onClick={() => handleFrameCustomization(frame.id)}
                className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-lg hover:shadow-xl z-30"
                style={{
                  top: frame.position.top,
                  left: `calc(${frame.position.left} + 120px)`,
                  transform: `rotate(${frame.rotation}deg)`
                }}
              >
                <Settings size={14} className="text-gray-600" />
              </button>
            </div>
          ))}

          {/* Subtle corner decorations */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* Enhanced Tips */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/50">
          <p className={`${currentTheme.fonts.caption} text-gray-700 text-sm sm:text-lg`}>
            💡 Click frames to add photos • Hover over frames for customization • Add stickers for extra magic • Try different backgrounds and themes
          </p>
        </div>
      </div>

      {/* Modals */}
      <FrameCustomizationPanel
        selectedFrame={selectedFrame}
        onFrameStyleChange={(frameId, style) => {
          console.log('Frame style changed:', frameId, style);
          saveToHistory();
        }}
        isOpen={frameCustomizationOpen}
        onClose={() => setFrameCustomizationOpen(false)}
      />

      <BackgroundCustomizationPanel
        currentBackground={customBackground}
        onBackgroundChange={(bg) => {
          setCustomBackground(bg);
          saveToHistory();
        }}
        isOpen={backgroundCustomizationOpen}
        onClose={() => setBackgroundCustomizationOpen(false)}
      />

      <InteractiveStickerPanel
        onAddSticker={handleAddSticker}
        isOpen={stickerPanelOpen}
        onClose={() => setStickerPanelOpen(false)}
      />
    </div>
  );
};

export default PhotoCollage;
