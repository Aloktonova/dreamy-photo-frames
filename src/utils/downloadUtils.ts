
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

    console.log('Starting download process...', { elementId, format, quality });

    // Wait for all images to load before capturing
    const images = element.querySelectorAll('img');
    console.log(`Found ${images.length} images to load`);
    
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
        });
      })
    );

    // Small delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    // Store original styles
    const originalStyles = {
      position: element.style.position,
      zIndex: element.style.zIndex,
      transform: element.style.transform,
      overflow: element.style.overflow,
      width: element.style.width,
      height: element.style.height
    };

    // Temporarily adjust element for better capture
    element.style.position = 'relative';
    element.style.zIndex = '1';
    element.style.transform = 'none';
    element.style.overflow = 'visible';
    
    // Ensure element has proper dimensions
    const rect = element.getBoundingClientRect();
    console.log('Element dimensions:', { width: rect.width, height: rect.height });
    
    if (rect.width === 0 || rect.height === 0) {
      throw new Error('Element has no dimensions');
    }

    // Configure html2canvas with better options
    const canvas = await html2canvas(element, {
      backgroundColor: format === 'png' ? null : '#ffffff', // White background for JPEG
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true, // Allow cross-origin images
      logging: false,
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0,
      windowWidth: rect.width,
      windowHeight: rect.height,
      ignoreElements: (el) => {
        // Ignore elements that shouldn't be in the download
        return el.classList.contains('download-ignore') || 
               el.classList.contains('opacity-0') ||
               el.style.display === 'none' ||
               el.style.visibility === 'hidden';
      },
      onclone: (clonedDoc) => {
        // Ensure cloned element has proper styling
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.position = 'relative';
          clonedElement.style.transform = 'none';
          clonedElement.style.overflow = 'visible';
        }
      }
    });

    console.log('Canvas created:', { width: canvas.width, height: canvas.height });

    // Restore original styles
    Object.assign(element.style, originalStyles);

    // Convert to blob with proper format handling
    return new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }

        console.log('Blob created:', { size: blob.size, type: blob.type });

        // Check if blob is too small (likely empty/black)
        if (blob.size < 1000) {
          console.warn('Generated image is very small, may be empty');
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
        console.log('Download completed successfully');
        resolve();
      }, `image/${format}`, format === 'jpeg' ? quality : undefined);
    });
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};
