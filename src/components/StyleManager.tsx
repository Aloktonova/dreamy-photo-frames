
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
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <Palette size={20} className="text-white" />
          </div>
          <span className="font-medium text-lg text-gray-700">Choose Your Aesthetic</span>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                currentTheme.id === theme.id
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md backdrop-blur-sm border border-white/50'
              }`}
              style={{
                background: currentTheme.id === theme.id 
                  ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                  : 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <span className="relative z-10">{theme.name}</span>
              {currentTheme.id === theme.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AI Generator */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">AI-Powered Layout Generation</span>
        </div>
        
        <button
          onClick={onGenerateLayout}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
        >
          <Wand2 size={18} />
          <span>Generate Magic</span>
        </button>
      </div>
    </div>
  );
};

export default StyleManager;
