from django.urls import path
from .views import AccountViewSet, TransactionViewSet, TransactionTypeViewSet

urlpatterns = [
    path('accounts/', AccountViewSet.as_view({'get': 'list', 'post': 'create'}), name='account-list'),
    path('accounts/<int:pk>/', AccountViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='account-detail'),
    path('accounts/<int:pk>/balance/', AccountViewSet.as_view({'get': 'balance'}), name='account-balance'),
    
    path('transactions/', TransactionViewSet.as_view({'get': 'list', 'post': 'create'}), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='transaction-detail'),
    
    path('transaction-types/', TransactionTypeViewSet.as_view({'get': 'list'}), name='transaction-type-list'),
]
