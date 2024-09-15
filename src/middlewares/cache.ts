import { Request, Response, NextFunction } from 'express';

import { cacheStdTTL, getFromCache, setInCache } from '@/utils/cache';
import { ApiResponse } from '@/utils/response';

export const cacheMiddleware = (ttl = cacheStdTTL) => (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;
  const cachedResponse = getFromCache<ApiResponse>(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const originalJson = res.json;
  res.json = function cachedJson(body) {
    setInCache(key, body, ttl);
    return originalJson.call(this, body);
  };

  return next();
};
