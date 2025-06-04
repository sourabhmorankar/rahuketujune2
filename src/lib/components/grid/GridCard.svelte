<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { GridCard } from '$lib/types/grid';
  
  // Props
  interface Props {
    card: GridCard;
    isSelected?: boolean;
    isExpanded?: boolean;
  }
  
  let { card, isSelected = false, isExpanded = false }: Props = $props();

  const dispatch = createEventDispatcher<{
    select: string;
    expand: string;
  }>();

  // Card style calculations
  const cardStyle = $derived(() => {
    const { x, y, width, height, zIndex = 1 } = card.position;
    return `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${width}px;
      height: ${height}px;
      z-index: ${zIndex};
      transform: translateZ(0);
    `;
  });

  const cardClasses = $derived(() => {
    const classes = ['grid-card'];
    
    if (isSelected) classes.push('selected');
    if (isExpanded) classes.push('expanded');
    if (card.animationState) classes.push(`animation-${card.animationState}`);
    
    return classes.join(' ');
  });

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
    
    if (isExpanded) {
      dispatch('expand', null);
    } else {
      dispatch('select', card.id);
    }
  }

  function handleDoubleClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    
    dispatch('expand', card.id);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event as any);
    } else if (event.key === 'Escape' && isExpanded) {
      dispatch('expand', null);
    }
  }
</script>

<div 
  class={cardClasses}
  style={cardStyle}
  role="button"
  tabindex="0"
  aria-label="Portfolio card: {card.cardType}"
  aria-pressed={isSelected}
  aria-expanded={isExpanded}
  on:click={handleClick}
  on:dblclick={handleDoubleClick}
  on:keydown={handleKeyDown}
>
  <!-- Card Content Slot -->
  <div class="card-content">
    {#if card.cardType === 'bio'}
      <!-- Bio card content will be dynamically loaded -->
      <div class="card-placeholder">
        <h3>Bio Card</h3>
        <p>About Rahul Nangare</p>
      </div>
    {:else if card.cardType === 'skills'}
      <div class="card-placeholder">
        <h3>Skills Card</h3>
        <p>Technical Skills & Expertise</p>
      </div>
    {:else if card.cardType === 'experience'}
      <div class="card-placeholder">
        <h3>Experience Card</h3>
        <p>Professional Journey</p>
      </div>
    {:else if card.cardType === 'welcome'}
      <div class="card-placeholder welcome">
        <h2>Welcome</h2>
        <p>to my interactive portfolio</p>
      </div>
    {:else}
      <div class="card-placeholder">
        <h3>{card.cardType}</h3>
        <p>Card content</p>
      </div>
    {/if}
  </div>

  <!-- Card Overlay -->
  {#if isSelected}
    <div class="card-overlay selected-overlay"></div>
  {/if}
  
  {#if isExpanded}
    <div class="card-overlay expanded-overlay"></div>
  {/if}
</div>

<style>
  .grid-card {
    @apply rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 cursor-pointer;
    @apply hover:shadow-lg hover:border-gray-300;
    @apply dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600;
  }

  .grid-card:focus {
    @apply outline-none ring-2 ring-blue-500 ring-opacity-50;
  }

  .grid-card.selected {
    @apply ring-2 ring-blue-500 shadow-xl;
  }

  .grid-card.expanded {
    @apply fixed inset-4 z-50 shadow-2xl;
    animation: expandCard 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-content {
    @apply relative w-full h-full p-4 overflow-hidden;
  }

  .card-placeholder {
    @apply flex flex-col items-center justify-center h-full text-center;
  }

  .card-placeholder.welcome {
    @apply bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg;
  }

  .card-placeholder h2 {
    @apply text-2xl font-bold mb-2;
  }

  .card-placeholder h3 {
    @apply text-lg font-semibold mb-1;
  }

  .card-placeholder p {
    @apply text-sm opacity-75;
  }

  .card-overlay {
    @apply absolute inset-0 pointer-events-none;
  }

  .selected-overlay {
    @apply bg-blue-500 bg-opacity-10 border-2 border-blue-500 rounded-lg;
  }

  .expanded-overlay {
    @apply bg-black bg-opacity-50;
  }

  /* Animation states */
  .grid-card.animation-hover {
    @apply scale-105;
  }

  .grid-card.animation-morphing {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes expandCard {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .grid-card.expanded {
      @apply inset-2;
    }
    
    .card-content {
      @apply p-2;
    }
  }
</style>