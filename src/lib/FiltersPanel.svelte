<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  const filterCategories = [
    {
      name: 'Dreamy',
      filters: [
        { id: 'dreamy-glow', name: 'Soft Glow', preview: 'brightness(1.2) contrast(0.9) saturate(1.1)' },
        { id: 'fairy-tale', name: 'Fairy Tale', preview: 'hue-rotate(10deg) saturate(1.3) brightness(1.1)' },
        { id: 'cotton-candy', name: 'Cotton Candy', preview: 'hue-rotate(300deg) saturate(1.2) brightness(1.1)' },
        { id: 'sunset-dream', name: 'Sunset Dream', preview: 'sepia(0.3) saturate(1.4) hue-rotate(15deg)' }
      ]
    },
    {
      name: 'Vintage',
      filters: [
        { id: 'vintage-film', name: 'Film', preview: 'sepia(0.6) contrast(1.2) brightness(0.9)' },
        { id: 'retro-warm', name: 'Retro Warm', preview: 'sepia(0.4) saturate(1.3) hue-rotate(20deg)' },
        { id: 'old-photo', name: 'Old Photo', preview: 'sepia(0.8) contrast(1.1) brightness(0.8)' },
        { id: 'polaroid', name: 'Polaroid', preview: 'contrast(1.1) brightness(1.1) saturate(0.9)' }
      ]
    },
    {
      name: 'Modern',
      filters: [
        { id: 'high-contrast', name: 'Bold', preview: 'contrast(1.4) saturate(1.2)' },
        { id: 'cool-blue', name: 'Cool Blue', preview: 'hue-rotate(180deg) saturate(1.1) brightness(1.1)' },
        { id: 'black-white', name: 'B&W', preview: 'grayscale(1) contrast(1.2)' },
        { id: 'neon-pop', name: 'Neon Pop', preview: 'saturate(2) contrast(1.3) brightness(1.2)' }
      ]
    }
  ];

  let activeCategory = 'Dreamy';

  function applyFilter(filter: any) {
    dispatch('filterApply', filter);
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Photo Filters</h3>
  
  <!-- Category Tabs -->
  <div class="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
    {#each filterCategories as category}
      <button
        class="flex-1 py-2 px-2 rounded-md text-sm font-medium transition-all duration-200
               {activeCategory === category.name ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600 hover:text-pink-500'}"
        on:click={() => activeCategory = category.name}
      >
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Filter Grid -->
  {#each filterCategories as category}
    {#if activeCategory === category.name}
      <div class="grid grid-cols-2 gap-3">
        {#each category.filters as filter}
          <button
            class="aspect-square border-2 border-gray-200 rounded-lg hover:border-pink-300 transition-all duration-200 relative overflow-hidden group"
            on:click={() => applyFilter(filter)}
          >
            <!-- Filter Preview -->
            <div 
              class="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center"
              style="filter: {filter.preview}"
            >
              <span class="material-symbols-outlined text-white text-2xl drop-shadow-lg">
                photo_camera
              </span>
            </div>
            
            <!-- Filter Name -->
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {filter.name}
            </div>
          </button>
        {/each}
      </div>
    {/if}
  {/each}

  <!-- Manual Adjustments -->
  <div class="mt-6 space-y-4">
    <h4 class="font-medium text-gray-700">Manual Adjustments</h4>
    
    <div class="space-y-3">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Brightness</label>
        <input type="range" min="0" max="200" value="100" class="w-full" />
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">Contrast</label>
        <input type="range" min="0" max="200" value="100" class="w-full" />
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">Saturation</label>
        <input type="range" min="0" max="200" value="100" class="w-full" />
      </div>
      
      <div>
        <label class="block text-sm text-gray-600 mb-1">Blur</label>
        <input type="range" min="0" max="10" value="0" class="w-full" />
      </div>
    </div>

    <button class="w-full py-2 px-4 border border-gray-300 rounded-lg hover:border-pink-300 transition-colors text-gray-600 hover:text-pink-600">
      Reset All
    </button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>