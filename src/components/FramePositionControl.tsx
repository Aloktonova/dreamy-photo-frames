
import React from 'react';
import { Move, RotateCw, Maximize2, Minimize2 } from 'lucide-react';

interface FramePositionControlProps {
  frameId: string;
  position: { top: string; left: string };
  rotation: number;
  size: 'small' | 'medium' | 'large';
  onPositionChange: (frameId: string, position: { top: string; left: string }) => void;
  onRotationChange: (frameId: string, rotation: number) => void;
  onSizeChange: (frameId: string, size: 'small' | 'medium' | 'large') => void;
  isVisible: boolean;
}

const FramePositionControl = ({
  frameId,
  position,
  rotation,
  size,
  onPositionChange,
  onRotationChange,
  onSizeChange,
  isVisible
}: FramePositionControlProps) => {
  const handlePositionChange = (direction: 'up' | 'down' | 'left' | 'right') => {
    const currentTop = parseInt(position.top.replace('%', ''));
    const currentLeft = parseInt(position.left.replace('%', ''));
    const step = 2; // 2% step size

    let newTop = currentTop;
    let newLeft = currentLeft;

    switch (direction) {
      case 'up':
        newTop = Math.max(0, currentTop - step);
        break;
      case 'down':
        newTop = Math.min(80, currentTop + step);
        break;
      case 'left':
        newLeft = Math.max(0, currentLeft - step);
        break;
      case 'right':
        newLeft = Math.min(80, currentLeft + step);
        break;
    }

    onPositionChange(frameId, { top: `${newTop}%`, left: `${newLeft}%` });
  };

  const handleRotationChange = (direction: 'clockwise' | 'counterclockwise') => {
    const step = 15; // 15 degree steps
    const newRotation = direction === 'clockwise' 
      ? rotation + step 
      : rotation - step;
    onRotationChange(frameId, newRotation);
  };

  const handleSizeChange = () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    onSizeChange(frameId, sizes[nextIndex]);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute z-40 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/50 download-ignore"
         style={{
           top: `calc(${position.top} - 60px)`,
           left: `calc(${position.left} + 100px)`
         }}>
      <div className="flex flex-col gap-2">
        {/* Position Controls */}
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <button
            onClick={() => handlePositionChange('up')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Move Up"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handlePositionChange('left')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Move Left"
          >
            ←
          </button>
          <Move size={16} className="text-gray-500 mx-auto" />
          <button
            onClick={() => handlePositionChange('right')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Move Right"
          >
            →
          </button>
          <div></div>
          <button
            onClick={() => handlePositionChange('down')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Move Down"
          >
            ↓
          </button>
          <div></div>
        </div>

        {/* Rotation and Size Controls */}
        <div className="flex gap-1 justify-center border-t pt-2">
          <button
            onClick={() => handleRotationChange('counterclockwise')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Rotate Left"
          >
            <RotateCw size={14} className="transform rotate-180" />
          </button>
          <button
            onClick={() => handleRotationChange('clockwise')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"  
            title="Rotate Right"
          >
            <RotateCw size={14} />
          </button>
          <button
            onClick={handleSizeChange}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={`Size: ${size}`}
          >
            {size === 'small' ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FramePositionControl;
