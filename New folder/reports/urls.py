from django.urls import path
from .views import FinancialReportsView

urlpatterns = [
    path('financial-reports/', FinancialReportsView.as_view(), name='financial-reports'),
]
