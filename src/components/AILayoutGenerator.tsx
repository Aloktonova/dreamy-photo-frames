import { LayoutConfig } from '@/types/styles';

class AILayoutGenerator {
  private getCollagePosition(index: number, total: number): { top: string; left: string } {
    // Create a 3x3 grid-like layout similar to reference images
    const positions = [
      { top: '8%', left: '8%' },    // top-left
      { top: '8%', left: '42%' },   // top-center
      { top: '8%', left: '72%' },   // top-right
      { top: '35%', left: '8%' },   // mid-left
      { top: '35%', left: '72%' },  // mid-right (skip center for heart)
      { top: '62%', left: '8%' },   // bottom-left
      { top: '62%', left: '42%' },  // bottom-center
      { top: '62%', left: '72%' },  // bottom-right
      { top: '20%', left: '25%' },  // additional scattered positions
    ];
    
    if (index < positions.length) {
      return positions[index];
    }
    
    // Fallback to random positions
    const top = Math.random() * 70 + 10;
    const left = Math.random() * 70 + 10;
    return { top: `${top}%`, left: `${left}%` };
  }

  private getRandomPosition(): { top: string; left: string } {
    const top = Math.random() * 70 + 5; // 5% to 75%
    const left = Math.random() * 80 + 5; // 5% to 85%
    return {
      top: `${top}%`,
      left: `${left}%`
    };
  }

  private getRandomRotation(): number {
    return Math.random() * 16 - 8; // -8 to 8 degrees for more natural look
  }

  private getCollageSize(): 'small' | 'medium' | 'large' {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const weights = [0.4, 0.4, 0.2]; // More varied sizes
    const random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random <= sum) return sizes[i];
    }
    return 'medium';
  }

  private getRandomDecorativeType(): 'tape' | 'sticker' | 'doodle' {
    const types: Array<'tape' | 'sticker' | 'doodle'> = ['tape', 'sticker', 'doodle'];
    return types[Math.floor(Math.random() * types.length)];
  }

  generateCollageLayout(frameCount: number = 8): LayoutConfig {
    const frames = [];
    const decorativeElements = [];

    // Generate frames in a more organized collage style
    for (let i = 0; i < frameCount; i++) {
      const position = this.getCollagePosition(i, frameCount);
      const size = this.getCollageSize();
      
      frames.push({
        id: `frame${i + 1}`,
        rotation: this.getRandomRotation(),
        position,
        size
      });
    }

    // Generate fewer, more strategic decorative elements
    for (let i = 0; i < 6; i++) {
      decorativeElements.push({
        type: this.getRandomDecorativeType(),
        position: this.getRandomPosition(),
        rotation: Math.random() * 60 - 30, // -30 to 30 degrees
        size: 'small' as const
      });
    }

    return { frames, decorativeElements };
  }

  // Keep the original method for backward compatibility
  generateLayout(frameCount: number = 6, decorativeCount: number = 8): LayoutConfig {
    return this.generateCollageLayout(frameCount);
  }

  private hasOverlap(
    position: { top: string; left: string }, 
    usedAreas: Array<{ top: number; left: number; size: string }>
  ): boolean {
    const newTop = parseFloat(position.top);
    const newLeft = parseFloat(position.left);
    
    return usedAreas.some(area => {
      const distance = Math.sqrt(
        Math.pow(newTop - area.top, 2) + Math.pow(newLeft - area.left, 2)
      );
      return distance < 12; // Reduced minimum distance for tighter collage feel
    });
  }
}

export const aiLayoutGenerator = new AILayoutGenerator();
