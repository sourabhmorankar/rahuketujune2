<script lang="ts">
  import { useGridStore } from '$lib/stores/grid.svelte.ts';
  
  const gridStore = useGridStore();
  
  // MiniMap configuration
  const miniMapWidth = 200;
  const miniMapHeight = 150;
  
  // Calculate minimap scale
  const miniMapScale = $derived(() => {
    const bounds = gridStore.gridBounds;
    const gridWidth = bounds.maxX - bounds.minX;
    const gridHeight = bounds.maxY - bounds.minY;
    
    const scaleX = miniMapWidth / gridWidth;
    const scaleY = miniMapHeight / gridHeight;
    
    return Math.min(scaleX, scaleY);
  });
  
  // Viewport indicator position and size
  const viewportIndicator = $derived(() => {
    const { viewport } = gridStore;
    const bounds = gridStore.gridBounds;
    const scale = miniMapScale;
    
    // Convert viewport to minimap coordinates
    const viewportLeft = (-viewport.x / viewport.zoom - bounds.minX) * scale;
    const viewportTop = (-viewport.y / viewport.zoom - bounds.minY) * scale;
    const viewportWidth = (viewport.width / viewport.zoom) * scale;
    const viewportHeight = (viewport.height / viewport.zoom) * scale;
    
    return {
      left: Math.max(0, Math.min(viewportLeft, miniMapWidth - viewportWidth)),
      top: Math.max(0, Math.min(viewportTop, miniMapHeight - viewportHeight)),
      width: Math.min(viewportWidth, miniMapWidth),
      height: Math.min(viewportHeight, miniMapHeight)
    };
  });
  
  // Card positions in minimap
  const miniMapCards = $derived(() => {
    const bounds = gridStore.gridBounds;
    const scale = miniMapScale;
    
    return gridStore.cards.map(card => ({
      ...card,
      miniMapPosition: {
        left: (card.position.x - bounds.minX) * scale,
        top: (card.position.y - bounds.minY) * scale,
        width: card.position.width * scale,
        height: card.position.height * scale
      }
    }));
  });
  
  function handleMiniMapClick(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const bounds = gridStore.gridBounds;
    const scale = miniMapScale;
    
    // Convert minimap coordinates to grid coordinates
    const gridX = (x / scale) + bounds.minX;
    const gridY = (y / scale) + bounds.minY;
    
    gridStore.panTo(gridX, gridY, true);
  }
</script>

<div class="mini-map-container">
  <div class="mini-map-header">
    <span class="mini-map-title">Navigation</span>
    <button class="mini-map-fit-button" on:click={() => gridStore.fitToGrid()}>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </button>
  </div>
  
  <div 
    class="mini-map"
    style="width: {miniMapWidth}px; height: {miniMapHeight}px;"
    on:click={handleMiniMapClick}
    role="button"
    tabindex="0"
    aria-label="Mini-map navigation"
  >
    <!-- Grid cards in minimap -->
    {#each miniMapCards as card}
      <div
        class="mini-map-card"
        class:bio={card.cardType === 'bio'}
        class:skills={card.cardType === 'skills'}
        class:experience={card.cardType === 'experience'}
        class:welcome={card.cardType === 'welcome'}
        style="
          left: {card.miniMapPosition.left}px;
          top: {card.miniMapPosition.top}px;
          width: {card.miniMapPosition.width}px;
          height: {card.miniMapPosition.height}px;
        "
        title={card.cardType}
      ></div>
    {/each}
    
    <!-- Viewport indicator -->
    <div
      class="viewport-indicator"
      style="
        left: {viewportIndicator.left}px;
        top: {viewportIndicator.top}px;
        width: {viewportIndicator.width}px;
        height: {viewportIndicator.height}px;
      "
    ></div>
  </div>
  
  <!-- Zoom controls -->
  <div class="zoom-controls">
    <button 
      class="zoom-button"
      on:click={() => gridStore.zoomTo(gridStore.viewport.zoom * 1.2)}
      aria-label="Zoom in"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </button>
    
    <span class="zoom-level">{Math.round(gridStore.viewport.zoom * 100)}%</span>
    
    <button 
      class="zoom-button"
      on:click={() => gridStore.zoomTo(gridStore.viewport.zoom * 0.8)}
      aria-label="Zoom out"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
      </svg>
    </button>
  </div>
</div>

<style>
  .mini-map-container {
    @apply fixed bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-40;
    @apply opacity-90 hover:opacity-100 transition-opacity duration-200;
  }

  .mini-map-header {
    @apply flex items-center justify-between mb-2;
  }

  .mini-map-title {
    @apply text-xs font-medium text-gray-700 dark:text-gray-300;
  }

  .mini-map-fit-button {
    @apply p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors;
  }

  .mini-map {
    @apply relative bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 cursor-pointer;
    @apply hover:border-blue-400 transition-colors;
  }

  .mini-map-card {
    @apply absolute rounded-sm border border-gray-400 dark:border-gray-500;
    min-width: 2px;
    min-height: 2px;
  }

  .mini-map-card.bio {
    @apply bg-blue-400;
  }

  .mini-map-card.skills {
    @apply bg-green-400;
  }

  .mini-map-card.experience {
    @apply bg-purple-400;
  }

  .mini-map-card.welcome {
    @apply bg-gradient-to-r from-blue-400 to-purple-400;
  }

  .viewport-indicator {
    @apply absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 rounded-sm;
    min-width: 4px;
    min-height: 4px;
  }

  .zoom-controls {
    @apply flex items-center justify-between mt-2 space-x-2;
  }

  .zoom-button {
    @apply p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors;
    @apply hover:bg-gray-100 dark:hover:bg-gray-700 rounded;
  }

  .zoom-level {
    @apply text-xs text-gray-600 dark:text-gray-400 min-w-[3rem] text-center;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .mini-map-container {
      @apply bottom-2 left-2 p-2;
    }
    
    .mini-map {
      width: 120px !important;
      height: 90px !important;
    }
  }
</style>