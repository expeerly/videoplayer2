/**
 * CacheEntry represents a single entry in the cache. It contains the cached data and
 * the timestamp when the entry should be invalidated.
 *
 * @property {T} data - The cached data.
 * @property {number} timestamp - The timestamp when the entry should be invalidated.
 */
type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache<T = unknown> {
  private static instance: Cache<unknown>;
  private cache: Map<string, CacheEntry<T>>;
  private readonly DEFAULT_TTL = 60 * 1000; // 1 minute default TTL

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache<unknown> {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  set(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = Cache.getInstance();
