
import React from 'react';
import { Blend, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface BlenderPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentBlendMode: string;
  currentOpacity: number;
  onBlendModeChange: (mode: string) => void;
  onOpacityChange: (opacity: number) => void;
}

const BlenderPanel = ({
  isOpen,
  onClose,
  currentBlendMode,
  currentOpacity,
  onBlendModeChange,
  onOpacityChange
}: BlenderPanelProps) => {
  const blendModes = [
    { id: 'normal', name: 'Normal', description: 'Default blending' },
    { id: 'multiply', name: 'Multiply', description: 'Darkens colors' },
    { id: 'screen', name: 'Screen', description: 'Lightens colors' },
    { id: 'overlay', name: 'Overlay', description: 'Combines multiply and screen' },
    { id: 'soft-light', name: 'Soft Light', description: 'Subtle contrast' },
    { id: 'hard-light', name: 'Hard Light', description: 'Strong contrast' },
    { id: 'color-dodge', name: 'Color Dodge', description: 'Brightens colors' },
    { id: 'color-burn', name: 'Color Burn', description: 'Darkens colors' },
    { id: 'difference', name: 'Difference', description: 'Inverts colors' },
    { id: 'exclusion', name: 'Exclusion', description: 'Similar to difference' },
    { id: 'hue', name: 'Hue', description: 'Preserves saturation' },
    { id: 'saturation', name: 'Saturation', description: 'Preserves hue' }
  ];

  const handleOpacityChange = (value: number[]) => {
    onOpacityChange(value[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Blend size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Blend & Opacity</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Opacity Control */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">Opacity</label>
              <span className="text-sm text-gray-500">{currentOpacity}%</span>
            </div>
            <Slider
              value={[currentOpacity]}
              onValueChange={handleOpacityChange}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Transparent</span>
              <span>Opaque</span>
            </div>
          </div>

          {/* Blend Modes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Blend Modes</h3>
            <div className="grid grid-cols-2 gap-2">
              {blendModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onBlendModeChange(mode.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    currentBlendMode === mode.id
                      ? 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{mode.name}</div>
                  <div className="text-xs text-gray-500">{mode.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Preview</h3>
            <div className="flex gap-2">
              <div className="flex-1 h-16 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-xs text-blue-800 font-medium">Base Layer</span>
              </div>
              <div className="w-8 flex items-center justify-center">
                <span className="text-gray-400 text-sm">+</span>
              </div>
              <div 
                className="flex-1 h-16 bg-gradient-to-r from-red-200 to-red-400 rounded-lg flex items-center justify-center"
                style={{ 
                  mixBlendMode: currentBlendMode as any,
                  opacity: currentOpacity / 100
                }}
              >
                <span className="text-xs text-red-800 font-medium">Blend Layer</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-gray-600">
                Mode: {blendModes.find(m => m.id === currentBlendMode)?.name} • Opacity: {currentOpacity}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                onBlendModeChange('normal');
                onOpacityChange(100);
              }}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderPanel;
