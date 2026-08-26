/**
 * Lightweight AsyncStorage wrapper with type safety and SSR-safe fallback.
 * Falls back to in-memory storage when AsyncStorage is unavailable.
 */
import { Platform } from 'react-native';

type MemoryStore = Map<string, string>;
const memory: MemoryStore = new Map();

let asyncStorage: any = null;
try {
  if (Platform.OS !== 'web') {
    // Lazy require so web/SSR doesn't break
    asyncStorage = require('@react-native-async-storage/async-storage').default;
  }
} catch {
  asyncStorage = null;
}

export const AsyncStorage = {
  async getItem<T = string>(key: string): Promise<T | null> {
    if (asyncStorage) {
      const v = await asyncStorage.getItem(key);
      if (v == null) return null;
      try {
        return JSON.parse(v) as T;
      } catch {
        return v as unknown as T;
      }
    }
    const v = memory.get(key);
    if (v == null) return null;
    try {
      return JSON.parse(v) as T;
    } catch {
      return v as unknown as T;
    }
  },

  async setItem(key: string, value: unknown): Promise<void> {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    if (asyncStorage) {
      await asyncStorage.setItem(key, v);
      return;
    }
    memory.set(key, v);
  },

  async removeItem(key: string): Promise<void> {
    if (asyncStorage) {
      await asyncStorage.removeItem(key);
      return;
    }
    memory.delete(key);
  },
};
