import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getSocialMedia,
  getActiveSocialMedia,
  getSocialMediaById,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia
} from '../controllers/socialMediaController.js';

const router = express.Router();

// Public route - get only active social media
router.get('/active', getActiveSocialMedia);

// Admin routes
router.route('/')
  .get(protect, adminOnly, getSocialMedia)
  .post(protect, adminOnly, createSocialMedia);

router.route('/:id')
  .get(protect, adminOnly, getSocialMediaById)
  .put(protect, adminOnly, updateSocialMedia)
  .delete(protect, adminOnly, deleteSocialMedia);

export default router;
