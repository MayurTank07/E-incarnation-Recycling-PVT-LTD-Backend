import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  location: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  carouselImages: [{
    url: String,
    publicId: String,
    caption: String
  }]
}, {
  timestamps: true
});

// Indexes for performance
eventSchema.index({ date: -1 }); // Sort by date descending
eventSchema.index({ isActive: 1, date: -1 });
eventSchema.index({ order: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
