import { LayoutConfig } from '@/types/styles';

class AILayoutGenerator {
  private layoutStyles = [
    'scattered', 'grid', 'cluster', 'diagonal', 'circular', 'vintage-stack'
  ];

  private getScatteredLayout(frameCount: number): { top: string; left: string }[] {
    return Array.from({ length: frameCount }, () => ({
      top: `${Math.random() * 60 + 10}%`,
      left: `${Math.random() * 60 + 10}%`
    }));
  }

  private getGridLayout(frameCount: number): { top: string; left: string }[] {
    const cols = Math.ceil(Math.sqrt(frameCount));
    const rows = Math.ceil(frameCount / cols);
    const positions = [];
    
    for (let i = 0; i < frameCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      positions.push({
        top: `${15 + (row * 60 / rows)}%`,
        left: `${15 + (col * 60 / cols)}%`
      });
    }
    return positions;
  }

  private getClusterLayout(frameCount: number): { top: string; left: string }[] {
    const centerX = 40;
    const centerY = 40;
    const radius = 25;
    
    return Array.from({ length: frameCount }, (_, i) => {
      const angle = (i * 360 / frameCount) * (Math.PI / 180);
      const x = centerX + Math.cos(angle) * radius + (Math.random() * 10 - 5);
      const y = centerY + Math.sin(angle) * radius + (Math.random() * 10 - 5);
      
      return {
        top: `${Math.max(5, Math.min(75, y))}%`,
        left: `${Math.max(5, Math.min(75, x))}%`
      };
    });
  }

  private getDiagonalLayout(frameCount: number): { top: string; left: string }[] {
    return Array.from({ length: frameCount }, (_, i) => ({
      top: `${10 + (i * 50 / frameCount)}%`,
      left: `${10 + (i * 60 / frameCount)}%`
    }));
  }

  private getCircularLayout(frameCount: number): { top: string; left: string }[] {
    const centerX = 45;
    const centerY = 45;
    const radius = 30;
    
    return Array.from({ length: frameCount }, (_, i) => {
      const angle = (i * 360 / frameCount) * (Math.PI / 180);
      return {
        top: `${centerY + Math.sin(angle) * radius}%`,
        left: `${centerX + Math.cos(angle) * radius}%`
      };
    });
  }

  private getVintageStackLayout(frameCount: number): { top: string; left: string }[] {
    // Overlapping stack effect
    const baseX = 25;
    const baseY = 20;
    
    return Array.from({ length: frameCount }, (_, i) => ({
      top: `${baseY + i * 8 + Math.random() * 10}%`,
      left: `${baseX + i * 6 + Math.random() * 15}%`
    }));
  }

  private getRandomRotation(): number {
    return Math.random() * 20 - 10; // -10 to 10 degrees
  }

  private getVariedSize(): 'small' | 'medium' | 'large' {
    const rand = Math.random();
    if (rand < 0.3) return 'small';
    if (rand < 0.7) return 'medium';
    return 'large';
  }

  private getRandomPosition(): { top: string; left: string } {
    return {
      top: `${Math.random() * 70 + 5}%`,
      left: `${Math.random() * 80 + 5}%`
    };
  }

  private getRandomDecorativeType(): 'tape' | 'sticker' | 'doodle' {
    const types: Array<'tape' | 'sticker' | 'doodle'> = ['tape', 'sticker', 'doodle'];
    return types[Math.floor(Math.random() * types.length)];
  }

  generateCollageLayout(frameCount: number = 8): LayoutConfig {
    // Pick a random layout style
    const layoutStyle = this.layoutStyles[Math.floor(Math.random() * this.layoutStyles.length)];
    console.log(`Generating ${layoutStyle} layout with ${frameCount} frames`);
    
    let positions: { top: string; left: string }[];
    
    switch (layoutStyle) {
      case 'grid':
        positions = this.getGridLayout(frameCount);
        break;
      case 'cluster':
        positions = this.getClusterLayout(frameCount);
        break;
      case 'diagonal':
        positions = this.getDiagonalLayout(frameCount);
        break;
      case 'circular':
        positions = this.getCircularLayout(frameCount);
        break;
      case 'vintage-stack':
        positions = this.getVintageStackLayout(frameCount);
        break;
      default: // scattered
        positions = this.getScatteredLayout(frameCount);
    }

    const frames = positions.map((position, i) => ({
      id: `frame${i + 1}`,
      rotation: this.getRandomRotation(),
      position,
      size: this.getVariedSize()
    }));

    // Generate complementary decorative elements
    const decorativeElements = Array.from({ length: 4 + Math.floor(Math.random() * 4) }, () => ({
      type: this.getRandomDecorativeType(),
      position: this.getRandomPosition(),
      rotation: Math.random() * 60 - 30,
      size: 'small' as const
    }));

    return { frames, decorativeElements };
  }

  // Keep backward compatibility
  generateLayout(frameCount: number = 6): LayoutConfig {
    return this.generateCollageLayout(frameCount);
  }
}

export const aiLayoutGenerator = new AILayoutGenerator();
