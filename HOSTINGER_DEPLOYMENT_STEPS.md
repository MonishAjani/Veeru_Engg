# Hostinger Deployment Steps

Follow these steps to deploy your Next.js application on Hostinger:

## Step 1: Prepare Your Files

You've already completed these steps:
- ✅ Moved the images folder to the correct location
- ✅ Run `npm run build` locally
- ✅ Created server.js file
- ✅ Created .htaccess file

## Step 2: Upload Files to Hostinger

1. Log in to your Hostinger account
2. Go to File Manager
3. Navigate to your `public_html` directory
4. Upload the following files/folders:
   - `.next` folder (contains your compiled application)
   - `public` folder (contains static assets)
   - `server.js` file
   - `.htaccess` file
   - `package.json` file
   - `next.config.js` file

   **Note**: For large folders like `.next`, you may need to:
   - Zip the folder locally
   - Upload the zip file
   - Extract it on the server

## Step 3: Configure Node.js on Hostinger

1. In your Hostinger dashboard, go to "Advanced" → "Node.js"
2. Enable Node.js for your domain
3. Configure it with these settings:
   - Application URL: Your domain (veeruengineering.com)
   - Application root: `/public_html`
   - Application startup file: `server.js`
   - Node.js version: Select the latest stable version (14.x or higher)
4. Click "Save" or "Apply"

## Step 4: Install Dependencies

If your Hostinger plan supports SSH:
1. Connect via SSH
2. Navigate to `public_html`
3. Run `npm install --production`

If SSH is not available:
1. Run `npm install --production` locally
2. Zip your `node_modules` folder
3. Upload the zip to your server
4. Extract it in the `public_html` directory

## Step 5: Verify Your Setup

1. Make sure your images are in the correct location:
   - They should be in `public_html/images/`
   - Not in `public_html/public/images/`

2. Check that your Node.js application is running:
   - In Hostinger dashboard, the Node.js status should be "Running"

3. Visit your website and check if images are loading

## Troubleshooting

If images still don't load:
1. Check browser console for specific error paths
2. Verify image paths in your code match the actual file paths on server
3. Check file permissions (files should be readable)
4. Clear your browser cache completely

If the Node.js application doesn't start:
1. Check Hostinger's Node.js logs for errors
2. Verify all required files are uploaded
3. Make sure dependencies are installed correctly

## Need More Help?

If you encounter specific issues during deployment, note down:
1. The exact error message
2. Which step you're stuck on
3. Any relevant logs or screenshots

This will help in providing more targeted assistance.