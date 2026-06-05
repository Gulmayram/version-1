from rest_framework import serializers
from .models import Vacancies


class VacanciesSerializer(serializers.ModelSerializer):
    short_body = serializers.SerializerMethodField()

    class Meta:
        model = Vacancies
        fields = [
            'id',
            'title',
            'selery',
            'short_body',
            'body',
            'file',
            'created_at',
            'updated_at',
        ]

    def get_short_body(self, obj):
        if not obj.body:
            return ""
        return obj.body[:120]
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if request:
            view = request.parser_context.get('view', None)
            action = getattr(view, 'action', None)

            if action == 'list':
                # лёгкий список вакансий
                representation.pop('body', None)
                representation.pop('file', None)
                representation.pop('created_at', None)
                representation.pop('updated_at', None)

        return representation
