# Simplified Hostinger Deployment Guide

This guide provides a streamlined approach to deploy your Django backend on Hostinger, focusing on simplicity and reliability.

## Step 1: Prepare Your Django Project

1. **Collect static files**:
   ```bash
   cd infra-corp/django_backend
   python manage.py collectstatic --noinput
   ```

2. **Verify your SQLite database**:
   Make sure your `db.sqlite3` file contains all your data.

## Step 2: Create a Simple PHP Wrapper

Hostinger works best with PHP by default. Let's create a simple PHP wrapper to help with deployment:

1. Create a file named `index.php` in your django_backend directory with this content:
   ```php
   <?php
   // Redirect all requests to the Django WSGI handler
   include_once 'passenger_wsgi.py';
   ?>
   ```

2. Create a `.htaccess` file with simplified CORS settings:
   ```
   # Enable CORS
   <IfModule mod_headers.c>
       Header always set Access-Control-Allow-Origin "*"
       Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
       Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
       Header always set Access-Control-Allow-Credentials "true"
   </IfModule>

   # Handle OPTIONS requests
   RewriteEngine On
   RewriteCond %{REQUEST_METHOD} OPTIONS
   RewriteRule ^(.*)$ $1 [R=200,L]

   # Pass all requests to passenger_wsgi.py
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ passenger_wsgi.py/$1 [QSA,L]
   ```

## Step 3: Set Up Subdomain on Hostinger

1. Log in to your Hostinger control panel
2. Go to "Domains" → "Subdomains"
3. Create a new subdomain: `api.veeruengineering.com`
4. Point it to a directory like `public_html/api`

## Step 4: Upload Files to Hostinger

1. **Prepare a ZIP file** containing:
   - Your entire Django project
   - The `db.sqlite3` file
   - The `.env` file (configured for SQLite)
   - The `passenger_wsgi.py` file
   - The simplified `.htaccess` file
   - The new `index.php` file
   - The `staticfiles` directory

2. **Upload and extract**:
   - Upload the ZIP file to your subdomain directory
   - Extract it using the File Manager

## Step 5: Set File Permissions

Set these permissions using the File Manager:

1. **Directories**: 755 (rwxr-xr-x)
2. **Files**: 644 (rw-r--r--)
3. **Special files**:
   - `db.sqlite3`: 666 (rw-rw-rw-)
   - `passenger_wsgi.py`: 755 (rwxr-xr-x)
   - `manage.py`: 755 (rwxr-xr-x)
4. **Media directory**: 777 (rwxrwxrwx)

## Step 6: Test Your API

1. Visit `https://api.veeruengineering.com/api/test-cors/`
2. You should see a JSON response if everything is working

## Troubleshooting

If you still encounter issues:

1. **Check Python Support**:
   - In Hostinger control panel, go to "Advanced" → "Python"
   - Make sure Python is enabled for your account

2. **Try a PHP Fallback**:
   If Python isn't working, create a simple PHP API proxy:
   
   ```php
   <?php
   // api.php - A simple PHP proxy for your SQLite database
   header('Content-Type: application/json');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type');

   // Connect to SQLite database
   $db = new SQLite3('db.sqlite3');
   
   // Get the request path
   $path = $_SERVER['REQUEST_URI'];
   
   // Handle different API endpoints
   if (strpos($path, '/api/services') !== false) {
       $results = $db->query('SELECT * FROM services_service');
       $services = [];
       while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
           $services[] = $row;
       }
       echo json_encode(['results' => $services]);
   } 
   elseif (strpos($path, '/api/projects') !== false) {
       $results = $db->query('SELECT * FROM projects_project');
       $projects = [];
       while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
           $projects[] = $row;
       }
       echo json_encode(['results' => $projects]);
   }
   else {
       echo json_encode(['error' => 'Endpoint not found']);
   }
   
   $db->close();
   ?>
   ```

3. **Contact Hostinger Support**:
   - Ask specifically about Python support on your plan
   - Inquire about CORS configuration for subdomains

## Final Step: Update Frontend

Once your backend is working, update your frontend's API URL:

1. Update your frontend's `.env` file:
   ```
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api
   ```

2. Rebuild and redeploy your frontend