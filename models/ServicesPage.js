import mongoose from 'mongoose';

const servicesPageSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    required: true,
    default: 'Our Services'
  },
  pageDescription: {
    type: String,
    required: true,
    default: 'Comprehensive waste management and recycling solutions'
  },
  heroImage: {
    type: String,
    default: ''
  },
  heroImagePublicId: {
    type: String,
    default: ''
  },
  sections: [{
    title: String,
    description: String,
    image: String,
    features: [String],
    order: Number
  }],
  recyclingProcess: {
    title: {
      type: String,
      default: 'Our Recycling Process'
    },
    description: {
      type: String,
      default: 'Our process ensures safe, compliant e-waste handling with maximum resource recovery.'
    },
    steps: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      order: {
        type: Number,
        default: 0
      }
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const ServicesPage = mongoose.model('ServicesPage', servicesPageSchema);

export default ServicesPage;
