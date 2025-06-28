import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import StyleManager from './StyleManager';
import FrameCustomizationPanel from './FrameCustomizationPanel';
import BackgroundCustomizationPanel from './BackgroundCustomizationPanel';
import InteractiveStickerPanel from './InteractiveStickerPanel';
import DownloadModal from './DownloadModal';
import { Download, RefreshCw, Sparkles, Heart, Settings, Image, Undo, Redo } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { aiLayoutGenerator } from './AILayoutGenerator';
import TutorialOverlay from './TutorialOverlay';

const PhotoCollage = () => {
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[1]);
  const [layout, setLayout] = useState(() => aiLayoutGenerator.generateCollageLayout());
  const [customBackground, setCustomBackground] = useState<string>('linear-gradient(135deg, #FFF8E7 0%, #FFE5B4 100%)');
  const [frameCustomizationOpen, setFrameCustomizationOpen] = useState(false);
  const [backgroundCustomizationOpen, setBackgroundCustomizationOpen] = useState(false);
  const [stickerPanelOpen, setStickerPanelOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [customStickers, setCustomStickers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Get themed collage background
  const getCollageBackground = () => {
    switch (currentTheme.id) {
      case 'minimalist':
        return {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          backgroundImage: 'none'
        };
      case 'scrapbook':
        return {
          background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE5B4 100%)',
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 177, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.05) 0%, transparent 50%)
          `
        };
      case 'retro':
        return {
          background: 'linear-gradient(135deg, #F4E4BC 0%, #E6D7B7 100%)',
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.03) 2px,
              rgba(139, 69, 19, 0.03) 4px
            )
          `
        };
      case 'romantic':
        return {
          background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(248, 187, 217, 0.1) 0%, transparent 50%)
          `
        };
      case 'travel':
        return {
          background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E7DD 100%)',
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(70, 130, 180, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(32, 178, 170, 0.08) 0%, transparent 50%)
          `
        };
      default:
        return {
          background: currentTheme.colors.cardBackground,
          backgroundImage: 'none'
        };
    }
  };

  const generateNewLayout = () => {
    console.log('Generating new AI layout...');
    const newLayout = aiLayoutGenerator.generateCollageLayout();
    setLayout(newLayout);
    setPhotos({});
    saveToHistory();
  };

  const handleThemeChange = (theme: Theme) => {
    console.log('Changing theme to:', theme.name);
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
      {/* Tutorial Overlay */}
      <TutorialOverlay />

      {/* Modern Header with Glass Morphism */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-sm text-gray-700 mb-4">
              ✨ New AI-Powered Features Available
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Memories Into Magic
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create stunning photo collages with AI-powered layouts, beautiful frames, and professional styling
            </p>
          </div>
          
          {/* Modern Toolbar with Glass Effect */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 mb-8">
            <StyleManager
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onGenerateLayout={generateNewLayout}
            />
          </div>
          
          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto">
            {/* Undo/Redo */}
            <button 
              onClick={undo}
              disabled={historyIndex <= 0}
              className="flex flex-col items-center gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Undo size={20} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
              <span className="text-xs font-medium text-gray-600">Undo</span>
            </button>
            
            <button 
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="flex flex-col items-center gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Redo size={20} className="text-gray-600 group-hover:text-blue-500 transition-colors" />
              <span className="text-xs font-medium text-gray-600">Redo</span>
            </button>

            {/* Background */}
            <button 
              onClick={() => setBackgroundCustomizationOpen(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group"
            >
              <Image size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">Background</span>
            </button>

            {/* Stickers */}
            <button 
              onClick={() => setStickerPanelOpen(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group"
            >
              <Sparkles size={20} className="text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">Stickers</span>
            </button>

            {/* New Layout */}
            <button 
              onClick={generateNewLayout}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group"
            >
              <RefreshCw size={20} className="text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">New Layout</span>
            </button>

            {/* Settings */}
            <button className="flex flex-col items-center gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group">
              <Settings size={20} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              <span className="text-xs font-medium text-gray-600">Settings</span>
            </button>

            {/* Download - Enhanced */}
            <button 
              onClick={() => setDownloadModalOpen(true)}
              className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 group"
            >
              <Download size={20} className="text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-gray-600">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Collage Area - Enhanced */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div 
          id="collage-canvas"
          className="relative rounded-3xl p-8 sm:p-12 shadow-2xl transition-all duration-500 backdrop-blur-sm" 
          style={{ 
            minHeight: '600px',
            ...getCollageBackground(),
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
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

      {/* Modern Tips Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Click frames to add photos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Hover for customization</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Try AI Layout for new arrangements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
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

      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        collageElementId="collage-canvas"
      />
    </div>
  );
};

export default PhotoCollage;
