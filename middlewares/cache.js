// Simple in-memory cache middleware
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheMiddleware = (duration = CACHE_DURATION) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      const { data, timestamp } = cachedResponse;
      const age = Date.now() - timestamp;

      // Check if cache is still valid
      if (age < duration) {
        res.set('X-Cache', 'HIT');
        res.set('X-Cache-Age', Math.floor(age / 1000));
        return res.json(data);
      } else {
        // Cache expired, remove it
        cache.delete(key);
      }
    }

    // Store original res.json
    const originalJson = res.json.bind(res);

    // Override res.json to cache the response
    res.json = function(data) {
      cache.set(key, {
        data,
        timestamp: Date.now()
      });
      res.set('X-Cache', 'MISS');
      return originalJson(data);
    };

    next();
  };
};

// Clear specific cache or all cache
export const clearCache = (pattern) => {
  if (!pattern) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
};

// Get cache stats
export const getCacheStats = () => {
  const now = Date.now();
  let validEntries = 0;
  let expiredEntries = 0;

  for (const [key, value] of cache.entries()) {
    const age = now - value.timestamp;
    if (age < CACHE_DURATION) {
      validEntries++;
    } else {
      expiredEntries++;
    }
  }

  return {
    totalEntries: cache.size,
    validEntries,
    expiredEntries,
    memoryUsage: process.memoryUsage()
  };
};

// Periodic cache cleanup
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    const age = now - value.timestamp;
    if (age >= CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION); // Run cleanup every cache duration

export default cacheMiddleware;
