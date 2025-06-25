
import { LayoutConfig } from '@/types/styles';

class AILayoutGenerator {
  private getRandomPosition(): { top: string; left: string } {
    const top = Math.random() * 70 + 5; // 5% to 75%
    const left = Math.random() * 80 + 5; // 5% to 85%
    return {
      top: `${top}%`,
      left: `${left}%`
    };
  }

  private getRandomRotation(): number {
    return Math.random() * 10 - 5; // -5 to 5 degrees
  }

  private getRandomSize(): 'small' | 'medium' | 'large' {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const weights = [0.3, 0.5, 0.2]; // More medium sizes
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

  generateLayout(frameCount: number = 6, decorativeCount: number = 8): LayoutConfig {
    const frames = [];
    const decorativeElements = [];

    // Generate frames with some spacing logic
    const usedAreas: Array<{ top: number; left: number; size: string }> = [];

    for (let i = 0; i < frameCount; i++) {
      let position;
      let attempts = 0;
      
      do {
        position = this.getRandomPosition();
        attempts++;
      } while (attempts < 10 && this.hasOverlap(position, usedAreas));

      const size = this.getRandomSize();
      
      frames.push({
        id: `frame${i + 1}`,
        rotation: this.getRandomRotation(),
        position,
        size
      });

      usedAreas.push({
        top: parseFloat(position.top),
        left: parseFloat(position.left),
        size
      });
    }

    // Generate decorative elements
    for (let i = 0; i < decorativeCount; i++) {
      decorativeElements.push({
        type: this.getRandomDecorativeType(),
        position: this.getRandomPosition(),
        rotation: Math.random() * 90 - 45, // -45 to 45 degrees
        size: this.getRandomSize()
      });
    }

    return { frames, decorativeElements };
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
      return distance < 15; // Minimum distance between frames
    });
  }
}

export const aiLayoutGenerator = new AILayoutGenerator();
