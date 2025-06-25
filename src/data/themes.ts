
import { Theme } from '@/types/styles';

export const themes: Theme[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    colors: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
      cardBackground: '#FFFFFF',
      primary: '#2C3E50',
      accent: ['#ECF0F1', '#BDC3C7', '#95A5A6']
    },
    decorativeElements: {
      tapeColors: ['rgba(255,255,255,0.9)', 'rgba(240,240,240,0.8)'],
      stickerColors: ['#ECF0F1', '#D5DBDB'],
      doodleColors: ['#BDC3C7', '#95A5A6']
    },
    fonts: {
      heading: 'font-clean',
      caption: 'font-clean'
    }
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    colors: {
      background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE5B4 100%)',
      cardBackground: '#FFFFFF',
      primary: '#8B4513',
      accent: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    },
    decorativeElements: {
      tapeColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      stickerColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      doodleColors: ['#E17055', '#00B894', '#0984E3']
    },
    fonts: {
      heading: 'font-handwritten',
      caption: 'font-handwritten'
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    colors: {
      background: 'linear-gradient(135deg, #F4E4BC 0%, #E6D7B7 100%)',
      cardBackground: '#FFF8DC',
      primary: '#8B4513',
      accent: ['#CD853F', '#DEB887', '#D2691E', '#A0522D']
    },
    decorativeElements: {
      tapeColors: ['rgba(205,133,63,0.8)', 'rgba(222,184,135,0.8)'],
      stickerColors: ['#CD853F', '#DEB887', '#D2691E'],
      doodleColors: ['#8B4513', '#A0522D']
    },
    fonts: {
      heading: 'font-handwritten',
      caption: 'font-handwritten'
    }
  },
  {
    id: 'romantic',
    name: 'Romantic',
    colors: {
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
      cardBackground: '#FFFFFF',
      primary: '#C71585',
      accent: ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#F8BBD9']
    },
    decorativeElements: {
      tapeColors: ['rgba(255,182,193,0.8)', 'rgba(255,192,203,0.8)'],
      stickerColors: ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#F8BBD9'],
      doodleColors: ['#C71585', '#DB7093']
    },
    fonts: {
      heading: 'font-handwritten',
      caption: 'font-handwritten'
    }
  },
  {
    id: 'travel',
    name: 'Travel',
    colors: {
      background: 'linear-gradient(135deg, #E8F4FD 0%, #D1E7DD 100%)',
      cardBackground: '#FFFFFF',
      primary: '#2E8B57',
      accent: ['#4682B4', '#20B2AA', '#32CD32', '#FFD700']
    },
    decorativeElements: {
      tapeColors: ['rgba(70,130,180,0.8)', 'rgba(32,178,170,0.8)'],
      stickerColors: ['#4682B4', '#20B2AA', '#32CD32', '#FFD700'],
      doodleColors: ['#2E8B57', '#1E90FF']
    },
    fonts: {
      heading: 'font-handwritten',
      caption: 'font-clean'
    }
  }
];
