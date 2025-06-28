
import React from 'react';
import { layoutTemplates, LayoutTemplate } from '@/data/layoutTemplates';

interface LayoutSelectorProps {
  currentLayout?: LayoutTemplate;
  onSelectLayout: (layout: LayoutTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LayoutSelector = ({ currentLayout, onSelectLayout, isOpen, onClose }: LayoutSelectorProps) => {
  if (!isOpen) return null;

  const handleLayoutSelect = (layout: LayoutTemplate) => {
    onSelectLayout(layout);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Choose Layout</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">Select a layout template for your photo collage</p>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {layoutTemplates.map((layout) => (
              <button
                key={layout.id}
                onClick={() => handleLayoutSelect(layout)}
                className={`group relative bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all duration-300 hover:scale-105 border-2 ${
                  currentLayout?.id === layout.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-transparent'
                }`}
              >
                <div className="layout-thumbnail relative w-full aspect-square bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden">
                  {layout.cells.map((cell, idx) => (
                    <div
                      key={idx}
                      className="cell-preview absolute bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500 rounded-sm"
                      style={{
                        left: `${cell.x * 50}%`,
                        top: `${cell.y * 50}%`,
                        width: `${cell.w * 50}%`,
                        height: `${cell.h * 50}%`,
                      }}
                    />
                  ))}
                  
                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <span className="text-2xl opacity-60 group-hover:opacity-80">
                      {layout.icon}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-700 block">{layout.name}</span>
                  <span className="text-xs text-gray-500">{layout.cells.length} photos</span>
                </div>
                
                {currentLayout?.id === layout.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
