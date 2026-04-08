from rest_framework import serializers
from .models import Realization

class RealizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realization
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        
        if request and request.parser_context['view'].action == 'list':
            # Удаляем тяжелые поля при просмотре списка лотов
            for field in ['body', 'body_ru', 'body_en', 'body_ky', 'file']:
                representation.pop(field, None)
        return representation
