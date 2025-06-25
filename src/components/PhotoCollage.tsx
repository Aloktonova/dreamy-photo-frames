
import React, { useState } from 'react';
import PhotoFrame from './PhotoFrame';
import DecorativeElement from './DecorativeElement';
import { Download, RefreshCw, Palette } from 'lucide-react';

const PhotoCollage = () => {
  const [photos, setPhotos] = useState<{[key: string]: { file?: File, caption: string }}>({});

  const frames = [
    { id: 'frame1', rotation: -5, position: { top: '10%', left: '8%' }, size: 'medium' as const },
    { id: 'frame2', rotation: 3, position: { top: '5%', left: '45%' }, size: 'large' as const },
    { id: 'frame3', rotation: -2, position: { top: '35%', left: '15%' }, size: 'small' as const },
    { id: 'frame4', rotation: 4, position: { top: '45%', left: '50%' }, size: 'medium' as const },
    { id: 'frame5', rotation: -3, position: { top: '25%', left: '75%' }, size: 'small' as const },
    { id: 'frame6', rotation: 2, position: { top: '65%', left: '25%' }, size: 'large' as const },
  ];

  const decorativeElements = [
    { type: 'tape' as const, position: { top: '15%', left: '35%' }, rotation: 45, size: 'medium' as const },
    { type: 'sticker' as const, position: { top: '30%', left: '5%' }, color: '#FFE5E5', size: 'small' as const },
    { type: 'tape' as const, position: { top: '55%', left: '70%' }, rotation: -30, size: 'small' as const },
    { type: 'sticker' as const, position: { top: '20%', left: '85%' }, color: '#E8E5FF', size: 'medium' as const },
    { type: 'doodle' as const, position: { top: '75%', left: '55%' }, rotation: 15, color: '#E5F7F0', size: 'small' as const },
    { type: 'sticker' as const, position: { top: '80%', left: '10%' }, color: '#FFE8D6', size: 'small' as const },
    { type: 'tape' as const, position: { top: '40%', left: '2%' }, rotation: 90, size: 'large' as const },
    { type: 'doodle' as const, position: { top: '10%', left: '70%' }, rotation: -20, color: '#E5F2FF', size: 'medium' as const },
  ];

  const handleImageUpload = (frameId: string, file: File) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], file }
    }));
  };

  const handleCaptionChange = (frameId: string, caption: string) => {
    setPhotos(prev => ({
      ...prev,
      [frameId]: { ...prev[frameId], caption }
    }));
  };

  const generateNewLayout = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-cream via-white to-pastel-pink p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-handwritten text-gray-800 text-center mb-2">
          ✨ Dreamy Photo Collage ✨
        </h1>
        <p className="text-lg font-clean text-gray-600 text-center mb-6">
          Create your perfect aesthetic photo collection
        </p>
        
        {/* Action buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={generateNewLayout}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 text-gray-700 hover:bg-pastel-pink"
          >
            <RefreshCw size={18} />
            <span className="font-clean text-sm">New Layout</span>
          </button>
          
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 text-gray-700 hover:bg-pastel-lavender">
            <Palette size={18} />
            <span className="font-clean text-sm">Color Themes</span>
          </button>
          
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft hover:shadow-md transition-all duration-300 text-gray-700 hover:bg-pastel-mint">
            <Download size={18} />
            <span className="font-clean text-sm">Download</span>
          </button>
        </div>
      </div>

      {/* Collage Area */}
      <div className="max-w-5xl mx-auto relative bg-white rounded-3xl shadow-soft p-12" style={{ height: '700px' }}>
        {/* Decorative elements */}
        {decorativeElements.map((element, index) => (
          <DecorativeElement
            key={`decoration-${index}`}
            type={element.type}
            position={element.position}
            rotation={element.rotation}
            color={element.color}
            size={element.size}
          />
        ))}

        {/* Photo frames */}
        {frames.map((frame) => (
          <PhotoFrame
            key={frame.id}
            id={frame.id}
            rotation={frame.rotation}
            position={frame.position}
            size={frame.size}
            caption={photos[frame.id]?.caption || ""}
            onImageUpload={handleImageUpload}
            onCaptionChange={handleCaptionChange}
          />
        ))}

        {/* Watermark */}
        <div className="absolute bottom-4 right-6 font-handwritten text-gray-400 text-sm">
          Made with ♡
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <p className="font-handwritten text-gray-600 text-lg">
          💡 Tip: Click on photos to upload images and click captions to edit them
        </p>
      </div>
    </div>
  );
};

export default PhotoCollage;
