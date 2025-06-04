<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  
  // Global error handling
  function handleError(event: ErrorEvent) {
    console.error('Global error:', event.error);
    // Could send to analytics service
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }
  });
</script>

<svelte:head>
  <title>Rahul Nangare - Interactive Portfolio</title>
</svelte:head>

<main class="min-h-screen">
  <slot />
</main>

<style>
  :global(html) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>