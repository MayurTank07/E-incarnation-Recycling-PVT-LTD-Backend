import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getServicesPage,
  updateServicesPage,
  addServicesPageSection,
  updateServicesPageSection,
  deleteServicesPageSection,
  updateRecyclingProcess,
  addProcessStep,
  updateProcessStep,
  deleteProcessStep
} from '../controllers/servicesPageController.js';

const router = express.Router();

router.route('/')
  .get(getServicesPage)
  .put(protect, adminOnly, updateServicesPage);

router.route('/sections')
  .post(protect, adminOnly, addServicesPageSection);

router.route('/sections/:sectionId')
  .put(protect, adminOnly, updateServicesPageSection)
  .delete(protect, adminOnly, deleteServicesPageSection);

router.route('/recycling-process')
  .put(protect, adminOnly, updateRecyclingProcess);

router.route('/recycling-process/steps')
  .post(protect, adminOnly, addProcessStep);

router.route('/recycling-process/steps/:stepId')
  .put(protect, adminOnly, updateProcessStep)
  .delete(protect, adminOnly, deleteProcessStep);

export default router;
