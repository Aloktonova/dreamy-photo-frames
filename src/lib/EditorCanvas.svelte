<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let canvasContainer: HTMLElement;
  
  // Canvas state
  let elements: any[] = [];
  let selectedElement: any = null;
  let isDragging = false;
  let isResizing = false;
  let dragStart = { x: 0, y: 0 };
  let canvasSize = { width: 800, height: 600 };
  let zoom = 1;
  
  // History for undo/redo
  let history: any[] = [];
  let historyIndex = -1;
  
  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d')!;
      resizeCanvas();
      saveState();
    }
    
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  });

  function resizeCanvas() {
    if (!canvas || !canvasContainer) return;
    
    const containerRect = canvasContainer.getBoundingClientRect();
    const maxWidth = Math.min(containerRect.width - 40, 1200);
    const maxHeight = Math.min(containerRect.height - 40, 800);
    
    const aspectRatio = canvasSize.width / canvasSize.height;
    
    if (maxWidth / aspectRatio <= maxHeight) {
      canvas.style.width = maxWidth + 'px';
      canvas.style.height = (maxWidth / aspectRatio) + 'px';
    } else {
      canvas.style.height = maxHeight + 'px';
      canvas.style.width = (maxHeight * aspectRatio) + 'px';
    }
    
    redraw();
  }

  function addImage(imageData: { url: string, name: string }) {
    const img = new Image();
    img.onload = () => {
      const element = {
        id: Date.now(),
        type: 'image',
        src: imageData.url,
        x: 50,
        y: 50,
        width: Math.min(200, img.naturalWidth),
        height: Math.min(200, img.naturalHeight),
        rotation: 0,
        opacity: 1,
        filters: {},
        image: img
      };
      
      elements = [...elements, element];
      selectedElement = element;
      saveState();
      redraw();
    };
    img.src = imageData.url;
  }

  function addText(textData: any) {
    const element = {
      id: Date.now(),
      type: 'text',
      content: textData.text,
      x: textData.x || 100,
      y: textData.y || 100,
      font: textData.font || 'Inter',
      size: textData.size || 24,
      color: textData.color || '#000000',
      style: textData.style || 'normal',
      rotation: 0,
      opacity: 1
    };
    
    elements = [...elements, element];
    selectedElement = element;
    saveState();
    redraw();
  }

  function addSticker(stickerData: any) {
    const element = {
      id: Date.now(),
      type: 'sticker',
      content: stickerData.content,
      x: 150,
      y: 150,
      size: stickerData.size || 40,
      rotation: 0,
      opacity: 1
    };
    
    elements = [...elements, element];
    selectedElement = element;
    saveState();
    redraw();
  }

  function redraw() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Draw elements
    elements.forEach(element => {
      ctx.save();
      ctx.globalAlpha = element.opacity;
      
      // Apply transformations
      ctx.translate(element.x + element.width/2, element.y + element.height/2);
      ctx.rotate(element.rotation * Math.PI / 180);
      ctx.translate(-element.width/2, -element.height/2);
      
      if (element.type === 'image') {
        if (element.image) {
          ctx.drawImage(element.image, 0, 0, element.width, element.height);
        }
      } else if (element.type === 'text') {
        ctx.font = `${element.style === 'bold' ? 'bold ' : ''}${element.size}px ${element.font}`;
        ctx.fillStyle = element.color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        if (element.style === 'outline') {
          ctx.strokeStyle = element.color;
          ctx.lineWidth = 2;
          ctx.strokeText(element.content, 0, 0);
        } else {
          ctx.fillText(element.content, 0, 0);
        }
      } else if (element.type === 'sticker') {
        ctx.font = `${element.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.content, element.size/2, element.size/2);
      }
      
      ctx.restore();
      
      // Draw selection handles
      if (selectedElement && selectedElement.id === element.id) {
        drawSelectionHandles(element);
      }
    });
  }

  function drawSelectionHandles(element: any) {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.setLineDash([]);
    
    // Corner handles
    const handleSize = 8;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(element.x - handleSize/2, element.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(element.x + element.width - handleSize/2, element.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(element.x - handleSize/2, element.y + element.height - handleSize/2, handleSize, handleSize);
    ctx.fillRect(element.x + element.width - handleSize/2, element.y + element.height - handleSize/2, handleSize, handleSize);
  }

  function getCanvasPoint(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function getElementAt(x: number, y: number) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      if (x >= element.x && x <= element.x + element.width &&
          y >= element.y && y <= element.y + element.height) {
        return element;
      }
    }
    return null;
  }

  function handleMouseDown(event: MouseEvent) {
    const point = getCanvasPoint(event.clientX, event.clientY);
    const element = getElementAt(point.x, point.y);
    
    if (element) {
      selectedElement = element;
      isDragging = true;
      dragStart = { x: point.x - element.x, y: point.y - element.y };
    } else {
      selectedElement = null;
    }
    
    redraw();
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging || !selectedElement) return;
    
    const point = getCanvasPoint(event.clientX, event.clientY);
    selectedElement.x = point.x - dragStart.x;
    selectedElement.y = point.y - dragStart.y;
    
    redraw();
  }

  function handleMouseUp() {
    if (isDragging) {
      isDragging = false;
      saveState();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' && selectedElement) {
      elements = elements.filter(el => el.id !== selectedElement.id);
      selectedElement = null;
      saveState();
      redraw();
    } else if (event.ctrlKey || event.metaKey) {
      if (event.key === 'z') {
        event.preventDefault();
        undo();
      } else if (event.key === 'y') {
        event.preventDefault();
        redo();
      }
    }
  }

  function saveState() {
    history = history.slice(0, historyIndex + 1);
    history.push(JSON.parse(JSON.stringify(elements)));
    historyIndex++;
    
    if (history.length > 50) {
      history.shift();
      historyIndex--;
    }
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      elements = JSON.parse(JSON.stringify(history[historyIndex]));
      selectedElement = null;
      redraw();
    }
  }

  function redo() {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      elements = JSON.parse(JSON.stringify(history[historyIndex]));
      selectedElement = null;
      redraw();
    }
  }

  function downloadCollage() {
    const link = document.createElement('a');
    link.download = 'my-collage.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  // Event handlers for sidebar events
  function handleImageUpload(event: CustomEvent) {
    addImage(event.detail);
  }

  function handleTextAdd(event: CustomEvent) {
    addText(event.detail);
  }

  function handleStickerSelect(event: CustomEvent) {
    addSticker(event.detail);
  }

  function handleTemplateSelect(event: CustomEvent) {
    // Apply template layout
    const template = event.detail;
    elements = [];
    selectedElement = null;
    
    // Create placeholder elements based on template
    if (template.layout === 'grid') {
      const cellWidth = canvasSize.width / template.cols;
      const cellHeight = canvasSize.height / template.rows;
      
      for (let row = 0; row < template.rows; row++) {
        for (let col = 0; col < template.cols; col++) {
          elements.push({
            id: Date.now() + row * template.cols + col,
            type: 'placeholder',
            x: col * cellWidth + 10,
            y: row * cellHeight + 10,
            width: cellWidth - 20,
            height: cellHeight - 20,
            rotation: 0,
            opacity: 1
          });
        }
      }
    }
    
    saveState();
    redraw();
  }

  // Expose functions for parent component
  export function getCanvasElement() {
    return canvas;
  }

  export function exportCanvas() {
    return canvas.toDataURL();
  }
</script>

<div 
  bind:this={canvasContainer}
  class="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative"
  role="main"
  aria-label="Collage editing canvas"
>
  <!-- Canvas Container -->
  <div class="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-full max-h-full">
    <canvas
      bind:this={canvas}
      width={canvasSize.width}
      height={canvasSize.height}
      class="block cursor-crosshair"
      on:mousedown={handleMouseDown}
      on:mousemove={handleMouseMove}
      on:mouseup={handleMouseUp}
      on:keydown={handleKeyDown}
      tabindex="0"
    />
    
    <!-- Canvas Overlay Controls -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <button 
        class="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        on:click={downloadCollage}
        aria-label="Download collage"
      >
        <span class="material-symbols-outlined text-gray-600">download</span>
      </button>
      
      <button 
        class="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        aria-label="Zoom to fit"
      >
        <span class="material-symbols-outlined text-gray-600">zoom_out_map</span>
      </button>
    </div>

    <!-- Element Properties Panel -->
    {#if selectedElement}
      <div class="absolute bottom-2 left-2 right-2 bg-white rounded-lg shadow-lg p-3 flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <label class="text-sm text-gray-600">Opacity:</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            bind:value={selectedElement.opacity}
            on:input={redraw}
            class="w-20"
          />
        </div>
        
        <div class="flex items-center space-x-2">
          <label class="text-sm text-gray-600">Rotation:</label>
          <input 
            type="range" 
            min="-180" 
            max="180"
            bind:value={selectedElement.rotation}
            on:input={redraw}
            class="w-20"
          />
        </div>
        
        <button 
          class="p-1 rounded hover:bg-gray-100"
          on:click={() => { selectedElement = null; redraw(); }}
          aria-label="Deselect element"
        >
          <span class="material-symbols-outlined text-gray-600 text-sm">close</span>
        </button>
      </div>
    {/if}
  </div>

  <!-- Welcome Message (when canvas is empty) -->
  {#if elements.length === 0}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="text-center">
        <span class="material-symbols-outlined text-6xl text-gray-300 block mb-4">
          collections
        </span>
        <h3 class="text-xl font-medium text-gray-400 mb-2">Create Your Dream Collage</h3>
        <p class="text-gray-400">Start by choosing a template or uploading photos</p>
      </div>
    </div>
  {/if}
</div>

<!-- Event Listeners -->
<svelte:window 
  on:imageUpload={handleImageUpload}
  on:textAdd={handleTextAdd}
  on:stickerSelect={handleStickerSelect}
  on:templateSelect={handleTemplateSelect}
/>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>