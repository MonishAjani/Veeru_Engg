#!/usr/bin/env python
"""
Prepare Django Backend for Hostinger Deployment

This script prepares your Django backend for deployment to Hostinger using the PHP fallback method.
It creates a ZIP file with all the necessary files.

Usage:
    python prepare_for_hostinger.py
"""

import os
import sys
import shutil
import zipfile
from datetime import datetime

# Configuration
OUTPUT_DIR = "hostinger_deploy"
ZIP_FILENAME = f"hostinger_deploy_{datetime.now().strftime('%Y%m%d_%H%M%S')}.zip"
REQUIRED_FILES = [
    "api.php",
    "test.php",
    "api_test.html",
    "index.php",
    "db.sqlite3",
    ".env",
    "simple.htaccess",  # Will be renamed to .htaccess
    "DEPLOYMENT_README.md",  # Will be renamed to README.md
    "FRONTEND_UPDATE_GUIDE.md",
    "HOSTINGER_PHP_DEPLOYMENT.md",
]
DIRECTORIES_TO_INCLUDE = [
    "media",
    "staticfiles",
]

def print_colored(text, color_code):
    """Print colored text to the console."""
    print(f"\033[{color_code}m{text}\033[0m")

def print_success(text):
    """Print success message."""
    print_colored(text, "92")  # Green

def print_info(text):
    """Print info message."""
    print_colored(text, "94")  # Blue

def print_warning(text):
    """Print warning message."""
    print_colored(text, "93")  # Yellow

def print_error(text):
    """Print error message."""
    print_colored(text, "91")  # Red

def check_required_files():
    """Check if all required files exist."""
    missing_files = []
    for file in REQUIRED_FILES:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print_error(f"Missing required files: {', '.join(missing_files)}")
        return False
    
    return True

def create_output_directory():
    """Create output directory if it doesn't exist."""
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    
    os.makedirs(OUTPUT_DIR)
    print_info(f"Created output directory: {OUTPUT_DIR}")

def copy_files_to_output():
    """Copy required files to output directory."""
    for file in REQUIRED_FILES:
        if file == "simple.htaccess":
            # Rename simple.htaccess to .htaccess
            shutil.copy(file, os.path.join(OUTPUT_DIR, ".htaccess"))
            print_info(f"Copied {file} to {OUTPUT_DIR}/.htaccess")
        elif file == "DEPLOYMENT_README.md":
            # Rename DEPLOYMENT_README.md to README.md
            shutil.copy(file, os.path.join(OUTPUT_DIR, "README.md"))
            print_info(f"Copied {file} to {OUTPUT_DIR}/README.md")
        else:
            shutil.copy(file, OUTPUT_DIR)
            print_info(f"Copied {file} to {OUTPUT_DIR}")

def copy_directories():
    """Copy required directories to output directory."""
    for directory in DIRECTORIES_TO_INCLUDE:
        if os.path.exists(directory):
            dest_dir = os.path.join(OUTPUT_DIR, directory)
            if os.path.exists(dest_dir):
                shutil.rmtree(dest_dir)
            shutil.copytree(directory, dest_dir)
            print_info(f"Copied directory {directory} to {OUTPUT_DIR}")
        else:
            print_warning(f"Directory {directory} not found, creating empty directory")
            os.makedirs(os.path.join(OUTPUT_DIR, directory))

def create_zip_file():
    """Create a ZIP file with all the files."""
    with zipfile.ZipFile(ZIP_FILENAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(OUTPUT_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, OUTPUT_DIR)
                zipf.write(file_path, arcname)
    
    print_success(f"Created ZIP file: {ZIP_FILENAME}")

def main():
    """Main function."""
    print_info("Preparing Django backend for Hostinger deployment...")
    
    if not check_required_files():
        print_error("Aborting due to missing files.")
        return
    
    create_output_directory()
    copy_files_to_output()
    copy_directories()
    create_zip_file()
    
    print_success("Deployment preparation completed successfully!")
    print_info(f"Upload the {ZIP_FILENAME} file to your Hostinger subdomain directory.")
    print_info("After uploading, extract the ZIP file on the server.")
    print_info("Then update your frontend to use the new API URL: https://api.veeruengineering.com/api.php/api")

if __name__ == "__main__":
    main()