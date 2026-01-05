# Deploying Django Backend to Render

This guide provides step-by-step instructions for deploying the Veeru Engineering Django backend to Render.com.

## Prerequisites

- A Render.com account
- Your Django project code in a Git repository (GitHub, GitLab, or Bitbucket)
- Basic familiarity with Django and PostgreSQL

## Step 1: Prepare Your Django Project

Your project has already been prepared with the necessary files:

- `requirements.txt` - Lists all Python dependencies
- `runtime.txt` - Specifies the Python version
- `Procfile` - Defines the command to run your application
- `render.yaml` - Infrastructure as code for Render

## Step 2: Create a Render Account

1. Go to [render.com](https://render.com) and sign up for an account if you don't have one
2. Verify your email address and log in

## Step 3: Connect Your Git Repository

1. In the Render dashboard, click on the "New +" button
2. Select "Blueprint" from the dropdown menu
3. Connect your GitHub/GitLab/Bitbucket account if you haven't already
4. Select the repository containing your Django project
5. Render will automatically detect the `render.yaml` file and suggest the services to create

## Step 4: Configure Your Services

Render will use the `render.yaml` file to create:

1. A PostgreSQL database
2. A web service for your Django application

Review the configuration and make any necessary adjustments:

- Ensure the region is appropriate for your users
- Check that environment variables are correctly set
- Verify the database plan meets your needs

## Step 5: Deploy Your Services

1. Click "Apply Blueprint" to create and deploy your services
2. Render will automatically:
   - Create a PostgreSQL database
   - Build your Django application
   - Deploy your web service

This process may take a few minutes. You can monitor the progress in the Render dashboard.

## Step 6: Verify Your Deployment

1. Once deployment is complete, click on your web service
2. You'll see a URL like `https://veeru-engineering-api.onrender.com`
3. Visit this URL to verify your Django application is running
4. Test the API endpoints to ensure they're working correctly

## Step 7: Set Up Custom Domain (Optional)

If you want to use a custom domain for your API:

1. In your web service settings, go to the "Custom Domain" section
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `api.veeruengineering.com`)
4. Follow the instructions to configure DNS settings with your domain provider

## Step 8: Update Frontend Configuration

Update your React frontend to use the new API URL:

1. In your frontend code, update the API base URL to point to your Render deployment
2. For local development, you can use environment variables to switch between local and production APIs

Example:
```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://veeru-engineering-api.onrender.com/api';
```

## Step 9: Monitor and Maintain

1. Set up monitoring in the Render dashboard
2. Check logs regularly for any issues
3. Set up alerts for service disruptions
4. Consider upgrading to a paid plan for production use

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Check the `DATABASE_URL` environment variable in your Render dashboard
2. Verify that your Django settings are correctly configured to use this URL
3. Check the database logs for any connection errors

### Static Files Not Loading

If static files aren't loading:

1. Ensure `STATIC_URL` and `STATIC_ROOT` are correctly set in your Django settings
2. Verify that `whitenoise` is properly configured
3. Run `python manage.py collectstatic` locally to check for any errors

### CORS Issues

If you encounter CORS issues:

1. Check the `CORS_ALLOWED_ORIGINS` environment variable
2. Ensure it includes your frontend domain
3. Verify that `django-cors-headers` is properly configured

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

If you encounter any issues with your Render deployment, you can:

1. Check the Render status page: [status.render.com](https://status.render.com)
2. Contact Render support: [render.com/support](https://render.com/support)
3. Consult the Render community forum: [community.render.com](https://community.render.com)