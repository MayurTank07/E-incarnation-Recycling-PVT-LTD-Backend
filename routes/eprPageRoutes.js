import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getEprPage,
  updateEprPage,
  addEprService,
  updateEprService,
  deleteEprService,
  addCoverageItem,
  updateCoverageItem,
  deleteCoverageItem,
  addComplianceStep,
  updateComplianceStep,
  deleteComplianceStep,
  addBenefit,
  updateBenefit,
  deleteBenefit,
  addWhyChooseUsReason,
  updateWhyChooseUsReason,
  deleteWhyChooseUsReason
} from '../controllers/eprPageController.js';

const router = express.Router();

router.route('/')
  .get(getEprPage)
  .put(protect, adminOnly, updateEprPage);

router.route('/services')
  .post(protect, adminOnly, addEprService);

router.route('/services/:serviceId')
  .put(protect, adminOnly, updateEprService)
  .delete(protect, adminOnly, deleteEprService);

// Coverage routes
router.route('/coverage')
  .post(protect, adminOnly, addCoverageItem);

router.route('/coverage/:itemId')
  .put(protect, adminOnly, updateCoverageItem)
  .delete(protect, adminOnly, deleteCoverageItem);

// Compliance Steps routes
router.route('/compliance-steps')
  .post(protect, adminOnly, addComplianceStep);

router.route('/compliance-steps/:stepId')
  .put(protect, adminOnly, updateComplianceStep)
  .delete(protect, adminOnly, deleteComplianceStep);

// Benefits routes
router.route('/benefits')
  .post(protect, adminOnly, addBenefit);

router.route('/benefits/:benefitId')
  .put(protect, adminOnly, updateBenefit)
  .delete(protect, adminOnly, deleteBenefit);

// Why Choose Us routes
router.route('/why-choose-us/reasons')
  .post(protect, adminOnly, addWhyChooseUsReason);

router.route('/why-choose-us/reasons/:reasonId')
  .put(protect, adminOnly, updateWhyChooseUsReason)
  .delete(protect, adminOnly, deleteWhyChooseUsReason);

export default router;
