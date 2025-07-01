
import React, { useRef } from 'react';
import { Image, Palette, Upload } from 'lucide-react';

interface BackgroundOption {
  id: string;
  name: string;
  type: 'gradient' | 'texture' | 'pattern';
  value: string;
  preview?: string;
}

interface BackgroundCustomizationPanelProps {
  currentBackground: string;
  onBackgroundChange: (background: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const backgroundOptions: BackgroundOption[] = [
  // Gradients
  { id: 'dreamy-pink', name: 'Dreamy Pink', type: 'gradient', value: 'linear-gradient(135deg, #FFE5F1 0%, #FFE5E5 50%, #FFF0F5 100%)' },
  { id: 'soft-blue', name: 'Soft Blue', type: 'gradient', value: 'linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 50%, #E6F3FF 100%)' },
  { id: 'lavender-mist', name: 'Lavender Mist', type: 'gradient', value: 'linear-gradient(135deg, #F3E8FF 0%, #E8E5FF 50%, #F5F3FF 100%)' },
  { id: 'mint-fresh', name: 'Mint Fresh', type: 'gradient', value: 'linear-gradient(135deg, #E5F7F0 0%, #F0FFF4 50%, #E8F8F5 100%)' },
  { id: 'sunset-glow', name: 'Sunset Glow', type: 'gradient', value: 'linear-gradient(135deg, #FFE8D6 0%, #FFF0E6 50%, #FFF8F0 100%)' },
  { id: 'cloud-nine', name: 'Cloud Nine', type: 'gradient', value: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F5F7FA 100%)' },
  
  // Textured backgrounds
  { id: 'vintage-paper', name: 'Vintage Paper', type: 'texture', value: 'radial-gradient(circle at 20% 80%, rgba(120, 100, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 240, 220, 0.3) 0%, transparent 50%), linear-gradient(135deg, #FAF0E6 0%, #F5F5DC 100%)' },
  { id: 'soft-clouds', name: 'Soft Clouds', type: 'texture', value: 'radial-gradient(ellipse at top, rgba(255,255,255,0.8) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(240,248,255,0.6) 0%, transparent 70%), linear-gradient(135deg, #E6F3FF 0%, #F0F8FF 100%)' },
  { id: 'dreamy-stars', name: 'Dreamy Stars', type: 'texture', value: 'radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,200,255,0.6), transparent), radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.9), transparent), linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }
];

const BackgroundCustomizationPanel = ({ currentBackground, onBackgroundChange, isOpen, onClose }: BackgroundCustomizationPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onBackgroundChange(`url(${imageUrl}) center/cover no-repeat`);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Image size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Background Style</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Upload Custom Image */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Upload size={16} />
              Upload Background Image
            </h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Upload size={20} />
              <span>Click to upload image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Background Options */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Preset Backgrounds</h3>
            <div className="grid grid-cols-2 gap-3">
              {backgroundOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onBackgroundChange(option.value);
                  }}
                  className={`relative h-24 rounded-xl border-2 transition-all overflow-hidden group ${
                    currentBackground === option.value
                      ? 'border-blue-500 scale-105 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                  }`}
                  style={{ background: option.value }}
                >
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                      {option.name}
                    </span>
                  </div>
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-medium text-gray-800">{option.name}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Section */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Palette size={16} />
              Custom Color
            </h3>
            <input
              type="color"
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="w-full h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
              title="Choose custom background color"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundCustomizationPanel;
