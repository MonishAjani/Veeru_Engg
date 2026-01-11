# Deploying InfraCorp to Hostinger KVM 2

This README provides a quick overview of deploying the InfraCorp website (Next.js frontend and Django backend) to a Hostinger KVM 2 plan.

## Quick Start

1. Purchase a Hostinger KVM 2 plan from [Hostinger](https://www.hostinger.com/vps-hosting)
2. Set up your VPS with Ubuntu (recommended)
3. Upload the deployment files to your server
4. Edit the configuration in `deploy-to-hostinger.sh`
5. Run the deployment script

```bash
chmod +x deploy-to-hostinger.sh
./deploy-to-hostinger.sh
```

## What's Included

- **HOSTINGER_DEPLOYMENT_GUIDE.md**: Detailed step-by-step instructions for manual deployment
- **deploy-to-hostinger.sh**: Automated deployment script
- **HOSTINGER_README.md**: This quick reference guide

## Hostinger KVM 2 Plan Features

The Hostinger KVM 2 plan typically includes:

- 2 vCPU cores
- 4GB RAM
- 60GB SSD storage
- 4TB bandwidth
- Full root access
- IPv4 & IPv6 support
- 1 Gbps Network

This plan is suitable for running both your Next.js frontend and Django backend on the same server.

## Deployment Architecture

The deployment sets up:

1. **Django Backend**:
   - Runs with Gunicorn
   - PostgreSQL database
   - Serves API endpoints at `api.your_domain.com`

2. **Next.js Frontend**:
   - Runs with PM2
   - Serves the website at `your_domain.com`

3. **Nginx**:
   - Acts as a reverse proxy
   - Handles SSL termination
   - Routes requests to the appropriate service

4. **SSL**:
   - Automatic SSL certificates from Let's Encrypt
   - Auto-renewal configured

## Post-Deployment Steps

After successful deployment:

1. Change the default admin password
2. Set up DNS records to point to your server
3. Test your website thoroughly
4. Set up additional monitoring if needed

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

For more detailed troubleshooting, refer to the [HOSTINGER_DEPLOYMENT_GUIDE.md](./HOSTINGER_DEPLOYMENT_GUIDE.md).

## Support

If you need additional help:

- Hostinger Support: Available through your Hostinger control panel
- Hostinger Knowledge Base: [https://support.hostinger.com/](https://support.hostinger.com/)