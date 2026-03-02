import express from 'express';
import { getFooter, updateFooter } from '../controllers/footerController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getFooter)
  .put(protect, adminOnly, updateFooter);

export default router;
