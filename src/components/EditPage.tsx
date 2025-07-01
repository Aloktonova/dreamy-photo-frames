
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Wand2, Palette, Layers, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Photo Editor</h1>
        <div className="w-20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Wand2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Photo Editor</h2>
          <p className="text-gray-600">Upload a photo to start editing with advanced tools</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 text-center">
          <Upload size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Photo</h3>
          <p className="text-gray-600 mb-6">Drag and drop or click to select a photo to edit</p>
          <Button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform">
            Choose Photo
          </Button>
        </div>

        {/* Feature Preview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: Wand2, name: 'AI Enhance', desc: 'Auto improve quality' },
            { icon: Palette, name: 'Filters', desc: 'Apply stunning effects' },
            { icon: Layers, name: 'Remove BG', desc: 'One-click background removal' },
            { icon: Download, name: 'Export', desc: 'Save in high quality' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/50">
              <feature.icon size={24} className="text-gray-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-800 text-sm">{feature.name}</h4>
              <p className="text-xs text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
