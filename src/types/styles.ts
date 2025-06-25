
export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    cardBackground: string;
    primary: string;
    accent: string[];
  };
  decorativeElements: {
    tapeColors: string[];
    stickerColors: string[];
    doodleColors: string[];
  };
  fonts: {
    heading: string;
    caption: string;
  };
}

export interface LayoutConfig {
  frames: Array<{
    id: string;
    rotation: number;
    position: { top: string; left: string };
    size: 'small' | 'medium' | 'large';
  }>;
  decorativeElements: Array<{
    type: 'tape' | 'sticker' | 'doodle';
    position: { top: string; left: string };
    rotation?: number;
    color?: string;
    size?: 'small' | 'medium' | 'large';
  }>;
}
