<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  export let rows: number = 3;
  export let cols: number = 3;

  type GridCell = { id: number; image: string | null };
  let grid: GridCell[] = [];

  // Drag-and-drop state
  let dragSource: number | null = null;

  // Initialize or reset grid when rows/cols change
  $: {
    const total = rows * cols;
    // Preserve images if possible
    const oldGrid = grid.slice();
    grid = Array.from({ length: total }, (_, i) => ({
      id: i,
      image: oldGrid[i]?.image || null
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
    }
    dragSource = null;
  }

  function removeImage(idx: number) {
    grid[idx].image = null;
  }
</script>

<div class="w-full flex flex-col items-center justify-center py-4">
  <div class="grid gap-2 w-full max-w-2xl aspect-square"
    style="grid-template-rows: repeat({rows}, minmax(0, 1fr)); grid-template-columns: repeat({cols}, minmax(0, 1fr));">
    {#each grid as cell, idx}
      <div
        class="relative bg-gray-100 border-2 border-dashed border-pink-200 rounded-lg flex items-center justify-center overflow-hidden group min-h-[60px] min-w-[60px]"
        draggable={cell.image ? true : false}
        on:dragstart={() => handleDragStart(idx)}
        on:dragover={handleDragOver}
        on:drop={() => handleDrop(idx)}
      >
        {#if cell.image}
          <img
            src={cell.image}
            alt="Collage cell image"
            class="object-cover w-full h-full"
            draggable="false"
          />
          <button
            class="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs text-gray-600 hover:text-pink-500 z-10"
            on:click={() => removeImage(idx)}
            aria-label="Remove image"
          >
            ✕
          </button>
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
  <p class="text-xs text-gray-400 mt-2">Drag and drop to swap images. Click a cell to upload.</p>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 