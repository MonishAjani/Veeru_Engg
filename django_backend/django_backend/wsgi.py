"""
WSGI config for django_backend project.
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

# Determine if we're in production mode
is_production = os.environ.get('DJANGO_ENV') == 'production'

# Set the settings module based on environment
if is_production:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings_prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')

# Add the project directory to the Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

application = get_wsgi_application()