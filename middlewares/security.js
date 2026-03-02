import rateLimit from 'express-rate-limit';

// More lenient limits for development
const isDevelopment = process.env.NODE_ENV !== 'production';

export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: isDevelopment ? 1000 : (parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.path === '/health' || isDevelopment;
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevelopment ? 100 : (parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5),
  skipSuccessfulRequests: true,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment
});

export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isDevelopment ? 100 : 10,
  message: 'Too many form submissions. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment
});
