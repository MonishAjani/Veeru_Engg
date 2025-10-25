from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PrestigiousProject
from .serializers import PrestigiousProjectSerializer

class PrestigiousProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing prestigious projects
    """
    queryset = PrestigiousProject.objects.filter(is_active=True)
    serializer_class = PrestigiousProjectSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at', 'updated_at']
    ordering = ['order', '-created_at']
    
    def get_queryset(self):
        """
        Return only active prestigious projects by default
        """
        return PrestigiousProject.objects.filter(is_active=True)
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """
        Get all active prestigious projects
        """
        projects = PrestigiousProject.objects.filter(is_active=True).order_by('order', '-created_at')
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
