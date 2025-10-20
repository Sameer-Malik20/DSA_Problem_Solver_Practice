# 🚀 Deployment Guide - CodeMaster

## Prerequisites for Deployment

- MongoDB Atlas account (free tier available)
- GitHub account (for version control)
- Deployment platforms accounts (choose one):
  - **Backend:** Render, Railway, or Heroku
  - **Frontend:** Vercel, Netlify, or Render

---

## Step 1: Setup MongoDB Atlas

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select cloud provider and region
   - Name your cluster

3. **Create Database User**
   - Go to "Database Access"
   - Add new database user
   - Set username and password (save these!)
   - Grant "Read and write to any database"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `dsa-platform`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dsa-platform?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend

### Option A: Render (Recommended - Free Tier)

1. **Push Code to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Sign up and connect GitHub
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name:** dsa-platform-api
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** Free

3. **Add Environment Variables**
   - Click "Environment" tab
   - Add:
     ```
     MONGO_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key_min_32_chars
     NODE_ENV=production
     PORT=5000
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://your-app.onrender.com`

5. **Seed Database**
   - After deployment, use Render's Shell
   - Run: `npm run seed`

### Option B: Railway

1. **Push to GitHub** (same as above)

2. **Deploy on Railway**
   - Go to [Railway](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select repository
   - Add environment variables (same as Render)
   - Deploy automatically

### Option C: Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
cd backend
heroku create dsa-platform-api

# Set environment variables
heroku config:set MONGO_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Seed database
heroku run npm run seed
```

---

## Step 3: Deploy Frontend

### Option A: Vercel (Recommended)

1. **Update API URL**
   
   Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

   Update `frontend/src/utils/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

2. **Push to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** frontend
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
   - Click "Deploy"

4. **Get URL**
   - Your app will be live at: `https://your-app.vercel.app`

### Option B: Netlify

1. **Update API URL** (same as Vercel)

2. **Deploy**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop `dist` folder OR connect GitHub
   - Configure:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Add environment variable: `VITE_API_URL`

### Option C: Render (Frontend)

- Similar to backend deployment
- Choose "Static Site" instead of "Web Service"

---

## Step 4: Update CORS

Update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',
    'https://your-app.netlify.app'
  ],
  credentials: true
}));
```

Redeploy backend after this change.

---

## Step 5: Test Deployment

1. **Visit Frontend URL**
   - `https://your-app.vercel.app`

2. **Test Features**
   - ✅ Register new account
   - ✅ Login
   - ✅ Browse problems
   - ✅ View problem detail
   - ✅ Submit code
   - ✅ View dashboard
   - ✅ Theme toggle

3. **Check API**
   - Visit: `https://your-backend-url.onrender.com`
   - Should see: `{"message":"DSA Platform API is running"}`

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa-platform
JWT_SECRET=your_super_secret_minimum_32_characters_long
NODE_ENV=production
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Settings → Custom Domain
2. Add domain and update DNS

---

## Monitoring & Maintenance

### Free Tier Limitations

**Render:**
- Free tier spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month

**Vercel:**
- 100GB bandwidth/month
- Serverless function limits

**MongoDB Atlas:**
- 512MB storage
- Shared CPU
- Perfect for learning/demo

### Upgrade Options

- **Backend:** $7/month (Render) or $5/month (Railway)
- **Frontend:** Free on Vercel/Netlify
- **Database:** $9/month (MongoDB Atlas M2)

---

## Troubleshooting

### Backend doesn't start
- Check MongoDB connection string
- Verify environment variables
- Check Render/Railway logs

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings
- Ensure backend is running

### Database errors
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions

### Build fails
- Check Node.js version
- Verify all dependencies in package.json
- Check build logs

---

## Security Checklist

- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Enable CORS only for your domain
- ✅ Use HTTPS everywhere
- ✅ Keep dependencies updated
- ✅ Don't commit .env files
- ✅ Use MongoDB Atlas instead of local
- ✅ Implement rate limiting (future)
- ✅ Add request validation (future)

---

## Post-Deployment

### Seed Database
```bash
# If using Render
# Use Shell in Render dashboard
npm run seed

# If using Heroku
heroku run npm run seed
```

### Monitor Performance
- Render: Built-in metrics
- Vercel: Analytics dashboard
- MongoDB Atlas: Cluster metrics

### Regular Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
# (Automatic on most platforms via GitHub)
```

---

## Cost Estimation

### Free Tier (Recommended for learning)
- Backend: Free (Render)
- Frontend: Free (Vercel)
- Database: Free (MongoDB Atlas)
- **Total: $0/month**

### Production (Recommended for real use)
- Backend: $7/month (Render)
- Frontend: Free (Vercel)
- Database: $9/month (MongoDB Atlas M2)
- **Total: $16/month**

---

## Quick Deploy Commands

```bash
# Backend (after Git setup)
git add .
git commit -m "Deploy to production"
git push origin main
# Then configure on Render/Railway

# Frontend (after Git setup)
vercel --prod
# or
netlify deploy --prod
```

---

## Success Checklist

- ✅ MongoDB Atlas cluster created
- ✅ Database seeded
- ✅ Backend deployed and accessible
- ✅ Frontend deployed and accessible
- ✅ Environment variables configured
- ✅ CORS configured correctly
- ✅ All features working
- ✅ Custom domain added (optional)

---

**Congratulations! Your DSA Platform is now live! 🎉**

Share your deployment URL:
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`

---

For issues or questions, check the main README.md or create an issue in the repository.
