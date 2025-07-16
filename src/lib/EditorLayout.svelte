<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import EditorCanvas from '$lib/components/EditorCanvas.svelte';
  import TopBar from '$lib/components/TopBar.svelte';

  let rows = 3;
  let cols = 3;

  function handleTemplateSelect(e) {
    rows = e.detail.rows;
    cols = e.detail.cols;
  }
</script>

<div class="flex flex-col h-screen">
  <TopBar on:templateSelect={handleTemplateSelect} />
  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <main class="flex-1 flex flex-col overflow-auto">
      <EditorCanvas {rows} {cols} />
    </main>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 