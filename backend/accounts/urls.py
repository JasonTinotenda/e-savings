from django.urls import path
from .views import (
    PersonApiView,
    PersonDetailApiView,
    AccountApiView,
    AccountDetailApiView,
    TransactionApiView,
    TransactionDetailApiView
)

urlpatterns = [
    # Person URLs
    path('persons/', PersonApiView.as_view(), name='person-list'),
    path('persons/<int:pk>/', PersonDetailApiView.as_view(), name='person-detail'),

    # Account URLs
    path('accounts/', AccountApiView.as_view(), name='account-list'),
    path('accounts/<int:pk>/', AccountDetailApiView.as_view(), name='account-detail'),

    # Transaction URLs
    path('transactions/', TransactionApiView.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionDetailApiView.as_view(), name='transaction-detail'),
]
