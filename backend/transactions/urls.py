from django.urls import path
from .views import (
    TransactionApiView,
    TransactionDetailApiView
)

urlpatterns = [

    # Transaction URLs
    path('transactions/', TransactionApiView.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionDetailApiView.as_view(), name='transaction-detail'),
]
