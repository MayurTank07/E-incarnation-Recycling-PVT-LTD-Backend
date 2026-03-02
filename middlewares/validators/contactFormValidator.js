import { body, validationResult } from 'express-validator';

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
    .escape(),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email is too long'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{10,20}$/).withMessage('Please provide a valid phone number'),
  
  body('companyName')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Company name is too long')
    .escape(),
  
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City name is too long')
    .escape(),
  
  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State name is too long')
    .escape(),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
    .escape(),
  
  body('source')
    .optional()
    .isIn(['contact_page', 'footer_form']).withMessage('Invalid source'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];
