// Grid state management using Svelte 5 runes
import type { GridCard, GridViewport, Position, CardType } from '$lib/types/grid';

// Grid viewport state
let viewport = $state<GridViewport>({
  x: 0,
  y: 0,
  zoom: 1,
  width: 1200,
  height: 800,
  minZoom: 0.5,
  maxZoom: 2.0
});

// Grid cards state
let cards = $state<GridCard[]>([]);

// Interaction state
let isDragging = $state(false);
let isZooming = $state(false);
let selectedCard = $state<string | null>(null);
let expandedCard = $state<string | null>(null);

// Touch/mouse state
let lastPointerPosition = $state<Position>({ x: 0, y: 0 });
let dragStartPosition = $state<Position>({ x: 0, y: 0 });

// Performance state
let isAnimating = $state(false);
let renderTime = $state(0);

// Derived states
const visibleCards = $derived(() => {
  // Calculate which cards are currently visible in viewport
  const viewportLeft = -viewport.x / viewport.zoom;
  const viewportTop = -viewport.y / viewport.zoom;
  const viewportRight = viewportLeft + (viewport.width / viewport.zoom);
  const viewportBottom = viewportTop + (viewport.height / viewport.zoom);
  
  return cards.filter(card => {
    const cardRight = card.position.x + card.position.width;
    const cardBottom = card.position.y + card.position.height;
    
    return !(
      card.position.x > viewportRight ||
      cardRight < viewportLeft ||
      card.position.y > viewportBottom ||
      cardBottom < viewportTop
    );
  });
});

const gridBounds = $derived(() => {
  if (cards.length === 0) return { minX: 0, minY: 0, maxX: 800, maxY: 600 };
  
  let minX = Math.min(...cards.map(card => card.position.x));
  let minY = Math.min(...cards.map(card => card.position.y));
  let maxX = Math.max(...cards.map(card => card.position.x + card.position.width));
  let maxY = Math.max(...cards.map(card => card.position.y + card.position.height));
  
  // Add padding
  minX -= 100;
  minY -= 100;
  maxX += 100;
  maxY += 100;
  
  return { minX, minY, maxX, maxY };
});

// Grid manipulation functions
export function setViewport(newViewport: Partial<GridViewport>) {
  viewport = { ...viewport, ...newViewport };
}

export function setCards(newCards: GridCard[]) {
  cards = newCards;
}

export function addCard(card: GridCard) {
  cards = [...cards, card];
}

export function updateCard(cardId: string, updates: Partial<GridCard>) {
  const index = cards.findIndex(card => card.id === cardId);
  if (index !== -1) {
    cards[index] = { ...cards[index], ...updates };
  }
}

export function removeCard(cardId: string) {
  cards = cards.filter(card => card.id !== cardId);
}

// Viewport manipulation
export function panTo(x: number, y: number, animate = true) {
  if (animate) {
    isAnimating = true;
    // TODO: Implement smooth animation
    setTimeout(() => { isAnimating = false; }, 300);
  }
  
  viewport.x = -x * viewport.zoom + viewport.width / 2;
  viewport.y = -y * viewport.zoom + viewport.height / 2;
}

export function zoomTo(zoom: number, centerX?: number, centerY?: number, animate = true) {
  const newZoom = Math.max(viewport.minZoom, Math.min(viewport.maxZoom, zoom));
  
  if (centerX !== undefined && centerY !== undefined) {
    // Zoom to specific point
    const zoomRatio = newZoom / viewport.zoom;
    viewport.x = centerX - (centerX - viewport.x) * zoomRatio;
    viewport.y = centerY - (centerY - viewport.y) * zoomRatio;
  }
  
  viewport.zoom = newZoom;
  
  if (animate) {
    isAnimating = true;
    setTimeout(() => { isAnimating = false; }, 300);
  }
}

export function fitToGrid() {
  const bounds = gridBounds;
  const gridWidth = bounds.maxX - bounds.minX;
  const gridHeight = bounds.maxY - bounds.minY;
  
  const scaleX = viewport.width / gridWidth;
  const scaleY = viewport.height / gridHeight;
  const scale = Math.min(scaleX, scaleY) * 0.9; // 90% to add padding
  
  const clampedZoom = Math.max(viewport.minZoom, Math.min(viewport.maxZoom, scale));
  
  zoomTo(clampedZoom);
  panTo(bounds.minX + gridWidth / 2, bounds.minY + gridHeight / 2);
}

// Card interaction
export function selectCard(cardId: string | null) {
  selectedCard = cardId;
}

export function expandCard(cardId: string | null) {
  expandedCard = cardId;
  if (cardId) {
    // Pan to card when expanding
    const card = cards.find(c => c.id === cardId);
    if (card) {
      panTo(
        card.position.x + card.position.width / 2,
        card.position.y + card.position.height / 2
      );
    }
  }
}

// Drag operations
export function startDrag(pointerX: number, pointerY: number) {
  isDragging = true;
  lastPointerPosition = { x: pointerX, y: pointerY };
  dragStartPosition = { x: viewport.x, y: viewport.y };
}

export function updateDrag(pointerX: number, pointerY: number) {
  if (!isDragging) return;
  
  const deltaX = pointerX - lastPointerPosition.x;
  const deltaY = pointerY - lastPointerPosition.y;
  
  viewport.x = dragStartPosition.x + (pointerX - lastPointerPosition.x);
  viewport.y = dragStartPosition.y + (pointerY - lastPointerPosition.y);
}

export function endDrag() {
  isDragging = false;
}

// Export reactive getters
export function useGridStore() {
  return {
    // State getters
    get viewport() { return viewport; },
    get cards() { return cards; },
    get visibleCards() { return visibleCards; },
    get gridBounds() { return gridBounds; },
    get isDragging() { return isDragging; },
    get isZooming() { return isZooming; },
    get selectedCard() { return selectedCard; },
    get expandedCard() { return expandedCard; },
    get isAnimating() { return isAnimating; },
    
    // Actions
    setViewport,
    setCards,
    addCard,
    updateCard,
    removeCard,
    panTo,
    zoomTo,
    fitToGrid,
    selectCard,
    expandCard,
    startDrag,
    updateDrag,
    endDrag
  };
}