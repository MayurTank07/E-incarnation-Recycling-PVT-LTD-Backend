import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'whatsapp', 'other'],
    lowercase: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: 'link'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
socialMediaSchema.index({ isActive: 1, order: 1 });

const SocialMedia = mongoose.model('SocialMedia', socialMediaSchema);

export default SocialMedia;
