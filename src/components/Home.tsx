
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Wand2, 
  Move3D, 
  Layers, 
  Scissors, 
  Grid3X3,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  const quickModes = [
    {
      id: 'freestyle',
      name: 'Freestyle',
      description: 'Free drag & resize canvas',
      icon: Move3D,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'multifit',
      name: 'Multi-fit',
      description: 'Adjust photos to different frame sizes',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'stitch',
      name: 'Stitch',
      description: 'Vertical or horizontal long photo stitching',
      icon: Scissors,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'templates',
      name: 'Templates',
      description: 'Pre-made frame or collage templates',
      icon: Grid3X3,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleModeSelect = (mode: string) => {
    if (mode === 'collage' || mode === 'freestyle' || mode === 'multifit' || mode === 'stitch' || mode === 'templates') {
      navigate('/collage');
    } else if (mode === 'edit') {
      navigate('/edit');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="pt-12 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 text-sm text-gray-700 mb-6">
          <Sparkles size={16} className="text-purple-500" />
          Welcome to Dreamy Photo Frames
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Create Amazing Photos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your memories with professional collages, stunning frames, and powerful editing tools
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => handleModeSelect('collage')}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <LayoutGrid size={32} className="text-white" />
              </div>
              <ArrowRight size={24} className="text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Collage Maker</h2>
            <p className="text-gray-600">
              Create beautiful photo collages with grid layouts, freestyle arrangements, and creative templates
            </p>
          </button>

          <button
            onClick={() => handleModeSelect('edit')}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wand2 size={32} className="text-white" />
              </div>
              <ArrowRight size={24} className="text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo Editor</h2>
            <p className="text-gray-600">
              Enhance your photos with advanced editing tools, filters, and AI-powered features
            </p>
          </button>
        </div>

        {/* Quick Modes Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Quick Modes</h3>
            <p className="text-gray-600">Jump straight into your preferred editing style</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickModes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50 text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{mode.name}</h4>
                  <p className="text-sm text-gray-600">{mode.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Features Preview */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-800">AI Enhancement</h4>
            </div>
            <p className="text-sm text-gray-600">
              Improve photo resolution, remove backgrounds, and apply smart filters with one click
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Grid3X3 size={20} className="text-white" />
              </div>
              <h4 className="font-semibold text-gray-800">Pro Templates</h4>
            </div>
            <p className="text-sm text-gray-600">
              Access premium layouts, high-resolution exports, and exclusive design templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
