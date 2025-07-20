
import React, { useState, useEffect } from 'react';
import { layoutTemplates, LayoutTemplate } from '@/data/layoutTemplates';
import { Lock, Star, Search } from 'lucide-react';

interface LayoutSelectorProps {
  currentLayout?: LayoutTemplate;
  onSelectLayout: (layout: LayoutTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
  selectedPhotoCount: number; // NEW: number of images user has selected
}

const categoryOrder = [
  'Grid', 'Asymmetric', 'Magazine', 'Shape', 'Classic', 'Creative', 'Event', 'Social'
];

const LayoutSelector = ({ currentLayout, onSelectLayout, isOpen, onClose, selectedPhotoCount }: LayoutSelectorProps) => {
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('layoutFavorites') || '[]'));
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('layoutFavorites', JSON.stringify(favorites));
  }, [favorites]);

  if (!isOpen) return null;

  // Group templates by category, filter by search and favorites
  const groupedTemplates = layoutTemplates.reduce((acc, layout) => {
    const cat = layout.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    // Search filter
    const matchesSearch = layout.name.toLowerCase().includes(search.toLowerCase());
    // Favorites filter
    const isFavorite = favorites.includes(layout.id);
    if (
      (!showFavoritesOnly || isFavorite) &&
      matchesSearch
    ) {
      acc[cat].push(layout);
    }
    return acc;
  }, {} as Record<string, LayoutTemplate[]>);

  const handleLayoutSelect = (layout: LayoutTemplate) => {
    if (selectedPhotoCount > (layout.maxPhotos || 99)) {
      setError(`This layout supports up to ${layout.maxPhotos} photos. Please remove some images or choose a different layout.`);
      return;
    }
    setError(null);
    onSelectLayout(layout);
    onClose();
  };

  const toggleFavorite = (layoutId: string) => {
    setFavorites(prev => prev.includes(layoutId) ? prev.filter(id => id !== layoutId) : [layoutId, ...prev]);
  };

  // Search bar and favorites toggle
  const renderSearchAndFavorites = () => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="flex items-center gap-2 flex-1">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search layouts..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Search layouts"
        />
      </div>
      <button
        onClick={() => setShowFavoritesOnly(fav => !fav)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all ${showFavoritesOnly ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-yellow-50'}`}
        aria-pressed={showFavoritesOnly}
        aria-label="Show only favorite layouts"
      >
        <Star size={18} className={showFavoritesOnly ? 'text-yellow-500' : 'text-gray-400'} />
        Favorites
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Choose Layout</h2>
              <p className="text-gray-600 mt-1">Select a layout template for your photo collage</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-xl font-light"
              aria-label="Close layout selector"
            >
              ×
            </button>
          </div>
          {error && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-2 text-sm" role="alert">
              {error}
              <button onClick={() => setError(null)} className="ml-4 text-red-500 underline text-xs">Dismiss</button>
            </div>
          )}
          {renderSearchAndFavorites()}
        </div>
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {categoryOrder.map((cat) => groupedTemplates[cat] && groupedTemplates[cat].length > 0 && (
            <div key={cat} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">{cat} Layouts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {groupedTemplates[cat].map((layout) => {
                  const disabled = selectedPhotoCount > (layout.maxPhotos || 99);
                  const isFavorite = favorites.includes(layout.id);
                  return (
                    <button
                      key={layout.id}
                      onClick={() => handleLayoutSelect(layout)}
                      disabled={disabled}
                      className={`group relative bg-gray-50 rounded-xl p-3 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 hover:scale-105 border-2 ${
                        currentLayout?.id === layout.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-transparent'
                      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      aria-label={layout.name}
                      tabIndex={0}
                    >
                      <div
                        className="layout-thumbnail relative w-full aspect-square bg-white rounded-lg border border-gray-200 mb-2 overflow-hidden grid gap-1 p-1"
                        style={{
                          gridTemplateColumns: `repeat(${layout.gridColumns}, 1fr)`,
                          gridTemplateRows: `repeat(${layout.gridRows}, 1fr)`
                        }}
                      >
                        {layout.cells.map((cell, idx) => (
                          <div
                            key={idx}
                            className="cell-preview bg-gradient-to-br from-blue-200 to-blue-300 border border-blue-400 rounded-sm"
                            style={{
                              gridColumn: `${cell.gridColumn} / span ${cell.gridColumnSpan}`,
                              gridRow: `${cell.gridRow} / span ${cell.gridRowSpan}`
                            }}
                          />
                        ))}
                        {/* Icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                          <span className="text-lg opacity-60 group-hover:opacity-80">
                            {layout.icon}
                          </span>
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center gap-1">
                        <span className="text-xs font-medium text-gray-700 block truncate">{layout.name}</span>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); toggleFavorite(layout.id); }}
                          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          className="ml-1 focus:outline-none"
                          tabIndex={0}
                        >
                          <Star size={14} className={isFavorite ? 'text-yellow-400' : 'text-gray-300'} fill={isFavorite ? '#facc15' : 'none'} />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">{layout.maxPhotos} photos</span>
                      {/* Highlight new/featured */}
                      {layout.new && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                      )}
                      {layout.featured && (
                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">FEATURED</span>
                      )}
                      {layout.isPro && (
                        <span className="absolute bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
                      )}
                      {disabled && (
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">Too many photos</span>
                      )}
                      {currentLayout?.id === layout.id && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
