#!/bin/bash
# Test script to verify the deployment of InfraCorp on Hostinger KVM 2

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

# Function to print success
print_success() {
    echo -e "${GREEN}SUCCESS: $1${NC}"
}

# Check if domain is provided
if [ -z "$1" ]; then
    print_error "Please provide your domain name as an argument"
    echo "Usage: ./test-deployment.sh yourdomain.com"
    exit 1
fi

DOMAIN=$1
API_SUBDOMAIN="api"

print_section "Testing InfraCorp Deployment"

# Test frontend
print_section "Testing Frontend"
FRONTEND_URL="https://$DOMAIN"
echo "Testing frontend at $FRONTEND_URL"

FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [ $FRONTEND_STATUS -eq 200 ]; then
    print_success "Frontend is accessible (HTTP 200)"
else
    print_error "Frontend returned HTTP $FRONTEND_STATUS"
fi

# Test API
print_section "Testing API"
API_URL="https://$API_SUBDOMAIN.$DOMAIN/health/"
echo "Testing API health at $API_URL"

API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ $API_STATUS -eq 200 ]; then
    print_success "API health check is accessible (HTTP 200)"
    
    # Get detailed health check response
    HEALTH_RESPONSE=$(curl -s $API_URL)
    echo "Health check response:"
    echo $HEALTH_RESPONSE
else
    print_error "API health check returned HTTP $API_STATUS"
fi

# Test API endpoints
print_section "Testing API Endpoints"

# Test services endpoint
SERVICES_URL="https://$API_SUBDOMAIN.$DOMAIN/api/services/"
echo "Testing services endpoint at $SERVICES_URL"

SERVICES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $SERVICES_URL)
if [ $SERVICES_STATUS -eq 200 ]; then
    print_success "Services endpoint is accessible (HTTP 200)"
else
    print_error "Services endpoint returned HTTP $SERVICES_STATUS"
fi

# Test projects endpoint
PROJECTS_URL="https://$API_SUBDOMAIN.$DOMAIN/api/projects/"
echo "Testing projects endpoint at $PROJECTS_URL"

PROJECTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $PROJECTS_URL)
if [ $PROJECTS_STATUS -eq 200 ]; then
    print_success "Projects endpoint is accessible (HTTP 200)"
else
    print_error "Projects endpoint returned HTTP $PROJECTS_STATUS"
fi

# Test certificates endpoint
CERTIFICATES_URL="https://$API_SUBDOMAIN.$DOMAIN/api/certificates/"
echo "Testing certificates endpoint at $CERTIFICATES_URL"

CERTIFICATES_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $CERTIFICATES_URL)
if [ $CERTIFICATES_STATUS -eq 200 ]; then
    print_success "Certificates endpoint is accessible (HTTP 200)"
else
    print_error "Certificates endpoint returned HTTP $CERTIFICATES_STATUS"
fi

# Test admin interface
print_section "Testing Admin Interface"
ADMIN_URL="https://$API_SUBDOMAIN.$DOMAIN/admin/"
echo "Testing admin interface at $ADMIN_URL"

ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $ADMIN_URL)
if [ $ADMIN_STATUS -eq 200 ] || [ $ADMIN_STATUS -eq 302 ]; then
    print_success "Admin interface is accessible (HTTP $ADMIN_STATUS)"
else
    print_error "Admin interface returned HTTP $ADMIN_STATUS"
fi

# Summary
print_section "Deployment Test Summary"

if [ $FRONTEND_STATUS -eq 200 ] && [ $API_STATUS -eq 200 ] && [ $SERVICES_STATUS -eq 200 ] && [ $PROJECTS_STATUS -eq 200 ] && [ $CERTIFICATES_STATUS -eq 200 ] && ([ $ADMIN_STATUS -eq 200 ] || [ $ADMIN_STATUS -eq 302 ]); then
    print_success "All tests passed! The deployment appears to be successful."
    echo "Frontend: $FRONTEND_URL"
    echo "API: https://$API_SUBDOMAIN.$DOMAIN"
    echo "Admin: $ADMIN_URL"
else
    print_warning "Some tests failed. Please check the logs above for details."
    echo "You may need to troubleshoot the deployment."
fi

exit 0