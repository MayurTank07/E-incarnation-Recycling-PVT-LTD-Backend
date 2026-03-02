import Event from '../models/Event.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event
  });
});

export const getAllEvents = asyncHandler(async (req, res) => {
  const { isActive } = req.query;
  
  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const events = await Event.find(filter).sort({ date: -1, order: 1 });

  res.json({
    success: true,
    count: events.length,
    data: events
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.json({
    success: true,
    data: event
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  const { title, description, date, location, image, imagePublicId, order, isActive } = req.body;

  // Delete old Cloudinary image if image is being updated
  if (image && event.imagePublicId && image !== event.image) {
    try {
      await deleteFromCloudinary(event.imagePublicId);
    } catch (error) {
      console.error('Error deleting old image from Cloudinary:', error);
    }
  }

  if (title !== undefined) event.title = title;
  if (description !== undefined) event.description = description;
  if (date !== undefined) event.date = date;
  if (location !== undefined) event.location = location;
  if (image !== undefined) event.image = image;
  if (imagePublicId !== undefined) event.imagePublicId = imagePublicId;
  if (order !== undefined) event.order = order;
  if (isActive !== undefined) event.isActive = isActive;

  const updatedEvent = await event.save();

  res.json({
    success: true,
    data: updatedEvent
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Delete Cloudinary image if exists
  if (event.imagePublicId) {
    try {
      await deleteFromCloudinary(event.imagePublicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  }

  await event.deleteOne();

  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});
