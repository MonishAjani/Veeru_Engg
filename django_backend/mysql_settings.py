# Import your original settings
from django_backend.settings import *

# Override database settings to use MySQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'veeru_django',  # Your Hostinger database name
        'USER': 'Monish_Ajani',  # Your Hostinger MySQL username
        'PASSWORD': 'Jfmamjjasond',  # Your Hostinger MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        },
    }
}

# Make sure to use the same DEBUG setting as your production environment
DEBUG = False

# Ensure ALLOWED_HOSTS includes your Hostinger domain
ALLOWED_HOSTS = ['api.veeruengineering.com', 'veeruengineering.com', 'localhost', '127.0.0.1']

# Static files settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS settings for API
CORS_ALLOWED_ORIGINS = [
    "https://veeruengineering.com",
    "https://www.veeruengineering.com",
    "http://localhost:3000"
]

# Make sure to replace the placeholders above with your actual MySQL credentials
# from your Hostinger database setup