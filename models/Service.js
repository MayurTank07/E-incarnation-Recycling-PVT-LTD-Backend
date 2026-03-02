import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  icon: {
    type: String
  },
  iconPublicId: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for performance
serviceSchema.index({ order: 1 });
serviceSchema.index({ isActive: 1, order: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
