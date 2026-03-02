import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createEvent)
  .get(getAllEvents);

router.route('/:id')
  .get(getEventById)
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

export default router;
