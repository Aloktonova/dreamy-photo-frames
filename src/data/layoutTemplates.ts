
export interface LayoutCell {
  id: string;
  gridColumn: number;
  gridRow: number;
  gridColumnSpan: number;
  gridRowSpan: number;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  gridColumns: number;
  gridRows: number;
  cells: LayoutCell[];
  icon?: string;
  isPro?: boolean;
  category?: string;
  maxPhotos?: number;
  featured?: boolean;
  new?: boolean;
}

export const layoutTemplates: LayoutTemplate[] = [
  // --- Classic Grids ---
  {
    id: 'grid-2x2', name: '2x2 Grid', icon: '⊞', category: 'Grid', maxPhotos: 4, gridColumns: 2, gridRows: 2, featured: true,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-3x3', name: '3x3 Grid', icon: '⊟', category: 'Grid', maxPhotos: 9, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-4x2', name: '4x2 Grid', icon: '▦', category: 'Grid', maxPhotos: 8, gridColumns: 4, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-2x5', name: '2x5 Grid', icon: '▥', category: 'Grid', maxPhotos: 10, gridColumns: 2, gridRows: 5,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 1, gridRow: 4, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 2, gridRow: 4, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 1, gridRow: 5, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-10', gridColumn: 2, gridRow: 5, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-1x4', name: '1x4 Strip', icon: '▬', category: 'Grid', maxPhotos: 4, gridColumns: 4, gridRows: 1,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-3x1', name: '3x1 Strip', icon: '⫶', category: 'Grid', maxPhotos: 3, gridColumns: 1, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  // --- Asymmetric/Centerpiece ---
  {
    id: 'centerpiece-1plus4', name: '1+4 Centerpiece', icon: '◎', category: 'Asymmetric', maxPhotos: 5, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }, // center
      { id: 'frame-2', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'magazine-split', name: 'Magazine Split', icon: '▤', category: 'Magazine', maxPhotos: 6, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 2, gridRowSpan: 2 }, // large
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'zigzag', name: 'Zig-Zag', icon: '⧗', category: 'Creative', maxPhotos: 5, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  // --- Iconic Shapes ---
  {
    id: 'circle-7', name: 'Circle Shape', icon: '◯', category: 'Shape', maxPhotos: 7, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'heart-10', name: 'Heart Shape', icon: '♥', category: 'Shape', maxPhotos: 10, gridColumns: 5, gridRows: 4,
    cells: [
      { id: 'frame-1', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 4, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 5, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 2, gridRow: 4, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-10', gridColumn: 4, gridRow: 4, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'star-7', name: 'Star Shape', icon: '★', category: 'Shape', maxPhotos: 7, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'diamond-8', name: 'Diamond Grid', icon: '◆', category: 'Shape', maxPhotos: 8, gridColumns: 4, gridRows: 4,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'hex-8', name: 'Hexagon Honeycomb', icon: '⬡', category: 'Shape', maxPhotos: 8, gridColumns: 4, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  // --- Creative/Themed ---
  {
    id: 'polaroid-6', name: 'Polaroid Stacks', icon: '🖼️', category: 'Creative', maxPhotos: 6, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'filmstrip-4', name: 'Film Strip', icon: '🎞️', category: 'Creative', maxPhotos: 4, gridColumns: 4, gridRows: 1,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'timeline-6', name: 'Timeline', icon: '⏳', category: 'Event', maxPhotos: 6, gridColumns: 2, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'classic-five', name: 'Classic Five', icon: '✦', category: 'Classic', maxPhotos: 5, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'story-vertical', name: 'Story Vertical', icon: '🗂️', category: 'Social', maxPhotos: 6, gridColumns: 2, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'double-strip', name: 'Double Strip', icon: '⎌', category: 'Grid', maxPhotos: 8, gridColumns: 4, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'party-theme', name: 'Party Theme', icon: '🎉', category: 'Event', maxPhotos: 9, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'travel-map', name: 'Travel Map', icon: '🗺️', category: 'Event', maxPhotos: 6, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'spiral-7', name: 'Spiral', icon: '🌀', category: 'Shape', maxPhotos: 7, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'puzzle-6', name: 'Puzzle Pieces', icon: '🧩', category: 'Creative', maxPhotos: 6, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'modern-minimal', name: 'Modern Minimalist', icon: '⬛', category: 'Classic', maxPhotos: 5, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 2, gridRowSpan: 2 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'freeform-8', name: 'Freeform Artistic', icon: '✧', category: 'Creative', maxPhotos: 8, gridColumns: 4, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 2, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 2, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 4, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'letter-mask', name: 'Letter Mask', icon: 'A', category: 'Creative', maxPhotos: 6, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 2 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 2 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 2 },
      { id: 'frame-4', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'family-tree', name: 'Family Tree', icon: '🌳', category: 'Event', maxPhotos: 9, gridColumns: 3, gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'pet-paw', name: 'Pet Paw', icon: '🐾', category: 'Event', maxPhotos: 6, gridColumns: 3, gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'photo-booth', name: 'Photo Booth', icon: '📸', category: 'Social', maxPhotos: 4, gridColumns: 1, gridRows: 4, new: true,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 1, gridRow: 4, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'story-banner', name: 'Story Banner', icon: '🖼️', category: 'Social', maxPhotos: 3, gridColumns: 3, gridRows: 1, new: true,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'timeline-horizontal', name: 'Timeline Horizontal', icon: '⏳', category: 'Event', maxPhotos: 6, gridColumns: 6, gridRows: 1, featured: true,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 4, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 5, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 6, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'wedding-theme', name: 'Wedding Theme', icon: '💍', category: 'Event', maxPhotos: 9, gridColumns: 3, gridRows: 3, new: true,
    cells: [
      { id: 'frame-1', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-5', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-6', gridColumn: 2, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-7', gridColumn: 3, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-8', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-9', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  }
];
