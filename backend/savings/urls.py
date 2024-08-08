from django.urls import path
from .views import DepositFundsView, WithdrawFundsView, AccountBalanceView

urlpatterns = [
    path('deposit/<str:account_number>/', DepositFundsView.as_view(), name='deposit-funds'),
    path('withdraw/<str:account_number>/', WithdrawFundsView.as_view(), name='withdraw-funds'),
    path('account-balance/<str:account_number>/', AccountBalanceView.as_view(), name='account-balance'),
]
