# StreamFlix Backend - Quick Start Checklist ✅

Follow these steps in order to get your backend up and running!

## Prerequisites
- [ ] Node.js 18+ installed
- [ ] MongoDB installed locally OR MongoDB Atlas account set up
- [ ] Code editor (VS Code recommended)

---

## Step 1: Install Dependencies ⚙️

```bash
pnpm install
```

**Wait for installation to complete.** This installs:
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- All TypeScript types

---

## Step 2: Configure Environment Variables 🔐

Create a file named `.env.local` in the project root:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/streamflix
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/streamflix

# JWT Configuration (CHANGE THE SECRET!)
JWT_SECRET=change-this-to-a-random-secure-string-in-production
JWT_EXPIRES_IN=7d

# Application URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**⚠️ IMPORTANT**: 
- Replace `JWT_SECRET` with a random string (use: `openssl rand -base64 32`)
- For production, use MongoDB Atlas instead of local MongoDB

---

## Step 3: Start MongoDB 🗄️

### Option A: Local MongoDB

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Use this string in your `.env.local` as `MONGODB_URI`

---

## Step 4: Seed the Database 🌱

Create an admin user:
```bash
pnpm seed:admin
```

**This creates:**
- Email: `admin@streamflix.com`
- Password: `admin123`

Add sample movies (optional but recommended):
```bash
pnpm seed:movies
```

**Or do both at once:**
```bash
pnpm seed:all
```

---

## Step 5: Start the Development Server 🚀

```bash
pnpm dev
```

You should see:
```
✓ Ready in Xms
○ Local: http://localhost:3000
```

---

## Step 6: Test the Application 🧪

### Test the Frontend
1. Open http://localhost:3000
2. You should see movies on the homepage ✅

### Test Admin Login
1. Go to http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@streamflix.com`
   - Password: `admin123`
3. You should be redirected to the admin dashboard ✅

### Test Movie Management
1. From admin dashboard, click "Manage Library" or go to http://localhost:3000/admin/movies
2. Try these actions:
   - [ ] Add a new movie
   - [ ] Edit an existing movie
   - [ ] Search for a movie
   - [ ] Delete a movie
3. All should work without errors ✅

---

## Common Issues & Solutions 🐛

### "Cannot connect to MongoDB"
**Solution:**
- Make sure MongoDB is running: Run `mongod` in a separate terminal
- Check your `MONGODB_URI` in `.env.local`
- For Atlas, verify your IP is whitelisted

### "Module not found: mongoose"
**Solution:**
```bash
pnpm install
```

### Seed script errors
**Solution:**
```bash
# Ensure tsx is installed
pnpm add -D tsx

# Try seeding again
pnpm seed:admin
```

### "Unauthorized" when creating movies
**Solution:**
- Make sure you're logged in at `/admin/login`
- Check browser console for authentication errors
- Try logging out and logging in again

### Build/TypeScript errors
**Solution:**
- The lint errors about mongoose modules will resolve once pnpm install completes
- Restart your TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## Verification Checklist ✅

Test each of these:

### Public Pages (No Auth Required)
- [ ] Homepage loads with movies
- [ ] Click on a movie → Movie details page loads
- [ ] Click "Play" → Watch page loads
- [ ] All images display correctly

### Authentication
- [ ] Can access `/admin/login`
- [ ] Can login with admin credentials
- [ ] Redirected to dashboard after login
- [ ] Can't access `/admin/movies` without logging in

### Admin Dashboard
- [ ] Dashboard shows movie count
- [ ] Dashboard shows metrics
- [ ] Quick actions work

### Movie Management
- [ ] Movies table displays all movies
- [ ] Search functionality works
- [ ] Can add a new movie
- [ ] Can edit an existing movie
- [ ] Can delete a movie
- [ ] Changes reflect immediately in the UI

### API Testing (Optional - Use Postman/curl)
- [ ] GET `/api/movies` returns movies
- [ ] POST `/api/auth/login` returns JWT token
- [ ] POST `/api/movies` with valid token creates movie
- [ ] PUT `/api/movies/:id` with valid token updates movie
- [ ] DELETE `/api/movies/:id` with valid token deletes movie

---

## Next Steps 🎯

Once everything is working:

1. **Change Default Password**
   - Login to admin dashboard
   - (Future: Implement password change feature)

2. **Add Your Movies**
   - Use the admin dashboard to add real movie data
   - Use proper image URLs (host on Cloudinary, AWS S3, etc.)

3. **Explore the Code**
   - Check out `services/` for business logic
   - Look at `app/api/` for API routes
   - Review `models/` for database schemas

4. **Customize**
   - Modify the UI in `components/`
   - Add new features
   - Extend the API

5. **Deploy**
   - Use Vercel for frontend/API
   - Use MongoDB Atlas for database
   - Set environment variables in Vercel

---

## Useful Commands 📝

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server

# Database
pnpm seed:admin         # Create admin user
pnpm seed:movies        # Add sample movies
pnpm seed:all           # Do both

# Code Quality
pnpm lint               # Run ESLint
```

---

## Documentation 📚

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built
- **[BACKEND_GUIDE.md](./BACKEND_GUIDE.md)** - Detailed API docs
- **[ENV_TEMPLATE.md](./ENV_TEMPLATE.md)** - Environment variables

---

## Getting Help 🆘

If you encounter issues:
1. Check the error message carefully
2. Review the [Common Issues](#common-issues--solutions-) section
3. Check the documentation files
4. Verify your environment variables
5. Make sure all dependencies are installed
6. Ensure MongoDB is running

---

## Success! 🎉

If you can:
- ✅ See movies on the homepage
- ✅ Login to the admin dashboard
- ✅ Add/edit/delete movies
- ✅ Search for movies

**You're all set! Your backend is fully functional!**

Now you can:
- Add real movie data
- Customize the UI
- Deploy to production
- Build additional features

**Happy coding! 🚀**

---

**Default Admin Credentials:**
- Email: `admin@streamflix.com`
- Password: `admin123`

**⚠️ Remember to change the password in production!**
