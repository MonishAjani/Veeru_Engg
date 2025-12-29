# Deploying InfraCorp on Hostinger Business Plan

This guide provides step-by-step instructions for deploying the InfraCorp website on Hostinger's Business Plan.

## Prerequisites

- Hostinger Business Plan account
- Domain name (can be purchased through Hostinger)
- FTP client (like FileZilla)
- Git installed on your local machine

## Deployment Steps

### 1. Set Up Your Domain and Hosting

1. Log in to your Hostinger account
2. Set up your domain (either register a new one or connect an existing one)
3. Access your hosting control panel (hPanel)

### 2. Set Up MySQL Database

1. In hPanel, go to "Databases" → "MySQL Databases"
2. Create a new database:
   - Database Name: `your_db_name`
   - Username: `your_db_user`
   - Password: `your_db_password` (use a strong password)
3. Note down these credentials for later use

### 3. Deploy the Django Backend

#### 3.1 Prepare Your Backend Files

1. Update the `.env` file in `django_backend/` with your actual database credentials and domain
2. Make sure `DEBUG` is set to `False`
3. Generate a secure `SECRET_KEY` and update it in the `.env` file

#### 3.2 Upload Backend Files

1. In hPanel, go to "Advanced" → "SSH Access" and enable it
2. Connect to your server via SSH
3. Create a Python virtual environment:
   ```bash
   cd ~/
   python -m venv venv
   source venv/bin/activate
   ```
4. Create a directory for your backend:
   ```bash
   mkdir -p ~/yourdomain.com/backend
   ```
5. Upload your Django backend files to this directory using FTP or Git

#### 3.3 Install Dependencies and Set Up the Database

1. Navigate to your backend directory:
   ```bash
   cd ~/yourdomain.com/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Collect static files:
   ```bash
   python manage.py collectstatic --noinput
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

#### 3.4 Set Up WSGI Configuration

1. Create a file named `passenger_wsgi.py` in your backend directory:
   ```python
   import os
   import sys
   
   # Add your project directory to the sys.path
   path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
   if path not in sys.path:
       sys.path.append(path)
   
   # Set environment variables
   os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_backend.settings")
   
   # Import the Django WSGI application
   from django.core.wsgi import get_wsgi_application
   application = get_wsgi_application()
   ```

2. Create a `.htaccess` file in your backend directory:
   ```
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^(.*)$ passenger_wsgi.py/$1 [QSA,L]
   </IfModule>
   ```

### 4. Deploy the Next.js Frontend

#### 4.1 Prepare Your Frontend Files

1. Update the `.env` file in the root directory with your actual backend API URL
2. Build the Next.js application:
   ```bash
   npm install
   npm run build
   ```

#### 4.2 Upload Frontend Files

1. Create a directory for your frontend:
   ```bash
   mkdir -p ~/yourdomain.com/public_html
   ```
2. Upload the contents of the `.next` directory to this location using FTP

#### 4.3 Configure Node.js App

1. In hPanel, go to "Website" → "Node.js"
2. Create a new Node.js application:
   - Application URL: Your domain
   - Application root: `/public_html`
   - Application startup file: `server.js`
   - Node.js version: Select the latest stable version

3. Create a `server.js` file in your public_html directory:
   ```javascript
   const { createServer } = require('http');
   const { parse } = require('url');
   const next = require('next');
   
   const dev = process.env.NODE_ENV !== 'production';
   const app = next({ dev });
   const handle = app.getRequestHandler();
   
   app.prepare().then(() => {
     createServer((req, res) => {
       const parsedUrl = parse(req.url, true);
       handle(req, res, parsedUrl);
     }).listen(process.env.PORT || 3000, (err) => {
       if (err) throw err;
       console.log('> Ready on http://localhost:3000');
     });
   });
   ```

### 5. Set Up Domain Routing

1. In hPanel, go to "Domains" → "Domain List"
2. Click on your domain, then "Manage"
3. Set up subdomain for the backend:
   - Create a subdomain like `api.yourdomain.com`
   - Point it to the backend directory (`~/yourdomain.com/backend`)
4. Ensure your main domain points to the frontend directory (`~/yourdomain.com/public_html`)

### 6. Final Configuration

1. Update your frontend `.env` file to use the subdomain for API calls:
   ```
   NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
   ```
2. Update your backend `.env` file to include the subdomain in allowed hosts:
   ```
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```
3. Restart your Node.js application from the hPanel

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**: Check the error logs in hPanel
2. **CORS Issues**: Ensure your CORS settings include your domain
3. **Database Connection Issues**: Verify your database credentials
4. **Static Files Not Loading**: Check your STATIC_URL and STATIC_ROOT settings

### Accessing Logs

1. In hPanel, go to "Advanced" → "Error Logs" to view server error logs
2. For Node.js logs, go to "Website" → "Node.js" and click on "Logs"

## Maintenance

1. **Updates**: To update your application, upload new files via FTP and restart the Node.js application
2. **Backups**: Use Hostinger's backup feature to regularly back up your website and database
3. **Monitoring**: Monitor your website's performance using Hostinger's built-in tools

## Security Considerations

1. Keep your Django SECRET_KEY secure and never commit it to version control
2. Regularly update your dependencies to patch security vulnerabilities
3. Enable HTTPS for your domain through Hostinger's SSL certificate feature
4. Set up proper file permissions for your uploaded files