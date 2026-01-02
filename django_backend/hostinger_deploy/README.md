# Veeru Engineering API Deployment Package

This package contains all the files needed to deploy the Veeru Engineering API to Hostinger using the PHP fallback method.

## Files Included

- **api.php**: The main API endpoint that provides access to the database
- **test.php**: A test file to verify PHP and SQLite are working
- **api_test.html**: An HTML tool to test API endpoints and CORS
- **index.php**: A welcome page with API documentation
- **db.sqlite3**: The SQLite database containing all your data
- **.htaccess**: Apache configuration for routing and CORS
- **.env**: Environment variables for the application

## Deployment Instructions

Please follow the detailed instructions in the `HOSTINGER_PHP_DEPLOYMENT.md` file for step-by-step guidance on deploying these files to Hostinger.

## Quick Start

1. Upload all files to your Hostinger subdomain directory (e.g., `public_html/api`)
2. Set file permissions:
   - `db.sqlite3`: 666 (rw-rw-rw-)
   - PHP files: 644 (rw-r--r--)
   - Media directory: 777 (rwxrwxrwx)
3. Visit your subdomain to verify the API is working:
   - Welcome page: `https://api.veeruengineering.com/`
   - Test PHP: `https://api.veeruengineering.com/test.php`
   - API test tool: `https://api.veeruengineering.com/api_test.html`
4. Update your frontend to use the API:
   - API base URL: `https://api.veeruengineering.com/api.php/api`

## API Endpoints

- `/api/services`: Get all services
- `/api/projects`: Get all projects
- `/api/certificates`: Get all certificates
- `/api/prestigious-projects`: Get all prestigious projects
- `/api/test-cors`: Test CORS configuration
- `/api/debug`: Get debug information

## Troubleshooting

If you encounter any issues:

1. Check the PHP error logs in Hostinger control panel
2. Verify file permissions are set correctly
3. Test the API using the included `api_test.html` tool
4. Make sure CORS is configured correctly for your frontend domain

## Support

If you need assistance, please refer to the detailed documentation in `HOSTINGER_PHP_DEPLOYMENT.md` or contact your developer for support.