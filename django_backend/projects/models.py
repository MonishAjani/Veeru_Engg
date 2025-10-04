from django.db import models

class BaseProject(models.Model):
    """
    Abstract base class for all project types
    """
    name = models.CharField(max_length=200)
    details = models.TextField()
    quantity = models.CharField(max_length=100)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name

class LiveProject(BaseProject):
    """
    Model for ongoing/live projects
    """
    location = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Live Project'
        verbose_name_plural = 'Live Projects'

class CompletedProject(BaseProject):
    """
    Model for completed projects
    """
    completion_date = models.DateField(blank=True, null=True)
    client = models.CharField(max_length=200, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Completed Project'
        verbose_name_plural = 'Completed Projects'

# Keep the original Project model for backward compatibility
class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('live', 'Live'),
        ('completed', 'Completed'),
    ]
    
    name = models.CharField(max_length=200)
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPE_CHOICES, default='completed')
    details = models.TextField()
    quantity = models.CharField(max_length=100)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Project (Legacy)'
        verbose_name_plural = 'Projects (Legacy)'
    
    def __str__(self):
        return self.name
