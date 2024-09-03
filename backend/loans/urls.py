from django.urls import path
from . import views

app_name = 'loans'

urlpatterns = [
    # LoanType URLs
    path('loantypes/', views.LoanTypeListView.as_view(), name='loantype_list'),
    path('loantypes/<int:pk>/', views.LoanTypeDetailView.as_view(), name='loantype_detail'),
    path('loantypes/create/', views.LoanTypeCreateView.as_view(), name='loantype_create'),
    path('loantypes/<int:pk>/update/', views.LoanTypeUpdateView.as_view(), name='loantype_update'),
    path('loantypes/<int:pk>/delete/', views.LoanTypeDeleteView.as_view(), name='loantype_delete'),

    # Loan URLs
    path('loans/', views.LoanListView.as_view(), name='loan_list'),
    path('loans/<int:pk>/', views.LoanDetailView.as_view(), name='loan_detail'),
    path('loans/create/', views.LoanCreateView.as_view(), name='loan_create'),
    path('loans/<int:pk>/update/', views.LoanUpdateView.as_view(), name='loan_update'),
    path('loans/<int:pk>/delete/', views.LoanDeleteView.as_view(), name='loan_delete'),

    # LoanRepayment URLs
    path('repayments/create/', views.LoanRepaymentCreateView.as_view(), name='loanrepayment_create'),
    path('repayments/<int:pk>/update/', views.LoanRepaymentUpdateView.as_view(), name='loanrepayment_update'),
    path('repayments/<int:pk>/delete/', views.LoanRepaymentDeleteView.as_view(), name='loanrepayment_delete'),
    path('repayments/<int:pk>/', views.LoanRepaymentDetailView.as_view(), name='loanrepayment_detail'),
    path('repayments/', views.LoanRepaymentListView.as_view(), name='loanrepayment_list'),
]
