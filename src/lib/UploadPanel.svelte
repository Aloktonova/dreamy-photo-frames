<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let fileInput: HTMLInputElement;
  let dragOver = false;

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      handleFiles(target.files);
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    
    if (event.dataTransfer?.files) {
      handleFiles(event.dataTransfer.files);
    }
  }

  function handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          dispatch('imageUpload', {
            file,
            url: e.target?.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }
</script>

<div class="p-4">
  <h3 class="font-semibold text-gray-800 mb-4">Upload Photos</h3>
  
  <!-- Drag & Drop Area -->
  <div 
    class="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
           {dragOver ? 'border-pink-400 bg-pink-50' : 'border-gray-300 hover:border-pink-300'}"
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    role="button"
    tabindex="0"
    on:click={() => fileInput.click()}
    on:keydown={(e) => e.key === 'Enter' && fileInput.click()}
  >
    <span class="material-symbols-outlined text-4xl text-gray-400 mb-2 block">
      cloud_upload
    </span>
    <p class="text-gray-600 mb-2">
      Drag photos here or click to browse
    </p>
    <p class="text-sm text-gray-500">
      Supports JPG, PNG, WebP
    </p>
  </div>

  <input
    bind:this={fileInput}
    type="file"
    multiple
    accept="image/*"
    class="hidden"
    on:change={handleFileSelect}
  />

  <!-- Recent Photos -->
  <div class="mt-6">
    <h4 class="font-medium text-gray-700 mb-3">Quick Start</h4>
    <div class="grid grid-cols-2 gap-2">
      <button class="p-3 border border-gray-200 rounded-lg hover:border-pink-300 text-center">
        <span class="material-symbols-outlined text-2xl text-gray-500 block mb-1">
          photo_library
        </span>
        <span class="text-xs text-gray-600">Sample Photos</span>
      </button>
      <button class="p-3 border border-gray-200 rounded-lg hover:border-pink-300 text-center">
        <span class="material-symbols-outlined text-2xl text-gray-500 block mb-1">
          camera_alt
        </span>
        <span class="text-xs text-gray-600">Take Photo</span>
      </button>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>