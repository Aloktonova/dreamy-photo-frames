<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let show = false;
  export let open = false;
  $: show = open;

  let customRows = 3;
  let customCols = 3;

  const templates = [
    { label: '2x2', rows: 2, cols: 2 },
    { label: '3x3', rows: 3, cols: 3 },
    { label: '4x3', rows: 4, cols: 3 },
    { label: '5x4', rows: 5, cols: 4 },
  ];

  function selectTemplate(rows: number, cols: number) {
    dispatch('select', { rows, cols });
    dispatch('close');
  }

  function selectCustom() {
    if (customRows > 0 && customCols > 0) {
      selectTemplate(customRows, customCols);
    }
  }
</script>

{#if show}
  <div class="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-2 relative animate-fade-in">
      <button class="absolute top-2 right-2 text-gray-400 hover:text-pink-500" on:click={() => dispatch('close')} aria-label="Close">✕</button>
      <h2 class="text-lg font-bold mb-4 text-pink-500 text-center">Choose a Layout</h2>
      <div class="grid grid-cols-2 gap-4 mb-6">
        {#each templates as t}
          <button
            class="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-pink-400 focus:outline-none"
            on:click={() => selectTemplate(t.rows, t.cols)}
          >
            <div class="grid" style="grid-template-rows: repeat({t.rows}, 8px); grid-template-columns: repeat({t.cols}, 8px); gap: 2px;">
              {#each Array(t.rows * t.cols) as _, i}
                <div class="w-2 h-2 bg-pink-200 rounded"></div>
              {/each}
            </div>
            <span class="text-xs text-gray-600">{t.label}</span>
          </button>
        {/each}
      </div>
      <div class="border-t pt-4">
        <div class="flex items-center gap-2 justify-center mb-2">
          <input type="number" min="1" max="10" bind:value={customRows} class="w-12 border rounded px-1 py-0.5 text-center text-sm" />
          <span class="text-gray-500">rows ×</span>
          <input type="number" min="1" max="10" bind:value={customCols} class="w-12 border rounded px-1 py-0.5 text-center text-sm" />
          <span class="text-gray-500">columns</span>
        </div>
        <button class="w-full bg-pink-500 text-white rounded py-1.5 mt-1 hover:bg-pink-600 transition" on:click={selectCustom}>Use Custom</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style> 