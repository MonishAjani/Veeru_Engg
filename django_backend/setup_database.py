#!/usr/bin/env python
"""
Database Setup Script for Django on Hostinger

This script helps set up your database on Hostinger by:
1. Loading environment variables
2. Creating database tables (running migrations)
3. Creating a superuser (optional)
4. Loading initial data (optional)

Usage:
python setup_database.py

Make sure to set up your .env file first with proper database credentials.
"""

import os
import sys
import django
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_backend.settings")
django.setup()

def setup_database():
    """Run database migrations and setup"""
    from django.core.management import call_command
    
    print("Setting up database...")
    
    # Run migrations
    print("\n1. Running migrations...")
    call_command('migrate')
    
    # Collect static files
    print("\n2. Collecting static files...")
    call_command('collectstatic', '--noinput')
    
    # Create superuser if needed
    create_superuser = input("\n3. Do you want to create a superuser? (y/n): ")
    if create_superuser.lower() == 'y':
        from django.contrib.auth.models import User
        username = input("   Enter username: ")
        email = input("   Enter email: ")
        password = input("   Enter password: ")
        
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            print(f"   Superuser '{username}' created successfully!")
        else:
            print(f"   User '{username}' already exists.")
    
    # Load sample data if needed
    load_sample_data = input("\n4. Do you want to load sample data? (y/n): ")
    if load_sample_data.lower() == 'y':
        try:
            # Try to load sample data from projects app
            print("   Loading sample projects...")
            call_command('add_sample_projects')
            print("   Sample projects loaded successfully!")
        except Exception as e:
            print(f"   Error loading sample data: {e}")
    
    print("\nDatabase setup completed!")

if __name__ == "__main__":
    setup_database()