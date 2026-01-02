# Hostinger Deployment Checklist

Use this checklist to ensure you've completed all the necessary steps for deploying your Django backend on Hostinger.

## Before Uploading

- [ ] Collect static files: `python manage.py collectstatic --noinput`
- [ ] Verify your SQLite database has all your data
- [ ] Check that your `.env` file is configured for production:
  - `DEBUG=False`
  - `SECRET_KEY` is set
  - `ALLOWED_HOSTS` includes your subdomain
- [ ] Ensure you have these files:
  - `passenger_wsgi.py` - Python entry point
  - `index.php` - PHP wrapper
  - `simple.htaccess` (rename to `.htaccess` before uploading)
  - `api.php` - PHP fallback API

## Hostinger Setup

- [ ] Create a subdomain: `api.veeruengineering.com`
- [ ] Point it to a directory (e.g., `public_html/api`)
- [ ] Check if Python is enabled in your hosting plan

## Upload Process

- [ ] Create a ZIP file with all your Django files
- [ ] Upload the ZIP to your subdomain directory
- [ ] Extract the ZIP file
- [ ] Rename `simple.htaccess` to `.htaccess`

## File Permissions

- [ ] Set directory permissions to 755 (rwxr-xr-x)
- [ ] Set file permissions to 644 (rw-r--r--)
- [ ] Set `db.sqlite3` permissions to 666 (rw-rw-rw-)
- [ ] Set `passenger_wsgi.py` permissions to 755 (rwxr-xr-x)
- [ ] Set `manage.py` permissions to 755 (rwxr-xr-x)
- [ ] Set `media` directory permissions to 777 (rwxrwxrwx)

## Testing

- [ ] Test the Python API: `https://api.veeruengineering.com/api/test-cors/`
- [ ] If Python doesn't work, test the PHP API: `https://api.veeruengineering.com/api.php/api/test-cors`
- [ ] Test specific endpoints:
  - Services: `/api/services/`
  - Projects: `/api/projects/`
  - Certificates: `/api/certificates/`

## Frontend Update

- [ ] Update your frontend's `.env` file with the new API URL
- [ ] Rebuild and redeploy your frontend
- [ ] Test the frontend-backend integration

## Troubleshooting

If you encounter issues:

- [ ] Check Hostinger's error logs
- [ ] Verify file permissions
- [ ] Try the PHP fallback API
- [ ] Contact Hostinger support about Python support

## Final Verification

- [ ] Verify CORS is working correctly
- [ ] Verify all API endpoints are accessible
- [ ] Verify your frontend can fetch data from the backend