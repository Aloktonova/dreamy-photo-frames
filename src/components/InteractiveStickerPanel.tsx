
import React from 'react';
import { Star, Heart, Smile, Cloud, Sparkles, Sun, Moon, Music, Camera, Flower, ThumbsUp, Leaf, Gift, PartyPopper, Plus, Search, Clock, Folder, ChevronDown, ChevronUp, WhatsApp } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

// 1. Unified sticker & emoji data
const emojiOptions = [
  { id: 'emoji-smile', name: 'Smile', char: '😄', category: 'emotions' },
  { id: 'emoji-heart', name: 'Heart', char: '❤️', category: 'emotions' },
  { id: 'emoji-thumbs', name: 'Thumbs Up', char: '👍', category: 'emotions' },
  { id: 'emoji-fire', name: 'Fire', char: '🔥', category: 'activities' },
  { id: 'emoji-gift', name: 'Gift', char: '🎁', category: 'activities' },
  { id: 'emoji-party', name: 'Party', char: '🥳', category: 'decorative' },
  { id: 'emoji-leaf', name: 'Leaf', char: '🍃', category: 'nature' },
  { id: 'emoji-sun', name: 'Sun', char: '☀️', category: 'nature' },
  { id: 'emoji-moon', name: 'Moon', char: '🌙', category: 'nature' },
  { id: 'emoji-flower', name: 'Flower', char: '🌸', category: 'nature' },
];

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

const allCategories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'emotions', label: 'Emotions', icon: Smile },
  { id: 'nature', label: 'Nature', icon: Leaf },
  { id: 'activities', label: 'Activities', icon: Music },
  { id: 'decorative', label: 'Decorative', icon: PartyPopper },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'recent', label: 'Recent', icon: Clock },
];

const InteractiveStickerPanel = ({ onAddSticker, isOpen, onClose }: InteractiveStickerPanelProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedSize, setSelectedSize] = React.useState<'small' | 'medium' | 'large'>(
    localStorage.getItem('stickerSize') as 'small' | 'medium' | 'large' || 'medium'
  );
  const [search, setSearch] = React.useState('');
  const [favorites, setFavorites] = React.useState<string[]>(() => JSON.parse(localStorage.getItem('stickerFavorites') || '[]'));
  const [recents, setRecents] = React.useState<string[]>(() => JSON.parse(localStorage.getItem('stickerRecents') || '[]'));
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

  React.useEffect(() => {
    localStorage.setItem('stickerSize', selectedSize);
  }, [selectedSize]);
  React.useEffect(() => {
    localStorage.setItem('stickerFavorites', JSON.stringify(favorites));
  }, [favorites]);
  React.useEffect(() => {
    localStorage.setItem('stickerRecents', JSON.stringify(recents));
  }, [recents]);

  if (!isOpen) return null;

  // Filter logic
  const filterByCategory = (item: any) => selectedCategory === 'all' || item.category === selectedCategory;
  const filterBySearch = (item: any) => item.name.toLowerCase().includes(search.toLowerCase());

  const filteredStickers = stickerOptions.filter(filterByCategory).filter(filterBySearch);
  const filteredEmojis = emojiOptions.filter(filterByCategory).filter(filterBySearch);

  // Recents/Favorites
  const favoriteStickers = stickerOptions.filter(s => favorites.includes(s.id));
  const favoriteEmojis = emojiOptions.filter(e => favorites.includes(e.id));
  const recentStickers = stickerOptions.filter(s => recents.includes(s.id));
  const recentEmojis = emojiOptions.filter(e => recents.includes(e.id));

  // Add to recents
  const addToRecents = (id: string) => {
    setRecents(prev => [id, ...prev.filter(x => x !== id)].slice(0, 12));
  };
  // Add/remove favorites
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev]);
  };

  // Handle sticker/emoji add
  const handleAdd = (item: any, color?: string) => {
    addToRecents(item.id);
    // Generate random position for the sticker
    const position = {
      top: `${Math.random() * 60 + 20}%`,
      left: `${Math.random() * 60 + 20}%`
    };
    if (item.char) {
      onAddSticker({ type: 'emoji', icon: () => <span style={{fontSize: '1.5em'}}>{item.char}</span>, color: 'transparent', position, size: selectedSize });
    } else {
      onAddSticker({ type: item.id, icon: item.icon, color: color || item.colors[0], position, size: selectedSize });
    }
  };

  // Category tabs
  const renderTabs = () => (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {allCategories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`flex flex-col items-center px-3 py-1 rounded-lg text-xs font-medium transition-all min-w-[60px] focus:outline-none focus:ring-2 focus:ring-purple-400 ${selectedCategory === cat.id ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          aria-label={cat.label}
        >
          <cat.icon size={20} />
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );

  // Size selector
  const renderSizeSelector = () => (
    <div className="flex gap-2 mb-4 items-center">
      <span className="text-sm font-semibold text-gray-700">Size:</span>
      {(['small', 'medium', 'large'] as const).map(size => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${selectedSize === size ? 'bg-purple-500 text-white border-purple-500' : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'}`}
          aria-label={size.charAt(0).toUpperCase() + size.slice(1)}
        >
          <span style={{fontSize: size === 'small' ? 16 : size === 'medium' ? 22 : 28}} role="img" aria-label={size}>{size.charAt(0).toUpperCase()}</span>
        </button>
      ))}
    </div>
  );

  // Search bar
  const renderSearchBar = () => (
    <div className="mb-4 flex items-center gap-2">
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search stickers or emoji..."
        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-label="Search stickers or emoji"
      />
    </div>
  );

  // Grid of sticker/emoji previews
  const renderGrid = (items: any[], isEmoji = false) => (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-6">
      {items.map(item => (
        <div key={item.id} className="relative group">
          <button
            onClick={() => handleAdd(item)}
            onMouseEnter={() => setShowTooltip(item.id)}
            onMouseLeave={() => setShowTooltip(null)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border-2 border-gray-200 hover:border-purple-400 shadow flex items-center justify-center text-2xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label={item.name}
            tabIndex={0}
            draggable={!isEmoji && !!item.icon}
          >
            {item.char ? (
              <span style={{fontSize: selectedSize === 'small' ? 20 : selectedSize === 'medium' ? 28 : 36}}>{item.char}</span>
            ) : (
              item.icon && <item.icon size={selectedSize === 'small' ? 20 : selectedSize === 'medium' ? 28 : 36} />
            )}
          </button>
          {/* Favorite toggle */}
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center ${favorites.includes(item.id) ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-500'}`}
            aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
            tabIndex={0}
          >
            <Star size={14} />
          </button>
          {/* Tooltip/preview */}
          {showTooltip === item.id && (
            <div className="absolute z-50 left-1/2 -translate-x-1/2 top-16 bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2 text-xs text-gray-700 whitespace-nowrap">
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Stickers & Emoji</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close sticker panel"
          >
            ×
          </button>
        </div>
        {renderTabs()}
        {renderSearchBar()}
        {renderSizeSelector()}
        {/* Recents/Favorites */}
        {favorites.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><Star size={14} className="text-yellow-400" /> Favorites</h3>
            {favoriteStickers.length > 0 && renderGrid(favoriteStickers)}
            {favoriteEmojis.length > 0 && renderGrid(favoriteEmojis, true)}
          </div>
        )}
        {recents.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><Clock size={14} className="text-purple-400" /> Recent</h3>
            {recentStickers.length > 0 && renderGrid(recentStickers)}
            {recentEmojis.length > 0 && renderGrid(recentEmojis, true)}
          </div>
        )}
        {/* Main grid */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2 mt-4">Stickers</h3>
        {renderGrid(filteredStickers)}
        <h3 className="text-sm font-semibold text-gray-700 mb-2 mt-4">Emoji</h3>
        {renderGrid(filteredEmojis, true)}
      </div>
    </div>
  );
};

export default InteractiveStickerPanel;
