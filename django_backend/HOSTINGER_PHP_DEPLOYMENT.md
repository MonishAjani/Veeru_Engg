# Hostinger PHP Deployment Guide

This guide will walk you through deploying your Django backend to Hostinger using the PHP fallback method. This approach is the most reliable way to ensure your data is visible on your frontend.

## Step 1: Prepare Your Files

I've created several files to help with your deployment:

1. **Enhanced `api.php`**
   - Improved error handling and logging
   - Better CORS configuration
   - Added debugging endpoints
   - Optimized database queries

2. **Simplified `.htaccess`** (currently named `simple.htaccess`)
   - Proper CORS headers
   - Routes API requests to api.php
   - Optimized PHP settings

3. **Test file `test.php`**
   - Verifies PHP is working
   - Checks SQLite availability
   - Tests database connection

4. **Deployment script `prepare_for_hostinger.py`**
   - Creates a ZIP file with all necessary files
   - Renames files as needed
   - Includes media and static files

## Step 2: Run the Preparation Script

1. Open a terminal in your Django backend directory
2. Run the preparation script:
   ```bash
   python prepare_for_hostinger.py
   ```
3. This will create a ZIP file named `hostinger_deploy_YYYYMMDD_HHMMSS.zip`

## Step 3: Set Up Subdomain in Hostinger

1. Log in to your Hostinger control panel
2. Go to "Domains" → "Subdomains"
3. Create a new subdomain:
   - Enter `api` as the subdomain name
   - Select your domain (e.g., `veeruengineering.com`)
   - Choose a directory (e.g., `public_html/api`)
   - Click "Create"

## Step 4: Upload and Extract Files

1. Go to "Files" → "File Manager" in Hostinger
2. Navigate to your subdomain directory (e.g., `public_html/api`)
3. Click "Upload" and select the ZIP file created by the preparation script
4. Once uploaded, right-click on the ZIP file and select "Extract"
5. Choose to extract to the current directory
6. After extraction, you can delete the ZIP file

## Step 5: Set File Permissions

Set the following permissions using the File Manager:

1. **Database file**:
   - Right-click on `db.sqlite3`
   - Select "Change Permissions"
   - Set to 666 (rw-rw-rw-)

2. **PHP files**:
   - Select `api.php` and `test.php`
   - Right-click and select "Change Permissions"
   - Set to 644 (rw-r--r--)

3. **Media directory**:
   - Right-click on the `media` directory
   - Select "Change Permissions"
   - Set to 777 (rwxrwxrwx)
   - Check "Apply to subdirectories and files"

## Step 6: Test Your Backend

1. **Test PHP functionality**:
   - Visit `https://api.veeruengineering.com/test.php`
   - You should see a JSON response with server information
   - Verify that SQLite is available and the database connection is successful

2. **Test API endpoints**:
   - Visit `https://api.veeruengineering.com/api.php/api/services`
   - You should see a JSON response with your services data
   - Try other endpoints: `/api/projects`, `/api/certificates`, etc.

3. **Debug if needed**:
   - Visit `https://api.veeruengineering.com/api.php/api/debug`
   - This will show database tables and other useful information

## Step 7: Update Your Frontend

1. Update your frontend's `.env` file:
   ```
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api.php/api
   ```

2. Rebuild and redeploy your frontend:
   ```bash
   npm run build
   # Then deploy to your hosting provider
   ```

## Step 8: Verify Frontend-Backend Integration

1. Visit your frontend website
2. Navigate to pages that fetch data from the backend:
   - Services page
   - Projects page
   - Certificates page
3. Verify that data is loading correctly
4. Check browser console for any errors

## Troubleshooting

### If Data Isn't Visible

1. **Check PHP Error Logs**:
   - In Hostinger control panel, go to "Advanced" → "Error Logs"
   - Look for PHP errors related to your api.php file

2. **Verify CORS Settings**:
   - Make sure the domain in the CORS headers matches your frontend domain
   - In `api.php` and `.htaccess`, update:
     ```
     Access-Control-Allow-Origin: https://veeruengineering.com
     ```
   - If your frontend is on a different domain, change accordingly

3. **Check Database Permissions**:
   - Make sure `db.sqlite3` has 666 permissions
   - Ensure the web server user can read and write to the file

4. **Test with Browser Developer Tools**:
   - Open your frontend in Chrome or Firefox
   - Press F12 to open developer tools
   - Go to the Network tab
   - Look for API requests and check their status

### Common Errors and Solutions

1. **"Access denied" or CORS errors**:
   - Update the `Access-Control-Allow-Origin` header in both `api.php` and `.htaccess`
   - Make sure it matches your frontend domain exactly (including https://)

2. **"Database locked" errors**:
   - This can happen if multiple requests try to access SQLite simultaneously
   - The updated `api.php` includes a busy timeout to help with this
   - If it persists, consider using a different database like MySQL

3. **"File not found" errors**:
   - Make sure all files are uploaded to the correct directory
   - Check that file paths in your code are correct

## Maintenance

1. **Updating Data**:
   - To update your data, you'll need to update the `db.sqlite3` file
   - Make changes locally, then upload the new file to Hostinger

2. **Adding New Features**:
   - If you add new models or endpoints, update `api.php` accordingly
   - Add new endpoint handlers following the existing pattern

3. **Regular Backups**:
   - Download your `db.sqlite3` file regularly as a backup
   - Consider setting up automated backups in Hostinger

## Need Help?

If you encounter any issues during deployment, please provide:
1. The specific error message
2. Which step you're stuck on
3. Screenshots of any error pages or console errors

This will help in providing more targeted assistance.