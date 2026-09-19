import type { PhotoItem } from '../data/content';

const DB_NAME = 'closred_photo_db';
const DB_VERSION = 1;
const STORE_NAME = 'user_photos';

/**
 * Open or initialize the IndexedDB instance
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve all user-uploaded photos from IndexedDB
 */
export async function getStoredPhotos(): Promise<PhotoItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[PhotoStorage] Error retrieving stored photos:', err);
    return [];
  }
}

/**
 * Save new or updated photos to IndexedDB
 */
export async function saveStoredPhotos(photos: PhotoItem[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      photos.forEach((photo) => {
        store.put(photo);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (err) {
    console.error('[PhotoStorage] Error saving photos:', err);
    throw err;
  }
}

/**
 * Delete a photo by ID from IndexedDB
 */
export async function deleteStoredPhoto(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('[PhotoStorage] Error deleting photo:', err);
    throw err;
  }
}

/**
 * Client-side image processor: compresses and resizes photos to optimal mobile/desktop web resolution
 * (Max width/height 1600px, 85% JPEG quality)
 */
export function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to WebP or JPEG for optimal browser storage
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(optimizedDataUrl);
      };

      img.onerror = () => reject(new Error('Failed to decode image file'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
