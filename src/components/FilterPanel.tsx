
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  grayscale: number;
  blur: number;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterApply: (filters: FilterSettings) => void;
  photoUrl: string; // NEW: thumbnail or main photo for live preview
}

const FilterPanel = ({ isOpen, onClose, onFilterApply, photoUrl }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0
  });

  // New: expanded filter presets with more variety
  const presetFilters = [
    { name: 'Normal', values: { brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0, blur: 0 } },
    { name: 'Vintage', values: { brightness: 110, contrast: 120, saturation: 80, sepia: 30, grayscale: 0, blur: 0 } },
    { name: 'B&W', values: { brightness: 100, contrast: 110, saturation: 0, sepia: 0, grayscale: 100, blur: 0 } },
    { name: 'Bright', values: { brightness: 130, contrast: 110, saturation: 110, sepia: 0, grayscale: 0, blur: 0 } },
    { name: 'Soft', values: { brightness: 105, contrast: 90, saturation: 95, sepia: 0, grayscale: 0, blur: 1 } },
    { name: 'Sepia', values: { brightness: 110, contrast: 100, saturation: 80, sepia: 80, grayscale: 0, blur: 0 } },
    { name: 'Cool', values: { brightness: 100, contrast: 110, saturation: 120, sepia: 0, grayscale: 0, blur: 0 } },
    { name: 'Warm', values: { brightness: 110, contrast: 105, saturation: 120, sepia: 20, grayscale: 0, blur: 0 } },
    { name: 'Matte', values: { brightness: 105, contrast: 90, saturation: 90, sepia: 10, grayscale: 10, blur: 0 } },
    { name: 'Drama', values: { brightness: 90, contrast: 140, saturation: 110, sepia: 0, grayscale: 0, blur: 0 } },
    { name: 'Fade', values: { brightness: 110, contrast: 80, saturation: 80, sepia: 0, grayscale: 10, blur: 0 } },
    { name: 'Glow', values: { brightness: 120, contrast: 90, saturation: 120, sepia: 0, grayscale: 0, blur: 2 } },
  ];

  // Helper to get CSS filter string from values
  function getCssFilterString(values: FilterSettings) {
    return `brightness(${values.brightness}%) contrast(${values.contrast}%) saturate(${values.saturation}%) sepia(${values.sepia}%) grayscale(${values.grayscale}%) blur(${values.blur}px)`;
  }

  const handleFilterChange = (filterType: keyof FilterSettings, value: number[]) => {
    const newFilters = { ...filters, [filterType]: value[0] };
    setFilters(newFilters);
    onFilterApply(newFilters);
  };

  const applyPreset = (preset: any) => {
    setFilters(preset.values);
    onFilterApply(preset.values);
  };

  const resetFilters = () => {
    const normalFilters = { brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0, blur: 0 };
    setFilters(normalFilters);
    onFilterApply(normalFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Filter size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Filters & Effects</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Preset Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter Presets</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {presetFilters.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="flex flex-col items-center min-w-[72px] max-w-[80px] focus:outline-none group"
                  tabIndex={0}
                  aria-label={preset.name}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-400 mb-1 shadow">
                    <img
                      src={photoUrl}
                      alt={preset.name + ' preview'}
                      style={{ filter: getCssFilterString(preset.values), objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 truncate w-full text-center">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Manual Adjustments</h3>
            
            {/* Brightness */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Brightness</label>
                <span className="text-sm text-gray-500">{filters.brightness}%</span>
              </div>
              <Slider
                value={[filters.brightness]}
                onValueChange={(value) => handleFilterChange('brightness', value)}
                min={0}
                max={200}
                step={1}
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Contrast</label>
                <span className="text-sm text-gray-500">{filters.contrast}%</span>
              </div>
              <Slider
                value={[filters.contrast]}
                onValueChange={(value) => handleFilterChange('contrast', value)}
                min={0}
                max={200}
                step={1}
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Saturation</label>
                <span className="text-sm text-gray-500">{filters.saturation}%</span>
              </div>
              <Slider
                value={[filters.saturation]}
                onValueChange={(value) => handleFilterChange('saturation', value)}
                min={0}
                max={200}
                step={1}
                className="w-full"
              />
            </div>

            {/* Sepia */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Sepia</label>
                <span className="text-sm text-gray-500">{filters.sepia}%</span>
              </div>
              <Slider
                value={[filters.sepia]}
                onValueChange={(value) => handleFilterChange('sepia', value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Grayscale */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Grayscale</label>
                <span className="text-sm text-gray-500">{filters.grayscale}%</span>
              </div>
              <Slider
                value={[filters.grayscale]}
                onValueChange={(value) => handleFilterChange('grayscale', value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Blur */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-600">Blur</label>
                <span className="text-sm text-gray-500">{filters.blur}px</span>
              </div>
              <Slider
                value={[filters.blur]}
                onValueChange={(value) => handleFilterChange('blur', value)}
                min={0}
                max={10}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
