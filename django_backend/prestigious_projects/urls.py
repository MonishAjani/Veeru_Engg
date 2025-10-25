from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PrestigiousProjectViewSet

router = DefaultRouter()
router.register(r'prestigious-projects', PrestigiousProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
