import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload image to Cloudinary from buffer
 * @param {Buffer} fileBuffer - Image file buffer
 * @param {String} folder - Cloudinary folder name
 * @param {String} publicId - Optional custom public_id
 * @returns {Promise<Object>} Cloudinary upload response
 */
export const uploadToCloudinary = (fileBuffer, folder = 'eincarnation', publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: publicId,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public_id
 * @returns {Promise<Object>} Cloudinary deletion response
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required for deletion');
    }
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Extract public_id from Cloudinary URL
 * @param {String} url - Cloudinary image URL
 * @returns {String} public_id
 */
export const extractPublicId = (url) => {
  if (!url) return null;
  
  // Extract public_id from Cloudinary URL
  // Example: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/image.jpg
  const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  
  // Alternative format without version
  const matches2 = url.match(/\/upload\/(.+)\.\w+$/);
  if (matches2 && matches2[1]) {
    return matches2[1];
  }
  
  return null;
};

/**
 * Upload image with automatic cleanup of old image
 * @param {Buffer} fileBuffer - New image file buffer
 * @param {String} oldImageUrl - Old image URL to delete
 * @param {String} folder - Cloudinary folder
 * @returns {Promise<Object>} New image data {url, publicId}
 */
export const replaceImage = async (fileBuffer, oldImageUrl, folder = 'eincarnation') => {
  try {
    // Upload new image
    const uploadResult = await uploadToCloudinary(fileBuffer, folder);
    
    // Delete old image if it exists
    if (oldImageUrl) {
      const oldPublicId = extractPublicId(oldImageUrl);
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }
    
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    };
  } catch (error) {
    throw error;
  }
};
