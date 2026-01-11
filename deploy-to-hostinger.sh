#!/bin/bash
# Deployment script for InfraCorp website on Hostinger KVM 2 plan
# This script should be run on the Hostinger VPS after initial setup

# Exit on error
set -e

# Configuration variables - EDIT THESE
DOMAIN="your_domain.com"
API_SUBDOMAIN="api"
DB_NAME="infracorp"
DB_USER="infracorpuser"
DB_PASSWORD="your_secure_password"
DJANGO_SECRET_KEY="your_secret_key"
PROJECT_DIR="/var/www/infra-corp"
EMAIL="your_email@example.com"

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
if [ "$DOMAIN" == "your_domain.com" ]; then
    print_error "Please edit the configuration variables in this script before running it"
    exit 1
fi

print_section "Updating system packages"
apt update && apt upgrade -y

print_section "Installing required packages"
apt install -y python3 python3-pip python3-venv nodejs npm nginx git certbot python3-certbot-nginx ufw postgresql postgresql-contrib

print_section "Configuring firewall"
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

print_section "Creating project directory"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Check if the directory is empty
if [ "$(ls -A $PROJECT_DIR)" ]; then
    print_warning "Project directory is not empty. Skipping git clone."
else
    print_section "Cloning repository"
    # Replace with your actual repository URL
    git clone https://github.com/yourusername/infra-corp.git .
fi

print_section "Setting up PostgreSQL database"
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
fi

print_section "Setting up Django backend"
cd $PROJECT_DIR/django_backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# Create production settings file
cat > django_backend/settings_prod.py << EOF
from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['$DOMAIN', 'www.$DOMAIN', '$API_SUBDOMAIN.$DOMAIN']

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
EOF

# Create .env file
cat > .env << EOF
SECRET_KEY=$DJANGO_SECRET_KEY
DJANGO_SETTINGS_MODULE=django_backend.settings_prod
EOF

# Run migrations and collect static files
python manage.py migrate
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', '$EMAIL', 'admin')" | python manage.py shell

# Set up Gunicorn service
cat > /etc/systemd/system/gunicorn.service << EOF
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=$PROJECT_DIR/django_backend
ExecStart=$PROJECT_DIR/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:$PROJECT_DIR/django_backend/django_backend.sock django_backend.wsgi:application
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

systemctl enable gunicorn
systemctl start gunicorn

print_section "Setting up Next.js frontend"
cd $PROJECT_DIR

# Install Node.js dependencies
npm install

# Create production environment file
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://$API_SUBDOMAIN.$DOMAIN
EOF

# Build the Next.js application
npm run build

# Install PM2 globally
npm install -g pm2

# Create PM2 configuration
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
      }
    }
  ]
};
EOF

# Start the application with PM2
pm2 start ecosystem.config.js

# Set PM2 to start on boot
pm2 startup
pm2 save

print_section "Setting up Nginx as a reverse proxy"

# Create Nginx configuration for backend API
cat > /etc/nginx/sites-available/$API_SUBDOMAIN.$DOMAIN << EOF
server {
    listen 80;
    server_name $API_SUBDOMAIN.$DOMAIN;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root $PROJECT_DIR/django_backend;
    }
    
    location /media/ {
        root $PROJECT_DIR/django_backend;
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
ln -sf /etc/nginx/sites-available/$API_SUBDOMAIN.$DOMAIN /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

print_section "Configuring SSL with Let's Encrypt"

# Obtain SSL certificates
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL
certbot --nginx -d $API_SUBDOMAIN.$DOMAIN --non-interactive --agree-tos --email $EMAIL

print_section "Setting up backup script"

# Create backup directory
mkdir -p /var/backups/infracorp

# Create backup script
cat > /etc/cron.daily/backup-db << EOF
#!/bin/bash
DATE=\$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/infracorp"
mkdir -p \$BACKUP_DIR

# Database backup
sudo -u postgres pg_dump $DB_NAME > \$BACKUP_DIR/infracorp_\$DATE.sql

# Compress the backup
gzip -f \$BACKUP_DIR/infracorp_\$DATE.sql

# Keep only the last 7 backups
find \$BACKUP_DIR -name "infracorp_*.sql.gz" -type f -mtime +7 -delete
EOF

# Make the script executable
chmod +x /etc/cron.daily/backup-db

print_section "Deployment completed successfully!"
echo -e "Your website is now deployed at https://$DOMAIN"
echo -e "The API is available at https://$API_SUBDOMAIN.$DOMAIN"
echo -e "Django admin interface: https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo -e "Admin username: admin"
echo -e "Admin password: admin (PLEASE CHANGE THIS IMMEDIATELY!)"

print_warning "Important next steps:"
echo -e "1. Change the admin password immediately by visiting https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo -e "2. Update your DNS records to point to this server's IP address"
echo -e "3. Test your website thoroughly to ensure everything is working correctly"
echo -e "4. Set up regular backups and monitoring"

exit 0