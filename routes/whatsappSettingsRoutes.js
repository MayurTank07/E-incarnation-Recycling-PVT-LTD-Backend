import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getWhatsAppSettings,
  updateWhatsAppSettings
} from '../controllers/whatsappSettingsController.js';

const router = express.Router();

router.route('/')
  .get(getWhatsAppSettings)
  .put(protect, adminOnly, updateWhatsAppSettings);

export default router;
