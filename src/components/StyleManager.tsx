
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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 sticky top-4 z-30">
      {/* Modern Horizontal Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        
        {/* Style Selector - Horizontal Pills */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500">
              <Palette size={16} className="text-white" />
            </div>
            <span className="font-medium text-gray-700 text-sm hidden sm:inline">Style</span>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme)}
                className={`px-3 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
                  currentTheme.id === theme.id
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white/70 text-gray-700 hover:bg-white hover:scale-105 shadow-md'
                } border border-white/50`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* AI Layout Generator - Prominent Button */}
        <button
          onClick={onGenerateLayout}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
        >
          <Wand2 size={16} />
          <span className="hidden sm:inline">AI Layout</span>
          <span className="sm:hidden">AI</span>
        </button>
      </div>
    </div>
  );
};

export default StyleManager;
