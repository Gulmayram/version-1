"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.conf.urls.i18n import i18n_patterns
from maps.models import Maps, NewMaps
from maps.views import MapsCustomGeoJSONLayerView, NewMapsCustomGeoJSONLayerView

schema_view = get_schema_view(
    openapi.Info(
        title="KyrgyzGeologia",
        description="mini service for posting your life",
        default_version="v1",
    ),
    public=True
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('jazzmin/', include('jazzmin.urls')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('api/home/', include('home.urls')),
    path('api/news/', include('news.urls')),
    path('api/ckeditor/', include('ckeditor_uploader.urls')),
    path('api/tinymce/', include('tinymce.urls')),
    path('api/i18n/', include('django.conf.urls.i18n')),
    path('api/upload_image/', include('upload_image.urls')),
    path('admin/media/text_images/', include('upload_image.urls')),
    path('api/maps/', include('maps.urls')),
    # path('api/maps/', MapsCustomGeoJSONLayerView.as_view(model=Maps,
    #     properties=('title', 'title_ru', 'title_en', 'title_ky', 'created_at', 'updated_at', 'body', 'body_ru', 'body_en', 'body_ky', 'object_type'))),
    # path('api/newmaps/', NewMapsCustomGeoJSONLayerView.as_view(model=NewMaps,
    #     properties=('title', 'title_ru', 'title_en', 'title_ky', 'created_at', 'updated_at', 'body', 'body_ru', 'body_en', 'body_ky', 'object_type'))),
    path('api/services/', include('services.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/gp/', include('gp.urls')),
    path('api/aboutcompany/', include('aboutcompany.urls')),
    path('api/employees/', include('employees.urls')),
    path('api/achievements/', include('achievements.urls')),
    path('api/charts/', include('charts.urls')),
    path('api/investors/', include('investors.urls')),
    path('api/boezgrt/', include('boezgrt.urls')),
    path('api/category/', include('category.urls')),
    path('api/vacancies', include('vacancies.urls')),
    path('api/realization/', include('realization.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += i18n_patterns(
    path('api/home/', include('home.urls')),
    path('api/news/', include('news.urls')),
    path('api/maps/', include('maps.urls')),
    path('api/services/', include('services.urls')),
    path('api/gp/', include('gp.urls')),
    path('api/aboutcompany/', include('aboutcompany.urls')),
    path('api/employees/', include('employees.urls')),
    path('api/achievements/', include('achievements.urls')),
    path('api/charts/', include('charts.urls')),
    path('api/investors/', include('investors.urls')),
    path('api/boezgrt/', include('boezgrt.urls')),
    path('api/category/', include('category.urls')),
    path('api/vacancies', include('vacancies.urls')),
    path('api/realization/', include('realization.urls')),
)




# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
