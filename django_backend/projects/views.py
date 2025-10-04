from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Project, LiveProject, CompletedProject
from .serializers import ProjectSerializer, LiveProjectSerializer, CompletedProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows legacy projects to be viewed or edited.
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
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class LiveProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows live projects to be viewed or edited.
    """
    queryset = LiveProject.objects.all()
    serializer_class = LiveProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class CompletedProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows completed projects to be viewed or edited.
    """
    queryset = CompletedProject.objects.all()
    serializer_class = CompletedProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
