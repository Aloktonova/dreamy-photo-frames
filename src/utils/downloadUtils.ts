
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

    // Add extra padding to ensure frames aren't cut off
    const padding = 50;
    const originalStyle = element.style.cssText;
    
    // Temporarily adjust element for better capture
    element.style.padding = `${padding}px`;
    element.style.margin = '0';
    element.style.transform = 'none';

    // Configure html2canvas options for better quality and proper background handling
    const canvas = await html2canvas(element, {
      backgroundColor: null, // Preserve transparency for PNG
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      ignoreElements: (el) => {
        // Ignore overlay elements that shouldn't be in the download
        return el.classList.contains('download-ignore') || 
               el.tagName === 'BUTTON' ||
               el.classList.contains('opacity-0');
      }
    });

    // Restore original styles
    element.style.cssText = originalStyle;

    // Convert to blob with proper format handling
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
      }, `image/${format}`, format === 'jpeg' ? quality : undefined);
    });
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};
