#!/bin/bash
# Script to clean up PostgreSQL database and user before deployment
# Includes option to backup the database before dropping it

# Configuration variables
DB_NAME="infracorp"
DB_USER="infracorpuser"
BACKUP_DIR="/var/backups/infracorp"
CREATE_BACKUP=true  # Set to false to skip backup

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo -e "\n${GREEN}==== $1 ====${NC}\n"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}WARNING: $1${NC}"
}

# Function to print errors
print_error() {
    echo -e "${RED}ERROR: $1${NC}"
}

# Function to run a command and continue even if it fails
run_safe() {
    "$@" || {
        local exit_code=$?
        echo -e "${YELLOW}Command failed with exit code $exit_code, but continuing...${NC}"
        return 0
    }
}

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    print_error "This script must be run as root"
    exit 1
fi

print_section "Cleaning up PostgreSQL database and user"

# Create backup if enabled
if [ "$CREATE_BACKUP" = true ]; then
    print_section "Creating database backup"
    
    # Create backup directory if it doesn't exist
    mkdir -p $BACKUP_DIR
    
    # Get current date for backup filename
    DATE=$(date +%Y-%m-%d_%H-%M-%S)
    BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${DATE}.sql"
    
    # Check if database exists before backing up
    if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
        echo "Backing up database $DB_NAME to $BACKUP_FILE..."
        run_safe sudo -u postgres pg_dump $DB_NAME > $BACKUP_FILE
        
        # Compress the backup
        echo "Compressing backup..."
        run_safe gzip -f $BACKUP_FILE
        
        echo "Backup created at ${BACKUP_FILE}.gz"
    else
        print_warning "Database $DB_NAME does not exist. Skipping backup."
    fi
fi

# Terminate all connections to the database
echo "Terminating all connections to database $DB_NAME..."
run_safe sudo -u postgres psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"

# Drop database if it exists
echo "Dropping database $DB_NAME if it exists..."
run_safe sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Drop user if it exists
echo "Dropping user $DB_USER if it exists..."
run_safe sudo -u postgres psql -c "DROP USER IF EXISTS $DB_USER;"

print_section "Cleanup completed"
echo "You can now run the deployment script again."

if [ "$CREATE_BACKUP" = true ]; then
    echo "A backup of your database was created before dropping it."
    echo "You can find it at: ${BACKUP_FILE}.gz (if the database existed)"
fi

print_section "Important Note"
echo "The deployment script has been updated to use TCP sockets (127.0.0.1:8000) instead of Unix sockets."
echo "This configuration has been proven to work better with your server setup."
echo "If you encounter any issues, please refer to the updated deployment script."

exit 0