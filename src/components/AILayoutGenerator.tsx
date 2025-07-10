import { GridLayoutConfig } from '@/types/styles';

class AILayoutGenerator {
  private layoutStyles = [
    'scattered', 'grid', 'cluster', 'diagonal', 'circular', 'vintage-stack'
  ];

  // More dramatic scattered layout with varied sizes
  private getScatteredLayout(frameCount: number): { top: string; left: string }[] {
    return Array.from({ length: frameCount }, () => ({
      top: `${Math.random() * 65 + 5}%`,
      left: `${Math.random() * 70 + 5}%`
    }));
  }

  // Cleaner grid with some randomness
  private getGridLayout(frameCount: number): { top: string; left: string }[] {
    const cols = Math.ceil(Math.sqrt(frameCount));
    const rows = Math.ceil(frameCount / cols);
    const positions = [];
    
    for (let i = 0; i < frameCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // Add slight randomness to break perfect grid
      const randomOffsetX = Math.random() * 8 - 4;
      const randomOffsetY = Math.random() * 8 - 4;
      positions.push({
        top: `${12 + (row * 55 / rows) + randomOffsetY}%`,
        left: `${12 + (col * 65 / cols) + randomOffsetX}%`
      });
    }
    return positions;
  }

  // Tight cluster with overlapping effect
  private getClusterLayout(frameCount: number): { top: string; left: string }[] {
    const centerX = 35 + Math.random() * 20; // Random center
    const centerY = 35 + Math.random() * 20;
    const radius = 20 + Math.random() * 15; // Variable cluster size
    
    return Array.from({ length: frameCount }, (_, i) => {
      const angle = (i * 360 / frameCount) * (Math.PI / 180) + Math.random() * 0.5;
      const distance = radius * (0.3 + Math.random() * 0.7); // Varied distances
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      return {
        top: `${Math.max(5, Math.min(70, y))}%`,
        left: `${Math.max(5, Math.min(75, x))}%`
      };
    });
  }

  // Dramatic diagonal sweep
  private getDiagonalLayout(frameCount: number): { top: string; left: string }[] {
    const startX = Math.random() * 20 + 5;
    const startY = Math.random() * 20 + 5;
    const direction = Math.random() > 0.5 ? 1 : -1; // Diagonal direction
    
    return Array.from({ length: frameCount }, (_, i) => {
      const progress = i / (frameCount - 1);
      return {
        top: `${startY + progress * 55 + Math.random() * 10 - 5}%`,
        left: `${startX + progress * 60 * direction + Math.random() * 10 - 5}%`
      };
    });
  }

  // Perfect circle with varied radii
  private getCircularLayout(frameCount: number): { top: string; left: string }[] {
    const centerX = 40 + Math.random() * 20;
    const centerY = 40 + Math.random() * 20;
    const baseRadius = 25 + Math.random() * 10;
    
    return Array.from({ length: frameCount }, (_, i) => {
      const angle = (i * 360 / frameCount) * (Math.PI / 180);
      const radius = baseRadius + Math.random() * 8 - 4; // Slightly varied radius
      return {
        top: `${centerY + Math.sin(angle) * radius}%`,
        left: `${centerX + Math.cos(angle) * radius}%`
      };
    });
  }

  // Messy overlapping stack
  private getVintageStackLayout(frameCount: number): { top: string; left: string }[] {
    const baseX = 20 + Math.random() * 20;
    const baseY = 15 + Math.random() * 20;
    
    return Array.from({ length: frameCount }, (_, i) => ({
      top: `${baseY + i * 6 + Math.random() * 15}%`,
      left: `${baseX + i * 4 + Math.random() * 20}%`
    }));
  }

  // Much more dramatic rotation range
  private getRandomRotation(): number {
    return Math.random() * 30 - 15; // -15 to 15 degrees for more noticeable tilt
  }

  // More varied size distribution
  private getVariedSize(): 'small' | 'medium' | 'large' {
    const rand = Math.random();
    if (rand < 0.25) return 'small';   // 25% small
    if (rand < 0.65) return 'medium';  // 40% medium  
    return 'large';                    // 35% large
  }

  // Create dramatic size variations for focus photos
  private createFocusLayout(frameCount: number): ('small' | 'medium' | 'large')[] {
    const sizes: ('small' | 'medium' | 'large')[] = [];
    
    // Always have 1-2 large focus photos
    const largeFocusCount = Math.min(2, Math.max(1, Math.floor(frameCount * 0.3)));
    
    // Fill with varied sizes
    for (let i = 0; i < frameCount; i++) {
      if (i < largeFocusCount) {
        sizes.push('large');
      } else {
        sizes.push(this.getVariedSize());
      }
    }
    
    // Shuffle the array to randomize large photo positions
    return sizes.sort(() => Math.random() - 0.5);
  }

  private getRandomPosition(): { top: string; left: string } {
    return {
      top: `${Math.random() * 65 + 5}%`,
      left: `${Math.random() * 75 + 5}%`
    };
  }

  private getRandomDecorativeType(): 'tape' | 'sticker' | 'doodle' {
    const types: Array<'tape' | 'sticker' | 'doodle'> = ['tape', 'sticker', 'doodle'];
    return types[Math.floor(Math.random() * types.length)];
  }

  generateCollageLayout(frameCount: number = 4): GridLayoutConfig {
    // Generate a simple grid layout
    const cols = frameCount === 4 ? 2 : frameCount === 6 ? 3 : frameCount === 9 ? 3 : 2;
    const rows = Math.ceil(frameCount / cols);
    
    const frames = Array.from({ length: frameCount }, (_, i) => {
      const row = Math.floor(i / cols) + 1;
      const col = (i % cols) + 1;
      
      return {
        id: `frame-${i + 1}`,
        gridColumn: col,
        gridRow: row,
        gridColumnSpan: 1,
        gridRowSpan: 1
      };
    });

    return { 
      frames, 
      gridColumns: cols,
      gridRows: rows,
      decorativeElements: [] 
    };
  }

  generateLayout(frameCount: number = 4): GridLayoutConfig {
    return this.generateCollageLayout(frameCount);
  }
}

export const aiLayoutGenerator = new AILayoutGenerator();
