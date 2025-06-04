// Portfolio content state management using Svelte 5 runes
import type { BioClusterCard, ContentClusterCard, Category, Tag } from '$lib/types/portfolio';
import { PortfolioService } from '$lib/firebase/portfolio';

// Portfolio content state
let bioClusterCards = $state<BioClusterCard[]>([]);
let contentClusterCards = $state<ContentClusterCard[]>([]);
let categories = $state<Category[]>([]);
let tags = $state<Tag[]>([]);

// Loading and error states
let isLoading = $state(false);
let error = $state<string | null>(null);

// Filter and search state
let activeFilters = $state<{
  categories: string[];
  tags: string[];
  cardTypes: string[];
}>({
  categories: [],
  tags: [],
  cardTypes: []
});

let searchQuery = $state('');

// Derived states
const filteredContent = $derived(() => {
  let filtered = contentClusterCards;

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(card => 
      card.title.toLowerCase().includes(query) ||
      card.excerpt.toLowerCase().includes(query) ||
      card.content.toLowerCase().includes(query) ||
      card.categories.some(cat => cat.toLowerCase().includes(query)) ||
      card.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply category filter
  if (activeFilters.categories.length > 0) {
    filtered = filtered.filter(card =>
      card.categories.some(cat => activeFilters.categories.includes(cat))
    );
  }

  // Apply tag filter
  if (activeFilters.tags.length > 0) {
    filtered = filtered.filter(card =>
      card.tags.some(tag => activeFilters.tags.includes(tag))
    );
  }

  // Apply card type filter
  if (activeFilters.cardTypes.length > 0) {
    filtered = filtered.filter(card =>
      activeFilters.cardTypes.includes(card.cardType)
    );
  }

  return filtered;
});

const featuredContent = $derived(() =>
  contentClusterCards
    .filter(card => card.metadata.isFeatured && card.status === 'published')
    .slice(0, 5)
);

const recentContent = $derived(() =>
  contentClusterCards
    .filter(card => card.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 10)
);

// Data loading functions
async function loadBioClusterCards() {
  try {
    isLoading = true;
    error = null;
    const cards = await PortfolioService.getAllBioClusterCards();
    bioClusterCards = cards;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load bio cluster cards';
    console.error('Error loading bio cluster cards:', err);
  } finally {
    isLoading = false;
  }
}

async function loadContentClusterCards(cardType?: string, limit?: number) {
  try {
    isLoading = true;
    error = null;
    const cards = await PortfolioService.getPublishedContent(cardType, limit);
    contentClusterCards = cards;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load content';
    console.error('Error loading content cluster cards:', err);
  } finally {
    isLoading = false;
  }
}

async function loadCategories() {
  try {
    const cats = await PortfolioService.getCategories();
    categories = cats;
  } catch (err) {
    console.error('Error loading categories:', err);
  }
}

async function loadTags() {
  try {
    const tagList = await PortfolioService.getTags();
    tags = tagList;
  } catch (err) {
    console.error('Error loading tags:', err);
  }
}

async function loadFeaturedContent() {
  try {
    const featured = await PortfolioService.getFeaturedContent();
    // Update the featured flag in contentClusterCards
    contentClusterCards = contentClusterCards.map(card => ({
      ...card,
      metadata: {
        ...card.metadata,
        isFeatured: featured.some(f => f.id === card.id)
      }
    }));
  } catch (err) {
    console.error('Error loading featured content:', err);
  }
}

async function getContentBySlug(slug: string) {
  try {
    return await PortfolioService.getContentBySlug(slug);
  } catch (err) {
    console.error('Error loading content by slug:', err);
    return null;
  }
}

// Filter functions
function setSearchQuery(query: string) {
  searchQuery = query;
}

function addCategoryFilter(categoryId: string) {
  if (!activeFilters.categories.includes(categoryId)) {
    activeFilters.categories = [...activeFilters.categories, categoryId];
  }
}

function removeCategoryFilter(categoryId: string) {
  activeFilters.categories = activeFilters.categories.filter(id => id !== categoryId);
}

function addTagFilter(tagId: string) {
  if (!activeFilters.tags.includes(tagId)) {
    activeFilters.tags = [...activeFilters.tags, tagId];
  }
}

function removeTagFilter(tagId: string) {
  activeFilters.tags = activeFilters.tags.filter(id => id !== tagId);
}

function addCardTypeFilter(cardType: string) {
  if (!activeFilters.cardTypes.includes(cardType)) {
    activeFilters.cardTypes = [...activeFilters.cardTypes, cardType];
  }
}

function removeCardTypeFilter(cardType: string) {
  activeFilters.cardTypes = activeFilters.cardTypes.filter(type => type !== cardType);
}

function clearAllFilters() {
  activeFilters = {
    categories: [],
    tags: [],
    cardTypes: []
  };
  searchQuery = '';
}

// Content manipulation (for admin)
function updateBioClusterCard(cardType: string, updates: Partial<BioClusterCard>) {
  const index = bioClusterCards.findIndex(card => card.cardType === cardType);
  if (index !== -1) {
    bioClusterCards[index] = { ...bioClusterCards[index], ...updates };
  }
}

function addContentCard(card: ContentClusterCard) {
  contentClusterCards = [card, ...contentClusterCards];
}

function updateContentCard(cardId: string, updates: Partial<ContentClusterCard>) {
  const index = contentClusterCards.findIndex(card => card.id === cardId);
  if (index !== -1) {
    contentClusterCards[index] = { ...contentClusterCards[index], ...updates };
  }
}

function removeContentCard(cardId: string) {
  contentClusterCards = contentClusterCards.filter(card => card.id !== cardId);
}

// Initialize portfolio data
async function initializePortfolio() {
  await Promise.all([
    loadBioClusterCards(),
    loadContentClusterCards(),
    loadCategories(),
    loadTags()
  ]);
}

// Export reactive getters and actions
export function usePortfolioStore() {
  return {
    // State getters
    get bioClusterCards() { return bioClusterCards; },
    get contentClusterCards() { return contentClusterCards; },
    get categories() { return categories; },
    get tags() { return tags; },
    get isLoading() { return isLoading; },
    get error() { return error; },
    get searchQuery() { return searchQuery; },
    get activeFilters() { return activeFilters; },
    
    // Derived getters
    get filteredContent() { return filteredContent; },
    get featuredContent() { return featuredContent; },
    get recentContent() { return recentContent; },
    
    // Data loading actions
    loadBioClusterCards,
    loadContentClusterCards,
    loadCategories,
    loadTags,
    loadFeaturedContent,
    getContentBySlug,
    initializePortfolio,
    
    // Filter actions
    setSearchQuery,
    addCategoryFilter,
    removeCategoryFilter,
    addTagFilter,
    removeTagFilter,
    addCardTypeFilter,
    removeCardTypeFilter,
    clearAllFilters,
    
    // Content manipulation actions
    updateBioClusterCard,
    addContentCard,
    updateContentCard,
    removeContentCard
  };
}