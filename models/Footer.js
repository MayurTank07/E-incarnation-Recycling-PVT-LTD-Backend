import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    default: 'Unit No. 103, 1st Floor, Bhaveshwar Arcade, A Wing, LBS Marg, Ghatkopar West, Mumbai 400086.'
  },
  phone: {
    type: [String],
    required: [true, 'Phone is required'],
    default: ['022 47494262', '9137287173']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    default: 'info@e-incarnation.com'
  }
}, {
  timestamps: true
});

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;
