
import React from 'react';
import { Palette, Wand2 } from 'lucide-react';
import { themes } from '@/data/themes';
import { Theme } from '@/types/styles';

interface StyleManagerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onGenerateLayout: () => void;
}

const StyleManager = ({ currentTheme, onThemeChange, onGenerateLayout }: StyleManagerProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Palette size={18} className="text-gray-600" />
        <span className="font-clean text-sm text-gray-700">Style:</span>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme)}
            className={`px-3 py-1 rounded-full text-sm font-clean transition-all duration-300 ${
              currentTheme.id === theme.id
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-soft'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <button
        onClick={onGenerateLayout}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 hover:scale-105"
      >
        <Wand2 size={16} />
        <span className="font-clean text-sm">AI Generate</span>
      </button>
    </div>
  );
};

export default StyleManager;
