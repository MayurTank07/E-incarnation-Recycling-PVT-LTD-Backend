import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (!req.admin) {
        return res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
      }

      if (!req.admin.isActive) {
        return res.status(401).json({ success: false, message: 'Account is deactivated' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
});

export const adminOnly = (req, res, next) => {
  if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'super_admin')) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as admin' });
  }
};
