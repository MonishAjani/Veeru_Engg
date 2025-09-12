from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows projects to be viewed or edited.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """
        Optionally filter projects by project_type.
        """
        queryset = Project.objects.all()
        project_type = self.request.query_params.get('project_type', None)
        if project_type is not None:
            queryset = queryset.filter(project_type=project_type)
        return queryset
