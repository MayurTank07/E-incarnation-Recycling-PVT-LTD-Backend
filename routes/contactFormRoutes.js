import express from 'express';
import {
  createContactForm,
  getAllContactForms,
  getContactFormById,
  updateContactFormStatus,
  markAsRead,
  getUnreadCount,
  deleteContactForm
} from '../controllers/contactFormController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { validateContactForm } from '../middlewares/validators/contactFormValidator.js';
import { validateMongoId } from '../middlewares/validators/commonValidator.js';
import { contactFormLimiter } from '../middlewares/security.js';

const router = express.Router();

router.route('/')
  .get(protect, adminOnly, getAllContactForms)
  .post(contactFormLimiter, validateContactForm, createContactForm);

router.route('/unread-count')
  .get(protect, adminOnly, getUnreadCount);

router.route('/:id')
  .get(protect, adminOnly, validateMongoId, getContactFormById)
  .put(protect, adminOnly, validateMongoId, updateContactFormStatus)
  .delete(protect, adminOnly, validateMongoId, deleteContactForm);

router.route('/:id/mark-read')
  .put(protect, adminOnly, validateMongoId, markAsRead);

export default router;
