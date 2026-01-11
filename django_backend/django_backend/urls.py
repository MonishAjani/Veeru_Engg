"""
URL configuration for django_backend project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .test_views import test_cors
from .health import health_check

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/services/', include('services.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/certificates/', include('certificates.urls')),
    path('api/', include('prestigious_projects.urls')),
    path('api/test-cors/', test_cors, name='test-cors'),
    path('health/', health_check, name='health_check'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
