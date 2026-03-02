import multer from 'multer';
import path from 'path';

// Configure multer to use memory storage (no disk writes)
const storage = multer.memoryStorage();

// File filter to accept only safe images (SVG removed for security)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedMimes.includes(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only safe image files are allowed (jpeg, jpg, png, gif, webp). SVG files are not permitted for security reasons.'));
  }
};

// Multer configuration with enhanced security
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for better security
    files: 10 // Maximum 10 files per request
  },
  fileFilter: fileFilter
});

export default upload;
