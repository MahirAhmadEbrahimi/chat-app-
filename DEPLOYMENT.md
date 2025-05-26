# Deployment Guide

This guide will help you deploy your chat application to Render (backend) and Netlify (frontend).

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Render account (free tier available)
3. Netlify account (free tier available)

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 1.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `chat-app-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (for testing)

### 1.3 Set Environment Variables
In the Render dashboard, add these environment variables:
- `JWT_SECRET`: Generate a secure random string (e.g., use a password generator)
- `FRONTEND_URL`: Leave empty for now, we'll update this after deploying frontend

### 1.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://your-app-name.onrender.com`)

## Step 2: Deploy Frontend to Netlify

### 2.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account

### 2.2 Create New Site
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

### 2.3 Set Environment Variables
1. Go to Site settings → Environment variables
2. Add:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app-name.onrender.com`)

### 2.4 Deploy
1. Click "Deploy site"
2. Wait for deployment to complete
3. Note your frontend URL (e.g., `https://your-app-name.netlify.app`)

## Step 3: Update Backend Configuration

### 3.1 Update FRONTEND_URL
1. Go back to your Render dashboard
2. Navigate to your web service
3. Go to Environment variables
4. Update `FRONTEND_URL` with your Netlify URL
5. Save changes (this will trigger a redeploy)

## Step 4: Test Your Deployment

1. Visit your Netlify URL
2. Register a new account
3. Try sending messages
4. Open the app in another browser/incognito window
5. Register another account and test real-time messaging

## Troubleshooting

### Common Issues

#### 1. CORS Errors
- Make sure `FRONTEND_URL` in Render matches your Netlify URL exactly
- Check that both URLs use HTTPS

#### 2. Socket.io Connection Issues
- Verify the `VITE_API_URL` in Netlify points to your Render backend
- Check browser console for connection errors

#### 3. Authentication Issues
- Ensure `JWT_SECRET` is set in Render
- Check that the secret is the same across all instances

#### 4. Build Failures

**Backend (Render):**
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**Frontend (Netlify):**
- Check build logs in Netlify dashboard
- Ensure build command is correct: `npm run build`
- Verify publish directory is `frontend/dist`

### Checking Logs

**Render:**
1. Go to your service dashboard
2. Click on "Logs" tab
3. Check for any error messages

**Netlify:**
1. Go to your site dashboard
2. Click on "Functions" or "Deploy" logs
3. Check build and function logs

### Environment Variables Checklist

**Render (Backend):**
- ✅ `JWT_SECRET`: Strong random string
- ✅ `FRONTEND_URL`: Your Netlify URL

**Netlify (Frontend):**
- ✅ `VITE_API_URL`: Your Render backend URL

## Production Considerations

### Security
1. Use strong, unique JWT secrets
2. Enable HTTPS (both platforms do this automatically)
3. Consider rate limiting for production use
4. Add input validation and sanitization

### Performance
1. Consider upgrading to paid tiers for better performance
2. Implement message pagination for large chat histories
3. Add database persistence (MongoDB, PostgreSQL)
4. Implement user presence indicators

### Monitoring
1. Set up error tracking (Sentry, LogRocket)
2. Monitor server performance
3. Set up uptime monitoring
4. Track user analytics

## Scaling Considerations

As your app grows, consider:
1. Database integration (MongoDB Atlas, PostgreSQL)
2. Redis for session management
3. Load balancing for multiple server instances
4. CDN for static assets
5. Message queuing for high-traffic scenarios

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review platform documentation:
   - [Render Docs](https://render.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
3. Check browser console for frontend errors
4. Review server logs for backend issues
