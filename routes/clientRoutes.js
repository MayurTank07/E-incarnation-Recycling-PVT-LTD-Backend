import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createClient)
  .get(getAllClients);

router.route('/:id')
  .get(getClientById)
  .put(protect, adminOnly, updateClient)
  .delete(protect, adminOnly, deleteClient);

export default router;
