import { FirestoreService } from './firestore';
import { where, orderBy, limit } from 'firebase/firestore';

export class PortfolioService {
  // BioCluster operations
  static async getBioClusterCard(cardType: string) {
    return FirestoreService.getDocument('bioCluster', cardType);
  }

  static async getAllBioClusterCards() {
    return FirestoreService.getDocuments('bioCluster', [where('isActive', '==', true)]);
  }

  static async updateBioClusterCard(cardType: string, data: any) {
    return FirestoreService.updateDocument('bioCluster', cardType, data);
  }

  // ContentCluster operations
  static async getPublishedContent(cardType?: string, limitCount: number = 10) {
    const constraints = [
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    ];
    
    if (cardType) {
      constraints.unshift(where('cardType', '==', cardType));
    }
    
    return FirestoreService.getDocuments('contentCluster', constraints);
  }

  static async getContentBySlug(slug: string) {
    const docs = await FirestoreService.getDocuments('contentCluster', [
      where('slug', '==', slug),
      where('status', '==', 'published')
    ]);
    return docs[0] || null;
  }

  static async getFeaturedContent() {
    return FirestoreService.getDocuments('contentCluster', [
      where('status', '==', 'published'),
      where('metadata.isFeatured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(5)
    ]);
  }

  // Grid Layout operations
  static async getActiveGridLayout() {
    const layouts = await FirestoreService.getDocuments('gridLayout', [
      where('isActive', '==', true)
    ]);
    return layouts[0] || null;
  }

  // Categories and Tags
  static async getCategories() {
    return FirestoreService.getDocuments('categories', [
      where('isActive', '==', true),
      orderBy('sortOrder', 'asc')
    ]);
  }

  static async getTags() {
    return FirestoreService.getDocuments('tags', [
      orderBy('usageCount', 'desc'),
      limit(20)
    ]);
  }
}