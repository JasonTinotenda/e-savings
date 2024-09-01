from django.urls import path, include
from .views import dashboard

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('loans/', include('loans.urls', namespace='loans')),
    path('transactions/', include('transactions.urls', namespace='transactions')),
    path('reports/', include('reports.urls', namespace='reports')),
]
