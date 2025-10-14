import NodeCache, { type Key } from 'node-cache';

class ApiCache {
  private static instance: ApiCache;
  private nodeCache: NodeCache;
  private readonly ttl = 60 * 60;

  private constructor() {
    this.nodeCache = new NodeCache({
      stdTTL: this.ttl,
    });
  }

  public static getInstance() {
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache();
    }
    return ApiCache.instance;
  }

  public getCache<T>(key: Key) {
    return this.nodeCache.get<T>(key);
  }

  public setCache<T>(key: Key, value: T) {
    return this.nodeCache.set(key, value);
  }
}

/**
 * @note API Route 외에서 호출하지 마세요.
 */
export const apiCacheInstance = ApiCache.getInstance();
