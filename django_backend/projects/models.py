from django.db import models

class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ('live', 'Live'),
        ('completed', 'Completed'),
    ]
    
    name = models.CharField(max_length=200)
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPE_CHOICES, default='completed')
    details = models.TextField()
    quantity = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return self.name
