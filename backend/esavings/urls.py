from django.urls import path, include
from django.contrib import admin
from core import urls as core_urls

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('admin/', admin.site.urls),   
    path('', include(core_urls)),
]


