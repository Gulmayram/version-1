from modeltranslation.translator import register, TranslationOptions
from .models import Realization

@register(Realization)
class RealizationTranslationOptions(TranslationOptions):
    fields = ('title', 'body')
