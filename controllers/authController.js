import Admin from '../models/Admin.js';
import RefreshToken from '../models/RefreshToken.js';
import { generateAccessToken, generateRefreshToken, generateRandomToken } from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const admin = await Admin.findOne({ email }).select('+password');

  if (admin && (await admin.matchPassword(password))) {
    if (!admin.isActive) {
      res.status(401);
      throw new Error('Account is deactivated');
    }

    admin.lastLogin = new Date();
    await admin.save();

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRandomToken();
    
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

    await RefreshToken.create({
      token: refreshToken,
      admin: admin._id,
      expiresAt: refreshTokenExpiry,
      createdByIp: req.ip
    });

    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: accessToken,
        refreshToken: refreshToken
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin._id).select('+password');

  if (admin && (await admin.matchPassword(currentPassword))) {
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } else {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
});

export const updateEmail = asyncHandler(async (req, res) => {
  const { newEmail, currentPassword } = req.body;

  if (!newEmail || !currentPassword) {
    res.status(400);
    throw new Error('Please provide new email and current password');
  }

  // Validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(newEmail)) {
    res.status(400);
    throw new Error('Please provide a valid email address');
  }

  const admin = await Admin.findById(req.admin._id).select('+password');

  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  // Verify current password
  if (!(await admin.matchPassword(currentPassword))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  // Check if email already exists
  const emailExists = await Admin.findOne({ email: newEmail });
  if (emailExists && emailExists._id.toString() !== admin._id.toString()) {
    res.status(400);
    throw new Error('Email already in use');
  }

  admin.email = newEmail;
  await admin.save();

  res.json({
    success: true,
    message: 'Email updated successfully',
    data: {
      email: admin.email
    }
  });
});
