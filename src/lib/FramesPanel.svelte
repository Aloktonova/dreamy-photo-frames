<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  const frameCategories = [
    {
      name: 'Dreamy',
      frames: [
        { id: 'cloud', name: 'Cloud', style: 'soft gradient border with cloud texture' },
        { id: 'starry', name: 'Starry Night', style: 'dark border with star sparkles' },
        { id: 'rainbow', name: 'Rainbow', style: 'gradient rainbow border' },
        { id: 'sunset', name: 'Sunset', style: 'warm orange-pink gradient' }
      ]
    },
    {
      name: 'Vintage',
      frames: [
        { id: 'polaroid', name: 'Polaroid', style: 'classic white polaroid frame' },
        { id: 'film', name: 'Film Strip', style: 'black film strip with holes' },
        { id: 'ornate', name: 'Ornate Gold', style: 'decorative golden frame' },
        { id: 'wood', name: 'Wood', style: 'rustic wooden frame' }
      ]
    },
    {
      name: 'Modern',
      frames: [
        { id: 'minimal', name: 'Minimal', style: 'thin clean lines' },
        { id: 'neon', name: 'Neon Glow', style: 'bright neon border effect' },
        { id: 'geometric', name: 'Geometric', style: 'angular geometric patterns' },
        { id: 'holographic', name: 'Holographic', style: 'iridescent shifting colors' }
      ]
    }
  ];

  let activeCategory = 'Dreamy';

  function selectFrame(frame: any) {
    dispatch('frameSelect', frame);
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Photo Frames</h3>
  
  <!-- Category Tabs -->
  <div class="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
    {#each frameCategories as category}
      <button
        class="flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200
               {activeCategory === category.name ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600 hover:text-pink-500'}"
        on:click={() => activeCategory = category.name}
      >
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Frame Grid -->
  {#each frameCategories as category}
    {#if activeCategory === category.name}
      <div class="grid grid-cols-2 gap-3">
        {#each category.frames as frame}
          <button
            class="aspect-square border-2 border-gray-200 rounded-lg hover:border-pink-300 transition-all duration-200 relative overflow-hidden group"
            on:click={() => selectFrame(frame)}
          >
            <!-- Frame Preview -->
            <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div class="w-3/4 h-3/4 bg-white rounded shadow-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-gray-400">
                  image
                </span>
              </div>
              
              <!-- Frame Effect Overlay -->
              <div class="absolute inset-0 border-4 rounded-lg opacity-60
                         {frame.id === 'cloud' ? 'border-blue-200 bg-blue-50' : ''}
                         {frame.id === 'starry' ? 'border-purple-300 bg-purple-900' : ''}
                         {frame.id === 'rainbow' ? 'border-pink-300 bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200' : ''}
                         {frame.id === 'sunset' ? 'border-orange-300 bg-gradient-to-br from-orange-200 to-pink-200' : ''}
                         {frame.id === 'polaroid' ? 'border-white bg-white' : ''}
                         {frame.id === 'film' ? 'border-black bg-black' : ''}
                         {frame.id === 'ornate' ? 'border-yellow-600 bg-yellow-100' : ''}
                         {frame.id === 'wood' ? 'border-amber-700 bg-amber-100' : ''}
                         {frame.id === 'minimal' ? 'border-gray-400' : ''}
                         {frame.id === 'neon' ? 'border-cyan-400 bg-cyan-100' : ''}
                         {frame.id === 'geometric' ? 'border-indigo-400 bg-indigo-50' : ''}
                         {frame.id === 'holographic' ? 'border-purple-400 bg-gradient-to-r from-purple-200 to-pink-200' : ''}
                         ">
              </div>
            </div>
            
            <!-- Frame Name -->
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {frame.name}
            </div>
          </button>
        {/each}
      </div>
    {/if}
  {/each}

  <!-- Custom Frame Upload -->
  <div class="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
    <h4 class="font-medium text-gray-700 mb-2">Custom Frame</h4>
    <button class="w-full py-2 px-4 border border-gray-300 rounded-lg hover:border-pink-300 transition-colors text-gray-600 hover:text-pink-600">
      <span class="material-symbols-outlined text-sm mr-1">upload</span>
      Upload Frame
    </button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>