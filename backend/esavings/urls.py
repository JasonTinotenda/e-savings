from django.urls import path, include
from django.contrib import admin
from accounts import urls as accounts_urls
from loans import urls as loans_urls

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(accounts_urls)), 
    path('api/', include(loans_urls)),  # Include your loans API URLs
]


