# Deployment Checklist for Hostinger Business Plan

Use this checklist to ensure you've completed all necessary steps before and during deployment.

## Pre-Deployment Preparation

- [ ] Purchase Hostinger Business Plan
- [ ] Register or connect your domain
- [ ] Ensure all code changes are committed and tested locally
- [ ] Build the Next.js frontend (`npm run build`)
- [ ] Collect Django static files (`python manage.py collectstatic --noinput`)

## Database Setup

- [ ] Create MySQL database in Hostinger hPanel
- [ ] Note down database credentials (name, username, password)
- [ ] Update the Django `.env` file with correct database credentials
- [ ] Run database migrations after uploading files

## Backend Deployment

- [ ] Upload Django backend files to server
- [ ] Configure `.env` file with production settings
- [ ] Set up virtual environment and install dependencies
- [ ] Run database migrations
- [ ] Create Django superuser
- [ ] Test admin interface access
- [ ] Verify API endpoints are working

## Frontend Deployment

- [ ] Update frontend `.env` file with correct API URL
- [ ] Upload Next.js build files to server
- [ ] Configure Node.js application in hPanel
- [ ] Test frontend access and functionality

## Domain and SSL Configuration

- [ ] Set up subdomain for API if needed
- [ ] Configure DNS settings
- [ ] Enable SSL certificates for all domains/subdomains
- [ ] Test HTTPS access

## Final Verification

- [ ] Test all major functionality
- [ ] Verify media uploads are working
- [ ] Check mobile responsiveness
- [ ] Ensure all links are working correctly
- [ ] Verify CORS is properly configured
- [ ] Check for any console errors

## Post-Deployment

- [ ] Set up regular backups
- [ ] Configure monitoring (if available)
- [ ] Document deployment process for future reference
- [ ] Share admin credentials with relevant team members

## Troubleshooting Resources

- Hostinger Knowledge Base: https://support.hostinger.com/
- Django Deployment Guide: https://docs.djangoproject.com/en/5.2/howto/deployment/
- Next.js Deployment Guide: https://nextjs.org/docs/deployment