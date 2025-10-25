from django.contrib import admin
from django.utils.html import format_html
from .models import Project, ProjectImage

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ('image', 'caption', 'order', 'image_preview')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Preview'

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name_bold', 'location', 'work_preview', 'quantity', 'image_count')
    search_fields = ('name', 'location')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ProjectImageInline]
    fieldsets = (
        (None, {
            'fields': ('name', 'location', 'work', 'quantity')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def name_bold(self, obj):
        return format_html('<strong>{}</strong>', obj.name)
    def work_preview(self, obj):
        if obj.work and len(obj.work) > 50:
            return obj.work[:50] + '...'
        return obj.work or ""
    
    
    
    def image_count(self, obj):
        count = obj.images.count()
        return format_html('{} image{}', count, 's' if count != 1 else '')
    
    name_bold.short_description = 'Name'
    work_preview.short_description = 'Work'
    image_count.short_description = 'Images'

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'caption', 'order', 'image_preview')
    list_filter = ('project',)
    search_fields = ('project__name', 'caption')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Preview'
