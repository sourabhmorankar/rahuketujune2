<script lang="ts">
  import type { BioContent } from '$lib/types/portfolio';
  
  interface Props {
    content: BioContent;
    isExpanded?: boolean;
  }
  
  let { content, isExpanded = false }: Props = $props();
</script>

{#if isExpanded}
  <!-- Expanded Bio View -->
  <div class="bio-expanded">
    <div class="bio-header">
      <div class="profile-section">
        <img 
          src={content.profileImage} 
          alt={content.name}
          class="profile-image"
        />
        <div class="profile-info">
          <h1 class="name">{content.name}</h1>
          <p class="tagline">{content.tagline}</p>
          <p class="location">{content.location}</p>
        </div>
      </div>
    </div>
    
    <div class="bio-content">
      <section class="story-section">
        <h2>About Me</h2>
        <p>{content.personalStory}</p>
      </section>
      
      <section class="mission-section">
        <h2>Mission</h2>
        <p>{content.missionStatement}</p>
      </section>
      
      {#if content.timeline && content.timeline.length > 0}
        <section class="timeline-section">
          <h2>Journey</h2>
          <div class="timeline">
            {#each content.timeline as milestone}
              <div class="timeline-item" class:milestone={milestone.milestone}>
                <div class="timeline-year">{milestone.year}</div>
                <div class="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}
    </div>
  </div>
{:else}
  <!-- Thumbnail Bio View -->
  <div class="bio-thumbnail">
    <div class="thumbnail-content">
      <img 
        src={content.profileImage} 
        alt={content.name}
        class="thumbnail-image"
      />
      <div class="thumbnail-info">
        <h3 class="thumbnail-name">{content.name}</h3>
        <p class="thumbnail-tagline">{content.tagline}</p>
        <p class="thumbnail-location">{content.location}</p>
        
        {#if content.socialLinks && content.socialLinks.length > 0}
          <div class="social-links">
            {#each content.socialLinks.slice(0, 3) as social}
              <a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-link"
                aria-label={social.platform}
              >
                {#if social.platform === 'linkedin'}
                  <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                {:else if social.platform === 'email'}
                  <svg class="social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                {/if}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Thumbnail styles */
  .bio-thumbnail {
    @apply h-full flex items-center justify-center p-4;
  }
  
  .thumbnail-content {
    @apply text-center;
  }
  
  .thumbnail-image {
    @apply w-20 h-20 rounded-full mx-auto mb-3 object-cover;
    @apply ring-2 ring-blue-500 ring-offset-2;
  }
  
  .thumbnail-name {
    @apply text-lg font-bold text-gray-900 dark:text-gray-100 mb-1;
  }
  
  .thumbnail-tagline {
    @apply text-sm text-gray-600 dark:text-gray-400 mb-1;
  }
  
  .thumbnail-location {
    @apply text-xs text-gray-500 dark:text-gray-500 mb-3;
  }
  
  .social-links {
    @apply flex justify-center space-x-2;
  }
  
  .social-link {
    @apply p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400;
    @apply transition-colors duration-200;
  }
  
  .social-icon {
    @apply w-4 h-4;
  }
  
  /* Expanded styles */
  .bio-expanded {
    @apply h-full overflow-y-auto p-6;
  }
  
  .bio-header {
    @apply mb-8;
  }
  
  .profile-section {
    @apply flex items-center space-x-6;
  }
  
  .profile-image {
    @apply w-32 h-32 rounded-full object-cover;
    @apply ring-4 ring-blue-500 ring-offset-4;
  }
  
  .name {
    @apply text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2;
  }
  
  .tagline {
    @apply text-xl text-blue-600 dark:text-blue-400 mb-1;
  }
  
  .location {
    @apply text-gray-600 dark:text-gray-400;
  }
  
  .bio-content section {
    @apply mb-8;
  }
  
  .bio-content h2 {
    @apply text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4;
  }
  
  .bio-content p {
    @apply text-gray-700 dark:text-gray-300 leading-relaxed;
  }
  
  .timeline {
    @apply space-y-4;
  }
  
  .timeline-item {
    @apply flex space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800;
  }
  
  .timeline-item.milestone {
    @apply bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500;
  }
  
  .timeline-year {
    @apply text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[4rem];
  }
  
  .timeline-content h3 {
    @apply font-semibold text-gray-900 dark:text-gray-100 mb-1;
  }
  
  .timeline-content p {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }
  
  @media (max-width: 768px) {
    .profile-section {
      @apply flex-col space-x-0 space-y-4 text-center;
    }
    
    .profile-image {
      @apply w-24 h-24;
    }
    
    .name {
      @apply text-2xl;
    }
    
    .tagline {
      @apply text-lg;
    }
  }
</style>