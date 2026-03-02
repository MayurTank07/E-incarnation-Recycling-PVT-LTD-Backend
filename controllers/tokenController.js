import RefreshToken from '../models/RefreshToken.js';
import Admin from '../models/Admin.js';
import { generateAccessToken, generateRandomToken } from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400);
    throw new Error('Refresh token is required');
  }

  const tokenDoc = await RefreshToken.findOne({ 
    token: refreshToken,
    isActive: true 
  }).populate('admin');

  if (!tokenDoc) {
    res.status(401);
    throw new Error('Invalid refresh token');
  }

  if (tokenDoc.isExpired) {
    res.status(401);
    throw new Error('Refresh token has expired');
  }

  if (tokenDoc.isRevoked) {
    res.status(401);
    throw new Error('Refresh token has been revoked');
  }

  if (!tokenDoc.admin || !tokenDoc.admin.isActive) {
    res.status(401);
    throw new Error('Admin account is not active');
  }

  const newAccessToken = generateAccessToken(tokenDoc.admin._id);
  const newRefreshToken = generateRandomToken();

  const newRefreshTokenExpiry = new Date();
  newRefreshTokenExpiry.setDate(newRefreshTokenExpiry.getDate() + 7);

  tokenDoc.revokedAt = new Date();
  tokenDoc.revokedByIp = req.ip;
  tokenDoc.replacedByToken = newRefreshToken;
  tokenDoc.isActive = false;
  await tokenDoc.save();

  await RefreshToken.create({
    token: newRefreshToken,
    admin: tokenDoc.admin._id,
    expiresAt: newRefreshTokenExpiry,
    createdByIp: req.ip
  });

  res.json({
    success: true,
    data: {
      token: newAccessToken,
      refreshToken: newRefreshToken
    }
  });
});

export const revokeToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400);
    throw new Error('Refresh token is required');
  }

  const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

  if (!tokenDoc) {
    res.status(404);
    throw new Error('Token not found');
  }

  if (tokenDoc.isRevoked) {
    res.status(400);
    throw new Error('Token already revoked');
  }

  tokenDoc.revokedAt = new Date();
  tokenDoc.revokedByIp = req.ip;
  tokenDoc.isActive = false;
  await tokenDoc.save();

  res.json({
    success: true,
    message: 'Token revoked successfully'
  });
});

export const revokeAllTokens = asyncHandler(async (req, res) => {
  await RefreshToken.updateMany(
    { admin: req.admin._id, isActive: true },
    { 
      $set: { 
        revokedAt: new Date(),
        revokedByIp: req.ip,
        isActive: false
      }
    }
  );

  res.json({
    success: true,
    message: 'All tokens revoked successfully'
  });
});
