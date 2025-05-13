# Vercel Deployment Guide for EvoTrek

This guide will help you deploy your EvoTrek application to Vercel without encountering internal server errors.

## Prerequisites

1. A [Vercel](https://vercel.com/) account
2. Your MongoDB Atlas connection string
3. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Set Up Environment Variables in Vercel

Before deploying, you need to set up the following environment variables in Vercel:

1. Log in to your Vercel account
2. Go to your project settings (or create a new project)
3. Navigate to the "Environment Variables" section
4. Add the following variables:
   - `DB_URL`: `mongodb+srv://EVOTREK:evotrek2502@login-web.ri58evs.mongodb.net/`
   - `SESSION_SECRET`: `evotrek2502`
   - `NODE_ENV`: `production`

## Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Log in to your Vercel dashboard
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Select "Other"
   - Build Command: `npm run build`
   - Output Directory: Leave empty
   - Install Command: `npm install`
   - Development Command: `npm run dev`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy your project:
   ```
   vercel --prod
   ```

## Step 3: Troubleshooting Internal Server Errors

If you encounter an internal server error after deployment, try these steps:

1. **Check Vercel Logs**:
   - Go to your project in the Vercel dashboard
   - Click on the latest deployment
   - Go to the "Functions" tab
   - Click on the function that's showing errors
   - Review the logs for specific error messages

2. **Verify Environment Variables**:
   - Make sure all environment variables are correctly set in the Vercel dashboard
   - Double-check the MongoDB connection string for typos

3. **Redeploy with Force Option**:
   - If you've made changes to fix issues, try forcing a fresh deployment:
   ```
   vercel --prod --force
   ```

4. **Check MongoDB Atlas Settings**:
   - Ensure your MongoDB Atlas cluster is configured to accept connections from any IP address
   - Go to Network Access in MongoDB Atlas and add `0.0.0.0/0` to the IP whitelist

5. **Verify Your vercel.json File**:
   - Make sure your vercel.json file is correctly configured
   - Check that the routes are pointing to the correct file

## Step 4: Monitoring Your Deployment

After successful deployment:

1. Vercel will provide you with a URL to access your application
2. Test all functionality to ensure everything works correctly
3. Monitor the Vercel logs for any errors or warnings

## Common Issues and Solutions

### Issue: "Internal Server Error" with no specific error message

**Solution**: This is often caused by environment variables not being set correctly. Double-check all environment variables in the Vercel dashboard.

### Issue: MongoDB connection errors

**Solution**: Make sure your MongoDB Atlas cluster is running and accessible. Check that the connection string is correct and that the IP whitelist includes `0.0.0.0/0`.

### Issue: Application works locally but not on Vercel

**Solution**: This is often due to differences in how environment variables are handled. Make sure your code is checking for environment variables correctly and has appropriate fallbacks.

### Issue: "Project already exists" error

**Solution**: Use a different project name or remove the existing project from Vercel dashboard and try again.

## Final Notes

- The PORT environment variable is not needed on Vercel as they automatically assign a port
- Make sure your MongoDB Atlas cluster is configured to accept connections from any IP address
- Always check the Vercel logs for specific error messages when troubleshooting
