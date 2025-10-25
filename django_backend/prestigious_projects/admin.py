from django.contrib import admin
from .models import PrestigiousProject

@admin.register(PrestigiousProject)
class PrestigiousProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'quantity']
    search_fields = ['name', 'location']
    
    fieldsets = (
        ('Project Information', {
            'fields': ('name', 'location', 'quantity')
        }),
        ('Image', {
            'fields': ('image',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at']
    
    readonly_fields = ['created_at', 'updated_at']
