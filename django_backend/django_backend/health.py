from django.http import JsonResponse
from django.db import connections
from django.db.utils import OperationalError
from django.views.decorators.cache import never_cache
from django.conf import settings
import os
import time
import logging

logger = logging.getLogger(__name__)

@never_cache
def health_check(request):
    """
    Health check endpoint for monitoring the application.
    Returns:
        JsonResponse: Status of the application and its dependencies.
    """
    start_time = time.time()
    
    # Check database connection
    db_status = "ok"
    db_error = None
    try:
        # Try to get a cursor from the database
        db_conn = connections['default']
        db_conn.cursor()
    except OperationalError as e:
        db_status = "error"
        db_error = str(e)
        logger.error(f"Database health check failed: {e}")
    
    # Check media directory
    media_status = "ok"
    media_error = None
    if hasattr(settings, 'MEDIA_ROOT'):
        if not os.path.exists(settings.MEDIA_ROOT):
            try:
                os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
            except Exception as e:
                media_status = "error"
                media_error = str(e)
                logger.error(f"Media directory health check failed: {e}")
    
    # Check static directory
    static_status = "ok"
    static_error = None
    if hasattr(settings, 'STATIC_ROOT'):
        if not os.path.exists(settings.STATIC_ROOT):
            try:
                os.makedirs(settings.STATIC_ROOT, exist_ok=True)
            except Exception as e:
                static_status = "error"
                static_error = str(e)
                logger.error(f"Static directory health check failed: {e}")
    
    # Overall status
    overall_status = "ok"
    if db_status == "error" or media_status == "error" or static_status == "error":
        overall_status = "error"
    
    # Response data
    response_data = {
        "status": overall_status,
        "timestamp": time.time(),
        "response_time_ms": int((time.time() - start_time) * 1000),
        "environment": os.environ.get("DJANGO_ENV", "development"),
        "components": {
            "database": {
                "status": db_status,
                "error": db_error
            },
            "media": {
                "status": media_status,
                "error": media_error
            },
            "static": {
                "status": static_status,
                "error": static_error
            }
        }
    }
    
    # Return response with appropriate status code
    status_code = 200 if overall_status == "ok" else 500
    return JsonResponse(response_data, status=status_code)