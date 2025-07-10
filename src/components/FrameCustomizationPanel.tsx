
import React from 'react';
import { Palette, Square, Circle, Star, Sparkles } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface FrameStyle {
  borderThickness: number;
  borderRadius: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double';
}

interface FrameCustomizationPanelProps {
  borderThickness: number;
  borderRadius: number;
  borderColor: string;
  borderStyle: string;
  onBorderThicknessChange: (value: number) => void;
  onBorderRadiusChange: (value: number) => void;
  onBorderColorChange: (color: string) => void;
  onBorderStyleChange: (style: string) => void;
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

const FrameCustomizationPanel = ({ 
  borderThickness, 
  borderRadius, 
  borderColor, 
  borderStyle,
  onBorderThicknessChange,
  onBorderRadiusChange,
  onBorderColorChange,
  onBorderStyleChange,
  isOpen, 
  onClose 
}: FrameCustomizationPanelProps) => {
  if (!isOpen) return null;

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

          {/* Border Thickness */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Border Thickness: {borderThickness}px
            </h3>
            <Slider
              value={[borderThickness]}
              onValueChange={(value) => onBorderThicknessChange(value[0])}
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Corner Radius */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Corner Radius: {borderRadius}px
            </h3>
            <Slider
              value={[borderRadius]}
              onValueChange={(value) => onBorderRadiusChange(value[0])}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Border Colors */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Border Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {frameColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onBorderColorChange(color.color)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    borderColor === color.color
                      ? 'border-blue-500 scale-110 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Border Style */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Border Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'solid', name: 'Solid' },
                { id: 'dashed', name: 'Dashed' },
                { id: 'dotted', name: 'Dotted' },
                { id: 'double', name: 'Double' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => onBorderStyleChange(style.id)}
                  className={`p-3 rounded-lg border transition-all ${
                    borderStyle === style.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">{style.name}</span>
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
