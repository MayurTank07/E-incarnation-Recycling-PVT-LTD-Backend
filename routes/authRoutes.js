import express from 'express';
import { login, getProfile, updatePassword, updateEmail } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateLogin, validatePasswordUpdate } from '../middlewares/validators/authValidator.js';

const router = express.Router();

router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);
router.put('/update-password', protect, validatePasswordUpdate, updatePassword);
router.put('/update-email', protect, updateEmail);

export default router;
