<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  const templates = [
    { id: 'grid-2x2', name: '2x2 Grid', layout: 'grid', cols: 2, rows: 2, preview: '⊞' },
    { id: 'grid-3x3', name: '3x3 Grid', layout: 'grid', cols: 3, rows: 3, preview: '⊞' },
    { id: 'polaroid', name: 'Polaroid Stack', layout: 'stack', preview: '📷' },
    { id: 'scrapbook', name: 'Scrapbook', layout: 'scattered', preview: '📔' },
    { id: 'heart', name: 'Heart Shape', layout: 'shape', preview: '♥' },
    { id: 'circle', name: 'Circle Collage', layout: 'shape', preview: '○' },
    { id: 'mosaic', name: 'Photo Mosaic', layout: 'mosaic', preview: '▦' },
    { id: 'timeline', name: 'Timeline', layout: 'linear', preview: '→' }
  ];

  function selectTemplate(template: any) {
    dispatch('templateSelect', template);
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Collage Templates</h3>
  
  <div class="space-y-3">
    {#each templates as template}
      <button
        class="w-full p-3 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 text-left group"
        on:click={() => selectTemplate(template)}
      >
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-pink-100">
            {template.preview}
          </div>
          <div>
            <h4 class="font-medium text-gray-800">{template.name}</h4>
            <p class="text-sm text-gray-500 capitalize">{template.layout} layout</p>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Custom Template Builder -->
  <div class="mt-6 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
    <h4 class="font-medium text-gray-800 mb-2">Custom Template</h4>
    <p class="text-sm text-gray-600 mb-3">Create your own layout</p>
    <button class="w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
      <span class="material-symbols-outlined text-sm mr-1">add</span>
      Build Custom
    </button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>