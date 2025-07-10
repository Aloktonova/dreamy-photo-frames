
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
}

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'grid-2x2',
    name: '2x2 Grid',
    icon: '⊞',
    gridColumns: 2,
    gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-4', gridColumn: 2, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-3x3',
    name: '3x3 Grid',
    icon: '⊟',
    gridColumns: 3,
    gridRows: 3,
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
    id: 'grid-1x3',
    name: '1x3 Strip',
    icon: '▬',
    gridColumns: 3,
    gridRows: 1,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 2, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-3x1',
    name: '3x1 Strip',
    icon: '⫶',
    gridColumns: 1,
    gridRows: 3,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-2', gridColumn: 1, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 1, gridRow: 3, gridColumnSpan: 1, gridRowSpan: 1 }
    ]
  },
  {
    id: 'grid-2x3',
    name: '2x3 Grid',
    icon: '▦',
    gridColumns: 2,
    gridRows: 3,
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
    id: 'grid-focus',
    name: 'Focus Grid',
    icon: '●',
    gridColumns: 3,
    gridRows: 2,
    cells: [
      { id: 'frame-1', gridColumn: 1, gridRow: 1, gridColumnSpan: 2, gridRowSpan: 2 },
      { id: 'frame-2', gridColumn: 3, gridRow: 1, gridColumnSpan: 1, gridRowSpan: 1 },
      { id: 'frame-3', gridColumn: 3, gridRow: 2, gridColumnSpan: 1, gridRowSpan: 1 }
    ],
    isPro: true
  }
];
