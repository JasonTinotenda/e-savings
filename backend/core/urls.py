from django.urls import path, include
from .views import dashboard
from accounts import urls as accounts_urls
from loans import urls as loans_urls
from transactions import urls as transactions_urls
from reports import urls as reports_urls

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('api/', include(accounts_urls)),  
    path('api/', include(loans_urls)),        
    path('api/', include(transactions_urls)), 
    path('api/', include(reports_urls)),    
]
