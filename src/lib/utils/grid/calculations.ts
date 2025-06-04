// Grid calculation utilities
import type { Position, Size, Bounds, GridViewport } from '$lib/types/grid';

export function isPointInBounds(point: Position, bounds: Bounds): boolean {
  return (
    point.x >= bounds.x &&
    point.x <= bounds.x + bounds.width &&
    point.y >= bounds.y &&
    point.y <= bounds.y + bounds.height
  );
}

export function getBoundsDistance(bounds1: Bounds, bounds2: Bounds): number {
  const dx = Math.max(0, Math.max(bounds1.x - (bounds2.x + bounds2.width), bounds2.x - (bounds1.x + bounds1.width)));
  const dy = Math.max(0, Math.max(bounds1.y - (bounds2.y + bounds2.height), bounds2.y - (bounds1.y + bounds1.height)));
  return Math.sqrt(dx * dx + dy * dy);
}

export function getBoundsCenter(bounds: Bounds): Position {
  return {
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2
  };
}

export function scaleBounds(bounds: Bounds, scale: number): Bounds {
  return {
    x: bounds.x * scale,
    y: bounds.y * scale,
    width: bounds.width * scale,
    height: bounds.height * scale
  };
}

export function translateBounds(bounds: Bounds, offset: Position): Bounds {
  return {
    x: bounds.x + offset.x,
    y: bounds.y + offset.y,
    width: bounds.width,
    height: bounds.height
  };
}

export function getViewportBounds(viewport: GridViewport): Bounds {
  return {
    x: -viewport.x / viewport.zoom,
    y: -viewport.y / viewport.zoom,
    width: viewport.width / viewport.zoom,
    height: viewport.height / viewport.zoom
  };
}

export function screenToGrid(screenPoint: Position, viewport: GridViewport): Position {
  return {
    x: (screenPoint.x - viewport.x) / viewport.zoom,
    y: (screenPoint.y - viewport.y) / viewport.zoom
  };
}

export function gridToScreen(gridPoint: Position, viewport: GridViewport): Position {
  return {
    x: gridPoint.x * viewport.zoom + viewport.x,
    y: gridPoint.y * viewport.zoom + viewport.y
  };
}