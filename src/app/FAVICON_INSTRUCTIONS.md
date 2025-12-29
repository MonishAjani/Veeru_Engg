# Favicon Setup Instructions

## What's Been Done

1. Updated `layout.tsx` with comprehensive favicon metadata
2. Created `manifest.json` in the public directory
3. Set up proper icon references in the metadata
4. Created a script to generate favicon files

## Automatic Generation (Recommended)

1. Install the required dependency:
   ```bash
   npm install --save-dev sharp
   ```

2. Run the favicon generation script:
   ```bash
   npm run generate-favicons
   ```

3. Convert the generated `favicon-32x32.png` to `favicon.ico` using an online tool like [favicon.io](https://favicon.io/favicon-converter/)

## Manual Generation (Alternative)

If the script doesn't work, you can manually create optimized versions of your logo:

1. Copy and resize the logo file from `public/images/Veeru Infra Logo.png` to the following locations:
   - `infra-corp/public/favicon.ico` (32x32 pixels for traditional favicon support)
   - `infra-corp/public/icon-192.png` (192x192 pixels)
   - `infra-corp/public/icon-512.png` (512x512 pixels)
   - `infra-corp/src/app/icon.png` (512x512 pixels for Next.js 13+ automatic favicon generation)

2. Use an online tool like [favicon.io](https://favicon.io) to convert your PNG logo to the appropriate favicon formats.

## Verification

After deployment, verify that:
1. The browser tab shows your company logo instead of the default React logo
2. The favicon appears correctly on different browsers and devices
3. The website icon appears correctly when added to home screens on mobile devices

The metadata configuration in layout.tsx and manifest.json have already been updated to use your logo as the favicon.