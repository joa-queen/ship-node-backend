import NodeCache from 'node-cache';

export const cacheStdTTL = 60 * 5; // 5 minutes default TTL
const cache = new NodeCache({ stdTTL: cacheStdTTL });

export const getFromCache = <T>(key: string): T | undefined => cache.get<T>(key);

export const setInCache = <T>(key: string, value: T, ttl: number = cacheStdTTL): boolean => cache.set(key, value, ttl);

export const deleteFromCache = (key: string): number => cache.del(key);

export default cache;
