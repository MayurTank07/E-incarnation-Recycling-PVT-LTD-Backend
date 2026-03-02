import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  source: {
    type: String,
    enum: ['contact_page', 'footer_form'],
    required: true,
    default: 'contact_page'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded', 'archived'],
    default: 'new'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for performance
contactFormSchema.index({ status: 1, createdAt: -1 });
contactFormSchema.index({ isRead: 1, createdAt: -1 });
contactFormSchema.index({ email: 1 });
contactFormSchema.index({ source: 1, createdAt: -1 });
contactFormSchema.index({ createdAt: -1 }); // For sorting by date

const ContactForm = mongoose.model('ContactForm', contactFormSchema);

export default ContactForm;
