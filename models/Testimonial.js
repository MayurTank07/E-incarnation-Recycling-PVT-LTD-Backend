import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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
  }
}, {
  timestamps: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
