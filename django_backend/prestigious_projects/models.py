from django.db import models

class PrestigiousProject(models.Model):
    """
    Model for prestigious projects showcased on the homepage
    """
    name = models.CharField(max_length=200, help_text="Project name")
    details = models.TextField(help_text="Project description")
    quantity = models.CharField(max_length=100, blank=True, help_text="Project quantity/scale")
    location = models.CharField(max_length=200, blank=True, help_text="Project location")
    client = models.CharField(max_length=200, blank=True, help_text="Client name")
    image = models.ImageField(upload_to='prestigious_projects/', blank=True, null=True, help_text="Project image")
    order = models.IntegerField(default=0, help_text="Display order (lower numbers appear first)")
    is_active = models.BooleanField(default=True, help_text="Show on homepage")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Prestigious Project'
        verbose_name_plural = 'Prestigious Projects'
    
    def __str__(self):
        return self.name
