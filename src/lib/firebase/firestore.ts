import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  type DocumentData,
  type QueryConstraint
} from 'firebase/firestore';

// Generic Firestore operations
export class FirestoreService {
  static async getDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  static async getDocuments(collectionName: string, constraints: QueryConstraint[] = []) {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  static async createDocument(collectionName: string, docId: string, data: DocumentData) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        metadata: {
          ...data.metadata,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      return docId;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  static async updateDocument(collectionName: string, docId: string, data: Partial<DocumentData>) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        'metadata.updatedAt': new Date()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  static async deleteDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}