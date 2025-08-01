<script lang="ts">
  import { onMount } from 'svelte';
  import * as EditorCanvas from './EditorCanvas.svelte';
  let activeTool: string | null = null;

  function toggleTool(tool: string) {
    activeTool = activeTool === tool ? null : tool;
  }

  // Optional: Close panel when clicking outside
  let panelRef: HTMLDivElement | null = null;
  function handleClickOutside(event: MouseEvent) {
    if (panelRef && !panelRef.contains(event.target as Node)) {
      activeTool = null;
    }
  }
  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  // Reference to EditorCanvas instance
  export let editorCanvasRef: any;
</script>

<nav class="flex flex-col gap-4 bg-white border-r border-gray-200 p-4 w-20 md:w-28 h-full fixed md:static z-10 relative">
  <button class="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 focus:outline-none" on:click={() => toggleTool('frames')} aria-pressed={activeTool === 'frames'}>
    <span class="material-symbols-outlined text-2xl md:text-3xl">photo_frame</span>
    <span class="text-xs md:text-sm">Frames</span>
  </button>
  <button class="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 focus:outline-none" on:click={() => toggleTool('stickers')} aria-pressed={activeTool === 'stickers'}>
    <span class="material-symbols-outlined text-2xl md:text-3xl">emoji_emotions</span>
    <span class="text-xs md:text-sm">Stickers</span>
  </button>
  <button class="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 focus:outline-none" on:click={() => toggleTool('text')} aria-pressed={activeTool === 'text'}>
    <span class="material-symbols-outlined text-2xl md:text-3xl">text_fields</span>
    <span class="text-xs md:text-sm">Text</span>
  </button>
  <button class="flex flex-col items-center gap-1 text-gray-700 hover:text-pink-500 focus:outline-none" on:click={() => toggleTool('filters')} aria-pressed={activeTool === 'filters'}>
    <span class="material-symbols-outlined text-2xl md:text-3xl">filter</span>
    <span class="text-xs md:text-sm">Filters</span>
  </button>

  {#if activeTool}
    <div bind:this={panelRef} class="absolute left-full top-0 ml-2 w-48 md:w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-20">
      {#if activeTool === 'frames'}
        <div class="text-pink-500 font-semibold mb-3">Frame Styles</div>
        <div class="space-y-2">
          <button class="w-full text-left p-2 rounded hover:bg-gray-50 border border-gray-200 hover:border-pink-300 transition-colors" on:click={() => editorCanvasRef.setFrameStyle('none')}>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-100 rounded border-2 border-gray-300"></div>
              <span class="text-sm">No Frame</span>
            </div>
          </button>
          <button class="w-full text-left p-2 rounded hover:bg-gray-50 border border-gray-200 hover:border-pink-300 transition-colors" on:click={() => editorCanvasRef.setFrameStyle('simple')}>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-100 rounded border-4 border-gray-400"></div>
              <span class="text-sm">Simple Border</span>
            </div>
          </button>
          <button class="w-full text-left p-2 rounded hover:bg-gray-50 border border-gray-200 hover:border-pink-300 transition-colors" on:click={() => editorCanvasRef.setFrameStyle('shadow')}>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-100 rounded border-2 border-gray-400 shadow-md"></div>
              <span class="text-sm">Shadow Frame</span>
            </div>
          </button>
          <button class="w-full text-left p-2 rounded hover:bg-gray-50 border border-gray-200 hover:border-pink-300 transition-colors" on:click={() => editorCanvasRef.setFrameStyle('pink')}>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-100 rounded border-2 border-pink-400"></div>
              <span class="text-sm">Pink Border</span>
            </div>
          </button>
          <button class="w-full text-left p-2 rounded hover:bg-gray-50 border border-gray-200 hover:border-pink-300 transition-colors" on:click={() => editorCanvasRef.setFrameStyle('blue')}>
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gray-100 rounded border-2 border-blue-400"></div>
              <span class="text-sm">Blue Border</span>
            </div>
          </button>
        </div>
        <div class="mt-4 pt-3 border-t border-gray-200">
          <div class="text-xs text-gray-500 mb-2">Frame Width</div>
          <input type="range" min="1" max="20" value="4" class="w-full" />
        </div>
      {:else if activeTool === 'stickers'}
        <div class="text-pink-500 font-semibold mb-2">Stickers Tool</div>
        <div class="text-gray-500 text-sm">(Stickers tool panel placeholder)</div>
      {:else if activeTool === 'text'}
        <div class="text-pink-500 font-semibold mb-2">Text Tool</div>
        <div class="text-gray-500 text-sm">(Text tool panel placeholder)</div>
      {:else if activeTool === 'filters'}
        <div class="text-pink-500 font-semibold mb-2">Filters Tool</div>
        <div class="text-gray-500 text-sm">(Filters tool panel placeholder)</div>
      {/if}
    </div>
  {/if}
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 