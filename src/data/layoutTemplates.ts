
export interface LayoutCell {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  cells: LayoutCell[];
  icon: string;
}

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'grid2x2',
    name: '2x2 Grid',
    icon: '⊞',
    cells: [
      { id: 'cell-1', x: 0, y: 0, w: 1, h: 1 },
      { id: 'cell-2', x: 1, y: 0, w: 1, h: 1 },
      { id: 'cell-3', x: 0, y: 1, w: 1, h: 1 },
      { id: 'cell-4', x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: 'grid3',
    name: '3 Grid',
    icon: '⊟',
    cells: [
      { id: 'cell-1', x: 0, y: 0, w: 1, h: 1 },
      { id: 'cell-2', x: 1, y: 0, w: 1, h: 1 },
      { id: 'cell-3', x: 0, y: 1, w: 2, h: 1 }
    ]
  },
  {
    id: 'split',
    name: 'Split',
    icon: '⫶',
    cells: [
      { id: 'cell-1', x: 0, y: 0, w: 1, h: 2 },
      { id: 'cell-2', x: 1, y: 0, w: 1, h: 1 },
      { id: 'cell-3', x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: 'circle',
    name: 'Circle Center',
    icon: '●',
    cells: [
      { id: 'cell-1', x: 0.5, y: 0.5, w: 0.8, h: 0.8 },
      { id: 'cell-2', x: 0.1, y: 0.1, w: 0.3, h: 0.3 },
      { id: 'cell-3', x: 0.6, y: 0.1, w: 0.3, h: 0.3 },
      { id: 'cell-4', x: 0.1, y: 0.6, w: 0.3, h: 0.3 },
      { id: 'cell-5', x: 0.6, y: 0.6, w: 0.3, h: 0.3 }
    ]
  },
  {
    id: 'magazine',
    name: 'Magazine',
    icon: '⬛',
    cells: [
      { id: 'cell-1', x: 0, y: 0, w: 2, h: 1 },
      { id: 'cell-2', x: 0, y: 1, w: 1, h: 1 },
      { id: 'cell-3', x: 1, y: 1, w: 1, h: 0.5 },
      { id: 'cell-4', x: 1, y: 1.5, w: 1, h: 0.5 }
    ]
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    icon: '◆',
    cells: [
      { id: 'cell-1', x: 0, y: 0, w: 0.6, h: 0.6 },
      { id: 'cell-2', x: 0.6, y: 0, w: 0.4, h: 0.4 },
      { id: 'cell-3', x: 0.6, y: 0.4, w: 0.4, h: 0.2 },
      { id: 'cell-4', x: 0, y: 0.6, w: 0.3, h: 0.4 },
      { id: 'cell-5', x: 0.3, y: 0.6, w: 0.3, h: 0.4 },
      { id: 'cell-6', x: 0.6, y: 0.6, w: 0.4, h: 0.4 }
    ]
  }
];
