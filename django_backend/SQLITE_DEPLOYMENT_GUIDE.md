# SQLite Deployment Guide for Django Backend

This guide provides step-by-step instructions for deploying your Django backend on Hostinger using SQLite instead of MySQL.

## Files Already Updated

I've updated the following files to use SQLite instead of MySQL:

1. `passenger_wsgi.py` - Updated to set SQLite environment variables
2. `.env` - Updated to use SQLite configuration
3. `django_backend/settings.py` - Updated to support SQLite configuration from environment variables

## Step 1: Collect Static Files

Before uploading to Hostinger, collect your static files:

```bash
# Navigate to your Django project directory
cd infra-corp/django_backend

# Collect static files
python manage.py collectstatic --noinput
```

This will create a `staticfiles` directory with all your static files.

## Step 2: Prepare Files for Upload

Organize these files for upload to Hostinger:

- Your entire Django project directory
- Your `db.sqlite3` file (contains all your data)
- The updated `.env` file
- The updated `passenger_wsgi.py` file
- `.htaccess` file
- `.user.ini` file
- `staticfiles` directory

## Step 3: Create a Subdomain for Your Backend

1. Log in to your Hostinger control panel
2. Go to "Domains" → "Subdomains"
3. Create a new subdomain: `api.veeruengineering.com`
4. Point it to a directory like `public_html/api`

## Step 4: Upload Your Files to Hostinger

1. Log in to Hostinger control panel
2. Open File Manager
3. Navigate to your subdomain directory (e.g., `public_html/api`)
4. Upload your files:
   - You may need to upload in batches
   - For large uploads, zip your files first, upload the zip, then extract it

## Step 5: Set File Permissions

After uploading, set the correct file permissions:

1. **Directories**: 755 (rwxr-xr-x)
   - Right-click on directories
   - Select "Change Permissions"
   - Set to 755
   - Apply to all directories

2. **Files**: 644 (rw-r--r--)
   - Right-click on files
   - Select "Change Permissions"
   - Set to 644
   - Apply to all files

3. **Special Files**:
   - `db.sqlite3`: 664 (rw-rw-r--)
   - `passenger_wsgi.py`: 755 (rwxr-xr-x)
   - `manage.py`: 755 (rwxr-xr-x)

4. **Media Directory**: 777 (rwxrwxrwx)
   - Create a `media` directory if it doesn't exist
   - Set permissions to 777 so Django can write to it

## Step 6: Update Frontend API URL

Update your frontend's `.env` file:
```
NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api
```

Then rebuild and redeploy your frontend.

## Step 7: Test Your Backend

Visit these URLs in your browser:
- `https://api.veeruengineering.com/api/services/`
- `https://api.veeruengineering.com/api/projects/`
- `https://api.veeruengineering.com/admin/` (login with your superuser)

## Troubleshooting Common Issues

### 500 Internal Server Error

1. Check Hostinger's error logs in the control panel
2. Verify your `.htaccess` file is correct
3. Make sure `passenger_wsgi.py` is in the correct location
4. Check file permissions, especially for `db.sqlite3`

### Static/Media Files Not Loading

1. Check file permissions
2. Verify paths in settings.py
3. Make sure the directories exist

### Database Issues

1. Make sure `db.sqlite3` is uploaded correctly
2. Check file permissions for `db.sqlite3` (should be 664 or 666)
3. Verify the web server has write access to the directory containing `db.sqlite3`

### CORS Issues

1. Check CORS settings in Django settings
2. Verify the `.htaccess` file has proper CORS headers

## Advantages of SQLite Approach

1. **Simplicity**: No need to set up and configure MySQL
2. **Data Integrity**: Your existing data is preserved exactly as is
3. **Ease of Deployment**: Fewer moving parts means fewer things that can go wrong
4. **Performance**: For smaller sites, SQLite can be quite performant

## Limitations

1. **Concurrent Writes**: SQLite doesn't handle many concurrent writes well
2. **Scalability**: Not ideal for high-traffic sites
3. **File Permissions**: You need to ensure the web server can write to the SQLite file

If you encounter any specific issues during deployment, please let me know!