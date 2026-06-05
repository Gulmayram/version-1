from django.db import models
from rest_framework import serializers
from .models import Vacancies
from django.utils.html import strip_tags


class VacanciesListSerializer(serializers.ModelSerializer):
    short_body = serializers.SerializerMethodField()

    class Meta:
        model = Vacancies
        fields = ["id", "title", "selery", "short_body"]

    def get_short_body(self, obj):
        if not obj.body:
            return ""
        return strip_tags(obj.body)[:120]
        
# Create your models here.
class Vacancies(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название')
    body = models.TextField(null=True, blank=True, verbose_name='Описание')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    selery = models.FloatField(max_length=20, verbose_name='Зарплата', null=True, blank=True)
    file = models.FileField(max_length=500, upload_to='pdfs', null=True, blank=True, verbose_name='Файл')

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'
