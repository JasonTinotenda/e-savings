from django.urls import path
from .views import LoanTypeListCreateView, LoanListCreateView, LoanDetailView, LoanRepaymentListCreateView, LoanRepaymentDetailView

urlpatterns = [
    path('loan-types/', LoanTypeListCreateView.as_view(), name='loan-type-list-create'),
    path('loans/', LoanListCreateView.as_view(), name='loan-list-create'),
    path('loans/<int:pk>/', LoanDetailView.as_view(), name='loan-detail'),
    path('loan-repayments/', LoanRepaymentListCreateView.as_view(), name='loan-repayment-list-create'),
    path('loan-repayments/<int:pk>/', LoanRepaymentDetailView.as_view(), name='loan-repayment-detail'),
]
