from django.db import models

class Realization(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    body = models.TextField(null=True, blank=True, verbose_name='Описание')
    price = models.CharField(max_length=100, verbose_name='Цена/Стоимость', null=True, blank=True)
    image = models.ImageField(upload_to='realization_images', null=True, blank=True, verbose_name='Изображение')
    file = models.FileField(max_length=500, upload_to='realization_pdfs', null=True, blank=True, verbose_name='Файл (PDF)')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name = 'Реализация'
        verbose_name_plural = 'Реализация'
