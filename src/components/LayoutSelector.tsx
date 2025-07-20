
import React from 'react';
import { layoutTemplates, LayoutTemplate } from '@/data/layoutTemplates';
import { Lock } from 'lucide-react';

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
  if (!isOpen) return null;

  // Group templates by category
  const groupedTemplates = layoutTemplates.reduce((acc, layout) => {
    const cat = layout.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(layout);
    return acc;
  }, {} as Record<string, LayoutTemplate[]>);

  const handleLayoutSelect = (layout: LayoutTemplate) => {
    if (selectedPhotoCount > (layout.maxPhotos || 99)) {
      alert(`This layout supports up to ${layout.maxPhotos} photos. Please remove some images or choose a different layout.`);
      return;
    }
    onSelectLayout(layout);
    onClose();
  };

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
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {categoryOrder.map((cat) => groupedTemplates[cat] && (
            <div key={cat} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">{cat} Layouts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {groupedTemplates[cat].map((layout) => {
                  const disabled = selectedPhotoCount > (layout.maxPhotos || 99);
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
                      <div className="text-center">
                        <span className="text-xs font-medium text-gray-700 block truncate">{layout.name}</span>
                        <span className="text-xs text-gray-500">{layout.maxPhotos} photos</span>
                      </div>
                      {/* Highlight new/featured */}
                      {layout.id.startsWith('new-') && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
                      )}
                      {layout.isPro && (
                        <span className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
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
