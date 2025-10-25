# Deployment Guide

This guide provides instructions for deploying the Infra-Corp website:
- Frontend: Next.js application deployed on Vercel
- Backend: Django REST API deployed on Railway

## Prerequisites

- GitHub account
- Vercel account (https://vercel.com)
- Railway account (https://railway.app)
- Git installed on your local machine

## Frontend Deployment (Vercel)

1. **Push your code to GitHub**
   Make sure your code is in a GitHub repository.

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/) and sign in with your GitHub account
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the "infra-corp" directory as the root directory

3. **Configure project settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `infra-corp`

4. **Environment Variables**
   Add the following environment variables:
   - `NEXT_PUBLIC_API_BASE`: URL of your Railway backend API (e.g., `https://your-railway-app.railway.app/api`)

5. **Deploy**
   Click "Deploy" and wait for the deployment to complete.

## Backend Deployment (Railway)

1. **Create a new project on Railway**
   - Go to [Railway](https://railway.app/) and sign in
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your GitHub repository

2. **Configure project settings**
   - Root Directory: `infra-corp/django_backend`
   - Start Command: `python manage.py migrate && python manage.py collectstatic --noinput && gunicorn django_backend.wsgi`

3. **Add a PostgreSQL database**
   - In your Railway project, click "New" → "Database" → "PostgreSQL"
   - Railway will automatically add the database connection variables to your project

4. **Environment Variables**
   Add the following environment variables:
   - `DEBUG`: `False`
   - `SECRET_KEY`: Generate a secure random string
   - `ALLOWED_HOSTS`: `.railway.app`
   - `CORS_ALLOWED_ORIGINS`: Your Vercel frontend URL (e.g., `https://your-app.vercel.app`)

5. **Deploy**
   Railway will automatically deploy your application.

## Connecting Frontend to Backend

1. After both deployments are complete, get your Railway app URL
2. Update the `NEXT_PUBLIC_API_BASE` environment variable in your Vercel project
3. Redeploy your Vercel project if needed

## Troubleshooting

- **CORS Issues**: Make sure your `CORS_ALLOWED_ORIGINS` in the Django backend includes your Vercel frontend URL
- **Database Migrations**: If you encounter database issues, you may need to run migrations manually
- **Static Files**: If static files aren't loading, check your `STATIC_URL` and `STATIC_ROOT` settings

## Maintenance

- **Logs**: Both Vercel and Railway provide logs for debugging
- **Updates**: To update your deployment, push changes to your GitHub repository
- **Scaling**: Both platforms offer options to scale your application as needed