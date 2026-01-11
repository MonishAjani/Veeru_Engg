# Hostinger KVM 2 Deployment Guide

This guide provides step-by-step instructions for deploying the InfraCorp website (Next.js frontend and Django backend) on a Hostinger KVM 2 plan.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Hostinger KVM 2 Plan Overview](#hostinger-kvm-2-plan-overview)
3. [Setting Up Your Hostinger VPS](#setting-up-your-hostinger-vps)
4. [Deploying the Django Backend](#deploying-the-django-backend)
5. [Deploying the Next.js Frontend](#deploying-the-nextjs-frontend)
6. [Setting Up Nginx as a Reverse Proxy](#setting-up-nginx-as-a-reverse-proxy)
7. [Configuring SSL with Let's Encrypt](#configuring-ssl-with-lets-encrypt)
8. [Setting Up Domain and DNS](#setting-up-domain-and-dns)
9. [Maintenance and Monitoring](#maintenance-and-monitoring)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, make sure you have:

1. A Hostinger KVM 2 plan subscription
2. A domain name (can be purchased through Hostinger)
3. Your InfraCorp project files (Next.js frontend and Django backend)
4. Basic knowledge of Linux command line
5. SSH client (like PuTTY for Windows or Terminal for macOS/Linux)

## Hostinger KVM 2 Plan Overview

The Hostinger KVM 2 plan typically includes:

- 2 vCPU cores
- 4GB RAM
- 60GB SSD storage
- 4TB bandwidth
- Full root access
- IPv4 & IPv6 support
- 1 Gbps Network
- Linux OS (Ubuntu recommended)

This plan is suitable for running both your Next.js frontend and Django backend on the same server.

## Setting Up Your Hostinger VPS

### Step 1: Access Your Hostinger Control Panel

1. Log in to your Hostinger account
2. Navigate to the VPS section
3. Select your KVM 2 plan
4. Note your server's IP address, username, and password

### Step 2: Connect to Your VPS via SSH

```bash
ssh root@your_server_ip
```

Enter your password when prompted.

### Step 3: Update Your System

```bash
apt update && apt upgrade -y
```

### Step 4: Install Required Packages

```bash
apt install -y python3 python3-pip python3-venv nodejs npm nginx git certbot python3-certbot-nginx ufw
```

### Step 5: Configure Firewall

```bash
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

## Deploying the Django Backend

### Step 1: Create a Directory for Your Project

```bash
mkdir -p /var/www/infra-corp
cd /var/www/infra-corp
```

### Step 2: Clone Your Repository

```bash
git clone https://github.com/yourusername/infra-corp.git .
```

Or upload your files using SCP/SFTP.

### Step 3: Set Up Python Virtual Environment

```bash
cd django_backend
python3 -m venv venv
source venv/bin/activate
```

### Step 4: Install Python Dependencies

```bash
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
```

### Step 5: Set Up PostgreSQL Database

```bash
apt install -y postgresql postgresql-contrib
```

Create a database and user:

```bash
sudo -u postgres psql
```

In the PostgreSQL prompt:

```sql
CREATE DATABASE infracorp;
CREATE USER infracorpuser WITH PASSWORD 'your_secure_password';
ALTER ROLE infracorpuser SET client_encoding TO 'utf8';
ALTER ROLE infracorpuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE infracorpuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE infracorp TO infracorpuser;
\q
```

### Step 6: Configure Django Settings

Create a production settings file:

```bash
nano django_backend/django_backend/settings_prod.py
```

Add the following content:

```python
from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['your_domain.com', 'www.your_domain.com', 'your_server_ip']

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'infracorp',
        'USER': 'infracorpuser',
        'PASSWORD': 'your_secure_password',
        'HOST': 'localhost',
        'PORT': '',
    }
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://your_domain.com",
    "https://www.your_domain.com",
]

CORS_ALLOW_CREDENTIALS = True

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Static and media files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Step 7: Set Up Environment Variables

Create a .env file:

```bash
nano django_backend/.env
```

Add your environment variables:

```
SECRET_KEY=your_secret_key
DJANGO_SETTINGS_MODULE=django_backend.settings_prod
```

### Step 8: Migrate Database and Collect Static Files

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

### Step 9: Create a Superuser

```bash
python manage.py createsuperuser
```

### Step 10: Set Up Gunicorn Service

Create a systemd service file:

```bash
nano /etc/systemd/system/gunicorn.service
```

Add the following content:

```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/var/www/infra-corp/django_backend
ExecStart=/var/www/infra-corp/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/var/www/infra-corp/django_backend/django_backend.sock django_backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
systemctl enable gunicorn
systemctl start gunicorn
```

## Deploying the Next.js Frontend

### Step 1: Install Node.js Dependencies

```bash
cd /var/www/infra-corp
npm install
```

### Step 2: Configure Environment Variables

Create a .env.production file:

```bash
nano .env.production
```

Add your environment variables:

```
NEXT_PUBLIC_API_URL=https://api.your_domain.com
```

### Step 3: Build the Next.js Application

```bash
npm run build
```

### Step 4: Set Up PM2 for Process Management

Install PM2:

```bash
npm install -g pm2
```

Create a PM2 configuration file:

```bash
nano ecosystem.config.js
```

Add the following content:

```javascript
module.exports = {
  apps: [
    {
      name: "infra-corp-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
```

Start the application with PM2:

```bash
pm2 start ecosystem.config.js
```

Set PM2 to start on boot:

```bash
pm2 startup
pm2 save
```

## Setting Up Nginx as a Reverse Proxy

### Step 1: Create Nginx Configuration for Backend API

```bash
nano /etc/nginx/sites-available/api.your_domain.com
```

Add the following content:

```nginx
server {
    listen 80;
    server_name api.your_domain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /var/www/infra-corp/django_backend;
    }
    
    location /media/ {
        root /var/www/infra-corp/django_backend;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/infra-corp/django_backend/django_backend.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 2: Create Nginx Configuration for Frontend

```bash
nano /etc/nginx/sites-available/your_domain.com
```

Add the following content:

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 3: Enable the Nginx Configurations

```bash
ln -s /etc/nginx/sites-available/api.your_domain.com /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/your_domain.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Configuring SSL with Let's Encrypt

### Step 1: Obtain SSL Certificates

```bash
certbot --nginx -d your_domain.com -d www.your_domain.com
certbot --nginx -d api.your_domain.com
```

Follow the prompts to complete the SSL configuration.

### Step 2: Set Up Auto-Renewal

Certbot automatically sets up a cron job for certificate renewal. You can test the renewal process with:

```bash
certbot renew --dry-run
```

## Setting Up Domain and DNS

### Step 1: Configure DNS Records in Hostinger

1. Log in to your Hostinger account
2. Navigate to the Domains section
3. Select your domain
4. Go to the DNS Zone Editor
5. Add the following records:

   - A record: `@` pointing to your server IP
   - A record: `www` pointing to your server IP
   - A record: `api` pointing to your server IP

### Step 2: Wait for DNS Propagation

DNS changes can take up to 24-48 hours to propagate globally, although they often take effect much sooner.

## Maintenance and Monitoring

### Setting Up Basic Monitoring

Install and configure a basic monitoring tool:

```bash
apt install -y htop
```

### Regular Backups

Set up a cron job for database backups:

```bash
nano /etc/cron.daily/backup-db
```

Add the following content:

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/infracorp"
mkdir -p $BACKUP_DIR

# Database backup
sudo -u postgres pg_dump infracorp > $BACKUP_DIR/infracorp_$DATE.sql

# Compress the backup
gzip -f $BACKUP_DIR/infracorp_$DATE.sql

# Keep only the last 7 backups
find $BACKUP_DIR -name "infracorp_*.sql.gz" -type f -mtime +7 -delete
```

Make the script executable:

```bash
chmod +x /etc/cron.daily/backup-db
```

### Updating Your Application

To update your application:

1. Pull the latest changes:
   ```bash
   cd /var/www/infra-corp
   git pull
   ```

2. Update the backend:
   ```bash
   cd django_backend
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic --noinput
   systemctl restart gunicorn
   ```

3. Update the frontend:
   ```bash
   cd /var/www/infra-corp
   npm install
   npm run build
   pm2 restart infra-corp-frontend
   ```

## Troubleshooting

### Common Issues and Solutions

#### 502 Bad Gateway Error

Check the Gunicorn service status:

```bash
systemctl status gunicorn
```

Check the Gunicorn logs:

```bash
journalctl -u gunicorn
```

#### Next.js Application Not Starting

Check the PM2 logs:

```bash
pm2 logs infra-corp-frontend
```

#### Database Connection Issues

Check PostgreSQL status:

```bash
systemctl status postgresql
```

Verify database connection settings in Django settings file.

#### SSL Certificate Issues

Check Certbot logs:

```bash
journalctl -u certbot
```

Renew certificates manually:

```bash
certbot renew
```

### Getting Help

If you encounter issues not covered in this guide, you can:

1. Contact Hostinger support through your control panel
2. Check the Hostinger knowledge base at https://support.hostinger.com/
3. Consult the official documentation for:
   - Django: https://docs.djangoproject.com/
   - Next.js: https://nextjs.org/docs
   - Nginx: https://nginx.org/en/docs/
   - Let's Encrypt: https://letsencrypt.org/docs/

## Conclusion

You have now successfully deployed your InfraCorp website on a Hostinger KVM 2 plan. Your setup includes:

- A Django backend running with Gunicorn
- A Next.js frontend managed by PM2
- Nginx as a reverse proxy
- SSL certificates from Let's Encrypt
- Basic monitoring and backup solutions

This setup provides a robust, secure, and scalable environment for your website. Regular maintenance and updates will ensure your site continues to run smoothly.