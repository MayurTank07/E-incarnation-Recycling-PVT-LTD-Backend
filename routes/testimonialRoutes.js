import express from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createTestimonial)
  .get(getAllTestimonials);

router.route('/:id')
  .get(getTestimonialById)
  .put(protect, adminOnly, updateTestimonial)
  .delete(protect, adminOnly, deleteTestimonial);

export default router;
