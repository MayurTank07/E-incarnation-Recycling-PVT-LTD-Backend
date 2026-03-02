import { param, body, validationResult } from 'express-validator';

export const validateMongoId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid ID',
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateImageUrl = [
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Invalid image URL')
    .matches(/^https?:\/\/(res\.cloudinary\.com|localhost)/)
    .withMessage('Only Cloudinary or local URLs are allowed'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

export const validatePagination = [
  param('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  param('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid pagination parameters',
        errors: errors.array()
      });
    }
    next();
  }
];
