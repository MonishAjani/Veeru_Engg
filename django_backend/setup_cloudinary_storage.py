"""
Script to set up Cloudinary media file storage for Render deployment.

This script helps configure Django to use Cloudinary for media file storage.
Run this script after deploying to Render to set up proper media file handling.

Usage:
    python setup_cloudinary_storage.py

Requirements:
    - django-cloudinary-storage
    - cloudinary
"""

import os
import sys
import subprocess
import django
from django.conf import settings

def check_dependencies():
    """Check if required packages are installed."""
    try:
        import cloudinary
        import cloudinary_storage
        print("✅ Required packages are installed.")
        return True
    except ImportError:
        print("❌ Missing required packages.")
        print("Installing django-cloudinary-storage and cloudinary...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "django-cloudinary-storage", "cloudinary"])
        print("✅ Packages installed successfully.")
        return True

def setup_cloudinary_storage():
    """Configure Django to use Cloudinary for media storage."""
    # Set up Django environment
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')
    django.setup()
    
    # Check if Cloudinary is already configured
    if hasattr(settings, 'DEFAULT_FILE_STORAGE') and settings.DEFAULT_FILE_STORAGE == 'cloudinary_storage.storage.MediaCloudinaryStorage':
        print("✅ Cloudinary storage is already configured.")
        return
    
    # Check for required environment variables
    required_vars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']
    missing_vars = [var for var in required_vars if not os.environ.get(var)]
    
    if missing_vars:
        print(f"❌ Missing required environment variables: {', '.join(missing_vars)}")
        print("\nPlease set the following environment variables in your Render dashboard:")
        for var in missing_vars:
            print(f"  - {var}")
        print("\nThen run this script again.")
        return
    
    # Update settings.py to use Cloudinary for media storage
    settings_path = os.path.join(settings.BASE_DIR, 'django_backend', 'settings.py')
    
    with open(settings_path, 'r') as f:
        settings_content = f.read()
    
    # Check if Cloudinary settings are already in the file
    if 'DEFAULT_FILE_STORAGE = \'cloudinary_storage.storage.MediaCloudinaryStorage\'' in settings_content:
        print("✅ Cloudinary settings are already in settings.py.")
        return
    
    # Add Cloudinary settings to settings.py
    cloudinary_settings = """
# Cloudinary settings for media files
if 'CLOUDINARY_CLOUD_NAME' in os.environ:
    INSTALLED_APPS += [
        'cloudinary',
        'cloudinary_storage',
    ]
    CLOUDINARY_STORAGE = {
        'CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME'),
        'API_KEY': os.environ.get('CLOUDINARY_API_KEY'),
        'API_SECRET': os.environ.get('CLOUDINARY_API_SECRET'),
    }
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    MEDIA_URL = '/media/'  # Cloudinary will handle the actual URL
"""
    
    # Add Cloudinary settings before the last line
    settings_content = settings_content.rstrip() + cloudinary_settings + "\n"
    
    with open(settings_path, 'w') as f:
        f.write(settings_content)
    
    print("✅ Cloudinary settings added to settings.py.")
    print("✅ Media storage configuration complete.")
    print("\nNow add the following environment variables to your Render dashboard:")
    print("  - CLOUDINARY_CLOUD_NAME")
    print("  - CLOUDINARY_API_KEY")
    print("  - CLOUDINARY_API_SECRET")

def main():
    """Main function."""
    print("Setting up Cloudinary media storage for Render deployment...\n")
    
    if check_dependencies():
        setup_cloudinary_storage()
    
    print("\nDone!")

if __name__ == "__main__":
    main()