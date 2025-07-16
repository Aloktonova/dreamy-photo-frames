<script lang="ts">
  import TemplatePicker from './TemplatePicker.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let showTemplatePicker = false;

  function handleTemplateSelect(e) {
    dispatch('templateSelect', e.detail);
    showTemplatePicker = false;
  }
</script>

<div class="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 shadow-sm z-20">
  <div class="font-bold text-lg text-pink-500">Dreamy Collage Editor</div>
  <div class="flex gap-2 items-center">
    <button
      class="flex items-center gap-1 p-2 rounded hover:bg-pink-50 text-pink-500 border border-pink-200"
      on:click={() => showTemplatePicker = true}
      aria-label="Choose template"
    >
      <span class="material-symbols-outlined text-2xl">grid_on</span>
      <span class="hidden md:inline text-sm font-medium">Templates</span>
    </button>
    <button class="p-2 rounded hover:bg-gray-100 text-gray-500" aria-label="Undo">
      <span class="material-symbols-outlined text-2xl">undo</span>
    </button>
    <button class="p-2 rounded hover:bg-gray-100 text-gray-500" aria-label="Redo">
      <span class="material-symbols-outlined text-2xl">redo</span>
    </button>
  </div>
  <TemplatePicker open={showTemplatePicker} on:close={() => showTemplatePicker = false} on:select={handleTemplateSelect} />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 