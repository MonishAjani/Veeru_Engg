# Deployment Troubleshooting Guide

This document summarizes the issues encountered during the deployment of veeruengineering.com and the solutions that were implemented.

## Issues Encountered

1. **Database Permissions Issue**
   - Error: "permission denied for schema public"
   - Solution: Added explicit schema permissions with `GRANT ALL ON SCHEMA public TO $DB_USER;`

2. **Gunicorn Service Failure**
   - Error: Gunicorn service failing with status code 203/EXEC
   - Solution: Verified the executable path and permissions

3. **Nginx Configuration Issues**
   - Error: Duplicate location "/" in Nginx configuration
   - Solution: Removed duplicate location blocks

4. **Socket Communication Issues**
   - Error: Nginx couldn't connect to the Unix socket
   - Solution: Switched from Unix sockets to TCP sockets

## Key Changes Made

### 1. Database Configuration

Added explicit schema permissions:
```sql
GRANT ALL ON SCHEMA public TO infracorpuser;
ALTER USER infracorpuser CREATEDB;
```

### 2. Gunicorn Configuration

Changed from Unix socket to TCP socket:
```ini
# Before
ExecStart=/var/www/veeruengineering/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/var/www/veeruengineering/django_backend/django_backend.sock django_backend.wsgi:application

# After
ExecStart=/var/www/veeruengineering/django_backend/venv/bin/gunicorn --access-logfile - --workers 3 --bind 127.0.0.1:8000 django_backend.wsgi:application
```

### 3. Nginx Configuration

Updated proxy_pass to use TCP socket:
```nginx
# Before
proxy_pass http://unix:/var/www/veeruengineering/django_backend/django_backend.sock;

# After
proxy_pass http://127.0.0.1:8000;
```

## Deployment Scripts

The deployment scripts have been updated to incorporate these changes:

1. **deploy-veeruengineering.sh**
   - Now uses TCP sockets instead of Unix sockets
   - Includes proper database permissions
   - Has improved error handling with the `run_safe` function

2. **cleanup-database.sh**
   - Includes backup functionality before dropping the database
   - Terminates all connections to the database before dropping
   - Has improved error handling

## Future Deployments

For future deployments:

1. Always use the updated scripts that use TCP sockets
2. If you encounter permission issues with the database, run the cleanup script first
3. Check Nginx and Gunicorn logs if you encounter issues:
   ```bash
   # Nginx logs
   tail -f /var/log/nginx/error.log
   
   # Gunicorn logs
   journalctl -u gunicorn
   ```

## Testing Your Deployment

After deployment, use the test script to verify everything is working:
```bash
/var/www/veeruengineering/test-deployment.sh
```

This will check:
- Frontend accessibility
- API health
- Admin interface accessibility

## Common Issues and Solutions

### 1. 400 Bad Request Error

If you get a 400 Bad Request error:
- Check the Host header in Nginx configuration
- Verify ALLOWED_HOSTS in Django settings
- Check for duplicate location blocks in Nginx

### 2. 502 Bad Gateway Error

If you get a 502 Bad Gateway error:
- Check if Gunicorn is running: `systemctl status gunicorn`
- Verify the socket path or TCP port
- Check permissions on the project directory

### 3. Static Files Not Loading

If static files aren't loading:
- Check the STATIC_ROOT path in Django settings
- Verify the Nginx configuration for the static files location
- Run `python manage.py collectstatic` again

## Conclusion

The deployment is now working correctly with both the frontend and backend accessible. The key changes that resolved the issues were:

1. Switching from Unix sockets to TCP sockets for communication between Nginx and Gunicorn
2. Ensuring the correct environment variables are set for the frontend API client

## API URL Configuration Issue

If you encounter issues with the frontend not being able to fetch data from the API (e.g., "Failed to fetch" errors or "ERR_CONNECTION_REFUSED"), check the following:

1. **Environment Variables**: Make sure the correct environment variables are set in `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://api.veeruengineering.com/api
   NEXT_PUBLIC_API_BASE=https://api.veeruengineering.com/api
   ```

2. **API Client Configuration**: Check how the API URL is defined in the code:
   ```bash
   grep -r "localhost:8000" /var/www/veeruengineering/src/
   ```

3. **Rebuild After Changes**: Always rebuild the frontend after changing environment variables:
   ```bash
   cd /var/www/veeruengineering
   npm run build
   pm2 restart all
   ```

The frontend code uses `NEXT_PUBLIC_API_BASE` to determine the API URL, so this environment variable must be set correctly for the frontend to communicate with the backend API.