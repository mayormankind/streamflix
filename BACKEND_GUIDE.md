# StreamFlix Backend - Implementation Guide

## 🎯 Backend Implementation Complete!

This document provides a comprehensive guide to the backend implementation that has been added to your StreamFlix application.

## 📋 What Was Implemented

### 1. Database Layer (`lib/db.ts`)
- MongoDB connection utility with connection caching
- Prevents connection exhaustion in Next.js serverless functions
- Auto-reconnection handling

### 2. Data Models (`models/`)

**Movie Model** (`models/Movie.ts`)
- Fields: title, description, genre, year, duration, rating, thumbnail, backdrop
- Timestamps: createdAt, updatedAt
- Text search indices for searching
- Validation rules

**Admin Model** (`models/Admin.ts`)
- Fields: email, password (hashed), role
- Password hashing with bcrypt
- Password comparison method
- Email validation

### 3. Service Layer (`services/`)

**MovieService** (`services/movieService.ts`)
- `getAllMovies()` - Fetch all movies
- `getMovieById(id)` - Fetch single movie
- `createMovie(data)` - Create new movie
- `updateMovie(id, data)` - Update movie
- `deleteMovie(id)` - Delete movie
- `searchMovies(query)` - Search movies
- `getMoviesByGenre(genre)` - Filter by genre
- `getMoviesByYear(year)` - Filter by year

**AuthService** (`services/authService.ts`)
- `login(credentials)` - Admin login
- `register(userData)` - Admin registration
- `verifyToken(token)` - JWT verification
- JWT token generation

### 4. API Routes (`app/api/`)

**Authentication Routes**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

**Movie Routes**
- `GET /api/movies` - Get all movies (supports search, genre, year filters)
- `POST /api/movies` - Create movie (admin only)
- `GET /api/movies/[id]` - Get single movie
- `PUT /api/movies/[id]` - Update movie (admin only)
- `DELETE /api/movies/[id]` - Delete movie (admin only)

### 5. Middleware (`lib/auth-middleware.ts`)
- JWT token validation
- Admin role verification
- Helper functions for unauthorized/forbidden responses

### 6. Frontend API Client (`lib/api-client.ts`)
- `fetchMovies()` - Fetch all movies
- `fetchMovieById(id)` - Fetch single movie
- `createMovie(data)` - Create movie (admin)
- `updateMovie(id, data)` - Update movie (admin)
- `deleteMovie(id)` - Delete movie (admin)
- `login(email, password)` - Admin login
- `register(email, password)` - Admin registration
- `logout()` - Clear auth token
- `isAuthenticated()` - Check auth status
- Token management (localStorage)

### 7. Frontend Integration

**Updated Pages:**
- ✅ `app/page.tsx` - Homepage (fetches from API)
- ✅ `app/movies/[id]/page.tsx` - Movie details (fetches from API)
- ✅ `app/watch/[id]/page.tsx` - Watch page (fetches from API)
- ✅ `app/admin/page.tsx` - Admin dashboard (fetches from API)
- ✅ `app/admin/movies/page.tsx` - Movie management (full CRUD)
- ✅ `app/admin/login/page.tsx` - Admin login page (NEW)

## 🚀 Quick Start

### Step 1: Install Dependencies

The following packages were added:
```bash
pnpm add mongoose bcryptjs jsonwebtoken
pnpm add -D @types/bcryptjs @types/jsonwebtoken
```

### Step 2: Configure Environment Variables

Create `.env.local` in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/streamflix
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/streamflix

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

**Or use MongoDB Atlas** (cloud database)

### Step 4: Create First Admin User

**Option A: Via API (Recommended)**

Start the dev server first:
```bash
pnpm dev
```

Then register an admin:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@streamflix.com","password":"admin123"}'
```

**Option B: Via MongoDB Shell**
```bash
mongosh
use streamflix
# Password is "admin123" hashed
db.admins.insertOne({
  email: "admin@streamflix.com",
  password: "$2a$10$rI1Q8K5xH.6o.vqZVvFqXeYkW9Z5pWQR5xGKZ0X8L3zC7yE9bH3pW",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Step 5: Login and Add Movies

1. Go to http://localhost:3000/admin/login
2. Login with your admin credentials
3. Navigate to http://localhost:3000/admin/movies
4. Click "Add Movie" and fill in the details

## 🔐 Authentication Flow

1. **Login**: User submits email/password at `/admin/login`
2. **Validation**: Server validates credentials against database
3. **Token Generation**: Server generates JWT token
4. **Storage**: Frontend stores token in localStorage
5. **Protected Requests**: Token sent in `Authorization: Bearer <token>` header
6. **Verification**: Middleware validates token for admin-only routes

## 🗄️ Database Schema

### Movies Collection
```javascript
{
  _id: ObjectId,
  title: String (required, max 200 chars),
  description: String (required, max 1000 chars),
  genre: String (required),
  year: Number (required, 1900-2100),
  duration: String (required),
  rating: String (required),
  thumbnail: String (required, URL),
  backdrop: String (required, URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Admins Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['admin'], default: 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

## 📡 API Documentation

### Authentication

**POST /api/auth/register**
```json
Request:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**POST /api/auth/login**
```json
Request:
{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Movies

**GET /api/movies**
```
Query Parameters:
- search: Search by title, description, genre
- genre: Filter by genre
- year: Filter by year

Response:
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Inception",
      "description": "A thief who steals...",
      "genre": "Sci-Fi",
      "year": 2010,
      "duration": "2h 28m",
      "rating": "PG-13",
      "thumbnail": "https://...",
      "backdrop": "https://..."
    }
  ]
}
```

**POST /api/movies** (Admin Only)
```json
Headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1...",
  "Content-Type": "application/json"
}

Request:
{
  "title": "Inception",
  "description": "A thief who steals corporate secrets...",
  "genre": "Sci-Fi",
  "year": 2010,
  "duration": "2h 28m",
  "rating": "PG-13",
  "thumbnail": "https://example.com/poster.jpg",
  "backdrop": "https://example.com/backdrop.jpg"
}

Response:
{
  "success": true,
  "data": { /* movie object */ }
}
```

**PUT /api/movies/[id]** (Admin Only)
```json
Headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1...",
  "Content-Type": "application/json"
}

Request:
{
  "title": "Updated Title",
  "year": 2011
  // Other fields optional
}

Response:
{
  "success": true,
  "data": { /* updated movie object */ }
}
```

**DELETE /api/movies/[id]** (Admin Only)
```json
Headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}

Response:
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

## 🎯 Architecture Highlights

### Service Layer Pattern
- **Separation of Concerns**: Business logic separate from API routes
- **Reusability**: Services can be used across different routes
- **Testability**: Easy to test business logic in isolation
- **Maintainability**: Clear structure for future modifications

### Clean Code Principles
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Proper try-catch and error responses
- **Validation**: Input validation at model and API levels
- **Security**: Password hashing, JWT authentication, admin-only routes

### Next.js Best Practices
- **Server Components**: Used for data fetching where appropriate
- **API Routes**: RESTful design with proper HTTP methods
- **Connection Caching**: Prevents MongoDB connection exhaustion
- **Dynamic Routing**: Clean URLs with Next.js dynamic routes

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Middleware for admin-only endpoints
4. **Input Validation**: Mongoose schema validation
5. **Error Messages**: Generic errors to prevent information leakage

## 🚀 Next Steps

### Recommended Enhancements

1. **Add More Features:**
   - User ratings and reviews
   - Watchlist functionality
   - View count tracking
   - Search autocomplete

2. **Improve Security:**
   - Rate limiting
   - CORS configuration
   - Input sanitization
   - Refresh tokens

3. **Performance:**
   - Caching layer (Redis)
   - Image optimization
   - Database indexing
   - Pagination for movie lists

4. **Production Ready:**
   - Error logging (Sentry)
   - Monitoring (Datadog)
   - Analytics
   - Backup strategy

## 📚 File Structure Reference

```
streamflix/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts       ← Auth login endpoint
│   │   │   └── register/route.ts    ← Auth register endpoint
│   │   └── movies/
│   │       ├── route.ts              ← GET/POST movies
│   │       └── [id]/route.ts         ← GET/PUT/DELETE single movie
│   ├── admin/
│   │   ├── login/page.tsx            ← Admin login UI
│   │   ├── movies/page.tsx           ← Movie management UI
│   │   └── page.tsx                  ← Admin dashboard
│   ├── movies/[id]/page.tsx          ← Movie details
│   ├── watch/[id]/page.tsx           ← Watch page
│   └── page.tsx                      ← Homepage
├── lib/
│   ├── db.ts                         ← MongoDB connection
│   ├── api-client.ts                 ← Frontend API client
│   ├── auth-middleware.ts            ← JWT middleware
│   └── utils.ts
├── models/
│   ├── Movie.ts                      ← Movie schema
│   └── Admin.ts                      ← Admin schema
├── services/
│   ├── movieService.ts               ← Movie business logic
│   └── authService.ts                ← Auth business logic
└── ENV_TEMPLATE.md                   ← Environment variables guide
```

## ✅ Pre-Deployment Checklist

- [ ] Change JWT_SECRET to a secure random string
- [ ] Set up production MongoDB (MongoDB Atlas recommended)
- [ ] Configure CORS for your domain
- [ ] Add rate limiting
- [ ] Set up error logging
- [ ] Configure environment variables in hosting platform
- [ ] Test all API endpoints
- [ ] Create initial admin user in production DB
- [ ] Set up database backups

---

**🎉 Your backend is now fully implemented and ready to use!**

For questions or issues, refer to the main README.md or check the inline code comments.
