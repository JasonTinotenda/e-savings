from django.urls import path
from .views import SavingsAccountListCreateView, SavingsAccountDetailView, SavingsTransactionListCreateView, SavingsTransactionDetailView

urlpatterns = [
    path('savings-accounts/', SavingsAccountListCreateView.as_view(), name='savings-account-list-create'),
    path('savings-accounts/<int:pk>/', SavingsAccountDetailView.as_view(), name='savings-account-detail'),
    path('savings-transactions/', SavingsTransactionListCreateView.as_view(), name='savings-transaction-list-create'),
    path('savings-transactions/<int:pk>/', SavingsTransactionDetailView.as_view(), name='savings-transaction-detail'),
]
