
import html2canvas from 'html2canvas';

export interface DownloadOptions {
  filename?: string;
  format?: 'png' | 'jpeg';
  quality?: number;
}

export const downloadCollageAsImage = async (
  elementId: string,
  options: DownloadOptions = {}
) => {
  const {
    filename = `collage-${Date.now()}`,
    format = 'png',
    quality = 0.95
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Collage element not found');
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight
    });

    // Convert to blob
    return new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.${format}`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleanup
        URL.revokeObjectURL(url);
        resolve();
      }, `image/${format}`, quality);
    });
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};
