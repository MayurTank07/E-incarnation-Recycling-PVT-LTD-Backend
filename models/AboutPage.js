import mongoose from 'mongoose';

const aboutPageSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    required: true,
    default: 'About Us'
  },
  // Hero Section - Only Background Image
  heroSection: {
    image: String,
    imagePublicId: String
  },
  // Intro Card Section - Matches Frontend AboutIntro Component
  intro: {
    title: {
      type: String,
      default: 'Trusted Partner for Secure & Sustainable E-Waste Recycling'
    },
    description1: String,
    description2: String,
    image: String,
    imagePublicId: String
  },
  // Core Team Section - Admin Managed
  team: [{
    type: {
      type: String,
      enum: ['member', 'feature'],
      default: 'member'
    },
    name: String,
    role: String,
    position: String,
    description: String,
    bio: String,
    image: String,
    imagePublicId: String,
    linkedin: String,
    reverse: Boolean,
    title: String, // For feature type
    order: {
      type: Number,
      default: 0
    }
  }],
  // Landscape Image Section - Admin Managed
  landscapeImage: {
    title: String,
    description: String,
    image: String,
    imagePublicId: String
  },
  // Certifications Section - Admin Managed
  certifications: [{
    id: String,
    name: String,
    logo: String,
    logoPublicId: String,
    description: String,
    text: String,
    downloadUrl: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  statsSection: {
    heading: String,
    stats: [{
      label: String,
      value: String,
      suffix: String
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const AboutPage = mongoose.model('AboutPage', aboutPageSchema);

export default AboutPage;
