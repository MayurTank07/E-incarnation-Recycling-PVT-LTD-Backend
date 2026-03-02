import mongoose from 'mongoose';

const whatsappSettingsSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    default: '919876543210'
  },
  defaultMessage: {
    type: String,
    default: 'Hello! I would like to know more about E Incarnation services.'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const WhatsAppSettings = mongoose.model('WhatsAppSettings', whatsappSettingsSchema);

export default WhatsAppSettings;
