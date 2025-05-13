# Setting Up SESSION_SECRET for Vercel Deployment

This guide will help you properly set up the SESSION_SECRET environment variable for your Vercel deployment to fix the internal server error.

## Step 1: Set Up Environment Variables in Vercel Dashboard

1. Log in to your Vercel account
2. Go to your project dashboard
3. Click on "Settings" in the top navigation
4. Select "Environment Variables" from the left sidebar
5. Add the following environment variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DB_URL` | `mongodb+srv://EVOTREK:evotrek2502@login-web.ri58evs.mongodb.net/` | Production |
   | `SESSION_SECRET` | `evotrek2502` | Production |
   | `NODE_ENV` | `production` | Production |

6. Click "Save" to apply these environment variables

## Step 2: Redeploy Your Application

After setting up the environment variables, you need to redeploy your application:

1. Go to the "Deployments" tab in your Vercel project dashboard
2. Click on the "..." menu next to your latest deployment
3. Select "Redeploy" from the dropdown menu
4. Wait for the deployment to complete

## Step 3: Verify Environment Variables

To ensure your environment variables are properly set:

1. Go to the "Deployments" tab
2. Click on your latest deployment
3. Select the "Functions" tab
4. Click on the main function (usually named "api/index")
5. Check the logs for confirmation that the environment variables are being loaded

You should see log messages like:
```
Environment: production
Is Vercel: Yes
MongoDB URL: Set (hidden for security)
```

## Troubleshooting

If you're still experiencing issues:

1. **Check for typos in environment variable names**:
   - Make sure `SESSION_SECRET` is spelled exactly as shown
   - Ensure there are no extra spaces in the values

2. **Verify MongoDB connection**:
   - Make sure your MongoDB Atlas cluster is running
   - Ensure your IP whitelist in MongoDB Atlas includes `0.0.0.0/0`

3. **Force a clean deployment**:
   - Use the Vercel CLI to force a clean deployment:
   ```
   vercel --prod --force
   ```

4. **Check for other environment variables**:
   - Make sure all required environment variables are set
   - Check for any conflicting environment variables

## Important Notes

1. The `SESSION_SECRET` is used for securing user sessions
2. Always use a strong, unique value for `SESSION_SECRET` in production
3. Never expose your `SESSION_SECRET` in client-side code
4. The `DB_URL` contains your MongoDB credentials, so keep it secure
5. Vercel automatically handles the `PORT` environment variable, so you don't need to set it

By following these steps, you should be able to resolve the internal server error related to the SESSION_SECRET environment variable.
