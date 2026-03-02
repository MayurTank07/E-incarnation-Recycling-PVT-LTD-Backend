import Service from '../models/Service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

export const getAllServices = asyncHandler(async (req, res) => {
  const { isActive } = req.query;
  
  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });

  res.json({
    success: true,
    count: services.length,
    data: services
  });
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.json({
    success: true,
    data: service
  });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  const { title, description, icon, iconPublicId, order, isActive } = req.body;

  // Delete old Cloudinary image if icon is being updated
  if (icon && service.iconPublicId && icon !== service.icon) {
    try {
      await deleteFromCloudinary(service.iconPublicId);
    } catch (error) {
      console.error('Error deleting old icon from Cloudinary:', error);
    }
  }

  if (title !== undefined) service.title = title;
  if (description !== undefined) service.description = description;
  if (icon !== undefined) service.icon = icon;
  if (iconPublicId !== undefined) service.iconPublicId = iconPublicId;
  if (order !== undefined) service.order = order;
  if (isActive !== undefined) service.isActive = isActive;

  const updatedService = await service.save();

  res.json({
    success: true,
    data: updatedService
  });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  // Delete Cloudinary image if exists
  if (service.iconPublicId) {
    try {
      await deleteFromCloudinary(service.iconPublicId);
    } catch (error) {
      console.error('Error deleting icon from Cloudinary:', error);
    }
  }

  await service.deleteOne();

  res.json({
    success: true,
    message: 'Service deleted successfully'
  });
});
