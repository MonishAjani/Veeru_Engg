from rest_framework import serializers
from .models import PrestigiousProject

class PrestigiousProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PrestigiousProject
        fields = [
            'id', 'name', 'details', 'quantity', 'location', 'client',
            'image', 'image_url', 'order', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
