import { body, validationResult } from 'express-validator';

// Validation rules for resume generation
export const validateResumeGeneration = [
  body('jobDescription')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Job description must be between 10 and 2000 characters'),
  body('userDetails.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('userDetails.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('userDetails.phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  body('userDetails.education')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Education must be between 5 and 500 characters'),
  body('userDetails.experience')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Experience must be between 10 and 2000 characters'),
  body('userDetails.skills')
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Skills must be between 5 and 500 characters'),
  body('userDetails.projects')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Projects must be between 10 and 1000 characters'),
];

// Validation rules for user registration
export const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

// Validation rules for user login
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Sanitize HTML and prevent XSS
export const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj
        .replace(/[<>]/g, '') // Remove < and >
        .trim();
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitize(value);
      }
      return sanitized;
    }
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
};
