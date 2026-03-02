import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m'
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  });
};

export const generateRandomToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

const generateToken = generateAccessToken;
export default generateToken;
