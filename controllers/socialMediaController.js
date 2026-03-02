import SocialMedia from '../models/SocialMedia.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get all social media platforms
export const getSocialMedia = asyncHandler(async (req, res) => {
  const socialMedia = await SocialMedia.find().sort({ order: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    count: socialMedia.length,
    data: socialMedia
  });
});

// Get only active social media platforms (for public display)
export const getActiveSocialMedia = asyncHandler(async (req, res) => {
  const socialMedia = await SocialMedia.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    count: socialMedia.length,
    data: socialMedia
  });
});

// Get single social media platform
export const getSocialMediaById = asyncHandler(async (req, res) => {
  const socialMedia = await SocialMedia.findById(req.params.id);

  if (!socialMedia) {
    return res.status(404).json({
      success: false,
      message: 'Social media platform not found'
    });
  }

  res.status(200).json({
    success: true,
    data: socialMedia
  });
});

// Create new social media platform
export const createSocialMedia = asyncHandler(async (req, res) => {
  const socialMedia = await SocialMedia.create(req.body);

  res.status(201).json({
    success: true,
    data: socialMedia
  });
});

// Update social media platform
export const updateSocialMedia = asyncHandler(async (req, res) => {
  let socialMedia = await SocialMedia.findById(req.params.id);

  if (!socialMedia) {
    return res.status(404).json({
      success: false,
      message: 'Social media platform not found'
    });
  }

  socialMedia = await SocialMedia.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: socialMedia
  });
});

// Delete social media platform
export const deleteSocialMedia = asyncHandler(async (req, res) => {
  const socialMedia = await SocialMedia.findById(req.params.id);

  if (!socialMedia) {
    return res.status(404).json({
      success: false,
      message: 'Social media platform not found'
    });
  }

  await socialMedia.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Social media platform deleted successfully'
  });
});
