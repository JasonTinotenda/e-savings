from django.urls import path
from transactions.views import deposit, withdrawal, transaction_detail

app_name = 'transactions'

urlpatterns = [
    path('deposit/', deposit, name='deposit'),
    path('withdrawal/', withdrawal, name='withdrawal'),
    path('transaction/<int:transaction_id>/', transaction_detail, name='transaction_detail'),
]