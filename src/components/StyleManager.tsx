
import React from 'react';
import { Palette, Wand2, Sparkles } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';

interface StyleManagerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onGenerateLayout: () => void;
}

const StyleManager = ({ currentTheme, onThemeChange, onGenerateLayout }: StyleManagerProps) => {
  return (
    <div className="space-y-4">
      {/* Theme Selection */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500">
            <Palette size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">Style</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                currentTheme.id === theme.id
                  ? 'bg-gray-800 text-white shadow-lg scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-white shadow-md hover:scale-105'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* AI Generator */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-medium text-gray-700 text-sm">AI Layout Generator</span>
        </div>
        
        <button
          onClick={onGenerateLayout}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm"
        >
          <Wand2 size={14} />
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
};

export default StyleManager;
