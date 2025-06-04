// Grid system type definitions
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridViewport {
  x: number;         // Viewport offset X
  y: number;         // Viewport offset Y
  zoom: number;      // Current zoom level
  width: number;     // Viewport width
  height: number;    // Viewport height
  minZoom: number;   // Minimum zoom level
  maxZoom: number;   // Maximum zoom level
}

export interface GridPosition extends Position, Size {
  zIndex?: number;
}

export interface ResponsivePosition {
  mobile?: Partial<GridPosition>;
  tablet?: Partial<GridPosition>;
  desktop?: Partial<GridPosition>;
}

export type CardType = 
  // BioCluster cards (unique)
  | 'bio' 
  | 'welcome' 
  | 'skills' 
  | 'experience' 
  | 'medals' 
  | 'ask' 
  | 'miniGallery' 
  | 'testimonialCarousel' 
  | 'featuredArticles' 
  | 'featuredSocialEmbeds' 
  | 'newsTicker'
  // ContentCluster cards (multiple)
  | 'blog' 
  | 'caseStudy' 
  | 'adventure' 
  | 'testimonial' 
  | 'snap' 
  | 'socialEmbed' 
  | 'newsUpdate';

export interface GridCard {
  id: string;
  cardType: CardType;
  position: GridPosition;
  isVisible: boolean;
  isActive: boolean;
  responsivePositions?: ResponsivePosition;
  animationState?: 'idle' | 'hover' | 'expanded' | 'morphing';
  lastInteraction?: Date;
}

export interface GridLayout {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  viewport: GridViewport;
  cards: GridCard[];
  responsiveBreakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    version: number;
  };
}

export interface DragState {
  isDragging: boolean;
  startPosition: Position;
  currentPosition: Position;
  dragOffset: Position;
  target?: string; // Card ID being dragged
}

export interface ZoomState {
  isZooming: boolean;
  startZoom: number;
  targetZoom: number;
  centerPoint: Position;
}

export interface GridInteraction {
  type: 'pan' | 'zoom' | 'select' | 'expand' | 'drag';
  startTime: number;
  endTime?: number;
  startPosition?: Position;
  endPosition?: Position;
  cardId?: string;
  data?: any;
}

export interface MiniMapConfig {
  width: number;
  height: number;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  showViewport: boolean;
  showCards: boolean;
  backgroundColor: string;
  borderColor: string;
}

export interface SearchConfig {
  placeholder: string;
  debounceMs: number;
  maxResults: number;
  highlightColor: string;
  searchFields: string[];
}

export interface GridConfig {
  animation: {
    duration: number;
    easing: string;
    enableHardwareAcceleration: boolean;
  };
  touch: {
    enableGestures: boolean;
    pinchSensitivity: number;
    panSensitivity: number;
    doubleTapZoom: number;
  };
  performance: {
    virtualScrolling: boolean;
    renderThreshold: number;
    maxVisibleCards: number;
    useRAF: boolean;
  };
  accessibility: {
    enableKeyboardNavigation: boolean;
    enableScreenReader: boolean;
    focusOutlineColor: string;
  };
}

export interface CardMorphAnimation {
  from: Bounds;
  to: Bounds;
  duration: number;
  easing: string;
  progress: number;
}

export interface GridEvent {
  type: string;
  timestamp: number;
  cardId?: string;
  position?: Position;
  data?: any;
}