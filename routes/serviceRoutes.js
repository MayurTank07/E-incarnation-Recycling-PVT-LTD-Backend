import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createService)
  .get(getAllServices);

router.route('/:id')
  .get(getServiceById)
  .put(protect, adminOnly, updateService)
  .delete(protect, adminOnly, deleteService);

export default router;
