<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import EditorCanvas from './EditorCanvas.svelte';
</script>

<div class="flex flex-col h-screen">
  <!-- Top bar with undo/redo -->
  <div class="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 shadow-sm z-20">
    <div class="font-bold text-lg text-pink-500">Dreamy Collage Editor</div>
    <div class="flex gap-2">
      <button class="p-2 rounded hover:bg-gray-100 text-gray-500" aria-label="Undo">
        <span class="material-symbols-outlined text-2xl">undo</span>
      </button>
      <button class="p-2 rounded hover:bg-gray-100 text-gray-500" aria-label="Redo">
        <span class="material-symbols-outlined text-2xl">redo</span>
      </button>
    </div>
  </div>
  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <main class="flex-1 flex flex-col overflow-auto">
      <EditorCanvas />
    </main>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 