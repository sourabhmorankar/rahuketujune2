<script lang="ts">
  import { useGridStore } from '$lib/stores/grid.svelte.ts';
  
  const gridStore = useGridStore();
  
  let isSearchOpen = $state(false);
  let searchQuery = $state('');
  let searchResults = $state([]);
  
  function toggleSearch() {
    isSearchOpen = !isSearchOpen;
    if (isSearchOpen) {
      // Focus search input
      setTimeout(() => {
        const input = document.querySelector('.search-input') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    } else {
      searchQuery = '';
      searchResults = [];
    }
  }
  
  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    
    // Simple search implementation - filter cards by type for now
    if (searchQuery.trim()) {
      searchResults = gridStore.cards.filter(card => 
        card.cardType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      searchResults = [];
    }
  }
  
  function selectSearchResult(cardId: string) {
    gridStore.selectCard(cardId);
    gridStore.expandCard(cardId);
    toggleSearch();
  }
  
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      toggleSearch();
    }
  }
</script>

<!-- Search Toggle Button -->
<button 
  class="search-toggle"
  on:click={toggleSearch}
  aria-label="Open search"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</button>

<!-- Search Overlay -->
{#if isSearchOpen}
  <div class="search-overlay" on:keydown={handleKeyDown}>
    <div class="search-backdrop" on:click={toggleSearch}></div>
    
    <div class="search-content">
      <div class="search-header">
        <h2 class="search-title">Search Portfolio</h2>
        <button class="search-close" on:click={toggleSearch}>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="search-input-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search for content, skills, experience..."
          bind:value={searchQuery}
          on:input={handleSearch}
        />
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {#if searchQuery.trim()}
        <div class="search-results">
          {#if searchResults.length > 0}
            <h3 class="results-title">Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</h3>
            <div class="results-list">
              {#each searchResults as result}
                <button 
                  class="result-item"
                  on:click={() => selectSearchResult(result.id)}
                >
                  <div class="result-icon">
                    {#if result.cardType === 'bio'}
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    {:else if result.cardType === 'skills'}
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    {:else}
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    {/if}
                  </div>
                  <div class="result-info">
                    <div class="result-title">{result.cardType}</div>
                    <div class="result-description">Portfolio card</div>
                  </div>
                </button>
              {/each}
            </div>
          {:else}
            <div class="no-results">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p class="no-results-text">No results found for "{searchQuery}"</p>
              <p class="no-results-suggestion">Try searching for "bio", "skills", or "experience"</p>
            </div>
          {/if}
        </div>
      {:else}
        <div class="search-suggestions">
          <h3 class="suggestions-title">Quick searches</h3>
          <div class="suggestions-list">
            <button class="suggestion-item" on:click={() => searchQuery = 'bio'}>
              About me
            </button>
            <button class="suggestion-item" on:click={() => searchQuery = 'skills'}>
              Technical skills
            </button>
            <button class="suggestion-item" on:click={() => searchQuery = 'experience'}>
              Work experience
            </button>
          </div>
        </div>
      {/if}
      
      <div class="search-footer">
        <p class="search-tip">
          <kbd>Esc</kbd> to close • <kbd>Enter</kbd> to select
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  .search-toggle {
    @apply fixed top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 z-30;
    @apply text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100;
    @apply hover:shadow-xl transition-all duration-200;
  }

  .search-overlay {
    @apply fixed inset-0 z-50 flex items-start justify-center pt-16;
  }

  .search-backdrop {
    @apply absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm;
  }

  .search-content {
    @apply relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl;
    @apply border border-gray-200 dark:border-gray-700;
  }

  .search-header {
    @apply flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700;
  }

  .search-title {
    @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
  }

  .search-close {
    @apply p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300;
  }

  .search-input-container {
    @apply relative p-4;
  }

  .search-input {
    @apply w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg;
    @apply bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100;
    @apply focus:ring-2 focus:ring-blue-500 focus:border-transparent;
    @apply placeholder-gray-500 dark:placeholder-gray-400;
  }

  .search-icon {
    @apply absolute left-7 top-7 w-5 h-5 text-gray-400;
  }

  .search-results, .search-suggestions {
    @apply p-4 border-t border-gray-200 dark:border-gray-700;
  }

  .results-title, .suggestions-title {
    @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-3;
  }

  .results-list, .suggestions-list {
    @apply space-y-2;
  }

  .result-item {
    @apply w-full flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700;
    @apply transition-colors duration-150 text-left;
  }

  .result-icon {
    @apply flex-shrink-0 mr-3 text-gray-500 dark:text-gray-400;
  }

  .result-info {
    @apply flex-1;
  }

  .result-title {
    @apply font-medium text-gray-900 dark:text-gray-100 capitalize;
  }

  .result-description {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }

  .suggestion-item {
    @apply px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600;
    @apply transition-colors duration-150;
  }

  .no-results {
    @apply text-center py-8;
  }

  .no-results-text {
    @apply text-gray-700 dark:text-gray-300 mt-4 mb-2;
  }

  .no-results-suggestion {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }

  .search-footer {
    @apply p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg;
  }

  .search-tip {
    @apply text-xs text-gray-500 dark:text-gray-400 text-center;
  }

  .search-tip kbd {
    @apply px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono;
  }

  @media (max-width: 768px) {
    .search-toggle {
      @apply top-2 right-2 p-2;
    }
    
    .search-content {
      @apply mx-2;
    }
    
    .search-overlay {
      @apply pt-8;
    }
  }
</style>