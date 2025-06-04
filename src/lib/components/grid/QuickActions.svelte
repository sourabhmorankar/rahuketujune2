<script lang="ts">
  import { useGridStore } from '$lib/stores/grid.svelte.ts';
  
  const gridStore = useGridStore();
  
  function downloadResume() {
    // Trigger resume download
    const link = document.createElement('a');
    link.href = '/resume/rahul-nangare-resume.pdf';
    link.download = 'Rahul_Nangare_Resume.pdf';
    link.click();
  }
  
  function openContact() {
    // Find and expand the 'ask' card or navigate to contact
    const askCard = gridStore.cards.find(card => card.cardType === 'ask');
    if (askCard) {
      gridStore.expandCard(askCard.id);
    } else {
      // Fallback to contact page
      window.open('/contact', '_blank');
    }
  }
  
  function sharePortfolio() {
    if (navigator.share) {
      navigator.share({
        title: 'Rahul Nangare - Portfolio',
        text: 'Check out my interactive portfolio showcasing my network engineering and cloud automation expertise.',
        url: window.location.href
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Show success message (could be enhanced with a toast notification)
        alert('Portfolio link copied to clipboard!');
      });
    }
  }
  
  function resetView() {
    gridStore.fitToGrid();
  }
</script>

<div class="quick-actions">
  <div class="actions-header">
    <h3 class="actions-title">Quick Actions</h3>
  </div>
  
  <div class="actions-list">
    <!-- Download Resume -->
    <button 
      class="action-item primary"
      on:click={downloadResume}
      aria-label="Download resume"
      title="Download Resume (PDF)"
    >
      <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="action-label">Resume</span>
    </button>
    
    <!-- Contact Me -->
    <button 
      class="action-item secondary"
      on:click={openContact}
      aria-label="Contact me"
      title="Get in touch"
    >
      <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span class="action-label">Contact</span>
    </button>
    
    <!-- Share Portfolio -->
    <button 
      class="action-item secondary"
      on:click={sharePortfolio}
      aria-label="Share portfolio"
      title="Share this portfolio"
    >
      <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
      <span class="action-label">Share</span>
    </button>
    
    <!-- Reset View -->
    <button 
      class="action-item tertiary"
      on:click={resetView}
      aria-label="Reset view"
      title="Fit all cards to view"
    >
      <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
      <span class="action-label">Reset</span>
    </button>
  </div>
  
  <!-- Social Links -->
  <div class="social-links">
    <h4 class="social-title">Connect</h4>
    <div class="social-list">
      <a 
        href="https://in.linkedin.com/in/rahul-nangare" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link linkedin"
        aria-label="LinkedIn profile"
      >
        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      
      <a 
        href="mailto:rahulnangare93@gmail.com"
        class="social-link email"
        aria-label="Send email"
      >
        <svg class="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
      
      <a 
        href="tel:+917588378020"
        class="social-link phone"
        aria-label="Call phone number"
      >
        <svg class="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  </div>
</div>

<style>
  .quick-actions {
    @apply fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-40;
    @apply opacity-90 hover:opacity-100 transition-opacity duration-200;
    min-width: 200px;
  }

  .actions-header {
    @apply mb-3;
  }

  .actions-title {
    @apply text-sm font-medium text-gray-700 dark:text-gray-300;
  }

  .actions-list {
    @apply space-y-2 mb-4;
  }

  .action-item {
    @apply w-full flex items-center p-2 rounded-lg transition-all duration-150;
    @apply text-left border border-transparent;
  }

  .action-item.primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white;
    @apply shadow-md hover:shadow-lg;
  }

  .action-item.secondary {
    @apply bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600;
    @apply text-gray-700 dark:text-gray-300;
  }

  .action-item.tertiary {
    @apply border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700;
    @apply text-gray-600 dark:text-gray-400;
  }

  .action-icon {
    @apply w-4 h-4 mr-2 flex-shrink-0;
  }

  .action-label {
    @apply text-sm font-medium;
  }

  .social-links {
    @apply pt-3 border-t border-gray-200 dark:border-gray-700;
  }

  .social-title {
    @apply text-xs font-medium text-gray-600 dark:text-gray-400 mb-2;
  }

  .social-list {
    @apply flex space-x-2;
  }

  .social-link {
    @apply p-2 rounded-lg transition-all duration-150;
    @apply hover:scale-110 hover:shadow-md;
  }

  .social-link.linkedin {
    @apply bg-blue-600 hover:bg-blue-700 text-white;
  }

  .social-link.email {
    @apply bg-gray-600 hover:bg-gray-700 text-white;
  }

  .social-link.phone {
    @apply bg-green-600 hover:bg-green-700 text-white;
  }

  .social-icon {
    @apply w-4 h-4;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .quick-actions {
      @apply bottom-2 right-2 p-3;
      min-width: 160px;
    }
    
    .action-item {
      @apply p-2;
    }
    
    .action-icon {
      @apply w-3 h-3;
    }
    
    .action-label {
      @apply text-xs;
    }
    
    .social-icon {
      @apply w-3 h-3;
    }
  }
</style>