#!/bin/bash
# Deployment script for veeruengineering.com on Hostinger KVM 2
# This script should be run on the server after the repository has been cloned

# Exit on error, but not for specific commands that might fail expectedly
set -e

# Function to run a command and continue even if it fails
run_safe() {
    "$@" || {
        local exit_code=$?
        echo -e "${YELLOW}Command failed with exit code $exit_code, but continuing...${NC}"
        return 0
    }
}

# Configuration variables
DOMAIN="veeruengineering.com"
API_SUBDOMAIN="api"
DB_NAME="infracorp"
DB_USER="infracorpuser"
DB_PASSWORD="Mma@7214"
DJANGO_SECRET_KEY="$(openssl rand -base64 32)"
EMAIL="contactaxeclsolutions@gmail.com"
PROJECT_DIR="/var/www/veeruengineering"
DJANGO_ADMIN_USER="admin"
DJANGO_ADMIN_PASSWORD="admin@2025"
DJANGO_ADMIN_EMAIL="$EMAIL"
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

print_section "1. System Update and Package Installation"

# Update system packages
echo "Updating system packages..."
apt update

# Install required packages if not already installed
echo "Installing required packages..."
apt install -y python3 python3-pip python3-virtualenv python3-full nodejs npm nginx git certbot python3-certbot-nginx ufw postgresql postgresql-contrib

# Install PM2 globally
echo "Installing PM2 globally..."
npm install -g pm2

print_section "2. Firewall Configuration"

echo "Configuring firewall..."
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

print_section "3. Database Setup"

echo "Setting up PostgreSQL database..."
# Create database if it doesn't exist
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    print_warning "Database $DB_NAME already exists. Skipping database creation."
else
    run_safe sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
    echo "Database created successfully."
fi

# Create user if it doesn't exist
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
    print_warning "User $DB_USER already exists. Skipping user creation."
else
    run_safe sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
    echo "Database user created successfully."
fi

# Configure user permissions (these commands are safe to run even if the user already exists)
run_safe sudo -u postgres psql -c "ALTER ROLE $DB_USER SET client_encoding TO 'utf8';"
run_safe sudo -u postgres psql -c "ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';"
run_safe sudo -u postgres psql -c "ALTER ROLE $DB_USER SET timezone TO 'UTC';"
run_safe sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"

# Fix PostgreSQL permissions issue - grant schema permissions
echo "Granting schema permissions..."
run_safe sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
run_safe sudo -u postgres psql -d $DB_NAME -c "ALTER USER $DB_USER CREATEDB;"

echo "Database permissions configured successfully."

print_section "4. Django Backend Setup"

echo "Setting up Django backend..."
cd $PROJECT_DIR/django_backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    virtualenv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

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
DEFAULT_FROM_EMAIL = 'noreply@$DOMAIN'
EOF

# Create .env file
echo "Creating .env file..."
cat > .env << EOF
SECRET_KEY=$DJANGO_SECRET_KEY
DJANGO_SETTINGS_MODULE=django_backend.settings_prod
EOF

# Create log directory
echo "Creating log directory..."
mkdir -p /var/log/django
touch /var/log/django/infracorp.log
chown -R www-data:www-data /var/log/django

# Run migrations and collect static files
echo "Running migrations..."
run_safe python manage.py migrate --settings=django_backend.settings_prod

echo "Collecting static files..."
run_safe python manage.py collectstatic --noinput --settings=django_backend.settings_prod

# Create superuser if it doesn't exist
echo "Creating superuser..."
run_safe echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$DJANGO_ADMIN_USER').exists() or User.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')" | python manage.py shell --settings=django_backend.settings_prod

# Deactivate virtual environment
deactivate

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
ExecStart=$PROJECT_DIR/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind 127.0.0.1:8000 django_backend.wsgi:application
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

print_section "5. Next.js Frontend Setup"

echo "Setting up Next.js frontend..."
cd $PROJECT_DIR

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Create server.js file if it doesn't exist
if [ ! -f "server.js" ]; then
    echo "Creating server.js file..."
    cat > server.js << EOF
// Custom Next.js server for production
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Let Next.js handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});
EOF
fi

# Create production environment file
echo "Creating production environment file..."
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://$API_SUBDOMAIN.$DOMAIN/api
NEXT_PUBLIC_API_BASE=https://$API_SUBDOMAIN.$DOMAIN/api
NEXT_PUBLIC_DOMAIN=$DOMAIN
NEXT_PUBLIC_API_DOMAIN=$API_SUBDOMAIN.$DOMAIN
NEXT_PUBLIC_DEPLOYMENT_URL=https://$DOMAIN
NEXT_PUBLIC_IMAGE_DOMAINS=$API_SUBDOMAIN.$DOMAIN,$DOMAIN,localhost
NODE_ENV=production
EOF

# Update next.config.js to use environment variables
echo "Updating next.config.js..."
cat > next.config.js << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    unoptimized: true,
    domains: [
      process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
      process.env.NEXT_PUBLIC_API_DOMAIN || 'localhost',
      'localhost'
    ]
  },
  // Add asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? \`https://\${process.env.NEXT_PUBLIC_DOMAIN || 'localhost'}\` 
    : undefined,
  // Ensure trailing slashes for consistent path handling
  trailingSlash: true,
  // Output standalone build for easier deployment
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined
};

module.exports = nextConfig;
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

# Create PM2 configuration
echo "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: "veeruengineering-frontend",
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

print_section "6. Nginx Configuration"

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
        proxy_pass http://127.0.0.1:8000;
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

# Create proxy_params file if it doesn't exist
if [ ! -f "/etc/nginx/proxy_params" ]; then
    echo "Creating proxy_params file..."
    cat > /etc/nginx/proxy_params << EOF
proxy_set_header Host \$http_host;
proxy_set_header X-Real-IP \$remote_addr;
proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto \$scheme;
EOF
fi

# Enable the Nginx configurations
echo "Enabling Nginx configurations..."
run_safe ln -sf /etc/nginx/sites-available/$API_SUBDOMAIN.$DOMAIN /etc/nginx/sites-enabled/
run_safe ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
run_safe nginx -t
run_safe systemctl start nginx
run_safe systemctl enable nginx

print_section "7. SSL Configuration"

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
run_safe certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL || print_warning "SSL certificate installation for $DOMAIN failed. You can try again later with: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
run_safe certbot --nginx -d $API_SUBDOMAIN.$DOMAIN --non-interactive --agree-tos --email $EMAIL || print_warning "SSL certificate installation for $API_SUBDOMAIN.$DOMAIN failed. You can try again later with: certbot --nginx -d $API_SUBDOMAIN.$DOMAIN"

print_section "8. Final Steps"

# Restart all services
echo "Restarting all services..."
run_safe systemctl restart nginx
run_safe systemctl restart gunicorn
run_safe pm2 restart all

# Create a test script
echo "Creating test script..."
cat > $PROJECT_DIR/test-deployment.sh << EOF
#!/bin/bash
# Test script to verify the deployment of veeruengineering.com

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo -e "\n\${GREEN}==== \$1 ====\${NC}\n"
}

# Function to print warnings
print_warning() {
    echo -e "\${YELLOW}WARNING: \$1\${NC}"
}

# Function to print errors
print_error() {
    echo -e "\${RED}ERROR: \$1\${NC}"
}

# Function to print success
print_success() {
    echo -e "\${GREEN}SUCCESS: \$1\${NC}"
}

DOMAIN="$DOMAIN"
API_SUBDOMAIN="$API_SUBDOMAIN"

print_section "Testing veeruengineering.com Deployment"

# Test frontend
print_section "Testing Frontend"
FRONTEND_URL="https://\$DOMAIN"
echo "Testing frontend at \$FRONTEND_URL"

FRONTEND_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \$FRONTEND_URL)
if [ \$FRONTEND_STATUS -eq 200 ]; then
    print_success "Frontend is accessible (HTTP 200)"
else
    print_error "Frontend returned HTTP \$FRONTEND_STATUS"
fi

# Test API
print_section "Testing API"
API_URL="https://\$API_SUBDOMAIN.\$DOMAIN/health/"
echo "Testing API health at \$API_URL"

API_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \$API_URL)
if [ \$API_STATUS -eq 200 ]; then
    print_success "API health check is accessible (HTTP 200)"
    
    # Get detailed health check response
    HEALTH_RESPONSE=\$(curl -s \$API_URL)
    echo "Health check response:"
    echo \$HEALTH_RESPONSE
else
    print_error "API health check returned HTTP \$API_STATUS"
fi

# Test admin interface
print_section "Testing Admin Interface"
ADMIN_URL="https://\$API_SUBDOMAIN.\$DOMAIN/admin/"
echo "Testing admin interface at \$ADMIN_URL"

ADMIN_STATUS=\$(curl -s -o /dev/null -w "%{http_code}" \$ADMIN_URL)
if [ \$ADMIN_STATUS -eq 200 ] || [ \$ADMIN_STATUS -eq 302 ]; then
    print_success "Admin interface is accessible (HTTP \$ADMIN_STATUS)"
else
    print_error "Admin interface returned HTTP \$ADMIN_STATUS"
fi

# Summary
print_section "Deployment Test Summary"

if [ \$FRONTEND_STATUS -eq 200 ] && [ \$API_STATUS -eq 200 ] && ([ \$ADMIN_STATUS -eq 200 ] || [ \$ADMIN_STATUS -eq 302 ]); then
    print_success "All tests passed! The deployment appears to be successful."
    echo "Frontend: \$FRONTEND_URL"
    echo "API: https://\$API_SUBDOMAIN.\$DOMAIN"
    echo "Admin: \$ADMIN_URL"
else
    print_warning "Some tests failed. Please check the logs above for details."
    echo "You may need to troubleshoot the deployment."
fi

exit 0
EOF

chmod +x $PROJECT_DIR/test-deployment.sh

print_section "Deployment Completed Successfully!"
echo -e "Your website is now deployed at https://$DOMAIN"
echo -e "The API is available at https://$API_SUBDOMAIN.$DOMAIN"
echo -e "Django admin interface: https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo -e "Admin username: $DJANGO_ADMIN_USER"
echo -e "Admin password: $DJANGO_ADMIN_PASSWORD (PLEASE CHANGE THIS AFTER FIRST LOGIN!)"

print_warning "Important next steps:"
echo -e "1. Make sure your DNS records are correctly set up to point to this server's IP: $SERVER_IP"
echo -e "   - A record for $DOMAIN pointing to $SERVER_IP"
echo -e "   - A record for www.$DOMAIN pointing to $SERVER_IP"
echo -e "   - A record for $API_SUBDOMAIN.$DOMAIN pointing to $SERVER_IP"
echo -e "2. If SSL certificate installation failed, try again after DNS propagation with:"
echo -e "   certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo -e "   certbot --nginx -d $API_SUBDOMAIN.$DOMAIN"
echo -e "3. Test your deployment with the test script:"
echo -e "   $PROJECT_DIR/test-deployment.sh"
echo -e "4. Change the default admin password by visiting https://$API_SUBDOMAIN.$DOMAIN/admin/"

exit 0