# Deploying Django Backend to Render - Step by Step Guide

This guide provides detailed instructions for deploying your Django backend to Render.com and connecting it to your React frontend hosted on Hostinger.

## Files Created/Modified for Render Deployment

1. **render.yaml** - Infrastructure as code for Render
2. **requirements.txt** - Updated with PostgreSQL support
3. **setup_media_storage.py** - Script for configuring S3 media storage
4. **api-render-config.ts** - Example API client configuration for the frontend
5. **.env.example** - Example environment variables for the frontend

## Step 1: Prepare Your Repository

All necessary files have been created in your repository. Make sure to commit these changes to your Git repository:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

## Step 2: Create a Render Account

1. Go to [render.com](https://render.com) and sign up for an account
2. Verify your email address and log in to your dashboard

## Step 3: Deploy Using Blueprint

1. In the Render dashboard, click on the "New +" button
2. Select "Blueprint" from the dropdown menu
3. Connect your GitHub/GitLab/Bitbucket account
4. Select your repository containing the Django project
5. Render will detect the `render.yaml` file and suggest services to create
6. Review the configuration and click "Apply Blueprint"

Render will automatically create:
- A PostgreSQL database
- A web service for your Django application

## Step 4: Configure Environment Variables

While Render will set up most environment variables from the `render.yaml` file, you may need to add or modify some:

1. In your Render dashboard, go to your web service
2. Click on "Environment" in the left sidebar
3. Add or update the following variables:
   - `SECRET_KEY` (should be auto-generated)
   - `DEBUG` (set to "False" for production)
   - `ALLOWED_HOSTS` (include your Render domain and frontend domain)
   - `CORS_ALLOWED_ORIGINS` (set to your frontend domain)

## Step 5: Set Up Cloudinary Media Storage (Optional but Recommended)

Since Render doesn't persist files between deployments, you should set up Cloudinary for media files:

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com) if you don't have one
2. Get your Cloudinary credentials from your dashboard
3. Add the following environment variables to your Render web service:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. SSH into your Render instance or use the web shell
5. Run the setup script:
   ```bash
   python setup_cloudinary_storage.py
   ```

## Step 6: Verify Your Deployment

1. Once deployment is complete, Render will provide a URL for your web service
   (e.g., `https://veeru-engineering-api.onrender.com`)
2. Visit this URL to verify your Django application is running
3. Test the API endpoints by visiting:
   - `https://veeru-engineering-api.onrender.com/api/services/`
   - `https://veeru-engineering-api.onrender.com/api/projects/`

## Step 7: Connect Your Frontend

1. Update your frontend API client to use the Render backend URL
2. You can use the provided `api-render-config.ts` as a reference
3. Create a `.env` file in your frontend project with:
   ```
   NEXT_PUBLIC_API_BASE=https://veeru-engineering-api.onrender.com/api
   ```
4. Update your build configuration in `next.config.js` to include this environment variable
5. Deploy your updated frontend to Hostinger

## Step 8: Set Up Custom Domain (Optional)

If you want to use a custom domain for your API:

1. In your Render web service settings, go to "Custom Domain"
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `api.veeruengineering.com`)
4. Follow the instructions to configure DNS settings with your domain provider
5. Update your frontend to use this custom domain

## Step 9: Monitor and Maintain

1. Set up monitoring in the Render dashboard
2. Check logs regularly for any issues
3. Consider upgrading to a paid plan for production use

## Troubleshooting Common Issues

### Cold Starts on Free Tier

Render's free tier spins down after inactivity, causing slow initial requests:

- Solution: Upgrade to a paid plan for production
- Workaround: Set up a cron job to ping your API regularly

### CORS Issues

If you encounter CORS errors:

1. Check the `CORS_ALLOWED_ORIGINS` environment variable
2. Ensure it includes your frontend domain with the correct protocol (http/https)
3. Verify that `django-cors-headers` is properly configured

### Database Connection Issues

If you have database connection problems:

1. Check the `DATABASE_URL` environment variable
2. Verify your Django settings are correctly configured
3. Check the database logs for any connection errors

### Media Files Not Working

If media files aren't working:

1. Verify Cloudinary configuration
2. Check your Cloudinary account dashboard for any issues
3. Ensure the Cloudinary credentials are correctly set in your environment variables
4. Check the Cloudinary console for any upload errors

## Maintenance Tasks

### Database Backups

Render automatically backs up your database daily. To create a manual backup:

1. Go to your database service in the Render dashboard
2. Click on "Backups" in the left sidebar
3. Click "Create Backup"

### Updating Your Application

To update your application:

1. Push changes to your Git repository
2. Render will automatically deploy the new version

### Scaling Your Application

As your application grows:

1. Upgrade your web service plan for more resources
2. Upgrade your database plan for more storage and connections
3. Consider adding a CDN for static and media files

## Conclusion

Your Django backend is now deployed on Render and connected to your React frontend on Hostinger. This setup provides a robust, scalable architecture for your application.

For more detailed information, refer to:
- [Render Documentation](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- The `RENDER_DEPLOYMENT_GUIDE.md` file in your project