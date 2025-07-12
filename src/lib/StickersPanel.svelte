<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  const stickerCategories = [
    {
      name: 'Emojis',
      stickers: ['😍', '🥰', '😘', '💕', '💖', '✨', '🌟', '💫', '🦄', '🌈', '🎉', '🎊']
    },
    {
      name: 'Nature',
      stickers: ['🌸', '🌺', '🌻', '🌹', '🍀', '🌿', '🦋', '🐝', '🌙', '⭐', '☀️', '🌈']
    },
    {
      name: 'Objects',
      stickers: ['💎', '👑', '🎀', '💍', '🎁', '🎈', '🎂', '🍰', '☕', '🧸', '🎵', '💌']
    },
    {
      name: 'Shapes',
      stickers: ['♥️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '⚡', '💥', '💫', '⭐']
    }
  ];

  let activeCategory = 'Emojis';

  function selectSticker(sticker: string) {
    dispatch('stickerSelect', { 
      type: 'emoji',
      content: sticker,
      size: 40 
    });
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Stickers & Emojis</h3>
  
  <!-- Category Tabs -->
  <div class="flex flex-wrap gap-1 mb-4">
    {#each stickerCategories as category}
      <button
        class="py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
               {activeCategory === category.name ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'}"
        on:click={() => activeCategory = category.name}
      >
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Sticker Grid -->
  {#each stickerCategories as category}
    {#if activeCategory === category.name}
      <div class="grid grid-cols-4 gap-2">
        {#each category.stickers as sticker}
          <button
            class="aspect-square border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 flex items-center justify-center text-2xl hover:scale-110"
            on:click={() => selectSticker(sticker)}
          >
            {sticker}
          </button>
        {/each}
      </div>
    {/if}
  {/each}

  <!-- Decorative Elements -->
  <div class="mt-6">
    <h4 class="font-medium text-gray-700 mb-3">Decorative Elements</h4>
    <div class="grid grid-cols-3 gap-2">
      <button class="p-3 border border-gray-200 rounded-lg hover:border-pink-300 text-center group">
        <span class="material-symbols-outlined text-2xl text-pink-400 group-hover:text-pink-600">
          auto_awesome
        </span>
        <p class="text-xs text-gray-600 mt-1">Sparkles</p>
      </button>
      <button class="p-3 border border-gray-200 rounded-lg hover:border-pink-300 text-center group">
        <span class="material-symbols-outlined text-2xl text-pink-400 group-hover:text-pink-600">
          favorite
        </span>
        <p class="text-xs text-gray-600 mt-1">Hearts</p>
      </button>
      <button class="p-3 border border-gray-200 rounded-lg hover:border-pink-300 text-center group">
        <span class="material-symbols-outlined text-2xl text-pink-400 group-hover:text-pink-600">
          gesture
        </span>
        <p class="text-xs text-gray-600 mt-1">Doodles</p>
      </button>
    </div>
  </div>

  <!-- Search Stickers -->
  <div class="mt-6">
    <input 
      type="text" 
      placeholder="Search stickers..." 
      class="w-full p-2 border border-gray-200 rounded-lg focus:border-pink-300 focus:outline-none"
    />
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>