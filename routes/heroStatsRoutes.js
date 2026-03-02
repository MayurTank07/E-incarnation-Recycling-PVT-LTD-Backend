import express from 'express';
import { getHeroStats, updateHeroStats } from '../controllers/heroStatsController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getHeroStats)
  .put(protect, adminOnly, updateHeroStats);

export default router;
