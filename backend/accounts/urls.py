from django.urls import path
from .views import PersonApiView, AccountApiView, AccountTransactionApiView

urlpatterns = [
    path('persons/', PersonApiView.as_view(), name='person-list'),
    path('persons/<int:pk>/', PersonApiView.as_view(), name='person-detail'),
    path('accounts/', AccountApiView.as_view(), name='account-list'),
    path('accounts/<int:pk>/', AccountApiView.as_view(), name='account-detail'),
    path('transactions/', AccountTransactionApiView.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', AccountTransactionApiView.as_view(), name='transaction-detail'),
]
