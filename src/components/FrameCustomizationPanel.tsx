
import React from 'react';
import { Palette, Square, Circle, Star, Sparkles } from 'lucide-react';

interface FrameStyle {
  id: string;
  name: string;
  color: string;
  thickness: 'thin' | 'medium' | 'thick';
  style: 'classic' | 'ornate' | 'minimalist' | 'shadow';
  corners: 'square' | 'rounded' | 'torn';
}

interface FrameCustomizationPanelProps {
  selectedFrame?: string;
  onFrameStyleChange: (frameId: string, style: FrameStyle) => void;
  isOpen: boolean;
  onClose: () => void;
}

const frameColors = [
  { name: 'Classic White', color: '#FFFFFF' },
  { name: 'Vintage Gold', color: '#FFD700' },
  { name: 'Rose Gold', color: '#E8B4B8' },
  { name: 'Soft Pink', color: '#FFE5E7' },
  { name: 'Mint Green', color: '#E5F7F0' },
  { name: 'Lavender', color: '#E8E5FF' },
  { name: 'Wood Brown', color: '#D2B48C' },
  { name: 'Charcoal', color: '#36454F' }
];

const FrameCustomizationPanel = ({ selectedFrame, onFrameStyleChange, isOpen, onClose }: FrameCustomizationPanelProps) => {
  const [currentStyle, setCurrentStyle] = React.useState<FrameStyle>({
    id: selectedFrame || '',
    name: 'Custom',
    color: '#FFFFFF',
    thickness: 'medium',
    style: 'classic',
    corners: 'square'
  });

  if (!isOpen) return null;

  const handleStyleChange = (updates: Partial<FrameStyle>) => {
    const newStyle = { ...currentStyle, ...updates };
    setCurrentStyle(newStyle);
    if (selectedFrame) {
      onFrameStyleChange(selectedFrame, newStyle);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <Palette size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Customize Frame</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Frame Colors */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Frame Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {frameColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleStyleChange({ color: color.color })}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    currentStyle.color === color.color
                      ? 'border-pink-500 scale-110 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Frame Thickness */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Frame Thickness</h3>
            <div className="flex gap-2">
              {['thin', 'medium', 'thick'].map((thickness) => (
                <button
                  key={thickness}
                  onClick={() => handleStyleChange({ thickness: thickness as any })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStyle.thickness === thickness
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {thickness.charAt(0).toUpperCase() + thickness.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Frame Style */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Frame Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'classic', name: 'Classic', icon: Square },
                { id: 'ornate', name: 'Ornate', icon: Star },
                { id: 'minimalist', name: 'Minimalist', icon: Circle },
                { id: 'shadow', name: 'Shadow', icon: Sparkles }
              ].map((style) => {
                const IconComponent = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => handleStyleChange({ style: style.id as any })}
                    className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
                      currentStyle.style === style.id
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span className="text-sm font-medium">{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Style */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Corner Style</h3>
            <div className="flex gap-2">
              {['square', 'rounded', 'torn'].map((corner) => (
                <button
                  key={corner}
                  onClick={() => handleStyleChange({ corners: corner as any })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStyle.corners === corner
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {corner.charAt(0).toUpperCase() + corner.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameCustomizationPanel;
