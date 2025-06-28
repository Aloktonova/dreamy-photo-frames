
import React, { useState } from 'react';
import { Download, X, Image, FileImage } from 'lucide-react';
import { downloadCollageAsImage } from '@/utils/downloadUtils';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useLoadingState } from '@/hooks/useLoadingState';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  collageElementId: string;
}

const DownloadModal = ({ isOpen, onClose, collageElementId }: DownloadModalProps) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = useState(95);
  const [filename, setFilename] = useState('my-collage');
  
  const { handleError } = useErrorHandler();
  const { loadingState, startLoading, stopLoading } = useLoadingState();

  const handleDownload = async () => {
    try {
      startLoading('Preparing your collage for download...');
      
      await downloadCollageAsImage(collageElementId, {
        filename,
        format,
        quality: quality / 100
      });
      
      onClose();
    } catch (error) {
      handleError({
        type: 'general',
        message: 'Download failed',
        details: 'Unable to save your collage. Please try again.'
      });
    } finally {
      stopLoading();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Download size={20} className="text-blue-500" />
            Download Collage
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Filename */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter filename"
            />
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormat('png')}
                className={`p-3 border rounded-lg flex items-center gap-2 transition-all ${
                  format === 'png'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Image size={18} />
                <span className="font-medium">PNG</span>
              </button>
              <button
                onClick={() => setFormat('jpeg')}
                className={`p-3 border rounded-lg flex items-center gap-2 transition-all ${
                  format === 'jpeg'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <FileImage size={18} />
                <span className="font-medium">JPEG</span>
              </button>
            </div>
          </div>

          {/* Quality Slider (for JPEG) */}
          {format === 'jpeg' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="60"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={loadingState.isLoading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loadingState.isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
