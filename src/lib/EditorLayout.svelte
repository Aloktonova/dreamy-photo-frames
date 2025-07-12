<script lang="ts">
  import { onMount } from 'svelte';
  import Sidebar from './Sidebar.svelte';
  import EditorCanvas from './EditorCanvas.svelte';

  let canvasRef: any;
  let canUndo = false;
  let canRedo = false;

  // History management
  let historyIndex = -1;
  let history: any[] = [];

  onMount(() => {
    // Auto-save functionality
    const autoSave = setInterval(() => {
      if (canvasRef) {
        localStorage.setItem('collage-autosave', canvasRef.exportCanvas());
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSave);
  });

  function handleUndo() {
    if (canvasRef) {
      canvasRef.undo();
      updateHistoryState();
    }
  }

  function handleRedo() {
    if (canvasRef) {
      canvasRef.redo();
      updateHistoryState();
    }
  }

  function updateHistoryState() {
    // This would be called by canvas when history changes
    // Implementation depends on canvas component
  }

  function handleSave() {
    if (canvasRef) {
      const dataUrl = canvasRef.exportCanvas();
      const link = document.createElement('a');
      link.download = `dreamy-collage-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    }
  }

  function handleNew() {
    if (confirm('Start a new collage? Current work will be lost.')) {
      location.reload();
    }
  }

  // Event handlers from sidebar panels
  function handleImageUpload(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.addImage(event.detail);
    }
  }

  function handleTemplateSelect(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.applyTemplate(event.detail);
    }
  }

  function handleFrameSelect(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.applyFrame(event.detail);
    }
  }

  function handleStickerSelect(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.addSticker(event.detail);
    }
  }

  function handleTextAdd(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.addText(event.detail);
    }
  }

  function handleFilterApply(event: CustomEvent) {
    if (canvasRef) {
      canvasRef.applyFilter(event.detail);
    }
  }
</script>

<svelte:head>
  <title>Dreamy Collage Editor - Create Beautiful Photo Collages</title>
  <meta name="description" content="Create stunning photo collages with our intuitive drag-and-drop editor. Choose from beautiful templates, frames, and filters to make your memories shine." />
  <meta name="keywords" content="photo collage, collage maker, photo editor, templates, frames, filters, dreamy photos" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Dreamy Collage Editor - Create Beautiful Photo Collages" />
  <meta property="og:description" content="Create stunning photo collages with our intuitive drag-and-drop editor. Choose from beautiful templates, frames, and filters." />
  <meta property="og:image" content="/og-image.jpg" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="Dreamy Collage Editor" />
  <meta property="twitter:description" content="Create stunning photo collages with our intuitive drag-and-drop editor." />
  <meta property="twitter:image" content="/twitter-image.jpg" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dreamy Collage Editor",
    "description": "Create beautiful photo collages with templates, frames, and filters",
    "url": "https://dreamy-collage-editor.com",
    "applicationCategory": "PhotoEditingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</svelte:head>

<div class="flex flex-col h-screen bg-gray-50">
  <!-- Top Navigation Bar -->
  <header class="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-20">
    <!-- Left side - Logo and title -->
    <div class="flex items-center space-x-4">
      <a href="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span class="material-symbols-outlined text-white text-lg">photo_library</span>
        </div>
        <span class="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Dreamy Collage Editor
        </span>
      </a>
    </div>

    <!-- Center - Action buttons -->
    <div class="flex items-center space-x-2">
      <button 
        class="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
        on:click={handleNew}
        aria-label="New collage"
      >
        <span class="material-symbols-outlined text-xl">add</span>
        <span class="hidden sm:block text-sm font-medium">New</span>
      </button>
      
      <button 
        class="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={handleUndo}
        disabled={!canUndo}
        aria-label="Undo"
      >
        <span class="material-symbols-outlined text-xl">undo</span>
        <span class="hidden sm:block text-sm font-medium">Undo</span>
      </button>
      
      <button 
        class="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={handleRedo}
        disabled={!canRedo}
        aria-label="Redo"
      >
        <span class="material-symbols-outlined text-xl">redo</span>
        <span class="hidden sm:block text-sm font-medium">Redo</span>
      </button>
    </div>

    <!-- Right side - Save and settings -->
    <div class="flex items-center space-x-2">
      <button 
        class="flex items-center space-x-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        on:click={handleSave}
        aria-label="Download collage"
      >
        <span class="material-symbols-outlined text-lg">download</span>
        <span class="hidden sm:block text-sm font-medium">Download</span>
      </button>
      
      <button 
        class="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
        aria-label="Settings"
      >
        <span class="material-symbols-outlined text-xl">settings</span>
      </button>
    </div>
  </header>

  <!-- Main Editor Area -->
  <div class="flex flex-1 overflow-hidden">
    <Sidebar 
      on:imageUpload={handleImageUpload}
      on:templateSelect={handleTemplateSelect}
      on:frameSelect={handleFrameSelect}
      on:stickerSelect={handleStickerSelect}
      on:textAdd={handleTextAdd}
      on:filterApply={handleFilterApply}
    />
    
    <main class="flex-1 flex flex-col overflow-hidden">
      <EditorCanvas bind:this={canvasRef} />
    </main>
  </div>

  <!-- Mobile-specific bottom toolbar -->
  <div class="sm:hidden bg-white border-t border-gray-200 p-2">
    <div class="flex justify-center space-x-4">
      <button class="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-pink-600">
        <span class="material-symbols-outlined text-lg">undo</span>
        <span class="text-xs">Undo</span>
      </button>
      <button class="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-pink-600">
        <span class="material-symbols-outlined text-lg">redo</span>
        <span class="text-xs">Redo</span>
      </button>
      <button class="flex flex-col items-center py-2 px-3 text-white bg-pink-500 rounded-lg">
        <span class="material-symbols-outlined text-lg">download</span>
        <span class="text-xs">Save</span>
      </button>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 