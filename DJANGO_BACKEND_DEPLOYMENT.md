# Django Backend Deployment Guide for Hostinger

This guide provides step-by-step instructions for deploying your Django backend on Hostinger.

## Files Already Created

I've created the following files to help with your deployment:

1. `django_backend/passenger_wsgi.py` - Entry point for your Django application
2. `django_backend/.htaccess` - Apache configuration for URL routing
3. `django_backend/.env.production` - Environment variables for production

## Step 1: Set Up a Subdomain for Your Backend

1. Log in to your Hostinger control panel
2. Go to "Domains" → "Subdomains"
3. Create a new subdomain: `api.veeruengineering.com`
4. Point it to a directory like `public_html/api`

## Step 2: Prepare Your Django Backend

1. Rename `.env.production` to `.env`:
   ```bash
   mv django_backend/.env.production django_backend/.env
   ```

2. Edit the `.env` file to update:
   - `SECRET_KEY` - Generate a secure random key
   - Database credentials - Use the MySQL database you'll create in Step 4

3. Make sure your Django settings load environment variables:
   ```python
   # In django_backend/settings.py
   import os
   from dotenv import load_dotenv

   load_dotenv()
   
   # Then use environment variables
   DEBUG = os.environ.get('DEBUG', 'False') == 'True'
   SECRET_KEY = os.environ.get('SECRET_KEY')
   # etc.
   ```

## Step 3: Upload Your Django Backend

1. Upload your entire `django_backend` directory to the subdomain directory (e.g., `public_html/api`)
2. Make sure to include:
   - All Python files
   - Templates
   - Static files
   - Media files
   - `.env` file
   - `.htaccess` file
   - `passenger_wsgi.py` file

## Step 4: Set Up MySQL Database

1. In Hostinger control panel, go to "Databases" → "MySQL Databases"
2. Create a new database:
   - Database Name: Choose a name (e.g., `veeru_django`)
   - Username: Create a username
   - Password: Generate a strong password
3. Note down these credentials and update them in your `.env` file

## Step 5: Install Python Packages

If your Hostinger plan supports SSH:

1. Connect via SSH
2. Navigate to your Django project directory:
   ```bash
   cd public_html/api
   ```
3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

If SSH is not available, contact Hostinger support to help with package installation.

## Step 6: Run Migrations and Collect Static Files

If SSH is available:

1. Run migrations:
   ```bash
   python manage.py migrate
   ```

2. Collect static files:
   ```bash
   python manage.py collectstatic --noinput
   ```

If SSH is not available, you'll need to:
1. Run these commands locally
2. Upload the generated `staticfiles` directory to your server

## Step 7: Create Superuser (Optional)

If you need admin access:

```bash
python manage.py createsuperuser
```

## Step 8: Configure PHP Version (If Needed)

Some Hostinger plans use PHP by default. Create a `.user.ini` file in your Django directory:

```
engine=python
```

## Step 9: Update Frontend API URL

Update your frontend's API URL to point to your new backend subdomain:

1. Create/update `.env` file in your frontend project:
   ```
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api
   ```

2. Rebuild and redeploy your frontend

## Step 10: Test Your Backend API

1. Visit `https://api.veeruengineering.com/api/services/` (or another API endpoint)
2. You should see a JSON response if everything is working correctly

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**:
   - Check Hostinger's error logs
   - Verify your `.htaccess` file is correct
   - Make sure `passenger_wsgi.py` is in the correct location

2. **Database Connection Issues**:
   - Verify database credentials in `.env`
   - Check if your database user has proper permissions

3. **Static/Media Files Not Loading**:
   - Check file permissions (should be 644 for files, 755 for directories)
   - Verify paths in settings.py

4. **CORS Issues**:
   - Check CORS settings in Django settings
   - Verify the `.htaccess` file has proper CORS headers

### Checking Logs

In Hostinger control panel:
1. Go to "Advanced" → "Error Logs"
2. Look for Python or Apache errors

## Need More Help?

If you encounter specific issues during deployment, note down:
1. The exact error message
2. Which step you're stuck on
3. Any relevant logs or screenshots

This will help in providing more targeted assistance.