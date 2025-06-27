
import React from 'react';
import { Star, Heart, Smile, Cloud, Sparkles, Sun, Moon, Music, Camera, Flower } from 'lucide-react';

interface StickerOption {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: 'emotions' | 'nature' | 'activities' | 'decorative';
  colors: string[];
}

interface InteractiveStickerPanelProps {
  onAddSticker: (sticker: { type: string; icon: React.ComponentType<any>; color: string; position: { top: string; left: string }; size: 'small' | 'medium' | 'large' }) => void;
  isOpen: boolean;
  onClose: () => void;
}

const stickerOptions: StickerOption[] = [
  // Emotions
  { id: 'heart', name: 'Heart', icon: Heart, category: 'emotions', colors: ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1'] },
  { id: 'smile', name: 'Smile', icon: Smile, category: 'emotions', colors: ['#FFD700', '#FFA500', '#FF6347', '#FFE4B5'] },
  
  // Nature
  { id: 'star', name: 'Star', icon: Star, category: 'nature', colors: ['#FFD700', '#FFFF00', '#FFA500', '#F0E68C'] },
  { id: 'cloud', name: 'Cloud', icon: Cloud, category: 'nature', colors: ['#F0F8FF', '#E6E6FA', '#B0C4DE', '#87CEEB'] },
  { id: 'sun', name: 'Sun', icon: Sun, category: 'nature', colors: ['#FFD700', '#FFA500', '#FF6347', '#FFFF00'] },
  { id: 'moon', name: 'Moon', icon: Moon, category: 'nature', colors: ['#F5F5DC', '#FFFACD', '#E6E6FA', '#D3D3D3'] },
  { id: 'flower', name: 'Flower', icon: Flower, category: 'nature', colors: ['#FF69B4', '#FFB6C1', '#FFA0C9', '#DDA0DD'] },
  
  // Activities
  { id: 'music', name: 'Music', icon: Music, category: 'activities', colors: ['#9370DB', '#8A2BE2', '#4B0082', '#6A5ACD'] },
  { id: 'camera', name: 'Camera', icon: Camera, category: 'activities', colors: ['#696969', '#708090', '#2F4F4F', '#36454F'] },
  
  // Decorative
  { id: 'sparkles', name: 'Sparkles', icon: Sparkles, category: 'decorative', colors: ['#FFD700', '#FF69B4', '#9370DB', '#00CED1'] }
];

const InteractiveStickerPanel = ({ onAddSticker, isOpen, onClose }: InteractiveStickerPanelProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedSize, setSelectedSize] = React.useState<'small' | 'medium' | 'large'>('medium');

  if (!isOpen) return null;

  const categories = ['all', 'emotions', 'nature', 'activities', 'decorative'];
  const filteredStickers = selectedCategory === 'all' 
    ? stickerOptions 
    : stickerOptions.filter(sticker => sticker.category === selectedCategory);

  const handleStickerClick = (sticker: StickerOption, color: string) => {
    // Generate random position for the sticker
    const position = {
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 60 + 20}%`
    };

    onAddSticker({
      type: sticker.id,
      icon: sticker.icon,
      color,
      position,
      size: selectedSize
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Add Stickers</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Sticker Size</h3>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Stickers Grid */}
          <div className="space-y-4">
            {filteredStickers.map((sticker) => {
              const IconComponent = sticker.icon;
              return (
                <div key={sticker.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <IconComponent size={16} />
                    {sticker.name}
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {sticker.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleStickerClick(sticker, color)}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-all hover:scale-110 flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: color }}
                        title={`Add ${sticker.name} in ${color}`}
                      >
                        <IconComponent size={16} className="text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStickerPanel;
