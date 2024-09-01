from django.urls import path
from .views import TransactionListView, TransactionDetailView, TransactionCreateView, TransactionUpdateView, TransactionDeleteView

app_name = 'transactions'

urlpatterns = [
    path('', TransactionListView.as_view(), name='transaction_list'),
    path('<int:pk>/', TransactionDetailView.as_view(), name='transaction_detail'),
    path('create/', TransactionCreateView.as_view(), name='transaction_create'),
    path('<int:pk>/update/', TransactionUpdateView.as_view(), name='transaction_update'),
    path('<int:pk>/delete/', TransactionDeleteView.as_view(), name='transaction_delete'),
]
