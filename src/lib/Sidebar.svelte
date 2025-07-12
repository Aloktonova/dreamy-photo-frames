<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TemplatesPanel from './TemplatesPanel.svelte';
  import FramesPanel from './FramesPanel.svelte';
  import StickersPanel from './StickersPanel.svelte';
  import TextPanel from './TextPanel.svelte';
  import FiltersPanel from './FiltersPanel.svelte';
  import UploadPanel from './UploadPanel.svelte';

  const dispatch = createEventDispatcher();
  
  let activePanel = 'upload';
  let isCollapsed = false;

  const panels = [
    { id: 'upload', label: 'Upload', icon: 'upload' },
    { id: 'templates', label: 'Templates', icon: 'grid_view' },
    { id: 'frames', label: 'Frames', icon: 'photo_frame' },
    { id: 'stickers', label: 'Stickers', icon: 'emoji_emotions' },
    { id: 'text', label: 'Text', icon: 'text_fields' },
    { id: 'filters', label: 'Filters', icon: 'filter_alt' }
  ];

  function selectPanel(panelId: string) {
    activePanel = activePanel === panelId ? '' : panelId;
  }

  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
</script>

<div class="flex h-full">
  <!-- Sidebar Icons -->
  <nav class="flex flex-col bg-white border-r border-gray-200 w-16 md:w-20 flex-shrink-0 z-20">
    <!-- Collapse Toggle -->
    <button 
      on:click={toggleCollapse}
      class="flex items-center justify-center h-12 border-b border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label="Toggle sidebar"
    >
      <span class="material-symbols-outlined text-gray-600">
        {isCollapsed ? 'menu_open' : 'menu'}
      </span>
    </button>

    <!-- Panel Icons -->
    <div class="flex flex-col gap-1 p-2">
      {#each panels as panel}
        <button 
          on:click={() => selectPanel(panel.id)}
          class="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 group
                 {activePanel === panel.id ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-50 hover:text-pink-500'}"
          aria-label={panel.label}
        >
          <span class="material-symbols-outlined text-xl">
            {panel.icon}
          </span>
          <span class="text-xs font-medium hidden md:block">
            {panel.label}
          </span>
        </button>
      {/each}
    </div>
  </nav>

  <!-- Expandable Panel Content -->
  {#if activePanel && !isCollapsed}
    <div class="w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-hidden">
      <div class="h-full overflow-y-auto">
        {#if activePanel === 'upload'}
          <UploadPanel on:imageUpload />
        {:else if activePanel === 'templates'}
          <TemplatesPanel on:templateSelect />
        {:else if activePanel === 'frames'}
          <FramesPanel on:frameSelect />
        {:else if activePanel === 'stickers'}
          <StickersPanel on:stickerSelect />
        {:else if activePanel === 'text'}
          <TextPanel on:textAdd />
        {:else if activePanel === 'filters'}
          <FiltersPanel on:filterApply />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style> 