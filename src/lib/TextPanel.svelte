<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let textInput = '';
  let selectedFont = 'Inter';
  let fontSize = 24;
  let textColor = '#000000';
  let textStyle = 'normal';

  const fonts = [
    { name: 'Inter', label: 'Clean' },
    { name: 'Caveat', label: 'Handwritten' },
    { name: 'Playfair Display', label: 'Elegant' },
    { name: 'Roboto', label: 'Modern' },
    { name: 'Dancing Script', label: 'Script' },
    { name: 'Fredoka One', label: 'Fun' }
  ];

  const textStyles = [
    { id: 'normal', name: 'Normal', icon: 'format_clear' },
    { id: 'bold', name: 'Bold', icon: 'format_bold' },
    { id: 'italic', name: 'Italic', icon: 'format_italic' },
    { id: 'outline', name: 'Outline', icon: 'border_style' }
  ];

  const presetTexts = [
    'Beautiful Memories',
    'Family Time',
    'Adventure Awaits',
    'Love & Laughter',
    'Best Friends Forever',
    'Making Memories'
  ];

  function addText() {
    if (textInput.trim()) {
      dispatch('textAdd', {
        text: textInput,
        font: selectedFont,
        size: fontSize,
        color: textColor,
        style: textStyle,
        x: 100,
        y: 100
      });
      textInput = '';
    }
  }

  function addPresetText(text: string) {
    dispatch('textAdd', {
      text,
      font: selectedFont,
      size: fontSize,
      color: textColor,
      style: textStyle,
      x: 100,
      y: 100
    });
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Add Text</h3>
  
  <!-- Text Input -->
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Your Text</label>
      <textarea
        bind:value={textInput}
        placeholder="Enter your text here..."
        class="w-full p-3 border border-gray-200 rounded-lg focus:border-pink-300 focus:outline-none resize-none"
        rows="3"
      ></textarea>
      <button 
        on:click={addText}
        disabled={!textInput.trim()}
        class="w-full mt-2 py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Add Text
      </button>
    </div>

    <!-- Font Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Font</label>
      <div class="grid grid-cols-2 gap-2">
        {#each fonts as font}
          <button
            class="p-2 border rounded-lg text-sm transition-all duration-200
                   {selectedFont === font.name ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 hover:border-pink-300'}"
            style="font-family: {font.name}"
            on:click={() => selectedFont = font.name}
          >
            {font.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Text Styling -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Style</label>
      <div class="flex space-x-2">
        {#each textStyles as style}
          <button
            class="flex-1 p-2 border rounded-lg flex flex-col items-center transition-all duration-200
                   {textStyle === style.id ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 hover:border-pink-300'}"
            on:click={() => textStyle = style.id}
          >
            <span class="material-symbols-outlined text-lg">{style.icon}</span>
            <span class="text-xs mt-1">{style.name}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Size & Color -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <input
          type="range"
          min="12"
          max="72"
          bind:value={fontSize}
          class="w-full"
        />
        <div class="text-center text-sm text-gray-600 mt-1">{fontSize}px</div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <input
          type="color"
          bind:value={textColor}
          class="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  </div>

  <!-- Preset Text Options -->
  <div class="mt-6">
    <h4 class="font-medium text-gray-700 mb-3">Quick Text</h4>
    <div class="space-y-2">
      {#each presetTexts as preset}
        <button
          class="w-full p-2 text-left border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 text-sm"
          on:click={() => addPresetText(preset)}
        >
          {preset}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&family=Fredoka+One&display=swap');
</style>