/**
 * Seed Script for StreamFlix
 * 
 * This script creates an initial admin user in the database.
 * 
 * Usage:
 *   node scripts/seed-admin.js
 * 
 * Or with ts-node:
 *   npx ts-node scripts/seed-admin.ts
 */

import mongoose from 'mongoose';
import Admin from '../models/Admin';
import dbConnect from '../lib/db';

async function seedAdmin() {
  try {
    console.log('🌱 Seeding database...');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@streamflix.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('You can login with this email and your password');
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      email: 'admin@streamflix.com',
      password: 'admin123', // Will be hashed automatically by the model
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password after first login!');
    console.log('');
    console.log('You can now login at: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedAdmin();
