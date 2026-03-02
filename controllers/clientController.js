import Client from '../models/Client.js';
import asyncHandler from '../utils/asyncHandler.js';
import { deleteFromCloudinary } from '../utils/cloudinaryHelper.js';

export const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create(req.body);

  res.status(201).json({
    success: true,
    data: client
  });
});

export const getAllClients = asyncHandler(async (req, res) => {
  const { isActive } = req.query;
  
  const filter = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const clients = await Client.find(filter).sort({ order: 1, createdAt: -1 });

  res.json({
    success: true,
    count: clients.length,
    data: clients
  });
});

export const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  res.json({
    success: true,
    data: client
  });
});

export const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  const { name, logo, logoPublicId, order, isActive } = req.body;

  // Delete old Cloudinary image if logo is being updated
  if (logo && client.logoPublicId && logo !== client.logo) {
    try {
      await deleteFromCloudinary(client.logoPublicId);
    } catch (error) {
      console.error('Error deleting old logo from Cloudinary:', error);
    }
  }

  if (name !== undefined) client.name = name;
  if (logo !== undefined) client.logo = logo;
  if (logoPublicId !== undefined) client.logoPublicId = logoPublicId;
  if (order !== undefined) client.order = order;
  if (isActive !== undefined) client.isActive = isActive;

  const updatedClient = await client.save();

  res.json({
    success: true,
    data: updatedClient
  });
});

export const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  // Delete Cloudinary image if exists
  if (client.logoPublicId) {
    try {
      await deleteFromCloudinary(client.logoPublicId);
    } catch (error) {
      console.error('Error deleting logo from Cloudinary:', error);
    }
  }

  await client.deleteOne();

  res.json({
    success: true,
    message: 'Client deleted successfully'
  });
});
