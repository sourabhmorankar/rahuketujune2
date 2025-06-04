<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { useGridStore } from '$lib/stores/grid.svelte.ts';
  import type { GridCard, GridConfig } from '$lib/types/grid';
  import GridCard from './GridCard.svelte';
  import MiniMap from './MiniMap.svelte';
  import SearchOverlay from './SearchOverlay.svelte';
  import QuickActions from './QuickActions.svelte';

  // Props
  interface Props {
    cards: GridCard[];
    config?: Partial<GridConfig>;
    className?: string;
  }
  
  let { cards, config = {}, className = '' }: Props = $props();

  // Grid store
  const gridStore = useGridStore();

  // Default configuration
  const defaultConfig: GridConfig = {
    animation: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableHardwareAcceleration: true
    },
    touch: {
      enableGestures: true,
      pinchSensitivity: 1.0,
      panSensitivity: 1.0,
      doubleTapZoom: 2.0
    },
    performance: {
      virtualScrolling: true,
      renderThreshold: 50,
      maxVisibleCards: 100,
      useRAF: true
    },
    accessibility: {
      enableKeyboardNavigation: true,
      enableScreenReader: true,
      focusOutlineColor: '#3B82F6'
    }
  };

  const gridConfig = { ...defaultConfig, ...config };

  // Element references
  let gridContainer: HTMLDivElement;
  let gridCanvas: HTMLDivElement;

  // Local state
  let isPointerDown = $state(false);
  let pointerCount = $state(0);
  let lastTouchDistance = $state(0);
  let doubleTapTimer: number | null = null;
  let animationFrame: number | null = null;

  // Reactive calculations
  const transform = $derived(() => {
    const { x, y, zoom } = gridStore.viewport;
    return `translate(${x}px, ${y}px) scale(${zoom})`;
  });

  const containerStyle = $derived(() => {
    return `
      transform: ${transform};
      transition: ${gridStore.isAnimating ? `transform ${gridConfig.animation.duration}ms ${gridConfig.animation.easing}` : 'none'};
      will-change: ${gridConfig.animation.enableHardwareAcceleration ? 'transform' : 'auto'};
    `;
  });

  // Initialize grid with cards
  $effect(() => {
    if (cards && cards.length > 0) {
      gridStore.setCards(cards);
    }
  });

  // Resize handler
  function handleResize() {
    if (!gridContainer) return;
    
    const rect = gridContainer.getBoundingClientRect();
    gridStore.setViewport({
      width: rect.width,
      height: rect.height
    });
  }

  // Pointer event handlers
  function handlePointerDown(event: PointerEvent) {
    if (!gridContainer) return;
    
    event.preventDefault();
    isPointerDown = true;
    pointerCount++;
    
    gridContainer.setPointerCapture(event.pointerId);
    
    const rect = gridContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    gridStore.startDrag(x, y);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isPointerDown || !gridContainer) return;
    
    event.preventDefault();
    
    const rect = gridContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    gridStore.updateDrag(x, y);
  }

  function handlePointerUp(event: PointerEvent) {
    if (!gridContainer) return;
    
    isPointerDown = false;
    pointerCount = Math.max(0, pointerCount - 1);
    
    gridContainer.releasePointerCapture(event.pointerId);
    gridStore.endDrag();
  }

  // Touch gesture handlers
  function handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      // Pinch gesture start
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      lastTouchDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      // Pinch gesture
      event.preventDefault();
      
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      if (lastTouchDistance > 0) {
        const scale = currentDistance / lastTouchDistance;
        const newZoom = gridStore.viewport.zoom * scale;
        
        // Center point between fingers
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        
        if (gridContainer) {
          const rect = gridContainer.getBoundingClientRect();
          gridStore.zoomTo(newZoom, centerX - rect.left, centerY - rect.top, false);
        }
      }
      
      lastTouchDistance = currentDistance;
    }
  }

  // Wheel event handler for zoom
  function handleWheel(event: WheelEvent) {
    if (!gridContainer) return;
    
    event.preventDefault();
    
    const rect = gridContainer.getBoundingClientRect();
    const centerX = event.clientX - rect.left;
    const centerY = event.clientY - rect.top;
    
    const zoomDelta = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = gridStore.viewport.zoom * zoomDelta;
    
    gridStore.zoomTo(newZoom, centerX, centerY, false);
  }

  // Double-tap to zoom
  function handleDoubleClick(event: MouseEvent) {
    if (!gridContainer) return;
    
    const rect = gridContainer.getBoundingClientRect();
    const centerX = event.clientX - rect.left;
    const centerY = event.clientY - rect.top;
    
    const targetZoom = gridStore.viewport.zoom < 1.5 ? gridConfig.touch.doubleTapZoom : 1;
    gridStore.zoomTo(targetZoom, centerX, centerY, true);
  }

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (!gridConfig.accessibility.enableKeyboardNavigation) return;
    
    const panAmount = 50;
    const zoomAmount = 0.1;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        gridStore.setViewport({ x: gridStore.viewport.x + panAmount });
        break;
      case 'ArrowRight':
        event.preventDefault();
        gridStore.setViewport({ x: gridStore.viewport.x - panAmount });
        break;
      case 'ArrowUp':
        event.preventDefault();
        gridStore.setViewport({ y: gridStore.viewport.y + panAmount });
        break;
      case 'ArrowDown':
        event.preventDefault();
        gridStore.setViewport({ y: gridStore.viewport.y - panAmount });
        break;
      case '+':
      case '=':
        event.preventDefault();
        gridStore.zoomTo(gridStore.viewport.zoom + zoomAmount);
        break;
      case '-':
        event.preventDefault();
        gridStore.zoomTo(gridStore.viewport.zoom - zoomAmount);
        break;
      case '0':
        event.preventDefault();
        gridStore.fitToGrid();
        break;
      case 'Escape':
        event.preventDefault();
        gridStore.expandCard(null);
        break;
    }
  }

  // Lifecycle
  onMount(() => {
    if (browser && gridContainer) {
      handleResize();
      
      // Add global event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('keydown', handleKeyDown);
      
      // Set initial viewport size
      const rect = gridContainer.getBoundingClientRect();
      gridStore.setViewport({
        width: rect.width,
        height: rect.height
      });
      
      // Fit grid to viewport initially
      setTimeout(() => {
        gridStore.fitToGrid();
      }, 100);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      if (doubleTapTimer) {
        clearTimeout(doubleTapTimer);
      }
    }
  });
</script>

<div 
  bind:this={gridContainer}
  class="bento-grid-container {className}"
  role="application"
  aria-label="Interactive portfolio grid"
  tabindex="0"
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:wheel={handleWheel}
  on:dblclick={handleDoubleClick}
>
  <div 
    bind:this={gridCanvas}
    class="bento-grid-canvas"
    style={containerStyle}
  >
    {#each gridStore.visibleCards as card (card.id)}
      <GridCard 
        {card}
        isSelected={gridStore.selectedCard === card.id}
        isExpanded={gridStore.expandedCard === card.id}
        on:select={(e) => gridStore.selectCard(e.detail)}
        on:expand={(e) => gridStore.expandCard(e.detail)}
      />
    {/each}
  </div>

  <!-- UI Overlays -->
  <MiniMap />
  <SearchOverlay />
  <QuickActions />
</div>

<style>
  .bento-grid-container {
    @apply relative w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900;
    touch-action: none;
    user-select: none;
  }

  .bento-grid-canvas {
    @apply relative w-full h-full;
    transform-origin: 0 0;
  }

  .bento-grid-container:focus {
    @apply outline-none ring-2 ring-blue-500 ring-opacity-50;
  }

  /* Hide scrollbars but keep functionality */
  .bento-grid-container::-webkit-scrollbar {
    display: none;
  }
  
  .bento-grid-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>