from django.urls import path, include
from .views import dashboard, Login
from django.contrib.auth import views as auth

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('login/', Login, name='login'),
    path('logout/',  auth.LogoutView.as_view(template_name ='logout.html'), name='logout'),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('loans/', include('loans.urls', namespace='loans')),
    path('transactions/', include('transactions.urls', namespace='transactions')),
    path('reports/', include('reports.urls', namespace='reports')),
]
