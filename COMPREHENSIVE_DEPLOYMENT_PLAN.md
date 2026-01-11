# Comprehensive Deployment Plan for InfraCorp

This document provides a detailed deployment plan for the InfraCorp application, including analysis of requirements, necessary code changes, hosting setup, configuration files, infrastructure dependencies, monitoring, and troubleshooting.

## Table of Contents

1. [Deployment Requirements Analysis](#1-deployment-requirements-analysis)
2. [Code Changes for Deployment Compatibility](#2-code-changes-for-deployment-compatibility)
3. [Hosting Environment Setup](#3-hosting-environment-setup)
4. [Configuration Files and Deployment Scripts](#4-configuration-files-and-deployment-scripts)
5. [Infrastructure Dependencies](#5-infrastructure-dependencies)
6. [Monitoring and Logging Setup](#6-monitoring-and-logging-setup)
7. [Potential Deployment Issues and Solutions](#7-potential-deployment-issues-and-solutions)
8. [Deployment Checklist](#8-deployment-checklist)

## 1. Deployment Requirements Analysis

### 1.1 Application Architecture

The InfraCorp application consists of:

- **Frontend**: Next.js 14 application with TypeScript and Tailwind CSS
- **Backend**: Django 5.2 with Django REST Framework
- **Database**: SQLite (development) / PostgreSQL (production)
- **Media Storage**: Local file system

### 1.2 Resource Requirements

Based on the application's complexity and expected traffic:

| Component | Minimum Requirements |
|-----------|----------------------|
| CPU       | 2 vCPU cores         |
| RAM       | 4GB                  |
| Storage   | 60GB SSD             |
| Bandwidth | 2TB/month            |

### 1.3 Deployment Constraints

- **Budget Constraints**: Cost-effective solution needed
- **Technical Constraints**: Need for both Node.js and Python environments
- **Security Requirements**: SSL/TLS encryption, secure API endpoints
- **Scalability Needs**: Ability to handle moderate traffic growth

### 1.4 Deployment Strategy

After analyzing the requirements and constraints, we recommend a **single-server deployment** on a Hostinger KVM 2 plan, which provides:

- 2 vCPU cores
- 4GB RAM
- 60GB SSD storage
- 4TB bandwidth
- Full root access

This approach allows hosting both the frontend and backend on a single server, reducing costs while providing sufficient resources for the application.

## 2. Code Changes for Deployment Compatibility

### 2.1 Frontend Code Changes

#### 2.1.1 API Configuration

Create a configurable API endpoint in `src/lib/api.ts`:

```typescript
// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function apiFetch<T>(path: string, init?: RequestInit) {
  const url = `${API_BASE}${path}`;
  
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      credentials: 'include',
    });
    
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    
    return (await res.json()) as T;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

#### 2.1.2 Environment Variables Setup

Create `.env.production` file:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

#### 2.1.3 Next.js Configuration

Update `next.config.js` to handle production settings:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.yourdomain.com', 'localhost'],
  },
  output: 'standalone',
}

module.exports = nextConfig
```

### 2.2 Backend Code Changes

#### 2.2.1 Production Settings

Create `django_backend/django_backend/settings_prod.py`:

```python
from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['api.yourdomain.com', 'yourdomain.com', 'www.yourdomain.com']

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'infracorp',
        'USER': 'infracorpuser',
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': 'localhost',
        'PORT': '',
    }
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
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

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST', '')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'noreply@yourdomain.com')
```

#### 2.2.2 WSGI Configuration

Ensure `django_backend/django_backend/wsgi.py` is properly configured:

```python
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings_prod')

application = get_wsgi_application()
```

#### 2.2.3 Requirements Update

Update `django_backend/requirements.txt` to include production dependencies:

```
Django==5.2
djangorestframework==3.14.0
django-cors-headers==4.3.0
Pillow==10.0.0
python-dotenv==1.0.0
gunicorn==21.2.0
psycopg2-binary==2.9.6
whitenoise==6.5.0
```

## 3. Hosting Environment Setup

### 3.1 Server Provisioning

1. Purchase a Hostinger KVM 2 plan
2. Select Ubuntu 22.04 LTS as the operating system
3. Set up SSH access with key-based authentication

### 3.2 Initial Server Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Install required packages
apt install -y python3 python3-pip python3-venv nodejs npm nginx git certbot python3-certbot-nginx ufw postgresql postgresql-contrib

# Configure firewall
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Create a non-root user (optional but recommended)
adduser deployer
usermod -aG sudo deployer
```

### 3.3 Database Setup

```bash
# Access PostgreSQL
sudo -u postgres psql

# In PostgreSQL prompt
CREATE DATABASE infracorp;
CREATE USER infracorpuser WITH PASSWORD 'your_secure_password';
ALTER ROLE infracorpuser SET client_encoding TO 'utf8';
ALTER ROLE infracorpuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE infracorpuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE infracorp TO infracorpuser;
\q
```

### 3.4 Project Directory Setup

```bash
# Create project directory
mkdir -p /var/www/infracorp
cd /var/www/infracorp

# Clone repository or upload files
git clone https://github.com/yourusername/infra-corp.git .
# OR upload files via SCP/SFTP
```

## 4. Configuration Files and Deployment Scripts

### 4.1 Environment Variables

#### 4.1.1 Django Backend Environment Variables

Create `/var/www/infracorp/django_backend/.env`:

```
SECRET_KEY=your_django_secret_key
DJANGO_SETTINGS_MODULE=django_backend.settings_prod
DB_PASSWORD=your_database_password
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

#### 4.1.2 Next.js Frontend Environment Variables

Create `/var/www/infracorp/.env.production`:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 4.2 Nginx Configuration

#### 4.2.1 Backend API Configuration

Create `/etc/nginx/sites-available/api.yourdomain.com`:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        alias /var/www/infracorp/django_backend/staticfiles/;
    }
    
    location /media/ {
        alias /var/www/infracorp/django_backend/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/infracorp/django_backend/django_backend.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 4.2.2 Frontend Configuration

Create `/etc/nginx/sites-available/yourdomain.com`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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

### 4.3 Service Configuration

#### 4.3.1 Gunicorn Service

Create `/etc/systemd/system/gunicorn.service`:

```ini
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/infracorp/django_backend
ExecStart=/var/www/infracorp/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/var/www/infracorp/django_backend/django_backend.sock django_backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### 4.3.2 PM2 Configuration

Create `/var/www/infracorp/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "infra-corp-frontend",
      script: "npm",
      args: "start",
      cwd: "/var/www/infracorp",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "/var/log/pm2/infra-corp-error.log",
      out_file: "/var/log/pm2/infra-corp-out.log",
      time: true
    }
  ]
};
```

### 4.4 Deployment Scripts

#### 4.4.1 Backend Deployment Script

Create `/var/www/infracorp/deploy_backend.sh`:

```bash
#!/bin/bash
set -e

# Configuration
PROJECT_DIR="/var/www/infracorp"
BACKEND_DIR="$PROJECT_DIR/django_backend"

# Navigate to backend directory
cd $BACKEND_DIR

# Activate virtual environment
source venv/bin/activate

# Pull latest changes
git pull

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Restart Gunicorn
sudo systemctl restart gunicorn

echo "Backend deployment completed successfully!"
```

#### 4.4.2 Frontend Deployment Script

Create `/var/www/infracorp/deploy_frontend.sh`:

```bash
#!/bin/bash
set -e

# Configuration
PROJECT_DIR="/var/www/infracorp"

# Navigate to project directory
cd $PROJECT_DIR

# Pull latest changes
git pull

# Install dependencies
npm install

# Build the application
npm run build

# Restart PM2
pm2 restart infra-corp-frontend

echo "Frontend deployment completed successfully!"
```

Make both scripts executable:

```bash
chmod +x /var/www/infracorp/deploy_backend.sh
chmod +x /var/www/infracorp/deploy_frontend.sh
```

## 5. Infrastructure Dependencies

### 5.1 Required Services

| Service    | Purpose                                | Configuration                                |
|------------|----------------------------------------|----------------------------------------------|
| PostgreSQL | Production database                    | Version 14+, configured with user and database |
| Nginx      | Web server and reverse proxy           | Version 1.18+, with SSL configuration        |
| Gunicorn   | WSGI server for Django                 | Version 21+, configured as a systemd service |
| PM2        | Process manager for Next.js            | Version 5+, configured with ecosystem file   |
| Certbot    | SSL certificate management             | Auto-renewal configured                      |
| UFW        | Firewall                               | Configured to allow HTTP, HTTPS, and SSH     |

### 5.2 External Services

| Service           | Purpose                      | Configuration Needed                        |
|-------------------|------------------------------|---------------------------------------------|
| Email Provider    | Transactional emails         | SMTP credentials in Django settings         |
| Domain Registrar  | Domain management            | DNS records pointing to server IP           |
| Backup Service    | Regular database backups     | Cron jobs for database dumps                |

### 5.3 Domain and DNS Configuration

Configure the following DNS records with your domain registrar:

| Record Type | Name              | Value             | TTL    |
|-------------|-------------------|-------------------|--------|
| A           | @                 | Your server IP    | 3600   |
| A           | www               | Your server IP    | 3600   |
| A           | api               | Your server IP    | 3600   |
| CNAME       | media             | api.yourdomain.com| 3600   |
| MX          | @                 | Your mail server  | 3600   |
| TXT         | @                 | SPF record        | 3600   |

## 6. Monitoring and Logging Setup

### 6.1 Log Management

#### 6.1.1 Nginx Logs

Nginx logs are stored in:
- Access logs: `/var/log/nginx/access.log`
- Error logs: `/var/log/nginx/error.log`

Configure log rotation:

```bash
# Edit logrotate configuration
nano /etc/logrotate.d/nginx
```

Add the following configuration:

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        if [ -d /etc/nginx/sites-enabled ]; then
            if [ -s /run/nginx.pid ]; then
                kill -USR1 `cat /run/nginx.pid`
            fi
        fi
    endscript
}
```

#### 6.1.2 Django Logs

Configure Django logging in `settings_prod.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'WARNING',
            'class': 'logging.FileHandler',
            'filename': '/var/log/django/infracorp.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'WARNING',
            'propagate': True,
        },
    },
}
```

Create the log directory:

```bash
mkdir -p /var/log/django
touch /var/log/django/infracorp.log
chown -R www-data:www-data /var/log/django
```

#### 6.1.3 Next.js Logs

PM2 logs are stored in:
- Output logs: `/var/log/pm2/infra-corp-out.log`
- Error logs: `/var/log/pm2/infra-corp-error.log`

Create the log directory:

```bash
mkdir -p /var/log/pm2
touch /var/log/pm2/infra-corp-out.log
touch /var/log/pm2/infra-corp-error.log
chown -R www-data:www-data /var/log/pm2
```

### 6.2 Monitoring Setup

#### 6.2.1 Basic Server Monitoring

Install and configure basic monitoring tools:

```bash
# Install monitoring tools
apt install -y htop iotop fail2ban

# Configure fail2ban for SSH protection
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Edit `/etc/fail2ban/jail.local` to configure SSH protection:

```
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
```

Restart fail2ban:

```bash
systemctl restart fail2ban
```

#### 6.2.2 Application Health Checks

Create a health check endpoint in Django:

```python
# In django_backend/django_backend/urls.py
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    # ... existing urls
    path('health/', health_check, name='health_check'),
]
```

Create a cron job to monitor the health endpoint:

```bash
# Create monitoring script
cat > /usr/local/bin/monitor_health.sh << 'EOF'
#!/bin/bash

API_URL="https://api.yourdomain.com/health/"
FRONTEND_URL="https://yourdomain.com"
EMAIL="admin@yourdomain.com"

# Check API health
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ $API_STATUS -ne 200 ]; then
    echo "API health check failed with status $API_STATUS" | mail -s "API Health Check Failed" $EMAIL
fi

# Check frontend health
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ $FRONTEND_STATUS -ne 200 ]; then
    echo "Frontend health check failed with status $FRONTEND_STATUS" | mail -s "Frontend Health Check Failed" $EMAIL
fi
EOF

# Make script executable
chmod +x /usr/local/bin/monitor_health.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor_health.sh") | crontab -
```

#### 6.2.3 Database Backups

Create a backup script:

```bash
cat > /usr/local/bin/backup_db.sh << 'EOF'
#!/bin/bash

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/infracorp"
DB_NAME="infracorp"
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create database backup
sudo -u postgres pg_dump $DB_NAME > $BACKUP_DIR/infracorp_$DATE.sql

# Compress the backup
gzip -f $BACKUP_DIR/infracorp_$DATE.sql

# Remove backups older than retention period
find $BACKUP_DIR -name "infracorp_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
EOF

# Make script executable
chmod +x /usr/local/bin/backup_db.sh

# Add to crontab to run daily at 2 AM
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup_db.sh") | crontab -
```

## 7. Potential Deployment Issues and Solutions

### 7.1 Database Migration Issues

**Issue**: Database migrations fail during deployment.

**Solution**:
1. Backup the database before migrations
2. Run migrations with the `--plan` flag to preview changes
3. For complex migrations, consider running them manually during a maintenance window

```bash
# Backup before migrations
sudo -u postgres pg_dump infracorp > /var/backups/infracorp_pre_migration.sql

# Preview migrations
python manage.py migrate --plan

# Apply migrations
python manage.py migrate
```

### 7.2 Static Files Issues

**Issue**: Static files not being served correctly.

**Solution**:
1. Verify the `STATIC_ROOT` setting in Django
2. Ensure `collectstatic` is run during deployment
3. Check Nginx configuration for static files location

```bash
# Verify static files collection
python manage.py collectstatic --noinput --verbosity 2

# Check static files directory
ls -la /var/www/infracorp/django_backend/staticfiles/

# Check Nginx configuration
nginx -t
```

### 7.3 CORS Issues

**Issue**: Cross-Origin Resource Sharing (CORS) errors in the browser.

**Solution**:
1. Verify CORS settings in Django
2. Ensure the frontend domain is in the `CORS_ALLOWED_ORIGINS` list
3. Check that credentials are properly handled

```python
# In settings_prod.py
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

### 7.4 SSL Certificate Issues

**Issue**: SSL certificates not renewing automatically.

**Solution**:
1. Verify Certbot's renewal cron job
2. Test certificate renewal manually
3. Check for any errors in the Certbot logs

```bash
# Check Certbot timer
systemctl list-timers | grep certbot

# Test renewal
certbot renew --dry-run

# Check logs
journalctl -u certbot
```

### 7.5 Next.js Build Failures

**Issue**: Next.js build fails during deployment.

**Solution**:
1. Check for dependency issues
2. Verify environment variables are set correctly
3. Increase memory allocation for the build process if needed

```bash
# Clean node_modules and reinstall
rm -rf node_modules
npm install

# Verify environment variables
cat .env.production

# Increase memory for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### 7.6 Server Resource Issues

**Issue**: Server running out of resources (CPU, memory, disk).

**Solution**:
1. Monitor resource usage with tools like htop
2. Optimize application settings (e.g., Gunicorn workers, PM2 instances)
3. Consider upgrading to a larger server plan if needed

```bash
# Check disk usage
df -h

# Check memory usage
free -m

# Check running processes
htop
```

## 8. Deployment Checklist

Use this checklist to ensure all aspects of the deployment are covered:

### Pre-Deployment

- [ ] Code is committed to version control
- [ ] All environment variables are documented
- [ ] Database schema migrations are tested
- [ ] Static files are collected
- [ ] Frontend build is tested locally

### Server Setup

- [ ] Server is provisioned with correct specifications
- [ ] Required packages are installed
- [ ] Firewall is configured
- [ ] Database is created and configured
- [ ] Project directory structure is set up

### Application Deployment

- [ ] Code is cloned/uploaded to server
- [ ] Environment variables are set
- [ ] Virtual environment is created for Django
- [ ] Python dependencies are installed
- [ ] Node.js dependencies are installed
- [ ] Database migrations are applied
- [ ] Static files are collected
- [ ] Frontend is built
- [ ] Service configurations are in place

### Web Server Configuration

- [ ] Nginx is installed and configured
- [ ] SSL certificates are obtained and installed
- [ ] Domain DNS records are configured
- [ ] HTTP to HTTPS redirection is set up

### Monitoring and Maintenance

- [ ] Logging is configured
- [ ] Monitoring tools are set up
- [ ] Backup scripts are in place
- [ ] Health checks are implemented
- [ ] Deployment scripts are tested

### Post-Deployment

- [ ] Application is accessible via domain
- [ ] SSL is working correctly
- [ ] All features are tested
- [ ] Performance is monitored
- [ ] Backup system is verified

By following this comprehensive deployment plan, you will have a robust, secure, and maintainable deployment of the InfraCorp application on a Hostinger KVM 2 plan.