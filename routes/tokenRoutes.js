import express from 'express';
import { refreshAccessToken, revokeToken, revokeAllTokens } from '../controllers/tokenController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/refresh', refreshAccessToken);
router.post('/revoke', revokeToken);
router.post('/revoke-all', protect, revokeAllTokens);

export default router;
