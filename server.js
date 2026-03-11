import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { generalLimiter, authLimiter } from './middlewares/security.js';
import { requestTimer, startPerformanceLogging } from './utils/performanceMonitor.js';

import authRoutes from './routes/authRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import contactFormRoutes from './routes/contactFormRoutes.js';
import contactPageRoutes from './routes/contactPageRoutes.js';
import heroStatsRoutes from './routes/heroStatsRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import footerRoutes from './routes/footerRoutes.js';
import servicesPageRoutes from './routes/servicesPageRoutes.js';
import eprPageRoutes from './routes/eprPageRoutes.js';
import aboutPageRoutes from './routes/aboutPageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import whatsappSettingsRoutes from './routes/whatsappSettingsRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Performance monitoring
app.use(requestTimer);

// Start performance logging in production
if (process.env.NODE_ENV === 'production') {
  startPerformanceLogging(30); // Log every 30 minutes
}

// Compression middleware - compress all responses
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 0 // Compress all responses
}));

// Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:5173', 
      'http://localhost:5174',
      'https://www.e-incarnation.com',
      'https://e-incarnation.com',
      'https://e-incarnation-recycling-pvt-ltd.vercel.app'
    ];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Apply rate limiting to all API routes
app.use('/api/', generalLimiter);

app.get('/', (req, res) => {
  res.json({ message: 'E-Incarnation API is running...' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT || process.env.PORT || 5001
  });
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/contact-forms', contactFormRoutes);
app.use('/api/contact-page', contactPageRoutes);
app.use('/api/hero-stats', heroStatsRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/services-page', servicesPageRoutes);
app.use('/api/epr-page', eprPageRoutes);
app.use('/api/about-page', aboutPageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/whatsapp-settings', whatsappSettingsRoutes);
app.use('/api/social-media', socialMediaRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
