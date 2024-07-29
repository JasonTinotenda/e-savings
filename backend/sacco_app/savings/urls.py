from django.urls import path
from savings.views import deposit_funds, withdraw_funds, account_balance

app_name = 'savings'

urlpatterns = [
    path('deposit/<str:account_number>/', deposit_funds, name='deposit_funds'),
    path('withdraw/<str:account_number>/', withdraw_funds, name='withdraw_funds'),
    path('balance/<str:account_number>/', account_balance, name='account_balance'),
]