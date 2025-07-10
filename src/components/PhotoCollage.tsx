import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import FrameCustomizationPanel from './FrameCustomizationPanel';
import BackgroundCustomizationPanel from './BackgroundCustomizationPanel';
import InteractiveStickerPanel from './InteractiveStickerPanel';
import FilterPanel from './FilterPanel';
import BlenderPanel from './BlenderPanel';
import DownloadModal from './DownloadModal';
import { 
  ArrowLeft, 
  Download, 
  HelpCircle, 
  Crown,
  LayoutGrid, 
  Ratio, 
  RectangleHorizontal, 
  Type, 
  Filter, 
  Sticker,
  Palette,
  Blend
} from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';
import { LayoutTemplate } from '@/data/layoutTemplates';
import { aiLayoutGenerator } from './AILayoutGenerator';
import LayoutSelector from './LayoutSelector';

const PhotoCollage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[1]);
  const [currentLayout, setCurrentLayout] = useState<LayoutTemplate | undefined>();
  const [layout, setLayout] = useState(() => aiLayoutGenerator.generateCollageLayout());
  const [customBackground, setCustomBackground] = useState<string>('linear-gradient(135deg, #FFF8E7 0%, #FFE5B4 100%)');
  
  // Tool panel states
  const [layoutSelectorOpen, setLayoutSelectorOpen] = useState(false);
  const [frameCustomizationOpen, setFrameCustomizationOpen] = useState(false);
  const [backgroundCustomizationOpen, setBackgroundCustomizationOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [blenderPanelOpen, setBlenderPanelOpen] = useState(false);
  const [stickerPanelOpen, setStickerPanelOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  
  // Editing states
  const [selectedFrame, setSelectedFrame] = useState<string>('');
  const [customStickers, setCustomStickers] = useState<any[]>([]);
  const [spacing, setSpacing] = useState(8);
  const [borderRadius, setBorderRadius] = useState(12);
  const [borderThickness, setBorderThickness] = useState(2);
  const [borderColor, setBorderColor] = useState('#FFFFFF');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [showHelp, setShowHelp] = useState(false);
  const [blendMode, setBlendMode] = useState('normal');
  const [blendOpacity, setBlendOpacity] = useState(100);
  const [collageFilters, setCollageFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0
  });

  // Get themed collage background
  const getCollageBackground = () => {
    return {
      background: customBackground,
      backgroundImage: 'none'
    };
  };

  const getCollageStyle = () => {
    const filterString = `brightness(${collageFilters.brightness}%) contrast(${collageFilters.contrast}%) saturate(${collageFilters.saturation}%) sepia(${collageFilters.sepia}%) grayscale(${collageFilters.grayscale}%) blur(${collageFilters.blur}px)`;
    
    return {
      ...getCollageBackground(),
      mixBlendMode: blendMode as any,
      opacity: blendOpacity / 100,
      filter: filterString
    };
  };

  const applyLayoutTemplate = (layoutTemplate: LayoutTemplate) => {
    console.log('Applying layout template:', layoutTemplate.name);
    setCurrentLayout(layoutTemplate);
    
    const newFrames = layoutTemplate.cells.map((cell, index) => ({
      id: cell.id,
      position: {
        top: `${(cell.y * 40) + 10}%`,
        left: `${(cell.x * 40) + 10}%`
      },
      rotation: 0,
      size: cell.w > 1.5 ? 'large' : cell.w > 0.8 ? 'medium' : 'small' as 'small' | 'medium' | 'large'
    }));

    setLayout(prev => ({
      ...prev,
      frames: newFrames
    }));
    
    setPhotos({});
    setLayoutSelectorOpen(false);
  };

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

  const handleFramePositionChange = (frameId: string, position: { top: string; left: string }) => {
    setLayout(prev => ({
      ...prev,
      frames: prev.frames.map(frame => 
        frame.id === frameId ? { ...frame, position } : frame
      )
    }));
  };

  const handleFrameRotationChange = (frameId: string, rotation: number) => {
    setLayout(prev => ({
      ...prev,
      frames: prev.frames.map(frame => 
        frame.id === frameId ? { ...frame, rotation } : frame
      )
    }));
  };

  const handleFrameSizeChange = (frameId: string, size: 'small' | 'medium' | 'large') => {
    setLayout(prev => ({
      ...prev,
      frames: prev.frames.map(frame => 
        frame.id === frameId ? { ...frame, size } : frame
      )
    }));
  };

  const handleAddSticker = (sticker: any) => {
    setCustomStickers(prev => [...prev, { ...sticker, id: Date.now() }]);
    setStickerPanelOpen(false);
  };

  // Bottom toolbar tools arranged in 2 rows
  const toolsRow1 = [
    {
      id: 'layout',
      name: 'Layout',
      icon: LayoutGrid,
      onClick: () => setLayoutSelectorOpen(true)
    },
    {
      id: 'ratio',
      name: 'Ratio',
      icon: Ratio,
      onClick: () => console.log('Ratio tool clicked')
    },
    {
      id: 'border',
      name: 'Border',
      icon: RectangleHorizontal,
      onClick: () => setFrameCustomizationOpen(true)
    },
    {
      id: 'bg',
      name: 'BG',
      icon: Palette,
      onClick: () => setBackgroundCustomizationOpen(true)
    }
  ];

  const toolsRow2 = [
    {
      id: 'blender',
      name: 'Blender',
      icon: Blend,
      onClick: () => setBlenderPanelOpen(true)
    },
    {
      id: 'filter',
      name: 'Filter',
      icon: Filter,
      onClick: () => setFilterPanelOpen(true)
    },
    {
      id: 'text',
      name: 'Text',
      icon: Type,
      onClick: () => console.log('Text tool clicked')
    },
    {
      id: 'sticker',
      name: 'Sticker',
      icon: Sticker,
      onClick: () => setStickerPanelOpen(true)
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        
        <h1 className="text-lg font-semibold text-gray-800">Collage Editor</h1>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HelpCircle size={20} />
          </button>
          <button className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors">
            <Crown size={20} />
          </button>
          <button
            onClick={() => setDownloadModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Save
          </button>
        </div>
      </div>

      {/* Help Tooltip */}
      {showHelp && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
          <div className="max-w-4xl mx-auto text-sm text-blue-800">
            <p className="font-medium mb-1">Quick Guide:</p>
            <p>• Click on photo frames to upload images • Use the toolbar below to customize your collage • Drag frames to reposition them</p>
          </div>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 p-4 pb-32 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div 
            id="collage-canvas"
            className="relative bg-white rounded-2xl shadow-lg mx-auto" 
            style={{ 
              width: '600px',
              height: '600px',
              ...getCollageStyle()
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

            {/* Custom stickers */}
            {customStickers.map((sticker) => {
              const IconComponent = sticker.icon;
              return (
                <div
                  key={sticker.id}
                  className="absolute z-20"
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
                    />
                  </div>
                </div>
              );
            })}

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
                onPositionChange={handleFramePositionChange}
                onRotationChange={handleFrameRotationChange}
                onSizeChange={handleFrameSizeChange}
                theme={currentTheme}
                editMode={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Toolbar - Responsive Grid */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto">
          {/* Single Row for Mobile, Two Rows for Desktop */}
          <div className="grid grid-cols-8 sm:grid-cols-8 gap-1 sm:gap-2">
            {[...toolsRow1, ...toolsRow2].map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={tool.onClick}
                  className="flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg hover:bg-gray-100 transition-all active:scale-95 min-h-[60px] sm:min-h-[70px]"
                >
                  <IconComponent size={18} className="text-gray-700 sm:size-[20px]" />
                  <span className="text-[10px] sm:text-xs text-gray-700 font-medium leading-tight text-center">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tool Panels */}
      <LayoutSelector
        currentLayout={currentLayout}
        onSelectLayout={applyLayoutTemplate}
        isOpen={layoutSelectorOpen}
        onClose={() => setLayoutSelectorOpen(false)}
      />

      <FrameCustomizationPanel
        borderThickness={borderThickness}
        borderRadius={borderRadius}
        borderColor={borderColor}
        borderStyle={borderStyle}
        onBorderThicknessChange={setBorderThickness}
        onBorderRadiusChange={setBorderRadius}
        onBorderColorChange={setBorderColor}
        onBorderStyleChange={setBorderStyle}
        isOpen={frameCustomizationOpen}
        onClose={() => setFrameCustomizationOpen(false)}
      />

      <BackgroundCustomizationPanel
        currentBackground={customBackground}
        onBackgroundChange={(bg) => setCustomBackground(bg)}
        isOpen={backgroundCustomizationOpen}
        onClose={() => setBackgroundCustomizationOpen(false)}
      />

      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        onFilterApply={(filters) => {
          setCollageFilters(filters);
        }}
      />

      <BlenderPanel
        isOpen={blenderPanelOpen}
        onClose={() => setBlenderPanelOpen(false)}
        currentBlendMode={blendMode}
        currentOpacity={blendOpacity}
        onBlendModeChange={setBlendMode}
        onOpacityChange={setBlendOpacity}
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
