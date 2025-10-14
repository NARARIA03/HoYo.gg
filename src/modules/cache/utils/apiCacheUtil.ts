import type { Key } from 'node-cache';
import { apiCacheInstance } from '../class/ApiCache';

/**
 * @description key에 해당하는 캐시를 반환합니다.
 * @note API Route 외에서 호출하지 마세요.
 */
export const getApiCache = <T>(key: Key) => {
  return apiCacheInstance.getCache<T>(key);
};

/**
 * @description key에 새로운 캐시를 저장합니다.
 * @note API Route 외에서 호출하지 마세요.
 */
export const setApiCache = <T>(key: Key, value: T) => {
  return apiCacheInstance.setCache(key, value);
};
