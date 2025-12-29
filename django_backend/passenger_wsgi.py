import os
import sys

# Add your project directory to the sys.path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

# Set environment variables
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_backend.settings")

# Import the Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()