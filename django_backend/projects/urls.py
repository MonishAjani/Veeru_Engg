from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, LiveProjectViewSet, CompletedProjectViewSet

router = DefaultRouter()
router.register(r'legacy', ProjectViewSet, basename='legacy-project')
router.register(r'live', LiveProjectViewSet, basename='live-project')
router.register(r'completed', CompletedProjectViewSet, basename='completed-project')
router.register(r'', ProjectViewSet, basename='project')  # Keep this for backward compatibility

urlpatterns = [
    path('', include(router.urls)),
]