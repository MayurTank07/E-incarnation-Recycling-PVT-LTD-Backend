import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  logo: {
    type: String,
    required: [true, 'Logo URL is required']
  },
  logoPublicId: {
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

const Client = mongoose.model('Client', clientSchema);

export default Client;
