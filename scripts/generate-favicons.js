/**
 * Favicon Generation Script
 * 
 * This script helps generate favicon files from the company logo.
 * It requires the 'sharp' image processing library.
 * 
 * Installation:
 * npm install --save-dev sharp
 * 
 * Usage:
 * node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_LOGO = path.join(__dirname, '../public/images/Veeru Infra Logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public');
const APP_DIR = path.join(__dirname, '../src/app');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(APP_DIR)) {
  fs.mkdirSync(APP_DIR, { recursive: true });
}

// Generate different sizes
async function generateFavicons() {
  try {
    console.log('Starting favicon generation...');
    
    // Generate icon-192.png
    await sharp(SOURCE_LOGO)
      .resize(192, 192)
      .toFile(path.join(OUTPUT_DIR, 'icon-192.png'));
    console.log('✅ Generated icon-192.png');
    
    // Generate icon-512.png
    await sharp(SOURCE_LOGO)
      .resize(512, 512)
      .toFile(path.join(OUTPUT_DIR, 'icon-512.png'));
    console.log('✅ Generated icon-512.png');
    
    // Generate app/icon.png for Next.js
    await sharp(SOURCE_LOGO)
      .resize(512, 512)
      .toFile(path.join(APP_DIR, 'icon.png'));
    console.log('✅ Generated app/icon.png');
    
    // Generate favicon.ico (32x32)
    // Note: Sharp doesn't directly support .ico format
    // For a real implementation, you would need to use a library like 'to-ico'
    // or instruct the user to convert the PNG to ICO using an online tool
    await sharp(SOURCE_LOGO)
      .resize(32, 32)
      .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
    console.log('✅ Generated favicon-32x32.png (convert this to favicon.ico)');
    
    console.log('\nFavicon generation complete!');
    console.log('\nIMPORTANT: You still need to convert favicon-32x32.png to favicon.ico');
    console.log('You can use an online tool like https://favicon.io/favicon-converter/');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();