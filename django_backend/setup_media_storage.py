"""
Script to set up media file storage for Render deployment.

This script helps configure Django to use AWS S3 or a similar service for media file storage.
Run this script after deploying to Render to set up proper media file handling.

Usage:
    python setup_media_storage.py

Requirements:
    - django-storages
    - boto3
"""

import os
import sys
import subprocess
import django
from django.conf import settings

def check_dependencies():
    """Check if required packages are installed."""
    try:
        import storages
        import boto3
        print("✅ Required packages are installed.")
        return True
    except ImportError:
        print("❌ Missing required packages.")
        print("Installing django-storages and boto3...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "django-storages", "boto3"])
        print("✅ Packages installed successfully.")
        return True

def setup_s3_storage():
    """Configure Django to use S3 for media storage."""
    # Set up Django environment
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')
    django.setup()
    
    # Check if S3 is already configured
    if hasattr(settings, 'DEFAULT_FILE_STORAGE') and settings.DEFAULT_FILE_STORAGE == 'storages.backends.s3boto3.S3Boto3Storage':
        print("✅ S3 storage is already configured.")
        return
    
    # Check for required environment variables
    required_vars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_STORAGE_BUCKET_NAME']
    missing_vars = [var for var in required_vars if not os.environ.get(var)]
    
    if missing_vars:
        print(f"❌ Missing required environment variables: {', '.join(missing_vars)}")
        print("\nPlease set the following environment variables in your Render dashboard:")
        for var in missing_vars:
            print(f"  - {var}")
        print("\nThen run this script again.")
        return
    
    # Update settings.py to use S3 for media storage
    settings_path = os.path.join(settings.BASE_DIR, 'django_backend', 'settings.py')
    
    with open(settings_path, 'r') as f:
        settings_content = f.read()
    
    # Check if S3 settings are already in the file
    if 'DEFAULT_FILE_STORAGE = \'storages.backends.s3boto3.S3Boto3Storage\'' in settings_content:
        print("✅ S3 settings are already in settings.py.")
        return
    
    # Add S3 settings to settings.py
    s3_settings = """
# AWS S3 settings for media files
if 'AWS_ACCESS_KEY_ID' in os.environ:
    INSTALLED_APPS += ['storages']
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME', 'us-east-1')
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/'
    AWS_DEFAULT_ACL = 'public-read'
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
    }
"""
    
    # Add S3 settings before the last line
    settings_content = settings_content.rstrip() + s3_settings + "\n"
    
    with open(settings_path, 'w') as f:
        f.write(settings_content)
    
    print("✅ S3 settings added to settings.py.")
    print("✅ Media storage configuration complete.")
    print("\nNow add the following environment variables to your Render dashboard:")
    print("  - AWS_ACCESS_KEY_ID")
    print("  - AWS_SECRET_ACCESS_KEY")
    print("  - AWS_STORAGE_BUCKET_NAME")
    print("  - AWS_S3_REGION_NAME (optional, defaults to us-east-1)")

def main():
    """Main function."""
    print("Setting up media storage for Render deployment...\n")
    
    if check_dependencies():
        setup_s3_storage()
    
    print("\nDone!")

if __name__ == "__main__":
    main()