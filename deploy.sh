#!/bin/bash
# Comprehensive deployment script for InfraCorp application
# This script automates the entire deployment process on a Hostinger KVM 2 plan

# Exit on error
set -e

# Configuration variables - EDIT THESE
DOMAIN="yourdomain.com"
API_SUBDOMAIN="api"
DB_NAME="infracorp"
DB_USER="infracorpuser"
DB_PASSWORD="your_secure_password"
DJANGO_SECRET_KEY="your_django_secret_key"
EMAIL="your_email@example.com"
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_USER="your_email@example.com"
EMAIL_PASSWORD="your_email_password"
PROJECT_DIR="/var/www/infracorp"
GIT_REPO="https://github.com/yourusername/infra-corp.git"
SERVER_IP=$(hostname -I | awk '{print $1}')

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo -e "\n${GREEN}==== $1 ====${NC}\n"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}WARNING: $1${NC}"
}

# Function to print errors
print_error() {
    echo -e "${RED}ERROR: $1${NC}"
}

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    print_error "This script must be run as root"
    exit 1
fi

# Check if configuration has been updated
if [ "$DOMAIN" == "yourdomain.com" ]; then
    print_error "Please edit the configuration variables in this script before running it"
    exit 1
fi

print_section "1. System Update and Package Installation"

# Update system packages
echo "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "Installing required packages..."
apt install -y python3 python3-pip python3-venv nodejs npm nginx git certbot python3-certbot-nginx ufw postgresql postgresql-contrib htop iotop fail2ban

print_section "2. Firewall Configuration"

echo "Configuring firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

print_section "3. Project Directory Setup"

echo "Creating project directory..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Check if the directory is empty
if [ "$(ls -A $PROJECT_DIR)" ]; then
    print_warning "Project directory is not empty. Skipping git clone."
else
    echo "Cloning repository..."
    git clone $GIT_REPO .
fi

print_section "4. Database Setup"

echo "Setting up PostgreSQL database..."
# Check if database already exists
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    print_warning "Database $DB_NAME already exists. Skipping database creation."
else
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
    sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
    sudo -u postgres psql -c "ALTER ROLE $DB_USER SET client_encoding TO 'utf8';"
    sudo -u postgres psql -c "ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';"
    sudo -u postgres psql -c "ALTER ROLE $DB_USER SET timezone TO 'UTC';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
    echo "Database and user created successfully."
fi

print_section "5. Django Backend Setup"

echo "Setting up Django backend..."
cd $PROJECT_DIR/django_backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created."
fi

source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn psycopg2-binary whitenoise

# Create production settings file
echo "Creating production settings file..."
cat > django_backend/settings_prod.py << EOF
from .settings import *
import os

DEBUG = False

ALLOWED_HOSTS = ['$DOMAIN', 'www.$DOMAIN', '$API_SUBDOMAIN.$DOMAIN', '$SERVER_IP']

# Database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '$DB_NAME',
        'USER': '$DB_USER',
        'PASSWORD': '$DB_PASSWORD',
        'HOST': 'localhost',
        'PORT': '',
    }
}

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://$DOMAIN",
    "https://www.$DOMAIN",
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
EMAIL_HOST = '$EMAIL_HOST'
EMAIL_PORT = $EMAIL_PORT
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '$EMAIL_USER'
EMAIL_HOST_PASSWORD = '$EMAIL_PASSWORD'
DEFAULT_FROM_EMAIL = 'noreply@$DOMAIN'

# Logging
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
EOF

# Create .env file
echo "Creating .env file..."
cat > .env << EOF
SECRET_KEY=$DJANGO_SECRET_KEY
DJANGO_SETTINGS_MODULE=django_backend.settings_prod
DB_PASSWORD=$DB_PASSWORD
EMAIL_HOST=$EMAIL_HOST
EMAIL_PORT=$EMAIL_PORT
EMAIL_HOST_USER=$EMAIL_USER
EMAIL_HOST_PASSWORD=$EMAIL_PASSWORD
EOF

# Create log directory
echo "Creating log directory..."
mkdir -p /var/log/django
touch /var/log/django/infracorp.log
chown -R www-data:www-data /var/log/django

# Run migrations and collect static files
echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "Creating superuser..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', '$EMAIL', 'admin')" | python manage.py shell

# Set up Gunicorn service
echo "Setting up Gunicorn service..."
cat > /etc/systemd/system/gunicorn.service << EOF
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=$PROJECT_DIR/django_backend
ExecStart=$PROJECT_DIR/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:$PROJECT_DIR/django_backend/django_backend.sock django_backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Set proper permissions
echo "Setting proper permissions..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

# Enable and start Gunicorn service
echo "Enabling and starting Gunicorn service..."
systemctl daemon-reload
systemctl enable gunicorn
systemctl start gunicorn

print_section "6. Next.js Frontend Setup"

echo "Setting up Next.js frontend..."
cd $PROJECT_DIR

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Create production environment file
echo "Creating production environment file..."
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://$API_SUBDOMAIN.$DOMAIN
EOF

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Create PM2 log directory
echo "Creating PM2 log directory..."
mkdir -p /var/log/pm2
touch /var/log/pm2/infra-corp-out.log
touch /var/log/pm2/infra-corp-error.log
chown -R www-data:www-data /var/log/pm2

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Create PM2 configuration
echo "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: "infra-corp-frontend",
      script: "npm",
      args: "start",
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
EOF

# Start the application with PM2
echo "Starting application with PM2..."
pm2 start ecosystem.config.js

# Set PM2 to start on boot
echo "Setting PM2 to start on boot..."
pm2 startup
pm2 save

print_section "7. Nginx Configuration"

echo "Setting up Nginx as a reverse proxy..."

# Create Nginx configuration for backend API
echo "Creating Nginx configuration for backend API..."
cat > /etc/nginx/sites-available/$API_SUBDOMAIN.$DOMAIN << EOF
server {
    listen 80;
    server_name $API_SUBDOMAIN.$DOMAIN;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        alias $PROJECT_DIR/django_backend/staticfiles/;
    }
    
    location /media/ {
        alias $PROJECT_DIR/django_backend/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:$PROJECT_DIR/django_backend/django_backend.sock;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Create Nginx configuration for frontend
echo "Creating Nginx configuration for frontend..."
cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the Nginx configurations
echo "Enabling Nginx configurations..."
ln -sf /etc/nginx/sites-available/$API_SUBDOMAIN.$DOMAIN /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

print_section "8. SSL Configuration"

echo "Configuring SSL with Let's Encrypt..."

# Check if domain is pointing to this server
echo "Checking if domain is pointing to this server..."
DOMAIN_IP=$(dig +short $DOMAIN)
if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    print_warning "The domain $DOMAIN is not pointing to this server's IP ($SERVER_IP)."
    print_warning "Current IP for $DOMAIN is: $DOMAIN_IP"
    print_warning "SSL certificate installation may fail. Proceeding anyway..."
fi

# Obtain SSL certificates
echo "Obtaining SSL certificates..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL || print_warning "SSL certificate installation for $DOMAIN failed. You can try again later with: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
certbot --nginx -d $API_SUBDOMAIN.$DOMAIN --non-interactive --agree-tos --email $EMAIL || print_warning "SSL certificate installation for $API_SUBDOMAIN.$DOMAIN failed. You can try again later with: certbot --nginx -d $API_SUBDOMAIN.$DOMAIN"

print_section "9. Monitoring and Backup Setup"

echo "Setting up fail2ban..."
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
cat > /etc/fail2ban/jail.d/custom.conf << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 3600
EOF
systemctl restart fail2ban

echo "Creating health check script..."
cat > /usr/local/bin/monitor_health.sh << EOF
#!/bin/bash

API_URL="https://$API_SUBDOMAIN.$DOMAIN/health/"
FRONTEND_URL="https://$DOMAIN"
EMAIL="$EMAIL"

# Check API health
API_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \$API_URL)
if [ \$API_STATUS -ne 200 ]; then
    echo "API health check failed with status \$API_STATUS" | mail -s "API Health Check Failed" \$EMAIL
fi

# Check frontend health
FRONTEND_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \$FRONTEND_URL)
if [ \$FRONTEND_STATUS -ne 200 ]; then
    echo "Frontend health check failed with status \$FRONTEND_STATUS" | mail -s "Frontend Health Check Failed" \$EMAIL
fi
EOF
chmod +x /usr/local/bin/monitor_health.sh
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor_health.sh") | crontab -

echo "Creating backup script..."
mkdir -p /var/backups/infracorp
cat > /usr/local/bin/backup_db.sh << EOF
#!/bin/bash

DATE=\$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/infracorp"
DB_NAME="$DB_NAME"
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p \$BACKUP_DIR

# Create database backup
sudo -u postgres pg_dump \$DB_NAME > \$BACKUP_DIR/infracorp_\$DATE.sql

# Compress the backup
gzip -f \$BACKUP_DIR/infracorp_\$DATE.sql

# Remove backups older than retention period
find \$BACKUP_DIR -name "infracorp_*.sql.gz" -type f -mtime +\$RETENTION_DAYS -delete
EOF
chmod +x /usr/local/bin/backup_db.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup_db.sh") | crontab -

print_section "10. Deployment Scripts"

echo "Creating backend deployment script..."
cat > $PROJECT_DIR/deploy_backend.sh << EOF
#!/bin/bash
set -e

# Configuration
PROJECT_DIR="$PROJECT_DIR"
BACKEND_DIR="\$PROJECT_DIR/django_backend"

# Navigate to backend directory
cd \$BACKEND_DIR

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
EOF
chmod +x $PROJECT_DIR/deploy_backend.sh

echo "Creating frontend deployment script..."
cat > $PROJECT_DIR/deploy_frontend.sh << EOF
#!/bin/bash
set -e

# Configuration
PROJECT_DIR="$PROJECT_DIR"

# Navigate to project directory
cd \$PROJECT_DIR

# Pull latest changes
git pull

# Install dependencies
npm install

# Build the application
npm run build

# Restart PM2
pm2 restart infra-corp-frontend

echo "Frontend deployment completed successfully!"
EOF
chmod +x $PROJECT_DIR/deploy_frontend.sh

print_section "Deployment Completed Successfully!"
echo -e "Your website is now deployed at https://$DOMAIN"
echo -e "The API is available at https://$API_SUBDOMAIN.$DOMAIN"
echo -e "Django admin interface: https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo -e "Admin username: admin"
echo -e "Admin password: admin (PLEASE CHANGE THIS IMMEDIATELY!)"

print_warning "Important next steps:"
echo -e "1. Change the admin password immediately by visiting https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo -e "2. If SSL certificate installation failed, make sure your DNS records are correctly set up and try again"
echo -e "3. Test your website thoroughly to ensure everything is working correctly"
echo -e "4. Consider setting up additional monitoring tools for production use"

exit 0