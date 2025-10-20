# Quick Start Guide - CodeMaster DSA Platform

## Prerequisites Check

Before running the application, ensure you have:

1. ✅ **Node.js** installed (v14+)
   ```bash
   node --version
   ```

2. ✅ **MongoDB** installed and running
   
   ### Option A: Local MongoDB
   - Download from: https://www.mongodb.com/try/download/community
   - Start MongoDB:
     ```bash
     # Windows
     mongod
     
     # Mac/Linux
     sudo systemctl start mongod
     ```
   
   ### Option B: MongoDB Atlas (Cloud - Recommended)
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string and update `.env` file

## Step-by-Step Setup

### 1️⃣ Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies (already done)
# npm install

# Make sure .env file exists with correct MongoDB URI
# Update MONGO_URI if using MongoDB Atlas

# Seed the database with REAL LeetCode problems (Recommended - takes 2-3 min)
npm run seed:api

# OR use sample data for quick testing (instant)
npm run seed

# Start backend server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

### 2️⃣ Frontend Setup (Terminal 2)

**Note:** The current Vite version requires Node.js v20+. You have two options:

#### Option A: Downgrade Vite (Quick Fix)
```bash
cd frontend
npm install vite@4 @vitejs/plugin-react@4 --save-dev
npm run dev
```

#### Option B: Use older React setup
```bash
cd frontend
npm run dev -- --force
```

#### Option C: Upgrade Node.js (Recommended for production)
- Download Node.js v20+ from: https://nodejs.org/
- Restart your terminal
- Run: `npm run dev`

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3️⃣ Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Test the Application

### 1. Create an Account
- Go to http://localhost:5173/register
- Sign up with:
  - Username: testuser
  - Email: test@example.com
  - Password: password123

### 2. Browse Problems
- Click "Problems" in navigation
- Filter by difficulty or category
- Click on any problem to view details

### 3. Solve a Problem
- Select a problem
- Choose your language (JavaScript, Python, Java, C++)
- Write your solution
- Click "Submit"

### 4. View Dashboard
- Click "Dashboard" to see your progress
- View solved problems
- Track statistics by difficulty

## Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running
2. Check MongoDB URI in `.env` file
3. For local MongoDB: `MONGO_URI=mongodb://localhost:27017/dsa-platform`
4. For Atlas: Use the connection string from MongoDB Atlas

### Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Change PORT in backend/.env file
PORT=5001
```

### Node.js Version Issue (Frontend)
**Error:** `You are using Node.js 18.x. Vite requires Node.js version 20.19+`

**Solution:**
Follow Option A in Frontend Setup above to downgrade Vite

### Module Not Found
**Error:** `Cannot find module`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Default Login Credentials

After seeding, you can create your own account. No default users are seeded for security.

## Features to Test

✅ User Registration & Login
✅ Browse Problems (with filters)
✅ View Problem Details
✅ Code Editor (multi-language)
✅ Submit Solutions
✅ View Companies
✅ User Dashboard
✅ Progress Tracking
✅ Dark/Light Theme Toggle
✅ Responsive Design

## API Testing (Optional)

Use Postman or curl to test API endpoints:

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Problems
```bash
curl http://localhost:5000/api/problems
```

### Get All Companies
```bash
curl http://localhost:5000/api/companies
```

## Next Steps

1. ✅ Ensure MongoDB is running
2. ✅ Seed the database
3. ✅ Start backend server
4. ✅ Start frontend server  
5. ✅ Create an account
6. ✅ Start solving problems!

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints section
- Check MongoDB connection status
- Ensure all dependencies are installed

---

**Happy Coding! 🚀**
