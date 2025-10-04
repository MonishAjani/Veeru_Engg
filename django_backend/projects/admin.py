from django.contrib import admin
from django.utils.html import format_html
from .models import Project, LiveProject, CompletedProject

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_type', 'quantity', 'image_preview', 'created_at')
    list_filter = ('project_type',)
    search_fields = ('name', 'details')
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    fieldsets = (
        (None, {
            'fields': ('name', 'project_type', 'quantity')
        }),
        ('Content', {
            'fields': ('details', 'image', 'image_preview')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Image Preview'

@admin.register(LiveProject)
class LiveProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'location', 'image_preview', 'created_at')
    search_fields = ('name', 'details', 'location')
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    fieldsets = (
        (None, {
            'fields': ('name', 'quantity', 'location')
        }),
        ('Content', {
            'fields': ('details', 'image', 'image_preview')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Image Preview'

@admin.register(CompletedProject)
class CompletedProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'client', 'completion_date', 'image_preview', 'created_at')
    search_fields = ('name', 'details', 'client')
    readonly_fields = ('created_at', 'updated_at', 'image_preview')
    fieldsets = (
        (None, {
            'fields': ('name', 'quantity', 'client', 'completion_date')
        }),
        ('Content', {
            'fields': ('details', 'image', 'image_preview')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Image Preview'
