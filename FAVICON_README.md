# Favicon Implementation for InfraCorp

## Overview

This document explains the changes made to replace the default React logo in the browser tab with the company logo.

## Changes Made

1. **Updated Metadata Configuration**
   - Modified `src/app/layout.tsx` to include comprehensive favicon metadata
   - Added proper icon references for different devices and browsers

2. **Created Web App Manifest**
   - Added `public/manifest.json` for PWA support and home screen icons
   - Configured icons for different sizes and devices

3. **Added Favicon Generation Script**
   - Created `scripts/generate-favicons.js` to automate icon generation
   - Added npm script `generate-favicons` in package.json

4. **Added Detailed Instructions**
   - Created `src/app/FAVICON_INSTRUCTIONS.md` with step-by-step guidance
   - Included both automatic and manual methods for favicon generation

## How It Works

The implementation uses Next.js 13+ metadata API to define favicons and app icons. When a user visits the website:

1. Browsers will use the specified favicon.ico for the tab icon
2. Mobile devices will use the appropriate sized icons when added to home screen
3. The web app manifest provides additional metadata for PWA functionality

## Required Files

For the favicon to work properly, the following files need to be created:

- `public/favicon.ico` (32x32 pixels)
- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)
- `src/app/icon.png` (512x512 pixels)

These files can be generated using the provided script or created manually following the instructions.

## Testing

After deployment, verify that:
1. The browser tab shows the company logo instead of the default React logo
2. The favicon appears correctly on different browsers and devices
3. The website icon appears correctly when added to home screens on mobile devices