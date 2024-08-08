from django.urls import path
from .views import (
    LoanApplicationListCreateView,
    LoanApplicationDetailView,
    LoanApprovalDetailView,
    LoanRepaymentListCreateView,
    LoanTrackingListCreateView
)

urlpatterns = [
    path('loan-applications/', LoanApplicationListCreateView.as_view(), name='loan-application-list-create'),
    path('loan-applications/<int:pk>/', LoanApplicationDetailView.as_view(), name='loan-application-detail'),
    path('loan-approvals/<int:pk>/', LoanApprovalDetailView.as_view(), name='loan-approval-detail'),
    path('loan-repayments/<int:loan_id>/', LoanRepaymentListCreateView.as_view(), name='loan-repayment-list-create'),
    path('loan-trackings/<int:loan_id>/', LoanTrackingListCreateView.as_view(), name='loan-tracking-list-create'),
]
