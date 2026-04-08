from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import RealizationViewSet

router = DefaultRouter()
router.register('', RealizationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
