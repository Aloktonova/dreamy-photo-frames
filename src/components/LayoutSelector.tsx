
import React from 'react';
import { layoutTemplates, LayoutTemplate } from '@/data/layoutTemplates';
import { Lock } from 'lucide-react';

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
          {/* Free Layouts */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Free Layouts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {layoutTemplates.filter(layout => !layout.isPro).map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => handleLayoutSelect(layout)}
                  className={`group relative bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all duration-300 hover:scale-105 border-2 ${
                    currentLayout?.id === layout.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="layout-thumbnail relative w-full aspect-square bg-white rounded-lg border border-gray-200 mb-2 overflow-hidden">
                    {layout.cells.map((cell, idx) => (
                      <div
                        key={idx}
                        className="cell-preview absolute bg-gradient-to-br from-blue-200 to-blue-300 border border-blue-400 rounded-sm"
                        style={{
                          left: `${Math.max(0, Math.min(90, cell.x * 45))}%`,
                          top: `${Math.max(0, Math.min(90, cell.y * 45))}%`,
                          width: `${Math.max(5, Math.min(50, cell.w * 45))}%`,
                          height: `${Math.max(5, Math.min(50, cell.h * 45))}%`,
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
                    <span className="text-xs text-gray-500">{layout.cells.length} photos</span>
                  </div>
                  
                  {currentLayout?.id === layout.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pro Layouts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Pro Layouts 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">PRO</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {layoutTemplates.filter(layout => layout.isPro).map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => handleLayoutSelect(layout)}
                  className={`group relative bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all duration-300 hover:scale-105 border-2 ${
                    currentLayout?.id === layout.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="layout-thumbnail relative w-full aspect-square bg-white rounded-lg border border-gray-200 mb-2 overflow-hidden">
                    {layout.cells.map((cell, idx) => (
                      <div
                        key={idx}
                        className="cell-preview absolute bg-gradient-to-br from-orange-200 to-orange-300 border border-orange-400 rounded-sm"
                        style={{
                          left: `${Math.max(0, Math.min(90, cell.x * 45))}%`,
                          top: `${Math.max(0, Math.min(90, cell.y * 45))}%`,
                          width: `${Math.max(5, Math.min(50, cell.w * 45))}%`,
                          height: `${Math.max(5, Math.min(50, cell.h * 45))}%`,
                        }}
                      />
                    ))}
                    
                    {/* Pro Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <Lock size={14} className="text-orange-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-xs font-medium text-gray-700 block truncate">{layout.name}</span>
                    <span className="text-xs text-orange-500 font-medium">PRO</span>
                  </div>
                  
                  {currentLayout?.id === layout.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
