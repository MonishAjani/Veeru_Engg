# Deploying InfraCorp to Hostinger KVM 2 - Quick Guide

This guide provides step-by-step instructions for deploying the InfraCorp application on a Hostinger KVM 2 plan.

## Prerequisites

1. A Hostinger KVM 2 plan subscription
2. A domain name (can be purchased through Hostinger)
3. Basic knowledge of Linux command line
4. SSH client (like PuTTY for Windows or Terminal for macOS/Linux)

## Step 1: Prepare Your Local Project

Before deploying, make sure your local project is ready:

1. The `server.js` file has been created (this is required for the Next.js application to start properly)
2. The `next.config.js` file has been updated to use environment variables
3. The deployment scripts (`deploy.sh` and `deploy-to-hostinger.sh`) have been updated with secure credentials

## Step 2: Purchase and Set Up Hostinger KVM 2 Plan

1. Purchase a Hostinger KVM 2 plan from [Hostinger](https://www.hostinger.com/vps-hosting)
2. Select Ubuntu as the operating system (Ubuntu 22.04 LTS recommended)
3. Note your server's IP address, username, and password

## Step 3: Connect to Your VPS

```bash
ssh root@your_server_ip
```

Enter your password when prompted.

## Step 4: Upload Deployment Files

Upload the project files to your server using SCP or SFTP:

```bash
# From your local machine
scp -r /path/to/your/project/* root@your_server_ip:/root/
```

Or use an SFTP client like FileZilla to upload the files.

## Step 5: Configure Deployment Script

Edit the deployment script with your domain and credentials:

```bash
# On your server
cd /root
nano deploy-to-hostinger.sh
```

Update the following variables:
- `DOMAIN`: Your domain name (e.g., "yourdomain.com")
- `API_SUBDOMAIN`: Subdomain for the API (usually "api")
- `DB_PASSWORD`: A secure password for the database
- `EMAIL`: Your email address for SSL certificates

## Step 6: Run the Deployment Script

```bash
# Make the script executable
chmod +x deploy-to-hostinger.sh

# Run the script
./deploy-to-hostinger.sh
```

This script will:
1. Update system packages
2. Install required dependencies
3. Set up the database
4. Configure the Django backend
5. Configure the Next.js frontend
6. Set up Nginx as a reverse proxy
7. Configure SSL certificates
8. Set up backup scripts

## Step 7: Configure DNS

1. Log in to your domain registrar
2. Add the following DNS records:
   - A record: `@` pointing to your server IP
   - A record: `www` pointing to your server IP
   - A record: `api` pointing to your server IP

## Step 8: Post-Deployment Steps

After successful deployment:

1. Change the default admin password by visiting `https://api.yourdomain.com/admin/`
2. Test your website thoroughly at `https://yourdomain.com`
3. Set up additional monitoring if needed

## Troubleshooting

If you encounter issues during deployment:

1. Check the logs:
   - Nginx: `/var/log/nginx/error.log`
   - Gunicorn: `journalctl -u gunicorn`
   - PM2: `pm2 logs infra-corp-frontend`

2. Verify services are running:
   - `systemctl status nginx`
   - `systemctl status gunicorn`
   - `pm2 status`

3. Check firewall settings:
   - `ufw status`

## Updating Your Application

To update your application after making changes:

1. For backend updates:
   ```bash
   cd /var/www/infra-corp
   ./deploy_backend.sh
   ```

2. For frontend updates:
   ```bash
   cd /var/www/infra-corp
   ./deploy_frontend.sh
   ```

## Support

If you need additional help:

- Hostinger Support: Available through your Hostinger control panel
- Hostinger Knowledge Base: [https://support.hostinger.com/](https://support.hostinger.com/)