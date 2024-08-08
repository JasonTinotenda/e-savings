from django.urls import path
from .views import DepositView, WithdrawalView, TransactionDetailView

app_name = 'transactions'

urlpatterns = [
    path('deposit/', DepositView.as_view(), name='deposit'),
    path('withdrawal/', WithdrawalView.as_view(), name='withdrawal'),
    path('transaction/<int:transaction_id>/', TransactionDetailView.as_view(), name='transaction_detail'),
]
