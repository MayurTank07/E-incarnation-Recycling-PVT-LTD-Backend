import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdByIp: {
    type: String
  },
  revokedAt: {
    type: Date
  },
  revokedByIp: {
    type: String
  },
  replacedByToken: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.virtual('isExpired').get(function() {
  return Date.now() >= this.expiresAt;
});

refreshTokenSchema.virtual('isRevoked').get(function() {
  return !!this.revokedAt;
});

// Indexes for performance
refreshTokenSchema.index({ token: 1 }, { unique: true });
refreshTokenSchema.index({ admin: 1, isActive: 1 });
refreshTokenSchema.index({ expiresAt: 1 }); // Already has TTL index
refreshTokenSchema.index({ createdAt: -1 });

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;
