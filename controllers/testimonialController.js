import Testimonial from '../models/Testimonial.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    data: testimonial
  });
});

export const getAllTestimonials = asyncHandler(async (req, res) => {
  const { isActive } = req.query;
  
  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });

  res.json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

export const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  res.json({
    success: true,
    data: testimonial
  });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  const { name, position, company, testimonial: text, rating, image, imagePublicId, order, isActive } = req.body;

  // Delete old Cloudinary image if image is being updated
  if (image && testimonial.imagePublicId && image !== testimonial.image) {
    try {
      await deleteFromCloudinary(testimonial.imagePublicId);
    } catch (error) {
      console.error('Error deleting old image from Cloudinary:', error);
    }
  }

  if (name !== undefined) testimonial.name = name;
  if (position !== undefined) testimonial.position = position;
  if (company !== undefined) testimonial.company = company;
  if (text !== undefined) testimonial.testimonial = text;
  if (rating !== undefined) testimonial.rating = rating;
  if (image !== undefined) testimonial.image = image;
  if (imagePublicId !== undefined) testimonial.imagePublicId = imagePublicId;
  if (order !== undefined) testimonial.order = order;
  if (isActive !== undefined) testimonial.isActive = isActive;

  const updatedTestimonial = await testimonial.save();

  res.json({
    success: true,
    data: updatedTestimonial
  });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  // Delete Cloudinary image if exists
  if (testimonial.imagePublicId) {
    try {
      await deleteFromCloudinary(testimonial.imagePublicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
  }

  await testimonial.deleteOne();

  res.json({
    success: true,
    message: 'Testimonial deleted successfully'
  });
});
