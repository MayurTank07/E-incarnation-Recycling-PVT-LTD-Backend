import mongoose from 'mongoose';

const eprPageSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    title: {
      type: String,
      default: 'Extended Producer\nResponsibility (EPR)'
    },
    subtitle: {
      type: String,
      default: 'Comprehensive EPR solutions for electronics manufacturers, importers, and brand owners.'
    },
    image: String,
    imagePublicId: String
  },
  
  // Brochure Download Link
  brochureLink: {
    type: String,
    default: ''
  },
  
  // What is EPR Section
  whatIsEpr: {
    title: {
      type: String,
      default: 'What is EPR?'
    },
    paragraphs: [{
      type: String
    }],
    image: String,
    imagePublicId: String
  },
  
  // Coverage Items
  coverage: [{
    item: String,
    order: Number
  }],
  
  // EPR Services
  services: [{
    title: String,
    description: String,
    icon: String,
    image: String,
    imagePublicId: String,
    order: Number
  }],
  
  // Compliance Process Steps
  complianceSteps: [{
    step: String,
    title: String,
    description: String,
    order: Number
  }],
  
  // Benefits
  benefits: [{
    benefit: String,
    order: Number
  }],
  
  // Why Choose Us Section
  whyChooseUs: {
    title: {
      type: String,
      default: 'Why Choose Us for EPR?'
    },
    image: String,
    imagePublicId: String,
    reasons: [{
      text: String,
      order: Number
    }]
  },
  
  // CTA Section
  ctaSection: {
    title: {
      type: String,
      default: 'Ready to Get Started?'
    },
    description: String,
    stats: [{
      icon: String,
      text: String
    }]
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const EprPage = mongoose.model('EprPage', eprPageSchema);

export default EprPage;
