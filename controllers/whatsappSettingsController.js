import WhatsAppSettings from '../models/WhatsAppSettings.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getWhatsAppSettings = asyncHandler(async (req, res) => {
  let settings = await WhatsAppSettings.findOne();
  
  if (!settings) {
    settings = await WhatsAppSettings.create({});
  }

  res.status(200).json({
    success: true,
    data: settings
  });
});

export const updateWhatsAppSettings = asyncHandler(async (req, res) => {
  let settings = await WhatsAppSettings.findOne();

  if (!settings) {
    settings = await WhatsAppSettings.create(req.body);
  } else {
    settings = await WhatsAppSettings.findByIdAndUpdate(
      settings._id,
      req.body,
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: settings
  });
});
