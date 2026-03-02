import express from 'express';
import upload from '../middleware/upload.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '../utils/cloudinaryHelper.js';

const router = express.Router();

// Single image upload endpoint
router.post('/image', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const folder = req.body.folder || 'eincarnation';
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
});

// Multiple images upload endpoint
router.post('/images', protect, adminOnly, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    const folder = req.body.folder || 'eincarnation';
    
    // Upload all images to Cloudinary
    const uploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer, folder)
    );

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    }));

    res.status(200).json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      data: uploadedImages
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message
    });
  }
});

// Delete image endpoint
router.delete('/image', protect, adminOnly, async (req, res) => {
  try {
    const { publicId, url } = req.body;

    if (!publicId && !url) {
      return res.status(400).json({
        success: false,
        message: 'Public ID or URL is required'
      });
    }

    // Extract publicId from URL if not provided
    const idToDelete = publicId || extractPublicId(url);

    if (!idToDelete) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract public ID from URL'
      });
    }

    const result = await deleteFromCloudinary(idToDelete);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: result
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
});

export default router;
