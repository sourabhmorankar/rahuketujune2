<script lang="ts">
  import { onMount } from 'svelte';
  import BentoGrid from '$lib/components/grid/BentoGrid.svelte';
  import { usePortfolioStore } from '$lib/stores/portfolio.svelte.ts';
  import { useGridStore } from '$lib/stores/grid.svelte.ts';
  import type { GridCard } from '$lib/types/grid';
  
  const portfolioStore = usePortfolioStore();
  const gridStore = useGridStore();
  
  let isInitialized = $state(false);
  
  // Convert portfolio cards to grid cards
  const gridCards = $derived(() => {
    const cards: GridCard[] = [];
    
    // Add bio cluster cards
    portfolioStore.bioClusterCards.forEach(bioCard => {
      cards.push({
        id: bioCard.cardType,
        cardType: bioCard.cardType,
        position: {
          x: bioCard.position.x,
          y: bioCard.position.y,
          width: bioCard.position.width,
          height: bioCard.position.height,
          zIndex: bioCard.position.zIndex || 1
        },
        isVisible: bioCard.isActive,
        isActive: bioCard.isActive,
        animationState: 'idle'
      });
    });
    
    // Add some content cluster cards (featured ones)
    portfolioStore.featuredContent.slice(0, 3).forEach((contentCard, index) => {
      cards.push({
        id: contentCard.id,
        cardType: contentCard.cardType,
        position: {
          x: 600 + (index * 250),
          y: 400,
          width: 240,
          height: 180,
          zIndex: 1
        },
        isVisible: true,
        isActive: contentCard.status === 'published',
        animationState: 'idle'
      });
    });
    
    return cards;
  });
  
  onMount(async () => {
    try {
      await portfolioStore.initializePortfolio();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize portfolio:', error);
    }
  });
</script>

<svelte:head>
  <title>Rahul Nangare - Senior Cloud Network & Automation Engineer</title>
  <meta name="description" content="Interactive portfolio showcasing expertise in network infrastructure, cloud automation, Python scripting, and modern DevOps practices." />
</svelte:head>

<div class="portfolio-container">
  {#if !isInitialized}
    <div class="loading-screen">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2 class="loading-title">Loading Portfolio...</h2>
        <p class="loading-description">Preparing your interactive experience</p>
      </div>
    </div>
  {:else if portfolioStore.error}
    <div class="error-screen">
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h2 class="error-title">Oops! Something went wrong</h2>
        <p class="error-description">{portfolioStore.error}</p>
        <button 
          class="retry-button"
          on:click={() => portfolioStore.initializePortfolio()}
        >
          Try Again
        </button>
      </div>
    </div>
  {:else}
    <BentoGrid 
      cards={gridCards}
      className="portfolio-grid"
      config={{
        animation: { duration: 300, easing: 'ease-out' },
        touch: { enableGestures: true, doubleTapZoom: 1.5 },
        accessibility: { enableKeyboardNavigation: true }
      }}
    />
  {/if}
</div>

<style>
  .portfolio-container {
    @apply w-full h-screen overflow-hidden;
  }
  
  .loading-screen, .error-screen {
    @apply w-full h-full flex items-center justify-center;
    @apply bg-gray-50 dark:bg-gray-900;
  }
  
  .loading-content, .error-content {
    @apply text-center max-w-md px-6;
  }
  
  .loading-spinner {
    @apply w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6;
  }
  
  .loading-title, .error-title {
    @apply text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2;
  }
  
  .loading-description, .error-description {
    @apply text-gray-600 dark:text-gray-400 mb-6;
  }
  
  .error-icon {
    @apply w-16 h-16 text-red-500 mx-auto mb-4;
  }
  
  .retry-button {
    @apply px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg;
    @apply transition-colors duration-200 font-medium;
  }
  
  :global(.portfolio-grid) {
    @apply w-full h-full;
  }
</style>