# StreamFlix Environment Variables Template

## MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/streamflix
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/streamflix?retryWrites=true&w=majority

## JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

## Application
NEXT_PUBLIC_API_URL=http://localhost:3000

## Instructions
1. Copy this file content to `.env.local`
2. Update MONGODB_URI with your MongoDB connection string
3. Change JWT_SECRET to a secure random string
