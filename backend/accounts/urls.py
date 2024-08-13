from django.urls import path
from .views import PersonListCreateView, PersonDetailView, AccountListCreateView, AccountDetailView, AccountTransactionListCreateView, AccountTransactionDetailView

urlpatterns = [
    # Person URLs
    path('persons/', PersonListCreateView.as_view(), name='person-list-create'),
    path('persons/<int:pk>/', PersonDetailView.as_view(), name='person-detail'),

    # Account URLs
    path('accounts/', AccountListCreateView.as_view(), name='account-list-create'),
    path('accounts/<int:pk>/', AccountDetailView.as_view(), name='account-detail'),

    # AccountTransaction URLs
    path('transactions/', AccountTransactionListCreateView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', AccountTransactionDetailView.as_view(), name='transaction-detail'),
]
