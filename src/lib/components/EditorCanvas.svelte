<script lang="ts">
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
  export let rows: number = 3;
  export let cols: number = 3;

  type FrameStyle = 'none' | 'simple' | 'shadow' | 'pink' | 'blue';
  type GridCell = { id: number; image: string | null; frameStyle?: FrameStyle };
  let grid: GridCell[] = [];

  // Collage background color
  let bgColor: string = '#f8fafc'; // default: soft gray
  const presetColors = ['#f8fafc', '#ffffff', '#f3e8ff', '#fef9c3', '#dbeafe', '#fca5a5', '#bbf7d0', '#fcd34d'];

  // Drag-and-drop state
  let dragSource: number | null = null;

  // Selection state
  let selectedIdx: number | null = null;

  // Frame style update
  function setFrameStyle(style: FrameStyle) {
    if (selectedIdx !== null && grid[selectedIdx].image) {
      grid[selectedIdx].frameStyle = style;
    }
  }

  // Expose setFrameStyle for parent (Sidebar) to call
  export { setFrameStyle };

  // Initialize or reset grid when rows/cols change
  $: {
    const total = rows * cols;
    // Preserve images and frameStyle if possible
    const oldGrid = grid.slice();
    grid = Array.from({ length: total }, (_, i) => ({
      id: i,
      image: oldGrid[i]?.image || null,
      frameStyle: oldGrid[i]?.frameStyle || 'none',
    }));
  }

  function handleFileChange(e: Event, idx: number) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        grid[idx].image = event.target?.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  function handleDragStart(idx: number) {
    dragSource = idx;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(idx: number) {
    if (dragSource !== null && dragSource !== idx) {
      [grid[dragSource].image, grid[idx].image] = [grid[idx].image, grid[dragSource].image];
      [grid[dragSource].frameStyle, grid[idx].frameStyle] = [grid[idx].frameStyle, grid[dragSource].frameStyle];
    }
    dragSource = null;
  }

  function removeImage(idx: number) {
    grid[idx].image = null;
    if (selectedIdx === idx) selectedIdx = null;
  }

  function handleCellClick(idx: number) {
    if (grid[idx].image) {
      selectedIdx = idx;
    } else {
      selectedIdx = null;
    }
  }

  function handleCanvasClick(e: MouseEvent) {
    // Only deselect if clicking outside any cell
    if (!(e.target as HTMLElement).closest('.collage-cell')) {
      selectedIdx = null;
    }
  }

  function duplicateImage(idx: number) {
    // Find an empty cell to duplicate to
    const emptyIdx = grid.findIndex(cell => !cell.image);
    if (emptyIdx !== -1) {
      grid[emptyIdx].image = grid[idx].image;
      grid[emptyIdx].frameStyle = grid[idx].frameStyle;
      selectedIdx = emptyIdx;
    }
  }

  function bringToFront(idx: number) {
    // In a real implementation, this would change z-index
    // For now, just show a toast-like effect
    console.log('Bring to front:', idx);
  }

  function sendToBack(idx: number) {
    // In a real implementation, this would change z-index
    // For now, just show a toast-like effect
    console.log('Send to back:', idx);
  }
</script>

<div class="w-full flex flex-col items-center justify-center py-8">
  <div class="mb-4 flex items-center gap-2">
    <span class="text-xs text-gray-500">Background:</span>
    {#each presetColors as color}
      <button
        class="w-6 h-6 rounded-full border-2 border-white shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
        style="background: {color}; {bgColor === color ? 'box-shadow: 0 0 0 2px #ec4899;' : ''}"
        aria-label={color}
        on:click={() => bgColor = color}
      ></button>
    {/each}
    <input type="color" bind:value={bgColor} class="w-7 h-7 ml-2 p-0 border-0 bg-transparent cursor-pointer" aria-label="Custom color" />
  </div>
  <div class="grid gap-2 w-full max-w-2xl aspect-square p-4 rounded-2xl shadow-2xl border border-gray-100"
    style="background: {bgColor}; grid-template-rows: repeat({rows}, minmax(0, 1fr)); grid-template-columns: repeat({cols}, minmax(0, 1fr));">
    {#each grid as cell, idx}
      <div
        class="relative bg-gray-100 border-2 border-dashed border-pink-200 rounded-lg flex items-center justify-center overflow-hidden group min-h-[60px] min-w-[60px] collage-cell {selectedIdx === idx && cell.image ? 'selected' : ''}"
        draggable={cell.image ? true : false}
        on:dragstart={() => handleDragStart(idx)}
        on:dragover={handleDragOver}
        on:drop={() => handleDrop(idx)}
        on:click|stopPropagation={() => handleCellClick(idx)}
        style={selectedIdx === idx && cell.image ? 'z-index:2;' : ''}
      >
        {#if cell.image}
          <img
            src={cell.image}
            alt="Collage cell image"
            class="object-cover w-full h-full {cell.frameStyle}"
            draggable="false"
            style={
              cell.frameStyle === 'simple' ? 'border: 4px solid #a3a3a3; border-radius: 0.5rem;' :
              cell.frameStyle === 'shadow' ? 'box-shadow: 0 4px 16px 0 #a3a3a3; border-radius: 0.5rem;' :
              cell.frameStyle === 'pink' ? 'border: 3px solid #ec4899; border-radius: 0.5rem;' :
              cell.frameStyle === 'blue' ? 'border: 3px solid #3b82f6; border-radius: 0.5rem;' :
              'border-radius: 0.5rem;'
            }
          />
          <button
            class="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs text-gray-600 hover:text-pink-500 z-10"
            on:click={() => removeImage(idx)}
            aria-label="Remove image"
          >
            ×
          </button>
          {#if selectedIdx === idx}
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 z-20">
              <button class="text-xs text-gray-600 hover:text-pink-500 p-1 rounded" on:click={() => duplicateImage(idx)} title="Duplicate">
                📋
              </button>
              <button class="text-xs text-gray-600 hover:text-pink-500 p-1 rounded" on:click={() => bringToFront(idx)} title="Bring to Front">
                ⬆️
              </button>
              <button class="text-xs text-gray-600 hover:text-pink-500 p-1 rounded" on:click={() => sendToBack(idx)} title="Send to Back">
                ⬇️
              </button>
              <div class="w-px bg-gray-300 mx-1"></div>
              <button class="text-xs text-gray-600 hover:text-pink-500 p-1 rounded" on:click={() => removeImage(idx)} title="Delete">
                🗑️
              </button>
            </div>
            <div class="absolute inset-0 border-2 border-pink-500 rounded-lg pointer-events-none"></div>
          {/if}
        {:else}
          <label class="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400 hover:text-pink-400 transition-colors">
            <span class="material-symbols-outlined text-3xl mb-1">add_photo_alternate</span>
            <span class="text-xs">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              on:change={(e) => handleFileChange(e, idx)}
            />
          </label>
        {/if}
      </div>
    {/each}
  </div>
  <p class="text-xs text-gray-400 mt-2">Drag and drop to swap images. Click a cell to upload or select.</p>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  .collage-cell.selected {
    box-shadow: 0 0 0 2px #ec4899, 0 2px 8px rgba(0,0,0,0.04);
  }
</style> 