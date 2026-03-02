import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getContactPage,
  updateContactPage
} from '../controllers/contactPageController.js';

const router = express.Router();

router.route('/')
  .get(getContactPage)
  .put(protect, adminOnly, updateContactPage);

export default router;
