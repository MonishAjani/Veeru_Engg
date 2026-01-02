import os
import sys

# Add your project directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Set environment variables
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_backend.settings")
os.environ.setdefault("DATABASE_ENGINE", "django.db.backends.sqlite3")
os.environ.setdefault("DATABASE_NAME", "db.sqlite3")

# Import the Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Print debug information to the error log
print("Python version:", sys.version)
print("Current directory:", os.getcwd())
print("Django settings module:", os.environ.get("DJANGO_SETTINGS_MODULE"))
print("Database engine:", os.environ.get("DATABASE_ENGINE"))
print("Database name:", os.environ.get("DATABASE_NAME"))