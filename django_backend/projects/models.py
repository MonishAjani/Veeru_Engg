from django.db import models

class Project(models.Model):
    """
    Model for all projects to be displayed on the projects page
    """
    name = models.CharField(max_length=200, help_text="Project name (will be shown in bold)")
    location = models.CharField(max_length=200, blank=True, null=True, help_text="Project location")
    work = models.TextField(blank=True, null=True, help_text="Type of work performed")
    quantity = models.CharField(max_length=100, help_text="Project quantity")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return self.name
    
    @property
    def main_image(self):
        """Return the first image of the project or None if no images"""
        image = self.images.first()
        return image if image else None

class ProjectImage(models.Model):
    """
    Model for project images
    """
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/', help_text="Project image")
    caption = models.CharField(max_length=200, blank=True, null=True, help_text="Image caption")
    order = models.PositiveIntegerField(default=0, help_text="Order of the image in the project gallery")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Project Image'
        verbose_name_plural = 'Project Images'
    
    def __str__(self):
        return f"Image for {self.project.name}"
