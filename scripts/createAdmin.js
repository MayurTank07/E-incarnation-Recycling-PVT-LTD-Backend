import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');

    const adminExists = await Admin.findOne({ email: 'admin@eincarnation.com' });

    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@eincarnation.com',
      password: 'admin123',
      role: 'super_admin'
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@eincarnation.com');
    console.log('Password: admin123');
    console.log('Please change this password after first login!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
