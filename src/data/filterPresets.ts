import { Eye, Film, Clock, Droplet, SlidersHorizontal, EyeOff, Sun, Snowflake, Cloud, Zap, Moon } from 'lucide-react';

export const filterPresets = [
  { id: 'original', name: 'Original', icon: <Eye />, cssFilter: '' },
  { id: 'cinematic', name: 'Cinematic', icon: <Film />, cssFilter: 'contrast(1.2) saturate(1.1) brightness(1.05) hue-rotate(-10deg)' },
  { id: 'vintage', name: 'Vintage', icon: <Clock />, cssFilter: 'sepia(0.3) contrast(1.1) brightness(0.95) saturate(0.8)' },
  { id: 'vivid', name: 'Vivid', icon: <Droplet />, cssFilter: 'saturate(1.5) contrast(1.1)' },
  { id: 'matte', name: 'Matte', icon: <SlidersHorizontal />, cssFilter: 'brightness(1.1) contrast(0.9) grayscale(0.1)' },
  { id: 'bw', name: 'B&W', icon: <EyeOff />, cssFilter: 'grayscale(1) contrast(1.2)' },
  { id: 'golden', name: 'Golden Hour', icon: <Sun />, cssFilter: 'brightness(1.1) sepia(0.3) hue-rotate(-20deg)' },
  { id: 'cool', name: 'Cool Blue', icon: <Snowflake />, cssFilter: 'brightness(1.05) hue-rotate(180deg) saturate(1.1)' },
  { id: 'sepia', name: 'Sepia', icon: <Clock />, cssFilter: 'sepia(0.7) contrast(1.1)' },
  { id: 'fade', name: 'Fade', icon: <Cloud />, cssFilter: 'brightness(1.1) contrast(0.85)' },
  { id: 'pop', name: 'Pop', icon: <Zap />, cssFilter: 'contrast(1.3) saturate(1.3)' },
  { id: 'dreamy', name: 'Dreamy', icon: <Moon />, cssFilter: 'blur(1px) brightness(1.1) saturate(1.2)' },
]; 