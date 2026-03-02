// Performance monitoring middleware and utilities

// Request timing middleware
export const requestTimer = (req, res, next) => {
  const start = Date.now();
  
  // Store original end function
  const originalEnd = res.end;
  
  // Override end to capture timing before response is sent
  res.end = function(...args) {
    const duration = Date.now() - start;
    
    // Log slow requests (> 1 second)
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.originalUrl} - ${duration}ms`);
    }
    
    // Set header before ending response (if not already sent)
    if (!res.headersSent) {
      res.set('X-Response-Time', `${duration}ms`);
    }
    
    // Call original end
    originalEnd.apply(res, args);
  };
  
  next();
};

// Memory usage monitoring
export const checkMemoryUsage = () => {
  const used = process.memoryUsage();
  const formatMemory = (bytes) => Math.round(bytes / 1024 / 1024 * 100) / 100;
  
  return {
    rss: `${formatMemory(used.rss)} MB`,
    heapTotal: `${formatMemory(used.heapTotal)} MB`,
    heapUsed: `${formatMemory(used.heapUsed)} MB`,
    external: `${formatMemory(used.external)} MB`,
    arrayBuffers: `${formatMemory(used.arrayBuffers)} MB`
  };
};

// Database connection monitoring
export const checkDatabaseHealth = async (mongoose) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return {
      status: states[dbState],
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      isHealthy: dbState === 1
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      isHealthy: false
    };
  }
};

// System health check endpoint handler
export const healthCheck = async (req, res) => {
  const uptime = process.uptime();
  const memory = checkMemoryUsage();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development'
  });
};

// Log system stats periodically (optional)
export const startPerformanceLogging = (intervalMinutes = 30) => {
  setInterval(() => {
    const memory = checkMemoryUsage();
    console.log('=== System Performance ===');
    console.log('Memory Usage:', memory);
    console.log('Uptime:', Math.floor(process.uptime() / 60), 'minutes');
    console.log('========================');
  }, intervalMinutes * 60 * 1000);
};

export default {
  requestTimer,
  checkMemoryUsage,
  checkDatabaseHealth,
  healthCheck,
  startPerformanceLogging
};
