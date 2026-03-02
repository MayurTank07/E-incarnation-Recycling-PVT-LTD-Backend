import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getAboutPage,
  updateAboutPage,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  addTeam,
  updateTeam,
  deleteTeam,
  updateLandscapeImage,
  addCertification,
  updateCertification,
  deleteCertification
} from '../controllers/aboutPageController.js';

const router = express.Router();

router.route('/')
  .get(getAboutPage)
  .put(protect, adminOnly, updateAboutPage);

// Legacy team routes (keep for backward compatibility)
router.route('/team')
  .post(protect, adminOnly, addTeamMember);

router.route('/team/:memberId')
  .put(protect, adminOnly, updateTeamMember)
  .delete(protect, adminOnly, deleteTeamMember);

// New Core Team routes
router.route('/core-team')
  .post(protect, adminOnly, addTeam);

router.route('/core-team/:teamId')
  .put(protect, adminOnly, updateTeam)
  .delete(protect, adminOnly, deleteTeam);

// Landscape Image routes
router.route('/landscape-image')
  .put(protect, adminOnly, updateLandscapeImage);

// Certifications routes
router.route('/certifications')
  .post(protect, adminOnly, addCertification);

router.route('/certifications/:certId')
  .put(protect, adminOnly, updateCertification)
  .delete(protect, adminOnly, deleteCertification);

export default router;
